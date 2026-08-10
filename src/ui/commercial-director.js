const routeIndex={agency:0,design:1,testing:2,crew:3,countdown:4,flight:5,cruise:6,science:7,landing:8,colony:9,governance:10,memorial:11};
const phaseNames=["MANDATO","ARQUITETURA","EVIDÊNCIA","TRIPULAÇÃO","GO / NO-GO","ASCENSÃO","TRÂNSITO","RECONHECIMENTO","EDL","ASSENTAMENTO","LEGADO","EPÍLOGO"];

function objective(state,route){
  if(route==="agency")return "Defina o mandato público que financiará a ARK-01.";
  if(route==="design")return `Assine os sistemas da nave · ${state.engineering?.locked?.length||0}/4 revisões concluídas.`;
  if(route==="testing")return `Compre evidência suficiente · ${state.mission?.testsCompleted?.length||0} campanhas executadas.`;
  if(route==="crew")return `Preencha seis estações e conclua três exercícios · ${state.crew?.members?.length||0}/6 designados.`;
  if(route==="countdown")return "Leia o risco causal e assuma a responsabilidade pelo lançamento.";
  if(route==="flight"){const stage=state.mission?.flightStage||0;return stage<3?"Siga Jun Park até a inserção orbital; pilote apenas se desejar.":stage<4?"Circularize a órbita e responda ao primeiro conselho.":"Escolha um planeta real, assine a rota e execute a partida."}
  if(route==="cruise")return state.mission?.deepSpace?.current?"Decisão prioritária aberta na ponte: o tempo está pausado.":"Propague uma vigília, mantenha sistemas e preserve a tripulação.";
  if(route==="science")return "Transforme sinais em evidência antes de comprometer a descida.";
  if(route==="landing")return "Escolha o risco de superfície e execute a sequência EDL.";
  if(route==="colony")return "Feche energia, água, ar e alimento antes de declarar a colônia.";
  if(route==="governance")return "Defina quem terá autoridade sobre a nova humanidade.";
  return "Revise o custo humano e técnico desta linha temporal.";
}

export function commercialMissionRail(state,route){const index=routeIndex[route]??0,progress=Math.round(index/(phaseNames.length-1)*100);return `<section class="commercial-mission-rail"><div class="commercial-mission-id"><span>MISSÃO COMERCIAL 01</span><b>PROJECT HAVEN · ARK-01</b></div><div class="commercial-objective"><span>OBJETIVO ATUAL · ${phaseNames[index]}</span><b>${objective(state,route)}</b><i style="--value:${progress}%"></i></div><div class="commercial-stage"><span>FASE</span><b>${String(index+1).padStart(2,"0")}/${phaseNames.length}</b><button data-codex>ABRIR CÓDICE</button></div></section>`}

export function missionCodexView(state){const nav=state.mission?.navigation,systems=state.mission?.systemsModel,decisions=state.campaign?.decisions||[];const entries=[
  ["Comando ou pilotagem","No modo Comandante, Jun executa guidance e separação. Assumir controle transfere pitch, yaw, roll e throttle ao jogador; ambos usam a mesma física."],
  ["Max-Q e separação","Max-Q é o pico de pressão dinâmica. A separação B1 ocorre quando o primeiro estágio esgota sua margem; o tutorial da primeira missão acompanha a telemetria real."],
  ["Órbita e nós","Circularização, correções e partida usam vis-viva, janelas angulares e equação do foguete. Uma rota real precisa ser assinada antes da partida."],
  ["GPS heliocêntrico",`O mapa usa elementos JPL e a data da missão. ${nav?.route?`Rota atual: ${nav.route.targetName}, ${nav.route.transferDays.toFixed(0)} dias nominais.`:"Nenhuma rota ativa."}`],
  ["Sistemas persistentes",systems?`Elétrica, térmica, ECLSS e navegação acumulam desgaste. Restam ${Math.floor(systems.maintenance.spares)} peças.`:"O gêmeo digital será ativado no cruzeiro."],
  ["Decisões e reputação",`${decisions.length} decisões permanentes estão registradas. Apoio, confiança, moral, risco e reputação alteram eventos e contratos futuros.`],
  ["Saves e recuperação","O jogo mantém autosave, slots, checksum e migrações. Falhas de vídeo, WebGL, orçamento ou combustível possuem rotas de recuperação."],
  ["Controles móveis","Use paisagem. Arraste o visor para olhar; toque nos eixos para controle manual. O modo Comandante é recomendado na primeira missão."]
];return `<div class="eyebrow">CÓDICE OPERACIONAL · ARK-01</div><h2>Manual vivo da missão</h2><p class="muted">Pesquise física, controles, sistemas ou consequências. O conteúdo reflete o estado atual do seu save.</p><input class="codex-search" data-codex-search placeholder="Pesquisar no códice…" aria-label="Pesquisar no códice"><div class="codex-entries">${entries.map(([title,body])=>`<article data-codex-entry><h3>${title}</h3><p>${body}</p></article>`).join("")}</div>`}

