export const flightTrainingSteps=[
  {id:"ignition",target:"[data-six-ignite]",kicker:"01 · AUTORIZAÇÃO",title:"Autorize a ignição e a decolagem",body:"Toque no botão verde. Jun Park executará o perfil nominal; como comandante, você acompanha os instrumentos e mantém a autoridade para abortar.",threshold:"Decolagem confirmada quando a altitude ultrapassar 3 metros."},
  {id:"look",target:"[data-flight-viewport]",kicker:"02 · VISÃO LIVRE",title:"Mova a visão dentro da cabine",body:"Arraste o dedo ou o mouse no para-brisa. O céu, as nuvens, o Sol e a torre devem se deslocar enquanto os graus de visão mudam. CENTRALIZAR retorna a 0° / 0°.",threshold:"Faça um gesto de pelo menos 12 pixels para validar a câmera."},
  {id:"roles",target:".command-authority",kicker:"03 · AUTORIDADE",title:"Escolha comandante ou pilotagem direta",body:"No modo comandante, Jun controla atitude, potência e separação. ASSUMIR CONTROLE libera pitch, yaw, roll e throttle; você pode devolver o voo à tripulação a qualquer momento.",threshold:"O modo comandante é o perfil seguro para a primeira subida."},
  {id:"separation",target:"[data-six-separate]",kicker:"04 · PRIMEIRO ESTÁGIO",title:"Acompanhe Max-Q e a separação",body:"Max-Q não ocorre em uma altitude fixa: ele depende da densidade do ar e da velocidade. No perfil nominal aparece perto de T+48 s / 6,6 km. A separação do booster B1 ocorre perto de T+82 s / 20,6 km.",threshold:"Isto é separação de estágio, não acoplagem. No modo comandante ela é automática."},
  {id:"karman",target:"[data-six-alt]",kicker:"05 · FRONTEIRA ESPACIAL",title:"Cruze a linha de Kármán",body:"A referência internacional do simulador é 100 km. Depois dela, o segundo estágio continua elevando o apoastro; estar no espaço ainda não significa estar em órbita estável.",threshold:"Meta atual: altitude ≥ 100 km."},
  {id:"orbit",target:"[data-six-orbit]",kicker:"06 · INSERÇÃO ORBITAL",title:"Confirme a órbita e abra a navegação",body:"A inserção exige altitude mínima de 155 km, velocidade inercial de pelo menos 7.550 m/s, periastro seguro e velocidade vertical controlada. No perfil nominal a estabilização acontece perto de 185 km.",threshold:"Quando o botão liberar, assuma a navegação orbital e trace a rota no mapa GPS."}
];

export function createFlightTrainingState(){return {version:1,status:"active",step:0,lookMoved:false,firstMission:true}}

export function ensureFlightTrainingState(state){
  state.mission||={};state.mission.flightTraining||=createFlightTrainingState();const training=state.mission.flightTraining,base=createFlightTrainingState();
  for(const [key,value] of Object.entries(base))if(training[key]===undefined)training[key]=structuredClone(value);
  training.step=Math.max(0,Math.min(flightTrainingSteps.length-1,Number(training.step)||0));
  if(!["active","completed","skipped"].includes(training.status))training.status="active";
  return training;
}

export function flightTrainingSnapshot(flight,telemetry,training){
  const index=Math.max(0,Math.min(flightTrainingSteps.length-1,Number(training?.step)||0)),step=flightTrainingSteps[index];let ready=false,live="";
  if(step.id==="ignition"){ready=flight.status!=="prelaunch";live=ready?`Decolagem autorizada · T+${Math.floor(flight.elapsedS)} s`:"Aguardando sua autorização de ignição."}
  if(step.id==="look"){ready=!!training.lookMoved;live=ready?"Gesto reconhecido. A visão livre está respondendo.":"Arraste sobre o para-brisa para testar a visão."}
  if(step.id==="roles"){ready=true;live=flight.controlMode==="manual"?"Pilotagem direta ativa.":"Jun Park está pilotando sob suas ordens."}
  if(step.id==="separation"){ready=!!flight.stageSeparated;live=ready?`Booster B1 separado em T+${Math.floor(flight.elapsedS)} s · ${telemetry.altitudeKm.toFixed(1)} km`:`T+${Math.floor(flight.elapsedS)} s · ${telemetry.altitudeKm.toFixed(1)} km · pressão dinâmica ${(telemetry.dynamicPressurePa/1000).toFixed(1)} kPa`}
  if(step.id==="karman"){ready=!!flight.objectives?.karman;live=ready?`Linha de Kármán cruzada · ${telemetry.altitudeKm.toFixed(1)} km`:`Faltam ${Math.max(0,100-telemetry.altitudeKm).toFixed(1)} km para a linha de Kármán.`}
  if(step.id==="orbit"){ready=flight.status==="orbit";live=ready?`Órbita confirmada · ${telemetry.altitudeKm.toFixed(1)} km · ${telemetry.inertialSpeedMps.toFixed(0)} m/s inercial`:`${telemetry.altitudeKm.toFixed(1)} km · ${telemetry.inertialSpeedMps.toFixed(0)} / 7550 m/s inercial · periastro ${Number.isFinite(telemetry.orbit.periapsisKm)?telemetry.orbit.periapsisKm.toFixed(0):"aberto"} km`}
  return {index,step,ready,live,last:index===flightTrainingSteps.length-1};
}

export function advanceFlightTraining(state,flight,direction=1){const training=ensureFlightTrainingState(state);if(training.status!=="active")return training;if(direction<0){training.step=Math.max(0,training.step-1);return training}if(training.step<flightTrainingSteps.length-1)training.step++;else if(flight.status==="orbit")training.status="completed";return training}
export function skipFlightTraining(state){const training=ensureFlightTrainingState(state);training.status="skipped";return training}
export function resetActiveFlightTraining(state){const training=ensureFlightTrainingState(state);if(training.status==="active")Object.assign(training,createFlightTrainingState());return training}
