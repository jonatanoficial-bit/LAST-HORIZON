const EARTH_RADIUS_M=6378137;
const EARTH_MU=3.986004418e14;
const EARTH_ROTATION=7.2921159e-5;
const G0=9.80665;
const DEG=Math.PI/180;

const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const norm=a=>Math.hypot(...a);
const unit=a=>{const n=norm(a)||1;return mul(a,1/n)};
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const approach=(value,target,maxDelta)=>value+clamp(target-value,-maxDelta,maxDelta);

const stages={
  1:{name:"BOOSTER GSEA B1",maxThrustN:8200000,ispS:340,propellantKg:240000,dryKg:65000,cdA:42},
  2:{name:"ESTÁGIO ORBITAL NTR",maxThrustN:3200000,ispS:700,propellantKg:180000,dryKg:20000,cdA:18}
};

export const flightConstants={earthRadiusM:EARTH_RADIUS_M,earthMu:EARTH_MU,earthRotationRadS:EARTH_ROTATION,g0:G0,stages};

export function createDefaultFlightState(options={}){
  const lat=(options.latDeg??-2.373)*DEG,lon=(options.lonDeg??-44.396)*DEG,r=EARTH_RADIUS_M+(options.altitudeM||0),positionM=[r*Math.cos(lat)*Math.cos(lon),r*Math.cos(lat)*Math.sin(lon),r*Math.sin(lat)],velocityMps=cross([0,0,EARTH_ROTATION],positionM);
  return {version:2,status:"prelaunch",paused:false,pauseReason:null,elapsedS:0,positionM,velocityMps,launchPositionM:[...positionM],attitudeDeg:{pitch:90,yaw:90,roll:0},angularRateDegS:{pitch:0,yaw:0,roll:0},controls:{pitch:0,yaw:0,roll:0,throttle:100},guidance:true,sas:true,controlMode:"command",autoStageSeparation:true,commandProfile:"nominal",stage:1,stageSeparated:false,stagePropellantKg:{1:stages[1].propellantKg,2:stages[2].propellantKg},massKg:stages[1].propellantKg+stages[1].dryKg+stages[2].propellantKg+stages[2].dryKg+50000,integrity:100,maxQPa:0,maxHeatWm2:0,objectives:{liftoff:false,maxQ:false,separation:false,karman:false,orbit:false},alerts:[],commands:[],failure:null,lastTelemetry:null};
}

export function ensureFlightState(state){state.mission.flight6d||=createDefaultFlightState();const flight=state.mission.flight6d,base=createDefaultFlightState();for(const [key,value] of Object.entries(base))if(flight[key]===undefined)flight[key]=structuredClone(value);flight.controls||=structuredClone(base.controls);flight.objectives||=structuredClone(base.objectives);flight.stagePropellantKg||=structuredClone(base.stagePropellantKg);return flight}

export function atmosphereAt(altitudeM){
  const h=Math.max(0,altitudeM);if(h>=150000)return {densityKgM3:0,pressurePa:0,temperatureK:800,speedOfSoundMps:1000};
  let temperatureK,pressurePa;
  if(h<11000){temperatureK=288.15-.0065*h;pressurePa=101325*Math.pow(temperatureK/288.15,5.25588)}
  else if(h<20000){temperatureK=216.65;pressurePa=22632.1*Math.exp(-(h-11000)/6341.62)}
  else if(h<32000){temperatureK=216.65+.001*(h-20000);pressurePa=5474.89*Math.pow(216.65/temperatureK,34.1632)}
  else if(h<47000){temperatureK=228.65+.0028*(h-32000);pressurePa=868.019*Math.pow(228.65/temperatureK,12.2011)}
  else {temperatureK=270.65;pressurePa=110.906*Math.exp(-(h-47000)/7500)}
  const densityKgM3=pressurePa/(287.05287*temperatureK),speedOfSoundMps=Math.sqrt(1.4*287.05287*temperatureK);return {densityKgM3,pressurePa,temperatureK,speedOfSoundMps};
}

function localFrame(position){const up=unit(position),east=unit(cross([0,0,1],up)),north=unit(cross(up,east));return {up,east,north}}
function guidanceTarget(altitudeM){const km=altitudeM/1000;if(km<1)return 90;if(km<12)return 90-(km-1)*1.15;if(km<55)return 77.35-(km-12)*.86;if(km<100)return 40.37-(km-55)*.58;if(km<150)return 14.27-(km-100)*.2;return 0}

function guidanceCommand(flight,telemetry){
  let pitchDeg=guidanceTarget(telemetry.altitudeM),throttlePct=flight.controls.throttle;
  if(flight.stage===2&&telemetry.altitudeM>65000){
    const apoapsis=telemetry.orbit.apoapsisKm,periapsis=telemetry.orbit.periapsisKm,vertical=telemetry.verticalSpeedMps;
    if(apoapsis<185){
      const targetVertical=telemetry.altitudeM<115000?320:telemetry.altitudeM<155000?170:60;
      pitchDeg=clamp(5+(targetVertical-vertical)*.035,-8,32);
      throttlePct=100;
    }else if(vertical>20){
      pitchDeg=clamp(-vertical*.025,-12,2);
      throttlePct=0;
    }else{
      pitchDeg=clamp(-vertical*.032,-12,12);
      throttlePct=periapsis<155?clamp((155-periapsis)*2,8,100):0;
    }
  }
  return {pitchDeg:pitchDeg+flight.controls.pitch*12,yawDeg:90+flight.controls.yaw*7,rollDeg:flight.controls.roll*18,throttlePct};
}

function orbitalEstimate(position,velocity){
  const r=norm(position),v2=dot(velocity,velocity),energy=v2/2-EARTH_MU/r;if(energy>=0)return {apoapsisKm:Infinity,periapsisKm:Infinity,eccentricity:1};
  const hVec=cross(position,velocity),eVec=sub(mul(cross(velocity,hVec),1/EARTH_MU),unit(position)),eccentricity=norm(eVec),a=-EARTH_MU/(2*energy),apo=a*(1+eccentricity)-EARTH_RADIUS_M,peri=a*(1-eccentricity)-EARTH_RADIUS_M;return {apoapsisKm:apo/1000,periapsisKm:peri/1000,eccentricity};
}

export function flightTelemetry(flight){
  const position=flight.positionM,velocity=flight.velocityMps,{up,east,north}=localFrame(position),altitudeM=norm(position)-EARTH_RADIUS_M,rotationVelocity=cross([0,0,EARTH_ROTATION],position),relativeVelocity=sub(velocity,rotationVelocity),verticalSpeedMps=dot(relativeVelocity,up),eastSpeedMps=dot(relativeVelocity,east),northSpeedMps=dot(relativeVelocity,north),horizontalSpeedMps=Math.hypot(eastSpeedMps,northSpeedMps),atmosphere=atmosphereAt(altitudeM),airSpeedMps=norm(relativeVelocity),dynamicPressurePa=.5*atmosphere.densityKgM3*airSpeedMps**2,mach=airSpeedMps/Math.max(1,atmosphere.speedOfSoundMps),heatFluxWm2=1.83e-4*Math.sqrt(atmosphere.densityKgM3/.8)*airSpeedMps**3,launchAngle=Math.acos(clamp(dot(unit(flight.launchPositionM),unit(position)),-1,1)),downrangeKm=launchAngle*EARTH_RADIUS_M/1000,orbit=orbitalEstimate(position,velocity),stage=stages[flight.stage],propellantKg=flight.stagePropellantKg[flight.stage]||0,totalPropellantKg=(flight.stagePropellantKg[1]||0)+(flight.stagePropellantKg[2]||0),fuelPct=totalPropellantKg/(stages[1].propellantKg+stages[2].propellantKg)*100;
  return {altitudeM,altitudeKm:altitudeM/1000,speedMps:airSpeedMps,inertialSpeedMps:norm(velocity),airSpeedMps,verticalSpeedMps,horizontalSpeedMps,eastSpeedMps,northSpeedMps,dynamicPressurePa,mach,heatFluxWm2,downrangeKm,atmosphere,orbit,stageName:stage.name,stagePropellantKg:propellantKg,totalPropellantKg,fuelPct,massKg:flight.massKg,pitchDeg:flight.attitudeDeg.pitch,yawDeg:flight.attitudeDeg.yaw,rollDeg:flight.attitudeDeg.roll,gLoad:flight.lastTelemetry?.gLoad||1,thrustN:flight.lastTelemetry?.thrustN||0,targetPitchDeg:guidanceTarget(altitudeM)};
}

export function igniteFlight(flight){if(flight.status!=="prelaunch")return {ok:false,reason:"Sequência já iniciada."};flight.status="ascent";flight.paused=false;flight.alerts.unshift({at:0,type:"info",message:"Ignição confirmada. Liberação da torre."});return {ok:true}}
export function toggleFlightPause(flight){if(!["ascent","coast"].includes(flight.status))return false;flight.paused=!flight.paused;return flight.paused}
export function setFlightControl(flight,axis,value){if(!(axis in flight.controls))return;flight.controls[axis]=clamp(Number(value)||0,axis==="throttle"?0:-1,axis==="throttle"?100:1)}
export function setFlightMode(flight,mode,enabled){if(mode==="guidance")flight.guidance=enabled;if(mode==="sas")flight.sas=enabled}
export function setFlightControlMode(flight,mode){flight.controlMode=mode==="manual"?"manual":"command";flight.guidance=flight.controlMode==="command";flight.sas=true;flight.autoStageSeparation=flight.controlMode==="command";flight.controls.pitch=0;flight.controls.yaw=0;flight.controls.roll=0;flight.commands||=[];flight.commands.unshift({at:flight.elapsedS,type:"control-mode",value:flight.controlMode});return flight.controlMode}
export function issueFlightOrder(flight,order){flight.commands||=[];if(order==="nominal"){flight.commandProfile="nominal";flight.controls.throttle=100;flight.guidance=true}else if(order==="maxq"){flight.commandProfile="maxq-protect";flight.controls.throttle=72;flight.guidance=true}else if(order==="resume"){flight.commandProfile="nominal";flight.controls.throttle=100;flight.guidance=true}else return {ok:false,reason:"Ordem de voo desconhecida."};flight.commands.unshift({at:flight.elapsedS,type:"crew-order",value:order});flight.alerts.unshift({at:flight.elapsedS,type:"info",message:`Ordem do comandante recebida: ${order}. Jun Park executando.`});return {ok:true,order}}
export function canSeparateStage(flight){return flight.stage===1&&!flight.stageSeparated&&(flight.elapsedS>=82||flight.stagePropellantKg[1]<=25000)}
export function separateStage(flight){if(!canSeparateStage(flight))return {ok:false,reason:"Separação inibida antes do corredor seguro."};const discardedFuel=flight.stagePropellantKg[1];flight.massKg-=stages[1].dryKg+discardedFuel;flight.stagePropellantKg[1]=0;flight.stage=2;flight.stageSeparated=true;flight.objectives.separation=true;flight.alerts.unshift({at:flight.elapsedS,type:"success",message:`Estágio B1 separado. ${Math.round(discardedFuel)} kg residuais descartados.`});return {ok:true,discardedFuelKg:discardedFuel}}

export function abortFlight(flight,reason="Abortagem comandada pela tripulação") {flight.status="aborted";flight.paused=true;flight.failure={type:"abort",reason,at:flight.elapsedS};flight.alerts.unshift({at:flight.elapsedS,type:"danger",message:reason});return {ok:true}}
export function resetFlight(flight,options={}){Object.assign(flight,createDefaultFlightState(options));return flight}

export function stepFlight(flight,requestedDt){
  if(flight.paused||!['ascent','coast'].includes(flight.status))return flightTelemetry(flight);
  const dt=clamp(requestedDt,0,.12),before=flightTelemetry(flight),altitudeM=before.altitudeM,{up,east,north}=localFrame(flight.positionM),manual=flight.controls;
  const command=flight.guidance?guidanceCommand(flight,before):null;
  if(flight.guidance){flight.attitudeDeg.pitch=approach(flight.attitudeDeg.pitch,command.pitchDeg,dt*(altitudeM<30000?1.15:2));flight.attitudeDeg.yaw=approach(flight.attitudeDeg.yaw,command.yawDeg,dt*.65);flight.attitudeDeg.roll=approach(flight.attitudeDeg.roll,command.rollDeg,dt*2.2);flight.angularRateDegS={pitch:0,yaw:0,roll:0}}
  else {const torque=flight.stage===1?5.2:2.8,damping=flight.sas?.78:.97;for(const axis of ["pitch","yaw","roll"]){flight.angularRateDegS[axis]=(flight.angularRateDegS[axis]+manual[axis]*torque*dt)*Math.pow(damping,dt);flight.attitudeDeg[axis]+=flight.angularRateDegS[axis]*dt}flight.attitudeDeg.pitch=clamp(flight.attitudeDeg.pitch,-25,110);flight.attitudeDeg.roll=((flight.attitudeDeg.roll+180)%360+360)%360-180;flight.attitudeDeg.yaw=((flight.attitudeDeg.yaw%360)+360)%360}
  const pitch=flight.attitudeDeg.pitch*DEG,yaw=flight.attitudeDeg.yaw*DEG,thrustDirection=unit(add(mul(up,Math.sin(pitch)),add(mul(east,Math.cos(pitch)*Math.sin(yaw)),mul(north,Math.cos(pitch)*Math.cos(yaw))))),stage=stages[flight.stage],fuel=flight.stagePropellantKg[flight.stage]||0,throttle=clamp(command?.throttlePct??manual.throttle,0,100)/100,thrustN=fuel>0?stage.maxThrustN*throttle:0,mdot=thrustN/(stage.ispS*G0),used=Math.min(fuel,mdot*dt);flight.stagePropellantKg[flight.stage]=fuel-used;flight.massKg-=used;
  const rotationVelocity=cross([0,0,EARTH_ROTATION],flight.positionM),windEast=altitudeM<18000?(8+12*Math.sin(flight.elapsedS/31))*Math.exp(-altitudeM/22000):0,windNorth=altitudeM<14000?5*Math.sin(flight.elapsedS/19):0,airVelocity=sub(flight.velocityMps,add(rotationVelocity,add(mul(east,windEast),mul(north,windNorth)))),airSpeed=norm(airVelocity),atmosphere=atmosphereAt(altitudeM),dragN=.5*atmosphere.densityKgM3*airSpeed**2*stage.cdA,gravity=mul(flight.positionM,-EARTH_MU/norm(flight.positionM)**3),thrustAcceleration=mul(thrustDirection,thrustN/flight.massKg),dragAcceleration=airSpeed>0?mul(unit(airVelocity),-dragN/flight.massKg):[0,0,0],acceleration=add(gravity,add(thrustAcceleration,dragAcceleration));flight.velocityMps=add(flight.velocityMps,mul(acceleration,dt));flight.positionM=add(flight.positionM,mul(flight.velocityMps,dt));flight.elapsedS+=dt;
  const telemetry=flightTelemetry(flight),properAcceleration=norm(add(thrustAcceleration,dragAcceleration)),gLoad=properAcceleration/G0;telemetry.gLoad=gLoad;telemetry.thrustN=thrustN;flight.lastTelemetry={...telemetry};flight.maxQPa=Math.max(flight.maxQPa,telemetry.dynamicPressurePa);flight.maxHeatWm2=Math.max(flight.maxHeatWm2,telemetry.heatFluxWm2);
  if(telemetry.altitudeM>3)flight.objectives.liftoff=true;if(telemetry.dynamicPressurePa>25000)flight.objectives.maxQ=true;if(telemetry.altitudeM>=100000)flight.objectives.karman=true;
  const qExcess=Math.max(0,telemetry.dynamicPressurePa-72000)/72000,heatExcess=Math.max(0,telemetry.heatFluxWm2-1800000)/1800000,attitudeRisk=Math.max(0,Math.abs(flight.attitudeDeg.roll)-70)/100;flight.integrity-=dt*(qExcess*1.8+heatExcess*1.2+attitudeRisk*.35);flight.integrity=clamp(flight.integrity,0,100);
  if(flight.autoStageSeparation&&canSeparateStage(flight))separateStage(flight);
  if(canSeparateStage(flight)&&flight.stagePropellantKg[1]<=1000)flight.status="coast";
  if(flight.stage===2&&thrustN>0)flight.status="ascent";
  const orbitalSpeed=telemetry.inertialSpeedMps>=7550,orbitalAltitude=telemetry.altitudeM>=155000,stableVertical=Math.abs(telemetry.verticalSpeedMps)<1500,periapsisSafe=telemetry.orbit.periapsisKm>100;if(orbitalSpeed&&orbitalAltitude&&stableVertical&&periapsisSafe){flight.status="orbit";flight.paused=true;flight.objectives.orbit=true;flight.alerts.unshift({at:flight.elapsedS,type:"success",message:"Órbita inicial alcançada. Navegação orbital liberada."})}
  if(telemetry.altitudeM< -15&&flight.objectives.liftoff)abortFlight(flight,"Impacto com o solo após perda de sustentação");else if(flight.integrity<=12)abortFlight(flight,"Limite estrutural excedido durante a ascensão");else if(flight.stage===2&&flight.stagePropellantKg[2]<=0&&!flight.objectives.orbit&&telemetry.orbit.apoapsisKm<140)abortFlight(flight,"Propelente esgotado antes de uma órbita recuperável");
  return telemetry;
}

export function commitFlightToOrbit(state){const flight=ensureFlightState(state),telemetry=flightTelemetry(flight);if(flight.status!=="orbit")return {ok:false,reason:"A ARK-01 ainda não atingiu uma órbita estável."};const peri=Math.max(155,Math.round(telemetry.orbit.periapsisKm)),apo=Math.max(peri,Math.round(telemetry.orbit.apoapsisKm));state.mission.orbit.periapsisKm=peri;state.mission.orbit.apoapsisKm=apo;state.mission.orbit.status="insertion";state.mission.orbit.propellantKg=Math.max(2500,Math.round(flight.stagePropellantKg[2]));state.mission.orbit.initialPropellantKg=Math.max(state.mission.orbit.initialPropellantKg,state.mission.orbit.propellantKg);state.systems.propulsion.fuelPct=clamp(state.mission.orbit.propellantKg/state.mission.orbit.initialPropellantKg*100,0,100);state.ship.integrity=Math.min(state.ship.integrity,flight.integrity);state.mission.flightStage=3;state.time.missionHours+=flight.elapsedS/3600;return {ok:true,periapsisKm:peri,apoapsisKm:apo}}
