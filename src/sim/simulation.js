import { pick, roll } from "../core/rng.js";

const clamp = (n,min=0,max=100)=>Math.max(min,Math.min(max,n));
export { clamp };

export function recalculate(state, data) {
  state.engineering ||= {active:0,drafts:{},locked:[],consulted:[],history:[],revisionCount:0};
  const chosen = Object.entries(state.ship.design).map(([category,id]) => data.components[category]?.find(c=>c.id===id)).filter(Boolean);
  const baseMass = 18400;
  state.ship.mass.total = Math.round(baseMass + chosen.reduce((sum,c)=>sum+(c.mass||0),0));
  const generation = chosen.reduce((sum,c)=>sum+Math.max(0,c.power||0),0);
  const loads = 320 + chosen.reduce((sum,c)=>sum+Math.abs(Math.min(0,c.power||0)),0);
  state.systems.power.generationKw = generation;
  state.systems.power.loadKw = loads;
  state.ship.powerMargin = generation-loads;
  state.ship.thermalMargin = 60 + chosen.reduce((sum,c)=>sum+(c.thermal||0),0);
  state.systems.thermal.radiatorMargin = state.ship.thermalMargin;
  state.ship.deltaV = chosen.reduce((sum,c)=>sum+(c.deltaV||0),0);
  state.ship.capacity = chosen.reduce((n,c)=>Math.max(n,c.capacity||0),0);
  const chosenReliability = chosen.reduce((sum,c)=>sum+(c.reliability||0),0);
  state.ship.reliability = clamp(57 + chosen.length*4 + chosenReliability + state.mission.checklists.tests*0 + (state.mission.testGain||0),5,99.5);
  state.ship.designValid = Object.values(state.ship.design).every(Boolean) && state.ship.mass.total<=state.ship.mass.limit && state.ship.powerMargin>=80 && state.ship.thermalMargin>=5 && state.ship.deltaV>=2000;
  state.mission.checklists.design = state.ship.designValid;
  state.mission.checklists.crew = state.crew.members.length>=6;
  state.mission.checklists.tests = (state.mission.testsCompleted?.length||0)>=4;
  state.crew.morale = clamp(state.crew.morale);
  state.crew.trust = clamp(state.crew.trust);
  state.agency.support = clamp(state.agency.support);
  state.agency.politicalCapital = clamp(state.agency.politicalCapital);
  state.ship.integrity = clamp(state.ship.integrity);
  state.systems.lifeSupport.waterPercent = clamp(state.systems.lifeSupport.waterPercent);
  state.systems.power.batterySoc = clamp(state.systems.power.batterySoc);
  state.science.points = Math.max(0,state.science.points);
  state.colony.resources.power = Math.round(50 + state.colony.buildings.reduce((n,id)=>n+(data.buildings.find(b=>b.id===id)?.power||0),0));
  return state;
}

export function commitEngineeringDecision(state,data,session,option){
  state.engineering ||= {active:0,drafts:{},locked:[],consulted:[],history:[],revisionCount:0};
  if(state.engineering.locked.includes(session.id))return {ok:false,reason:"Esta decisão já foi comprometida."};
  const component=data.components[session.id]?.find(item=>item.id===option.componentId);
  if(!component)return {ok:false,reason:"Proposta de engenharia inválida."};
  if(state.economy.available<component.cost)return {ok:false,reason:"Orçamento insuficiente para comprometer esta proposta."};
  if(state.agency.politicalCapital+(option.influence||0)<0)return {ok:false,reason:"Capital político insuficiente para obter autorização."};
  state.economy.available-=component.cost;
  state.economy.committed+=component.cost;
  state.time.earthDate+=option.days||0;
  state.agency.politicalCapital+=option.influence||0;
  state.crew.trust+=option.trust||0;
  state.crew.morale+=option.morale||0;
  state.ship.design[session.id]=component.id;
  state.engineering.drafts[session.id]=component.id;
  state.engineering.locked.push(session.id);
  state.engineering.history.push({category:session.id,componentId:component.id,cost:component.cost,days:option.days||0,influence:option.influence||0,turn:state.campaign.turn||1});
  state.campaign.decisions.push({title:session.label,detail:`${component.name}; ${component.cost} bi; ${option.days||0} dias; influência ${option.influence>=0?"+":""}${option.influence||0}`});
  return {ok:true,component};
}

export function reopenEngineeringDecision(state,category){
  state.engineering ||= {active:0,drafts:{},locked:[],consulted:[],history:[],revisionCount:0};
  if(!state.engineering.locked.includes(category))return {ok:false,reason:"Este sistema ainda não foi comprometido."};
  const cost=3,days=18,influence=2;
  if(state.economy.available<cost)return {ok:false,reason:"Orçamento insuficiente para abrir uma revisão."};
  if(state.agency.politicalCapital<influence)return {ok:false,reason:"Influência insuficiente para reabrir o contrato."};
  state.economy.available-=cost;state.economy.committed+=cost;state.time.earthDate+=days;state.agency.politicalCapital-=influence;state.crew.trust-=2;
  state.ship.design[category]=null;delete state.engineering.drafts[category];state.engineering.locked=state.engineering.locked.filter(id=>id!==category);state.engineering.revisionCount++;
  state.engineering.history.push({category,revision:true,cost,days,influence:-influence,turn:state.campaign.turn||1});
  return {ok:true,cost,days};
}

export function completeTest(state, test) {
  state.mission.testsCompleted ||= [];
  if (state.mission.testsCompleted.includes(test.id)) return false;
  if (state.economy.available < test.cost) return false;
  state.economy.available -= test.cost;
  state.economy.committed += test.cost;
  state.time.earthDate += test.days;
  state.mission.testGain = (state.mission.testGain||0)+test.gain;
  state.mission.testsCompleted.push(test.id);
  const defect = roll(state) < .38;
  if(defect){state.ship.risks.push({id:`R-${test.id}`,system:test.risk,severity:"mitigado",cause:`Desvio detectado em ${test.name}`});state.mission.testGain += 2;}
  return defect;
}

export function simulateLaunch(state) {
  const risk = clamp(100-state.ship.reliability + (state.mission.checklists.tests?0:12) + (state.ship.designValid?0:30),2,80);
  const failed = roll(state,0,100)<risk;
  state.campaign.flags.launched = !failed;
  state.mission.phase = failed?"abortagem":"cruzeiro";
  state.systems.propulsion.fuelPct -= failed?4:18;
  state.time.missionHours += failed?1:42;
  if(failed){
    state.ship.integrity -= 18; state.agency.support -= 12; state.crew.trust -= 8;
    state.logs.failures.unshift({cause:"Divergência de pressão na turbobomba",factors:["margem de teste","desgaste de ignição"],symptoms:["empuxo assimétrico","temperatura crescente"],propagation:"Vibração para estrutura primária",detection:"Votação de sensores P-3/P-4",mitigation:"Abortagem e separação segura"});
  } else { state.agency.support += 8; state.crew.trust += 5; }
  return {failed,risk};
}

export function advanceCruise(state, data) {
  const years = 1;
  state.time.missionHours += 8760*years;
  state.mission.route.progress = clamp(state.mission.route.progress+24);
  state.systems.lifeSupport.waterPercent -= 5.2;
  state.systems.lifeSupport.foodDays -= 310;
  state.systems.propulsion.fuelPct -= 2.6;
  state.crew.morale -= 3.5;
  state.crew.health.average = clamp(state.crew.health.average-1.8);
  const event = pick(state,data.events.filter(e=>e.id!==state.ui.lastEvent));
  state.ui.lastEvent = event.id;
  if(state.mission.route.progress>=96){state.mission.route.progress=100;state.campaign.flags.arrived=true;}
  return event;
}

export function applyEventChoice(state, choice) {
  state.crew.morale += choice.morale||0; state.crew.trust += choice.trust||0; state.ship.integrity += choice.integrity||0;
  state.science.points += choice.science||0; state.time.earthDate += choice.schedule||0;
}

export function scanPlanet(state, planet) {
  const previous = state.science.targets[planet.id]?.confidence||0;
  const confidence = clamp(previous+34,0,100);
  const raw = (planet.water+planet.temp+planet.gravity+planet.radiation+(100-planet.biology))/5;
  state.science.targets[planet.id] = {confidence,habitability:Math.round(raw*confidence/100),probes:(state.science.targets[planet.id]?.probes||0)+1};
  state.science.points += 8;
  return state.science.targets[planet.id];
}

export function buildColony(state, building) {
  if(state.colony.buildings.includes(building.id)||state.colony.resources.materials<building.cost||state.colony.resources.labor<building.labor)return false;
  state.colony.resources.materials -= building.cost; state.colony.resources.labor -= building.labor; state.colony.buildings.push(building.id);
  if(building.id==="water-extractor") state.colony.resources.water+=24;
  if(building.id==="colony-greenhouse") {state.colony.resources.food+=28;state.crew.morale+=4;}
  if(building.id==="clinic") state.colony.population.health+=8;
  if(building.id==="surface-hab") {state.colony.founded=true;state.colony.population.total=state.ship.capacity||80;}
  return true;
}

export function endingFor(state) {
  const b = state.colony.buildings.length, confidence = state.science.targets[state.mission.route.target]?.confidence||0;
  const ethics = state.campaign.endingScore.ethics||50;
  const survival = clamp(b*13 + state.ship.integrity*.25 + state.crew.morale*.25);
  const autonomy = clamp(b*12 + (state.colony.research.length*14));
  const contact = state.campaign.flags.contact;
  let id="pyrrhic",title="Vitória Pírrica",body="A humanidade alcançou outro mundo, mas cada margem ausente será paga pelas próximas gerações.";
  if(contact){id="contact";title="Contato";body="O sinal responde. Sobreviver deixa de ser apenas atravessar o vazio: agora significa aprender a coexistir com algo impossível de ignorar.";}
  else if(state.colony.governance.policy==="independent"&&autonomy>65){id="two";title="Duas Humanidades";body="A colônia encerra a tutela terrestre. A distância deixa de ser uma perda e se torna a fronteira de uma civilização própria.";}
  else if(b>=5&&survival>=78&&confidence>=68){id="dawn";title="Novo Amanhecer";body="Os ciclos se fecham, as crianças aprendem sob outro céu e a comunicação com a Terra permanece viva. PROJECT HAVEN se torna uma ponte, não uma fuga.";}
  else if(state.mission.route.target==="aurelia"&&confidence<55){id="toxic";title="Paraíso Tóxico";body="A química que parecia vida compatível revela um ecossistema invasivo. A beleza da superfície não compensou a incerteza ignorada.";}
  else if(!state.colony.founded){id="silent";title="Arca Silenciosa";body="A ARK-01 permanece habitável, mas nenhum solo oferece segurança suficiente. O horizonte continua distante e os recursos são finitos.";}
  return {id,title,body,scores:{survival:Math.round(survival),ethics,science:state.science.points,autonomy}};
}
