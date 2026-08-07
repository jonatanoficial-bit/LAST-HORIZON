const EARTH_MU_M3S2=3.986004418e14;
const ORBIT_RADIUS_M=(6378.137+220)*1000;
const MEAN_MOTION=Math.sqrt(EARTH_MU_M3S2/ORBIT_RADIUS_M**3);
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

export const rendezvousConstants={meanMotionRadS:MEAN_MOTION,orbitRadiusM:ORBIT_RADIUS_M};

export function createRendezvousState(seed="HAVEN-2047"){
  let hash=2166136261;for(const char of String(seed)){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619)}
  const sign=hash&1?1:-1;
  return {version:1,status:"ready",target:"DEPÓSITO GSEA-03",x:180,y:sign*(28+(hash%13)),z:-sign*(12+(hash%7)),vx:-.22,vy:-sign*.018,vz:sign*.009,pitch:sign*2.8,yaw:-sign*3.6,roll:sign*1.2,pitchRate:0,yawRate:0,rollRate:0,rcsPropellantKg:24,initialRcsPropellantKg:24,elapsedSeconds:0,impulses:0,minimumRangeM:9999,lastResult:null,assistance:"sas",tutorialStep:0};
}

export function ensureRendezvousState(state){state.mission||={};state.mission.rendezvous||=createRendezvousState(state.meta?.seed);const rv=state.mission.rendezvous,base=createRendezvousState(state.meta?.seed);for(const [key,value] of Object.entries(base))if(rv[key]===undefined)rv[key]=structuredClone(value);return rv}

export function rendezvousTelemetry(rv){const rangeM=Math.hypot(rv.x,rv.y,rv.z),relativeSpeedMps=Math.hypot(rv.vx,rv.vy,rv.vz),closingRateMps=rangeM?-(rv.x*rv.vx+rv.y*rv.vy+rv.z*rv.vz)/rangeM:0,lateralM=Math.hypot(rv.y,rv.z),corridorDeg=Math.atan2(lateralM,Math.max(.01,Math.abs(rv.x)))*180/Math.PI,attitudeErrorDeg=Math.hypot(rv.pitch,rv.yaw,rv.roll);return {rangeM,relativeSpeedMps,closingRateMps,lateralM,corridorDeg,attitudeErrorDeg,timeToContactS:closingRateMps>.001?rangeM/closingRateMps:Infinity,propellantPct:rv.rcsPropellantKg/rv.initialRcsPropellantKg*100}}

function axis(value){return clamp(Number(value)||0,-1,1)}

export function stepRendezvous(rv,controls={},deltaSeconds=.1){
  if(!["ready","approach"].includes(rv.status))return rendezvousTelemetry(rv);
  const dt=clamp(deltaSeconds,.01,.25),forward=axis(controls.forward),right=axis(controls.right),up=axis(controls.up),pitch=axis(controls.pitch),yaw=axis(controls.yaw),roll=axis(controls.roll),translationLoad=Math.abs(forward)+Math.abs(right)+Math.abs(up),rotationLoad=Math.abs(pitch)+Math.abs(yaw)+Math.abs(roll);
  rv.status="approach";
  if((translationLoad||rotationLoad)&&rv.rcsPropellantKg>0){
    const accel=.045,angularAccel=1.8;
    rv.vx-=forward*accel*dt;rv.vy+=right*accel*dt;rv.vz+=up*accel*dt;
    rv.pitchRate+=pitch*angularAccel*dt;rv.yawRate+=yaw*angularAccel*dt;rv.rollRate+=roll*angularAccel*dt;
    rv.rcsPropellantKg=Math.max(0,rv.rcsPropellantKg-(translationLoad*.018+rotationLoad*.009)*dt);rv.impulses++;
  }
  const ax=3*MEAN_MOTION**2*rv.x+2*MEAN_MOTION*rv.vy,ay=-2*MEAN_MOTION*rv.vx,az=-(MEAN_MOTION**2)*rv.z;
  rv.vx+=ax*dt;rv.vy+=ay*dt;rv.vz+=az*dt;rv.x+=rv.vx*dt;rv.y+=rv.vy*dt;rv.z+=rv.vz*dt;
  const sas=controls.sas!==false&&rv.assistance==="sas",damping=sas?Math.pow(.965,dt*10):Math.pow(.992,dt*10);
  if(sas){rv.pitchRate+=-rv.pitch*.16*dt;rv.yawRate+=-rv.yaw*.16*dt;rv.rollRate+=-rv.roll*.16*dt}
  rv.pitchRate*=damping;rv.yawRate*=damping;rv.rollRate*=damping;rv.pitch+=rv.pitchRate*dt;rv.yaw+=rv.yawRate*dt;rv.roll+=rv.rollRate*dt;rv.elapsedSeconds+=dt;
  const telemetry=rendezvousTelemetry(rv);rv.minimumRangeM=Math.min(rv.minimumRangeM,telemetry.rangeM);
  const contact=telemetry.rangeM<=1.05||rv.x<=0;
  if(contact){
    const safe=telemetry.relativeSpeedMps<=.14&&telemetry.lateralM<=.32&&telemetry.attitudeErrorDeg<=5.5;
    rv.status=safe?"docked":"collision";rv.lastResult={status:rv.status,at:rv.elapsedSeconds,rangeM:telemetry.rangeM,speedMps:telemetry.relativeSpeedMps,lateralM:telemetry.lateralM,attitudeErrorDeg:telemetry.attitudeErrorDeg,propellantUsedKg:rv.initialRcsPropellantKg-rv.rcsPropellantKg};
  }
  if(rv.elapsedSeconds>1800){rv.status="aborted";rv.lastResult={status:"aborted",at:rv.elapsedSeconds,rangeM:telemetry.rangeM,speedMps:telemetry.relativeSpeedMps,lateralM:telemetry.lateralM,attitudeErrorDeg:telemetry.attitudeErrorDeg,propellantUsedKg:rv.initialRcsPropellantKg-rv.rcsPropellantKg}}
  return rendezvousTelemetry(rv);
}

export function resetRendezvous(state){state.mission.rendezvous=createRendezvousState(`${state.meta?.seed}:${state.operations?.cycle||1}:${Date.now()}`);return state.mission.rendezvous}

export function commitRendezvousResult(state,result){
  const rv=ensureRendezvousState(state);rv.lastResult=structuredClone(result);state.mission.rendezvousHistory||=[];
  const active=state.operations?.active;
  const context=active?.contract?.uid||(active?`ACTIVE-${state.operations?.cycle||1}`:`TRAINING-${state.operations?.cycle||1}`),alreadyScored=state.mission.rendezvousHistory.some(item=>item.context===context);
  const record={...structuredClone(result),missionHours:state.time.missionHours,target:rv.target,context,scored:!alreadyScored};state.mission.rendezvousHistory.push(record);state.mission.rendezvousHistory=state.mission.rendezvousHistory.slice(-20);if(alreadyScored)return record;
  if(result.status==="docked"){state.crew.trust=clamp(state.crew.trust+3,0,100);state.crew.morale=clamp(state.crew.morale+2,0,100);if(active?.status==="active"){active.risk=clamp(active.risk-12,5,95);active.score+=15;active.rendezvousQualified=true}}
  else if(result.status==="collision"){state.ship.integrity=clamp(state.ship.integrity-12,0,100);state.crew.trust=clamp(state.crew.trust-4,0,100);if(active?.status==="active"){active.risk=clamp(active.risk+20,5,95);active.score-=18;active.rendezvousQualified=false}}
  else {state.crew.trust=clamp(state.crew.trust-1,0,100);if(active?.status==="active")active.risk=clamp(active.risk+5,5,95)}
  return record;
}
