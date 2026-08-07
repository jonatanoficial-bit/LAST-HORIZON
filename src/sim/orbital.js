const EARTH_MU=398600.4418;
const EARTH_RADIUS=6378.137;
const G0=9.80665;

export const orbitalConstants={earthMuKm3s2:EARTH_MU,earthRadiusKm:EARTH_RADIUS,g0:G0};
const rad=value=>value*Math.PI/180;
const deg=value=>value*180/Math.PI;
const normalize=value=>((value%360)+360)%360;

export function createDefaultOrbitState(){return {body:"Terra",status:"insertion",periapsisKm:168,apoapsisKm:220,inclinationDeg:28.5,meanAnomalyDeg:158,elapsedSeconds:0,propellantKg:14000,initialPropellantKg:14000,plannedNode:null,executed:[],windowToleranceDeg:6,lastBurn:null}}

export function ensureOrbitState(state){state.mission.orbit||=createDefaultOrbitState();const orbit=state.mission.orbit,base=createDefaultOrbitState();for(const [key,value] of Object.entries(base))if(orbit[key]===undefined)orbit[key]=structuredClone(value);orbit.executed||=[];return orbit}

function eccentricFromMean(mean,e){let E=mean;for(let i=0;i<8;i++)E-=((E-e*Math.sin(E)-mean)/(1-e*Math.cos(E)));return E}
function meanFromTrue(trueAnomaly,e){const v=rad(normalize(trueAnomaly)),E=2*Math.atan2(Math.sqrt(1-e)*Math.sin(v/2),Math.sqrt(1+e)*Math.cos(v/2));return normalize(deg(E-e*Math.sin(E)))}

export function orbitalSnapshot(orbit){
  const rp=EARTH_RADIUS+orbit.periapsisKm,ra=EARTH_RADIUS+orbit.apoapsisKm,a=(rp+ra)/2,e=Math.max(0,(ra-rp)/(ra+rp)),period=2*Math.PI*Math.sqrt(a**3/EARTH_MU),M=rad(normalize(orbit.meanAnomalyDeg)),E=eccentricFromMean(M,e),trueAnomaly=normalize(deg(2*Math.atan2(Math.sqrt(1+e)*Math.sin(E/2),Math.sqrt(1-e)*Math.cos(E/2)))),r=a*(1-e*Math.cos(E)),velocity=Math.sqrt(EARTH_MU*(2/r-1/a));
  return {radiusKm:r,altitudeKm:r-EARTH_RADIUS,velocityKmS:velocity,periodSeconds:period,periodMinutes:period/60,semiMajorAxisKm:a,eccentricity:e,trueAnomalyDeg:trueAnomaly,meanAnomalyDeg:normalize(orbit.meanAnomalyDeg)};
}

export function propagateOrbit(state,seconds){const orbit=ensureOrbitState(state),snapshot=orbitalSnapshot(orbit);orbit.elapsedSeconds+=seconds;orbit.meanAnomalyDeg=normalize(orbit.meanAnomalyDeg+360*seconds/snapshot.periodSeconds);state.time.missionHours+=seconds/3600;return orbitalSnapshot(orbit)}

const nodeDefinitions={
  circularize:{label:"Circularização no apogeu",progradeMps:92,normalMps:0,radialMps:0,targetAnomalyDeg:180,description:"Eleva o periapsis e estabiliza a órbita de estacionamento."},
  raise:{label:"Elevação de apogeu",progradeMps:280,normalMps:0,radialMps:0,targetAnomalyDeg:0,description:"Queima no periapsis para elevar o lado oposto da órbita."},
  plane:{label:"Correção de plano",progradeMps:0,normalMps:-120,radialMps:0,targetAnomalyDeg:90,description:"Reduz a inclinação no cruzamento do plano de referência."},
  departure:{label:"Janela de partida HAVEN",progradeMps:1180,normalMps:0,radialMps:35,targetAnomalyDeg:42,description:"Queima combinada de escape no ângulo de fase calculado."}
};
export const maneuverDefinitions=nodeDefinitions;

export function planManeuver(state,type){const orbit=ensureOrbitState(state),definition=nodeDefinitions[type];if(!definition)return {ok:false,reason:"Tipo de manobra desconhecido."};if(type==="departure"&&!orbit.executed.some(node=>node.type==="circularize"))return {ok:false,reason:"Circularize a órbita antes de calcular a partida."};const deltaV=Math.hypot(definition.progradeMps,definition.normalMps,definition.radialMps);orbit.plannedNode={id:`NODE-${orbit.executed.length+1}`,type,label:definition.label,description:definition.description,progradeMps:definition.progradeMps,normalMps:definition.normalMps,radialMps:definition.radialMps,deltaVMps:Math.round(deltaV),targetAnomalyDeg:definition.targetAnomalyDeg,createdAt:orbit.elapsedSeconds};return {ok:true,node:orbit.plannedNode}}

export function nodeWindow(state){const orbit=ensureOrbitState(state),node=orbit.plannedNode,snapshot=orbitalSnapshot(orbit);if(!node)return {ready:false,errorDeg:null,snapshot};const raw=Math.abs(normalize(snapshot.trueAnomalyDeg-node.targetAnomalyDeg)),errorDeg=Math.min(raw,360-raw);return {ready:errorDeg<=orbit.windowToleranceDeg,errorDeg,snapshot}}

export function warpToNode(state){const orbit=ensureOrbitState(state),node=orbit.plannedNode;if(!node)return {ok:false,reason:"Nenhum nó planejado."};const snapshot=orbitalSnapshot(orbit),targetMean=meanFromTrue(node.targetAnomalyDeg,snapshot.eccentricity),deltaMean=normalize(targetMean-orbit.meanAnomalyDeg),seconds=deltaMean/360*snapshot.periodSeconds;propagateOrbit(state,seconds);return {ok:true,seconds,snapshot:orbitalSnapshot(orbit)}}

const propulsionIsp=design=>design==="fusion"?4500:design==="ion"?2800:design==="nuclear"?900:460;
export function executeManeuver(state){
  const orbit=ensureOrbitState(state),node=orbit.plannedNode;if(!node)return {ok:false,reason:"Crie um nó antes de comandar a queima."};const window=nodeWindow(state);if(!window.ready)return {ok:false,reason:`Fora da janela por ${window.errorDeg.toFixed(1)}°. Propague até o nó.`};
  const dryMass=Math.max(18000,state.ship.mass.total||36000),isp=propulsionIsp(state.ship.design.propulsion),m0=dryMass+orbit.propellantKg,required=m0-m0/Math.exp(node.deltaVMps/(isp*G0));if(required>orbit.propellantKg)return {ok:false,reason:"Propelente insuficiente para executar o nó."};
  orbit.propellantKg-=required;const altitude=window.snapshot.altitudeKm;
  if(node.type==="circularize"){orbit.periapsisKm=Math.round(altitude);orbit.apoapsisKm=Math.round(altitude);orbit.status="parking"}
  if(node.type==="raise"){orbit.periapsisKm=Math.min(orbit.periapsisKm,Math.round(altitude));orbit.apoapsisKm=Math.max(orbit.apoapsisKm,800);orbit.status="transfer"}
  if(node.type==="plane")orbit.inclinationDeg=Math.max(0,orbit.inclinationDeg-5);
  if(node.type==="departure"){orbit.status="departure";state.mission.phase="partida orbital";state.mission.route.progress=Math.max(1,state.mission.route.progress)}
  const record={...node,executedAt:orbit.elapsedSeconds,propellantUsedKg:Math.round(required),remainingKg:Math.round(orbit.propellantKg)};orbit.executed.push(record);orbit.lastBurn=record;orbit.plannedNode=null;state.systems.propulsion.fuelPct=Math.max(0,orbit.propellantKg/orbit.initialPropellantKg*100);return {ok:true,record,snapshot:orbitalSnapshot(orbit)};
}

export function requiredManeuverComplete(state,stage){const orbit=ensureOrbitState(state);if(stage===3)return orbit.executed.some(node=>node.type==="circularize");if(stage>=4)return orbit.executed.some(node=>node.type==="departure");return true}
