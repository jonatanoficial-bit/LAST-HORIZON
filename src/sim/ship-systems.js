const clamp=(value,min=0,max=100)=>Math.max(min,Math.min(max,value));

export const systemProcedures=[
  {id:"power-balance",label:"Rebalancear barramentos",lead:"elias-brandt",hours:4,spares:1,description:"Isola cargas transitórias, sincroniza os barramentos A/B e recupera margem de bateria."},
  {id:"thermal-flush",label:"Purgar circuito térmico",lead:"rafael-costa",hours:6,spares:2,description:"Remove bolhas do loop secundário e devolve autoridade aos radiadores."},
  {id:"scrubber-regenerate",label:"Regenerar scrubbers",lead:"asha-rao",hours:3,spares:1,description:"Substitui leitos químicos e reduz imediatamente a concentração de CO₂."},
  {id:"water-reclaim",label:"Revisar reciclagem de água",lead:"lena-volkov",hours:5,spares:1,description:"Limpa membranas e recupera água que seria descartada como salmoura."},
  {id:"nav-calibrate",label:"Calibrar navegação estelar",lead:"jun-park",hours:2,spares:0,description:"Funde rastreadores estelares, IMU e efemérides para remover deriva acumulada."},
  {id:"hull-maintenance",label:"Manutenção estrutural",lead:"elias-brandt",hours:12,spares:3,description:"Inspeciona Whipple, vedações e juntas; recupera integridade e reduz backlog."}
];

export function createDetailedSystemsState(state={}){
  const generation=Math.max(540,Number(state.systems?.power?.generationKw||760)),demand=Math.max(360,Number(state.systems?.power?.loadKw||440));
  return {version:1,elapsedHours:0,power:{generationKw:generation,demandKw:demand,batteryPct:Number(state.systems?.power?.batterySoc??100),busA:96,busB:94,stability:95},thermal:{coreC:Number(state.systems?.thermal?.coreTemp??460),cabinC:Number(state.systems?.thermal?.cabinTemp??22),radiatorA:94,radiatorB:91,coolantPct:100},lifeSupport:{pressureKpa:Number(state.systems?.lifeSupport?.cabinPressure??101.3),oxygenPct:Number(state.systems?.lifeSupport?.oxygenPercent??21),co2ppm:Number(state.systems?.lifeSupport?.co2ppm??620),waterPct:Number(state.systems?.lifeSupport?.waterPercent??100),scrubber:96,recycler:94},navigation:{driftKm:0,sensorHealth:97,solutionConfidence:99},maintenance:{spares:28,backlog:0,completed:[]},alerts:[],lastTick:null,lastProcedure:null};
}

export function ensureDetailedSystemsState(state){state.mission||={};state.mission.systemsModel||=createDetailedSystemsState(state);const model=state.mission.systemsModel,base=createDetailedSystemsState(state);for(const [key,value] of Object.entries(base))if(model[key]===undefined)model[key]=structuredClone(value);for(const section of ["power","thermal","lifeSupport","navigation","maintenance"])model[section]={...base[section],...(model[section]||{})};model.alerts||=[];model.maintenance.completed||=[];return model}

const alert=(model,id,severity,message)=>{const existing=model.alerts.find(item=>item.id===id);if(existing){existing.severity=severity;existing.message=message;return}model.alerts.unshift({id,severity,message,at:model.elapsedHours});model.alerts=model.alerts.slice(0,8)};
const clear=(model,id)=>model.alerts=model.alerts.filter(item=>item.id!==id);

export function detailedSystemsSnapshot(state){const live=ensureDetailedSystemsState(state),margin=live.power.generationKw-live.power.demandKw,critical=live.alerts.filter(item=>item.severity==="critical").length,warning=live.alerts.filter(item=>item.severity==="warning").length,health=Math.round(clamp((live.power.stability+live.thermal.radiatorA+live.thermal.radiatorB+live.lifeSupport.scrubber+live.lifeSupport.recycler+live.navigation.sensorHealth)/6-warning*2-critical*7));return {model:structuredClone(live),powerMarginKw:margin,critical,warning,health,nominal:critical===0&&warning<=1}}

export function tickDetailedSystems(state,hours,{stress=1}={}){
  const model=ensureDetailedSystemsState(state),days=Math.max(0,hours/24),loadBias=Math.max(0,model.power.demandKw-model.power.generationKw);
  model.elapsedHours+=hours;model.power.batteryPct=clamp(model.power.batteryPct+(model.power.generationKw-model.power.demandKw)*hours/Math.max(1,model.power.generationKw)*.018,0,100);model.power.busA=clamp(model.power.busA-days*.012*stress);model.power.busB=clamp(model.power.busB-days*.015*stress);model.power.stability=clamp((model.power.busA+model.power.busB)/2-loadBias*.025);
  model.thermal.coolantPct=clamp(model.thermal.coolantPct-days*.018*stress);model.thermal.radiatorA=clamp(model.thermal.radiatorA-days*.021*stress);model.thermal.radiatorB=clamp(model.thermal.radiatorB-days*.026*stress);model.thermal.coreC=clamp(model.thermal.coreC+days*.08*stress+(100-Math.min(model.thermal.radiatorA,model.thermal.radiatorB))*.015,240,920);model.thermal.cabinC=clamp(model.thermal.cabinC+(model.thermal.coreC-480)*days*.00008,15,38);
  model.lifeSupport.scrubber=clamp(model.lifeSupport.scrubber-days*.035*stress);model.lifeSupport.recycler=clamp(model.lifeSupport.recycler-days*.028*stress);model.lifeSupport.co2ppm=clamp(model.lifeSupport.co2ppm+days*(2.2+(100-model.lifeSupport.scrubber)*.06)*stress,350,10000);model.lifeSupport.waterPct=clamp(model.lifeSupport.waterPct-days*(.045+(100-model.lifeSupport.recycler)*.0009)*stress);model.lifeSupport.oxygenPct=clamp(model.lifeSupport.oxygenPct-days*.0018*stress,16,23);
  model.navigation.sensorHealth=clamp(model.navigation.sensorHealth-days*.018*stress);model.navigation.driftKm=Math.max(0,model.navigation.driftKm+days*(.06+(100-model.navigation.sensorHealth)*.012)*stress);model.navigation.solutionConfidence=clamp(100-model.navigation.driftKm*.7-(100-model.navigation.sensorHealth)*.35);
  model.maintenance.backlog=Math.max(0,model.maintenance.backlog+days*.008*stress);model.lastTick={hours,stress,at:state.time?.missionHours||0};
  if(model.power.batteryPct<25||model.power.stability<65)alert(model,"power",model.power.batteryPct<10?"critical":"warning","Margem elétrica degradada; cargas não essenciais ameaçam o barramento.");else clear(model,"power");
  if(model.thermal.coreC>610||Math.min(model.thermal.radiatorA,model.thermal.radiatorB)<55)alert(model,"thermal",model.thermal.coreC>720?"critical":"warning","Loop térmico perdeu eficiência e a temperatura do núcleo está subindo.");else clear(model,"thermal");
  if(model.lifeSupport.co2ppm>1800||model.lifeSupport.oxygenPct<19.2)alert(model,"eclss",model.lifeSupport.co2ppm>3500?"critical":"warning","Atmosfera da cabine fora da margem confortável; scrubbers exigem intervenção.");else clear(model,"eclss");
  if(model.navigation.solutionConfidence<72)alert(model,"navigation",model.navigation.solutionConfidence<45?"critical":"warning","Deriva da solução de navegação excede a margem da próxima correção.");else clear(model,"navigation");
  const critical=model.alerts.some(item=>item.severity==="critical");if(critical){state.ship.integrity=clamp(state.ship.integrity-days*.015);state.crew.morale=clamp(state.crew.morale-days*.012)}
  state.systems.power.batterySoc=model.power.batteryPct;state.systems.thermal.coreTemp=model.thermal.coreC;state.systems.thermal.cabinTemp=model.thermal.cabinC;state.systems.lifeSupport.co2ppm=model.lifeSupport.co2ppm;state.systems.lifeSupport.waterPercent=model.lifeSupport.waterPct;state.systems.lifeSupport.oxygenPercent=model.lifeSupport.oxygenPct;
  return detailedSystemsSnapshot(state)
}

export function executeSystemProcedure(state,procedureId){const model=ensureDetailedSystemsState(state),procedure=systemProcedures.find(item=>item.id===procedureId);if(!procedure)return {ok:false,reason:"Procedimento desconhecido."};if(model.maintenance.spares<procedure.spares)return {ok:false,reason:"Peças de reposição insuficientes."};model.maintenance.spares-=procedure.spares;state.time.missionHours+=procedure.hours;
  if(procedure.id==="power-balance"){model.power.busA=clamp(model.power.busA+14);model.power.busB=clamp(model.power.busB+14);model.power.batteryPct=clamp(model.power.batteryPct+9);model.power.stability=clamp(model.power.stability+16)}
  if(procedure.id==="thermal-flush"){model.thermal.radiatorA=clamp(model.thermal.radiatorA+18);model.thermal.radiatorB=clamp(model.thermal.radiatorB+18);model.thermal.coolantPct=clamp(model.thermal.coolantPct+12);model.thermal.coreC=Math.max(360,model.thermal.coreC-55)}
  if(procedure.id==="scrubber-regenerate"){model.lifeSupport.scrubber=clamp(model.lifeSupport.scrubber+22);model.lifeSupport.co2ppm=Math.max(480,model.lifeSupport.co2ppm-720)}
  if(procedure.id==="water-reclaim"){model.lifeSupport.recycler=clamp(model.lifeSupport.recycler+18);model.lifeSupport.waterPct=clamp(model.lifeSupport.waterPct+5)}
  if(procedure.id==="nav-calibrate"){model.navigation.driftKm=0;model.navigation.sensorHealth=clamp(model.navigation.sensorHealth+14);model.navigation.solutionConfidence=99}
  if(procedure.id==="hull-maintenance"){state.ship.integrity=clamp(state.ship.integrity+7);model.maintenance.backlog=Math.max(0,model.maintenance.backlog-2.5)}
  const engineer=state.crew?.assignments?.engineering;if(engineer)state.crew.fatigue[engineer]=clamp((state.crew.fatigue[engineer]||0)+procedure.hours*.35);const record={id:procedure.id,label:procedure.label,hours:procedure.hours,spares:procedure.spares,at:state.time.missionHours};model.maintenance.completed.unshift(record);model.maintenance.completed=model.maintenance.completed.slice(0,20);model.lastProcedure=record;tickDetailedSystems(state,0);return {ok:true,procedure,record,snapshot:detailedSystemsSnapshot(state)} }
