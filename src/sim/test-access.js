import {createInitialState} from "../core/store.js";
import {createDefaultFlightState} from "./flight-dynamics.js";
import {selectNavigationTarget,lockNavigationRoute} from "./interplanetary.js";
import {recalculate} from "./simulation.js";

export const testAccessPoints=[
  {id:"countdown",route:"countdown",label:"Contagem regressiva",detail:"GO / NO-GO, autorização, vídeo e entrada na cabine."},
  {id:"launch",route:"flight",label:"Cabine antes da ignição",detail:"Começa no solo para testar tutorial, visão, ignição e ascensão."},
  {id:"orbit",route:"flight",label:"Órbita terrestre",detail:"Pula a subida e abre conselho, instrumentos e nó de circularização."},
  {id:"map",route:"flight",label:"Mapa GPS e partida",detail:"Órbita circular pronta; escolha qualquer planeta e trace a rota."},
  {id:"cruise",route:"cruise",label:"Cruzeiro para Marte",detail:"Rota assinada e partida concluída para testar tudo após a Terra."}
];

const roster={command:"amara",flight:"jun",engineering:"elias",medical:"asha",science:"malik",operations:"lena"};
const orbitRecord=(type,label,deltaVMps=0)=>({id:`TEST-${type}`,type,label,description:"Marco preparado pelo acesso de teste.",deltaVMps,executedAt:0,propellantUsedKg:0,remainingKg:14000});

function certifiedBase(current,data,crewOps,seed){
  const state=createInitialState(seed,"test");
  state.profile=structuredClone(current?.profile||state.profile);
  state.profile.directorName=current?.profile?.directorName||"Diretor de teste";
  state.profile.difficulty="test";
  state.meta.testMode={enabled:true,isolatedSave:true,unlimitedBudget:true,createdAt:new Date().toISOString()};
  state.economy.available=999999;
  state.economy.contingency=999999;
  state.agency.support=100;
  state.agency.politicalCapital=100;
  state.ship.design={propulsion:"nuclear",habitat:"compact",power:"fission",shield:"light"};
  state.engineering.locked=["propulsion","habitat","power","shield"];
  state.engineering.drafts=structuredClone(state.ship.design);
  state.mission.testsCompleted=data.tests.map(test=>test.id);
  state.mission.testGain=32;
  state.crew.assignments=structuredClone(roster);
  state.crew.interviewed=[...new Set(Object.values(roster))];
  state.crew.trainingModules=crewOps.training.map(module=>module.id);
  state.crew.training=state.crew.trainingModules.length;
  state.crew.legacyCertified=true;
  state.crew.fatigue=Object.fromEntries(Object.values(roster).map(id=>[id,0]));
  state.crew.morale=92;
  state.crew.trust=94;
  state.campaign.prologueStep=99;
  state.campaign.flags.briefing=true;
  state.campaign.flags.videoSeen=true;
  state.campaign.turn=900;
  state.logs.events.unshift({at:0,type:"test",message:"Acesso provisório de teste criado. A campanha principal permanece isolada."});
  return recalculate(state,data,crewOps);
}

function prepareOrbit(state,{circularized=false,departed=false}={}){
  state.campaign.flags.launched=true;
  state.mission.flight6d=createDefaultFlightState();
  state.mission.flight6d.status="orbit";
  state.mission.flight6d.paused=true;
  state.mission.flight6d.objectives={liftoff:true,maxQ:true,separation:true,karman:true,orbit:true};
  state.mission.orbit.status=circularized?"parking":"insertion";
  state.mission.orbit.periapsisKm=circularized?220:168;
  state.mission.orbit.apoapsisKm=220;
  state.mission.orbit.executed=circularized?[orbitRecord("circularize","Circularização de teste",92)]:[];
  if(departed){state.mission.orbit.status="departure";state.mission.orbit.executed.push(orbitRecord("departure","Partida de teste",1181))}
}

function resolveTestCouncil(state){
  state.mission.commandCouncil.resolved=[
    {briefId:"orbit-doctrine",choiceId:"independent",choice:"Auditoria técnica independente",at:0},
    {briefId:"reserve-policy",choiceId:"expedition",choice:"Reserva integral da expedição",at:0},
    {briefId:"crew-authority",choiceId:"captain",choice:"Autonomia do capitão",at:0}
  ];
}

export function createTestAccessState(current,scenarioId,{data,crewOps,solarData,seed=`TESTE-${scenarioId.toUpperCase()}-ARK01`}={}){
  const scenario=testAccessPoints.find(point=>point.id===scenarioId)||testAccessPoints[0],state=certifiedBase(current,data,crewOps,seed);
  state.meta.testMode.scenario=scenario.id;
  state.ui.route=scenario.route;
  state.ui.tutorialEnabled=true;
  state.campaign.act=scenario.id==="countdown"?4:scenario.id==="cruise"?6:5;
  state.mission.phase=scenario.id==="countdown"?"go-no-go":"voo";
  state.mission.flightStage=0;
  state.mission.flight6d=createDefaultFlightState();

  if(scenario.id==="launch")state.campaign.flags.launched=true;
  if(scenario.id==="orbit"){
    prepareOrbit(state);
    state.mission.flightStage=3;
  }
  if(scenario.id==="map"){
    prepareOrbit(state,{circularized:true});
    resolveTestCouncil(state);
    state.mission.flightStage=4;
    selectNavigationTarget(state,solarData,"mars");
  }
  if(scenario.id==="cruise"){
    prepareOrbit(state,{circularized:true,departed:true});
    resolveTestCouncil(state);
    state.mission.flightStage=4;
    selectNavigationTarget(state,solarData,"mars");
    lockNavigationRoute(state);
    state.mission.phase="cruzeiro";
    state.mission.route.target="mars";
    state.mission.route.progress=1;
    state.mission.navigation.progress=1;
  }
  state.logs.events.unshift({at:state.time.missionHours,type:"test",message:`Ponto de teste carregado: ${scenario.label}.`});
  return recalculate(state,data,crewOps);
}
