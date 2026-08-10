import {AU_KM,planetaryPositions,distanceBetween,missionDate} from "./solar-system.js";

const AU_M=AU_KM*1000;
const SUN_MU=1.32712440018e20;
const EARTH_MU=3.986004418e14;
const EARTH_RADIUS_M=6378137;
const DAY_S=86400;
const wrap180=value=>((value+180)%360+360)%360-180;
const suitability={mercury:{score:8,label:"EXTREMO",warning:"Radiação e variação térmica tornam a permanência humana crítica."},venus:{score:3,label:"INÓSPITO",warning:"Pressão e temperatura de superfície excedem qualquer habitat tripulado atual."},mars:{score:54,label:"CANDIDATO",warning:"Atmosfera tênue, radiação e baixa gravidade exigem habitat fechado."},jupiter:{score:0,label:"GIGANTE GASOSO",warning:"Não há superfície sólida; a rota só pode usar órbita ou luas."},saturn:{score:0,label:"GIGANTE GASOSO",warning:"Não há superfície sólida; considere órbita ou uma lua."},uranus:{score:0,label:"GIGANTE DE GELO",warning:"Trânsito muito longo e ausência de superfície acessível."},neptune:{score:0,label:"GIGANTE DE GELO",warning:"Distância extrema e ausência de superfície acessível."}};

export function createNavigationState(){return {version:1,selectedBody:null,locked:false,progress:0,controlMode:"command",route:null,orders:[],lastAdvisor:null}}
export function ensureNavigationState(state){state.mission||={};state.mission.navigation||=createNavigationState();const nav=state.mission.navigation,base=createNavigationState();for(const [key,value] of Object.entries(base))if(nav[key]===undefined)nav[key]=structuredClone(value);nav.orders||=[];return nav}

export function estimateInterplanetaryRoute(state,solarData,targetId,date=missionDate(state)){
  const positions=planetaryPositions(date,solarData),earth=positions.find(body=>body.id==="earth"),target=positions.find(body=>body.id===targetId);if(!earth||!target||target.id==="earth")return null;
  const separationAu=distanceBetween(earth,target),r1=earth.distanceAu*AU_M,r2=target.distanceAu*AU_M,transferA=(r1+r2)/2,transferSeconds=Math.PI*Math.sqrt(transferA**3/SUN_MU),transferDays=transferSeconds/DAY_S;
  const circular1=Math.sqrt(SUN_MU/r1),transferV1=Math.sqrt(SUN_MU*(2/r1-1/transferA)),hyperbolicExcess=Math.abs(transferV1-circular1),parkingRadius=EARTH_RADIUS_M+220000,parkingSpeed=Math.sqrt(EARTH_MU/parkingRadius),injectionSpeed=Math.sqrt(hyperbolicExcess**2+2*EARTH_MU/parkingRadius),departureDvMps=Math.max(0,injectionSpeed-parkingSpeed);
  const targetMeanMotion=Math.sqrt(SUN_MU/r2**3),requiredPhaseDeg=wrap180(180-targetMeanMotion*transferSeconds*180/Math.PI),actualPhaseDeg=wrap180(target.longitudeDeg-earth.longitudeDeg),phaseErrorDeg=Math.abs(wrap180(actualPhaseDeg-requiredPhaseDeg)),windowQuality=Math.max(0,Math.round(100-phaseErrorDeg/1.8));
  const profile=suitability[target.id]||{score:25,label:"RISCO DESCONHECIDO",warning:"Ambiente exige reconhecimento robótico antes de qualquer aproximação tripulada."},cruiseSpeedKmS=separationAu*AU_KM/(transferDays*DAY_S);
  return {targetId:target.id,targetName:target.name,dateIso:new Date(date).toISOString(),separationAu,separationKm:separationAu*AU_KM,transferDays,transferYears:transferDays/365.25,departureDvMps,hyperbolicExcessMps:hyperbolicExcess,cruiseSpeedKmS,requiredPhaseDeg,actualPhaseDeg,phaseErrorDeg,windowQuality,suitability:profile.score,suitabilityLabel:profile.label,warning:profile.warning,earth:{x:earth.x,y:earth.y,z:earth.z},target:{x:target.x,y:target.y,z:target.z,distanceAu:target.distanceAu,color:target.color}};
}

export function selectNavigationTarget(state,solarData,targetId){const nav=ensureNavigationState(state),route=estimateInterplanetaryRoute(state,solarData,targetId);if(!route)return {ok:false,reason:"Selecione um planeta diferente da Terra."};nav.selectedBody=targetId;nav.route=route;nav.locked=false;nav.progress=0;nav.lastAdvisor=route.warning;return {ok:true,route}}
export function lockNavigationRoute(state){const nav=ensureNavigationState(state);if(!nav.route)return {ok:false,reason:"Selecione um planeta e analise a transferência."};nav.locked=true;nav.orders.push({type:"route-lock",target:nav.route.targetId,at:state.time?.missionHours||0});state.campaign?.decisions?.push({title:"Rota interplanetária",detail:`${nav.route.targetName}; ${nav.route.transferDays.toFixed(0)} dias; Δv ${nav.route.departureDvMps.toFixed(0)} m/s`});return {ok:true,route:nav.route}}
export function setNavigationControlMode(state,mode){const nav=ensureNavigationState(state);nav.controlMode=mode==="manual"?"manual":"command";return nav.controlMode}

