import { hashSeed } from "./rng.js";
import { createDefaultFlightState } from "../sim/flight-dynamics.js";
import { createOperationsState } from "../sim/mission-operations.js";
import { createRendezvousState } from "../sim/rendezvous.js";

export function createInitialState(seed = "HAVEN-2047", mode = "campaign") {
  const now = new Date().toISOString();
  return {
    meta:{saveVersion:11,build:"2026.08.07-free-rendezvous-lab",seed,createdAt:now,lastSavedAt:now,rngState:hashSeed(seed)},
    profile:{directorName:"Diretor(a)",avatarId:"AVT-DIR-001",difficulty:"standard",language:"pt-BR",accessibility:{reduceMotion:false,highContrast:false,largeText:false,colorblind:false},audio:true},
    campaign:{mode,act:0,turn:1,prologueStep:0,visited:[],sceneId:"prologue",flags:{briefing:false,publicPolicy:null,launched:false,arrived:false,landed:false},decisions:[],endingScore:{}},
    time:{earthDate:0,missionHours:0,speed:1,paused:false},
    economy:{available:118,committed:0,contingency:18,contracts:[],cashFlow:[]},
    agency:{support:46,politicalCapital:52,departments:{},staff:[],inbox:[]},
    engineering:{active:0,drafts:{},locked:[],consulted:[],history:[],revisionCount:0,recoveryCount:0},
    ship:{design:{propulsion:null,habitat:null,power:null,shield:null},mass:{total:18400,limit:43000},powerMargin:0,thermalMargin:32,deltaV:0,capacity:0,requirements:{},risks:[],rooms:{},integrity:100},
    systems:{propulsion:{fuelPct:100,thrustPct:0,temperature:280},power:{generationKw:0,loadKw:440,batterySoc:100},thermal:{cabinTemp:22,coreTemp:460,radiatorMargin:32},lifeSupport:{cabinPressure:101.3,oxygenPercent:21.0,co2ppm:620,waterPercent:100,foodDays:1680},avionics:{status:"nominal"},comms:{linkQuality:100}},
    crew:{members:[],assignments:{command:null,flight:null,engineering:null,medical:null,science:null,operations:null},activeStation:"command",interviewed:[],morale:72,trust:64,cohesion:70,fatigue:{},health:{average:91},relationships:[],training:0,trainingModules:[],legacyCertified:false},
    mission:{phase:"planejamento",flightStage:0,flight6d:createDefaultFlightState(),rendezvous:createRendezvousState(seed),rendezvousHistory:[],route:{target:null,site:null,progress:0},checklists:{design:false,tests:false,crew:false,go:false},telemetry:[],alerts:[],orbit:{body:"Terra",status:"insertion",periapsisKm:168,apoapsisKm:220,inclinationDeg:28.5,meanAnomalyDeg:158,elapsedSeconds:0,propellantKg:14000,initialPropellantKg:14000,plannedNode:null,executed:[],windowToleranceDeg:6,lastBurn:null}},
    operations:createOperationsState(seed),
    cinematics:{played:[],voicePlayed:[],enabled:true},
    astronomy:{view:"earth",dateIso:"2047-01-01T12:00:00.000Z",selectedBody:"earth",launchSite:"alcantara",scale:"log"},
    science:{points:0,targets:{},observations:[],samples:[],confidence:{}},
    colony:{founded:false,resources:{materials:92,power:0,water:38,food:42,labor:100},buildings:[],population:{total:0,health:80},governance:{policy:null},research:[]},
    logs:{events:[{at:0,type:"system",message:"Estado da missão criado. Seed registrada: "+seed}],failures:[],investigations:[],memorial:[]},
    ui:{route:"prologue",auraConfidence:86,lastEvent:null,tutorialEnabled:true,advisorMessage:null,simFailure:null}
  };
}

export function createStore(initialState, recalculate) {
  let state = structuredClone(initialState);
  const listeners = new Set();
  const notify = () => listeners.forEach(fn => fn(state));
  return {
    getState:()=>state,
    replace(next){ state = recalculate(structuredClone(next)); notify(); },
    update(mutator, reason="Atualização de estado") {
      const next = structuredClone(state);
      mutator(next);
      next.logs.events.unshift({at:next.time.missionHours,type:"decision",message:reason});
      next.logs.events = next.logs.events.slice(0,80);
      state = recalculate(next);
      notify();
    },
    subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)}
  };
}
