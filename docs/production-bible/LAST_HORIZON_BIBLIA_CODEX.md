# LAST HORIZON - BÍBLIA OFICIAL DE DESENVOLVIMENTO
**Subtítulo:** Global Space Agency Simulator  
**Agência:** GSEA - Global Space Exploration Agency  
**Programa:** PROJECT HAVEN  
**Nave:** ARK-01  
**Assistente:** AURA - Autonomous Unified Response Assistant  
**Versão:** 1.0 - 6 de agosto de 2026
Documento mestre para desenvolvimento no Codex, criação de imagens, controle de escopo, simulação, testes e publicação.
## 1. Regra de identidade
O jogo é uma obra fictícia inspirada em engenharia espacial. Não deve sugerir vínculo, aprovação ou parceria com a NASA. Toda identidade institucional será da GSEA.
## 2. Visão e pilares
| Pilar | Regra |
| --- | --- |
| Decisão com consequência | Toda escolha altera orçamento, prazo, massa, energia, calor, confiabilidade, apoio público, moral e sobrevivência. |
| Engenharia sistêmica | Nenhum componente é isolado. Um motor mais forte pode exigir tanque, estrutura, energia e refrigeração maiores. |
| Falhas explicáveis | Acidentes resultam de causas, sinais, propagação e decisões rastreáveis. Nunca de punição aleatória sem origem. |
| Cabine funcional | Fundos são imagens sem instrumentos incorporados. Ponteiros, telas, luzes e alarmes são SVG/HTML/Canvas ligados à simulação. |
| Campanha humana | A crise da Terra importa, mas a história é conduzida por pessoas, confiança, conflitos, luto, coragem e responsabilidade. |
| Ciência com incerteza | Planetas não recebem rótulo imediato de habitável. O jogador coleta evidências, mede confiança e aceita risco residual. |
| Mobile-first premium | PWA em orientação horizontal, leitura clara, controles por toque, desempenho em aparelhos medianos e suporte desktop. |
| Sem custo operacional inicial | HTML, CSS, JavaScript, IndexedDB, SVG, Canvas, Web Audio e GitHub Pages; APK futuro via Capacitor. |
| Rejogabilidade real | Sementes determinísticas, equipes, fornecedores, crises, falhas, planetas e finais variáveis. |
## 3. Modos de jogo
| Modo | Descrição |
| --- | --- |
| Campanha PROJECT HAVEN | Narrativa principal em dez atos, com ARK-01, personagens fixos e sistemas planetários planejados. |
| Expedição Infinita | Cenários procedurais por seed com orçamento, equipe, tecnologia, destino e condições ambientais variáveis. |
| Simulador de Sistemas | Laboratório livre para testar nave, cabine, falhas e procedimentos sem consequências na campanha. |
| Desafio Diário Offline | Desafio gerado localmente pela data do aparelho; não depende de servidor e não concede compras. |
| Museu e Memorial | Histórico de naves, missões, descobertas, tripulantes e causas de acidentes. |
## 4. Escopo técnico
- HTML5, CSS3 e JavaScript ES Modules.
- PWA offline e GitHub Pages.
- Orientação horizontal.
- IndexedDB para saves.
- SVG/HTML/Canvas para instrumentos.
- Web Audio API.
- APK futuro via Capacitor.
- Nenhuma dependência paga.
## 5. Campanha
| Ato | Conteúdo |
| --- | --- |
| Prólogo - O Último Prazo | Relatórios convergem para um colapso global. O jogador é nomeado diretor do PROJECT HAVEN. |
| Ato I - Agência em Cinzas | Reabrir instalações, contratar líderes, recuperar apoio e decidir o nível de transparência pública. |
| Ato II - A Nave Impossível | Definir arquitetura da ARK-01, capacidade humana, propulsão, energia, blindagem e módulos. |
| Ato III - O Preço da Pressa | Falhas aparecem nos testes enquanto governo e população pressionam pelo lançamento. |
| Ato IV - Contagem Regressiva | Go/no-go, clima, defeitos tardios, protestos, sabotagem possível e autoridade de abortagem. |
| Ato V - Além da Terra | Ascensão, órbita, montagem final, partida e a decisão de retornar ou prosseguir após a primeira crise. |
| Ato VI - Anos no Escuro | Consumo, manutenção, radiação, saúde, conflitos, nascimentos, mortes e isolamento. |
| Ato VII - Mundos Promissores | Sondas, espectros e amostras revelam candidatos com vantagens e ameaças ocultas. |
| Ato VIII - A Descida | Escolher planeta, local, carga, equipe e risco de pouso; possibilidade de permanecer na nave. |
| Ato IX - Primeiro Lar | Implantar energia, água, ar, alimento, medicina, governo e defesa ambiental. |
| Ato X - O Preço da Sobrevivência | A colônia decide sua relação com a Terra, AURA, outras formas de vida e futuras gerações. |
| Epílogo | O jogo calcula o legado por sobrevivência, ética, ciência, confiança, perdas, autonomia e futuro da Terra. |
### Finais
- Novo Amanhecer - colônia autossuficiente, comunicação preservada e nova migração possível.
- Arca Silenciosa - tripulação sobrevive na nave, sem planeta seguro e com recursos finitos.
- Duas Humanidades - a colônia rompe com a Terra e forma uma civilização independente.
- Retorno - sinais de recuperação terrestre tornam possível uma difícil viagem de volta.
- Êxodo Parcial - apenas parte da humanidade pode ser transferida, exigindo decisão ética.
- Vitória Pírrica - planeta habitável, mas perdas humanas e políticas tornam o sucesso amargo.
- Paraíso Tóxico - um risco biológico subestimado inviabiliza a superfície.
- AURA Regente - a autoridade acumulada da IA supera a liderança humana por decisões do jogador.
- Contato - inteligência extraterrestre altera o objetivo e a definição de sobrevivência.
- Última Transmissão - a missão falha, mas seus dados tornam possível uma segunda tentativa.
- Colapso no Lançamento - investigação demonstra uma cadeia de decisões evitáveis.
- Sem Testemunhas - a nave desaparece; somente registros fragmentados chegam à Terra.
## 6. Recursos globais
| ID | Recurso | Unidade | Regra |
| --- | --- | --- | --- |
| budget | Orçamento | créditos | Disponível, comprometido, contingência e fluxo futuro; nunca permitir gasto silencioso além do limite. |
| schedule | Prazo | dias | Afeta janela de lançamento, situação terrestre, contratos e pressão política. |
| mass | Massa integrada | kg | Soma de massa seca, propelente, carga, tripulação, água, alimento e reservas. |
| volume | Volume habitável/carga | m3 | Limita módulos, conforto, armazenamento e redundância. |
| power | Margem elétrica | kW | Geração disponível menos cargas críticas, operacionais e discricionárias. |
| thermal | Margem térmica | kW/% | Capacidade de rejeitar calor menos geração térmica atual. |
| deltaV | Reserva de delta-v | m/s | Define manobras, correções, abortos e pousos possíveis. |
| reliability | Confiabilidade integrada | 0-100% | Indicador de risco por sistema; não substitui lista de modos de falha. |
| support | Apoio público | 0-100 | Influencia financiamento, tolerância a atraso e recrutamento. |
| political | Capital político | 0-100 | Usado para renegociar prazo, revelar falha ou contrariar patrocinadores. |
| science | Conhecimento científico | 0-100 | Qualidade e quantidade de evidências sobre rota, planeta e biologia. |
| crewMorale | Moral da tripulação | 0-100 | Afeta desempenho, conflitos, recuperação, confiança e risco humano. |
| crewTrust | Confiança no diretor | 0-100 | Altera obediência, transparência e disposição para assumir risco. |
| earthStatus | Estado da Terra | 0-100 | Relógio narrativo de colapso, evacuação e possíveis finais. |
## 7. Departamentos
| ID | Departamento | Responsabilidade |
| --- | --- | --- |
| DEP-PRO | Propulsão | motores, propelentes, turbobombas, ignição, vetoração e manutenção |
| DEP-STR | Estruturas | massa, resistência, fadiga, vibração, vedação, blindagem e impactos |
| DEP-LSS | Suporte de Vida | O2, CO2, água, temperatura, umidade, resíduos e alimentos |
| DEP-PWR | Energia | reator, painéis, baterias, barramentos, prioridades e redundância |
| DEP-THM | Controle Térmico | radiadores, loops, dissipação, isolamento, congelamento e superaquecimento |
| DEP-AVN | Aviônicos e Navegação | computadores, sensores, software de voo, orientação e piloto automático |
| DEP-COM | Comunicações | antenas, largura de banda, atraso, perda de enlace e protocolos |
| DEP-SCI | Ciência Planetária | astronomia, atmosfera, geologia, oceanografia, biologia e habitabilidade |
| DEP-MED | Medicina e Fatores Humanos | saúde, radiação, sono, psicologia, ergonomia e desempenho |
| DEP-OPS | Operações de Missão | procedimentos, turnos, EVA, contingências, pouso e autoridade operacional |
| DEP-LOG | Logística e Colônia | carga, peças, fabricação, habitats, energia, construção e expansão |
| DEP-PRC | Compras e Contratos | fornecedores, qualidade, prazo, auditoria, multas e dependências |
| DEP-PUB | Relações Públicas | apoio popular, comunicação de acidentes, imprensa e governo |
| DEP-SEC | Segurança | controle de acesso, sabotagem, integridade de dados e investigação |
## 8. Funções humanas
| Função | Local | Responsabilidade |
| --- | --- | --- |
| Diretor do programa | Jogador | Autoridade final; pode delegar, pedir parecer, adiar, cancelar ou assumir risco. |
| Engenheiro-chefe | Terra/Nave | Integra requisitos, conflitos e riscos técnicos. |
| Diretor de voo | Terra | Comanda operações durante lançamento e voo. |
| Comandante | Nave | Autoridade humana a bordo; relação de confiança afeta decisões. |
| Piloto/Navegador | Nave | Manobras, pouso e controle de atitude. |
| Engenheiro de bordo | Nave | Diagnóstico, manutenção, energia, térmica e propulsão. |
| Médico | Nave/Colônia | Saúde, triagem, cirurgia, quarentena e protocolos. |
| Biólogo/Astrobiologista | Nave/Colônia | Vida, contaminação, cultivo e biossegurança. |
| Geólogo/Planetólogo | Nave/Colônia | solo, água, recursos, vulcanismo e local de pouso. |
| Especialista de missão | Nave | Sondas, robótica, EVA e experimentos. |
| Psicólogo de missão | Terra/Nave | Conflitos, fadiga, isolamento e coesão. |
| Técnico/Fabricador | Nave/Colônia | Reparo, impressão de peças, ferramentas e construção. |
## 9. Componentes
| ID | Categoria | Atributos |
| --- | --- | --- |
| COMP-ENG | Motor principal | empuxo, impulso específico, massa, calor, maturidade, reinicializações, custo |
| COMP-TNK | Tanques de propelente | capacidade, massa seca, isolamento, boil-off, vazamento, custo |
| COMP-RCS | Controle de atitude | precisão, redundância, propelente, manutenção, torque |
| COMP-STR | Estrutura primária | massa, limite de carga, fadiga, reparabilidade, módulos suportados |
| COMP-SHD | Blindagem | radiação, micrometeoritos, massa, cobertura, reparo |
| COMP-PWR | Fonte principal de energia | potência, combustível, vida útil, calor, risco, reinício |
| COMP-BAT | Baterias | capacidade, ciclos, massa, corrente máxima, risco térmico |
| COMP-THM | Radiadores e refrigeração | dissipação, área, redundância, vulnerabilidade, consumo |
| COMP-O2G | Geração de oxigênio | produção, consumo, manutenção, redundância, peças |
| COMP-CO2 | Remoção de CO2 | capacidade, filtros, regeneração, consumo, saturação |
| COMP-WAT | Reciclagem de água | taxa, pureza, perda, energia, manutenção |
| COMP-FOD | Alimento e cultivo | dias de estoque, rendimento, área, energia, água, risco biológico |
| COMP-AVN | Computadores de voo | desempenho, redundância, tolerância à radiação, compatibilidade |
| COMP-COM | Comunicações | alcance, potência, atraso, largura de banda, redundância |
| COMP-SEN | Sensores | precisão, frequência, ruído, falsos alertas, redundância |
| COMP-HAB | Habitat | capacidade, volume, pressão, isolamento, privacidade, massa |
| COMP-GRV | Gravidade artificial | raio, rotação, energia, massa, enjoo, manutenção |
| COMP-MED | Módulo médico | diagnóstico, cirurgia, estoque, isolamento, consumo |
| COMP-LND | Módulo de pouso | carga, escudo, combustível, pernas, abortagem, reutilização |
| COMP-ROV | Rovers e sondas | alcance, autonomia, instrumentos, reparo, comunicação |
| COMP-COL | Kit de colônia | habitat, energia, água, cultivo, ferramentas, expansão |
| COMP-SPR | Peças sobressalentes | massa, variedade, compatibilidade, criticidade, fabricação |
| COMP-FAB | Fabricação a bordo | materiais, precisão, energia, catálogo, taxa de falha |
| COMP-SAF | Sistema de escape | envelope, massa, tempo de resposta, sobrevivência |
## 10. Telas
| ID | Rota | Tela | Conteúdo |
| --- | --- | --- | --- |
| SCR-001 | screen-boot | Inicialização | versão, migração, validação de save e pré-carregamento |
| SCR-002 | screen-rotate | Rotação obrigatória | mensagem para colocar o aparelho na horizontal |
| SCR-003 | screen-splash | Splash | logo, título e carregamento |
| SCR-004 | screen-main-menu | Menu principal | continuar, nova campanha, expedição, simulador, opções, créditos |
| SCR-005 | screen-profile | Perfil do diretor | nome, avatar, pronome opcional, dificuldade e acessibilidade |
| SCR-006 | screen-campaign-intro | Prólogo | cenas iniciais e nomeação do jogador |
| SCR-007 | screen-agency-dashboard | Painel da agência | recursos, relógios, riscos, mensagens e departamentos |
| SCR-008 | screen-inbox | Central de decisões | reuniões, alertas, propostas e prazos |
| SCR-009 | screen-department | Departamento | equipe, tarefas, capacidade, confiança e pareceres |
| SCR-010 | screen-procurement | Compras | comparação de propostas, contratos e auditorias |
| SCR-011 | screen-ship-designer | Projeto da nave | módulos, massa, volume, energia, térmica, delta-v e custo |
| SCR-012 | screen-requirements | Requisitos | objetivos, rastreabilidade, conflitos e aprovação |
| SCR-013 | screen-integration | Integração | compatibilidades e pendências |
| SCR-014 | screen-testing | Programa de testes | bancada, vibração, térmico, pressão, software e abortagem |
| SCR-015 | screen-crew-recruitment | Recrutamento | candidatos, habilidades, saúde, relações e custo |
| SCR-016 | screen-training | Treinamento | certificações, simulador, fadiga e confiança |
| SCR-017 | screen-mission-plan | Plano de missão | rota, janela, reservas, objetivos e abortos |
| SCR-018 | screen-countdown | Contagem regressiva | go/no-go, clima, sistemas e autoridade |
| SCR-019 | screen-flight-deck | Cabine | instrumentos funcionais, alarmes, checklist e visão externa |
| SCR-020 | screen-ship-map | Mapa interno | compartimentos, portas, avarias e equipes |
| SCR-021 | screen-room | Compartimento | fundo 2.5D, hotspots e interação local |
| SCR-022 | screen-telemetry | Telemetria | gráficos, tendências, limites e logs |
| SCR-023 | screen-aura | AURA | opções, evidências, confiança e histórico |
| SCR-024 | screen-cruise | Cruzeiro | turnos, recursos, eventos e tempo acelerado |
| SCR-025 | screen-star-system | Sistema estelar | corpos, órbitas, destinos, combustível e sensores |
| SCR-026 | screen-planet-orbit | Órbita planetária | mapa, atmosfera, clima e pontos de interesse |
| SCR-027 | screen-probe-control | Sondas | montagem, lançamento, telemetria e ciência |
| SCR-028 | screen-landing | Pouso | entrada, descida, combustível, terreno e abortagem |
| SCR-029 | screen-surface | Superfície | EVA, rover, setores, coleta e riscos |
| SCR-030 | screen-colony | Colônia | recursos, construção, população, saúde e governo |
| SCR-031 | screen-research | Pesquisa | árvore tecnológica, evidências e protótipos |
| SCR-032 | screen-investigation | Investigação | linha causal, telemetria, decisões e recomendações |
| SCR-033 | screen-memorial | Memorial | tripulantes, missões, causas e legado |
| SCR-034 | screen-ending | Desfecho | resultado, fatores e epílogo |
| SCR-035 | screen-expedition | Expedição infinita | seed, cenário, mutadores e pontuação |
| SCR-036 | screen-simulator | Simulador livre | configuração de nave, falha e procedimento |
| SCR-037 | screen-settings | Opções | áudio, vídeo, controles, idioma e acessibilidade |
| SCR-038 | screen-save-manager | Partidas | slots, autosave, exportar, importar, reparar e excluir |
## 11. Instrumentos
| ID | Instrumento | Unidade | Escala | Normal | Binding | Visual |
| --- | --- | --- | --- | --- | --- | --- |
| INST-CAB-PRESS | Pressão da cabine | kPa | 0-120 | 95-105 | lifeSupport.cabinPressure | agulha SVG + número |
| INST-O2-PCT | Oxigênio | % | 0-30 | 19,5-23,5 | lifeSupport.oxygenPercent | arco + número |
| INST-CO2-PPM | CO2 | ppm | 0-10000 | 400-1500 | lifeSupport.co2ppm | barra + tendência |
| INST-CAB-TEMP | Temperatura interna | C | -20-50 | 18-26 | thermal.cabinTemp | agulha SVG |
| INST-HUMID | Umidade | % | 0-100 | 30-60 | lifeSupport.humidity | arco |
| INST-WATER | Água utilizável | % | 0-100 | >30 | resources.waterPercent | barra vertical |
| INST-FOOD | Alimento | dias | 0-2000 | missão + 20% | resources.foodDays | número + previsão |
| INST-PWR-GEN | Geração elétrica | kW | 0-5000 | configuração | power.generationKw | digital |
| INST-PWR-LOAD | Carga elétrica | kW | 0-5000 | < geração | power.loadKw | digital |
| INST-BAT-SOC | Baterias | % | 0-100 | 25-100 | power.batterySoc | arco |
| INST-BUS-V | Barramento principal | V | 0-1000 | nominal +/-5% | power.mainBusV | agulha |
| INST-CORE-TEMP | Temperatura do núcleo | C | 0-1500 | < limite | thermal.coreTemp | agulha + warning |
| INST-RAD-MARGIN | Margem dos radiadores | % | -100-100 | >15 | thermal.radiatorMargin | barra bipolar |
| INST-FUEL-MAIN | Propelente principal | % | 0-100 | plano + reserva | propulsion.mainFuelPct | tanque |
| INST-FUEL-RCS | Propelente RCS | % | 0-100 | >20 | propulsion.rcsFuelPct | tanque |
| INST-CHAMBER-P | Pressão da câmara | MPa | 0-40 | modelo | propulsion.chamberPressure | agulha |
| INST-ENGINE-TEMP | Temperatura do motor | C | 0-3500 | modelo | propulsion.engineTemp | agulha |
| INST-THRUST | Empuxo | % | 0-110 | comando +/-2% | propulsion.thrustPct | barra |
| INST-TWR | Relação empuxo/peso | - | 0-5 | >1 no lançamento | flight.twr | digital |
| INST-ALT | Altitude | km | 0-infinito | trajetória | navigation.altitudeKm | digital |
| INST-VEL | Velocidade | km/s | 0-100 | trajetória | navigation.velocityKps | digital |
| INST-VSPEED | Velocidade vertical | m/s | -5000-5000 | fase de voo | navigation.verticalSpeed | agulha |
| INST-PITCH | Arfagem | graus | -180-180 | trajetória | attitude.pitch | horizonte artificial |
| INST-YAW | Guinada | graus | -180-180 | trajetória | attitude.yaw | indicador |
| INST-ROLL | Rolagem | graus | -180-180 | trajetória | attitude.roll | horizonte artificial |
| INST-GLOAD | Carga G | g | -5-12 | -1-4 tripulado | flight.gLoad | agulha |
| INST-STRUCT | Integridade estrutural | % | 0-100 | >70 | ship.structureIntegrity | barra |
| INST-RAD-DOSE | Dose de radiação | mSv | 0-10000 | protocolo | crew.avgRadiationDose | digital |
| INST-COMM | Qualidade do enlace | % | 0-100 | >50 | comms.linkQuality | barras |
| INST-DIST | Distância do alvo | AU/ly | 0-infinito | rota | navigation.distanceToTarget | digital |
| INST-ETA | Tempo estimado | dias | 0-infinito | rota | navigation.etaDays | digital |
| INST-MISSION | Tempo de missão | dias/hh:mm | 0-infinito | - | mission.elapsed | digital |
| INST-ALARM | Estado de alarmes | nível | 0-3 | 0 | alerts.highestSeverity | master caution/warning |
## 12. Fórmulas
| Sistema | Regra |
| --- | --- |
| Massa integrada | dryMass + propellantMass + payloadMass + crewMass + waterMass + foodMass + reservesMass |
| Delta-v simplificado | Isp * g0 * ln(initialMass / finalMass) |
| TWR | totalThrust / (currentMass * localGravity) |
| Margem elétrica | availableGeneration - criticalLoad - operationalLoad - discretionaryLoad |
| Margem térmica | heatRejectionCapacity - generatedHeat |
| Consumo de O2 | crewCount * activityFactor * baseO2Rate * deltaTime |
| Produção de CO2 | crewCount * activityFactor * baseCO2Rate * deltaTime |
| Água líquida | stored + recycled - consumed - leakage - contaminationLoss |
| Confiabilidade efetiva | clamp(base + tests + quality + maintenance - wear - integration - environment, 0.05, 0.9995) |
| Chance por passo | 1 - pow(1 - hourlyFailureProbability, deltaHours) |
| Moral | base + leadership + rest + victories + privacy - fear - conflict - casualties - deprivation |
| Habitabilidade | weighted(atmosphere, water, temperature, radiation, gravity, biology, resources) * evidenceConfidence |
## 13. Falhas
| Grupo | Sistema | Exemplos |
| --- | --- | --- |
| F-PRP | Propulsão | ignição, turbobomba, cavitação, combustão instável, vazamento, superaquecimento |
| F-STR | Estrutural | fadiga, trinca, vibração, impacto, perda de vedação, colapso local |
| F-PWR | Energia | curto, sobrecarga, fuga térmica, falha do reator, perda de barramento |
| F-THM | Térmico | radiador preso, fluido perdido, congelamento, superaquecimento em cascata |
| F-LSS | Suporte de vida | despressurização, O2 baixo, CO2 alto, água contaminada, fungos |
| F-AVN | Aviônicos | sensor divergente, software degradado, memória corrompida, sincronização |
| F-COM | Comunicação | antena, apontamento, ruído, atraso, perda de pacotes, isolamento |
| F-MED | Humano | fadiga, doença, radiação, pânico, erro de procedimento, conflito |
| F-LND | Pouso | escudo, paraquedas, motor, terreno, perna, combustível, poeira |
| F-COL | Colônia | energia, vazamento, produção, contaminação, clima, ruptura social |
| F-SEC | Segurança | sabotagem, credencial, dado adulterado, acesso indevido, conflito de autoridade |
## 14. Estrutura de arquivos
```text
LAST-HORIZON/
├─ index.html
├─ 404.html
├─ manifest.webmanifest
├─ service-worker.js
├─ version.json
├─ CHANGELOG.md
├─ README.md
├─ LICENSES.md
├─ assets/
│  ├─ images/{brand,campaign,agency,manufacturing,interiors,mission,planets,colony,ui,avatars}/
│  ├─ icons/
│  ├─ audio/{music,ambience,alarms,sfx}/
│  └─ fonts/
├─ data/{campaign,narrative,components,suppliers,staff,crew,failures,events,checklists,planets,research,locales}/
├─ src/
│  ├─ app.js
│  ├─ config/
│  ├─ core/{store,events,selectors,clock,rng,validation}.js
│  ├─ data/{db,save-manager,migrations,checksum}.js
│  ├─ sim/{economy,reliability,failure-engine,ship-integration,propulsion,power,thermal,life-support,avionics,sensors,comms,flight,orbit,trajectory,crew-health,morale,habitability,landing,colony}.js
│  ├─ narrative/
│  ├─ instruments/
│  ├─ audio/
│  ├─ i18n/
│  ├─ accessibility/
│  ├─ ui/
│  └─ features/{profile,agency,departments,procurement,designer,requirements,testing,crew,aura,mission-plan,countdown,launch,flight-deck,ship-map,cruise,star-system,science,probes,landing,surface,colony,research,investigation,expedition}/
├─ styles/{tokens,base,layout,components,screens,accessibility}.css
├─ scripts/{validate-data,audit-links,audit-assets,audit-saves,build-release}.mjs
├─ tests/{unit,integration,fixtures,manual-checklists}/
└─ docs/{architecture,state-schema,simulation-rules,narrative-map,asset-manifest,release-checklist}.md
```
## 15. Schema de estado
```json
{
  "meta": {
    "saveVersion": "string",
    "build": "string",
    "seed": "string",
    "createdAt": "ISO date",
    "lastSavedAt": "ISO date"
  },
  "profile": {
    "directorName": "string",
    "avatarId": "string",
    "difficulty": "story|standard|simulation|hardcore",
    "accessibility": "object"
  },
  "campaign": {
    "act": "number",
    "sceneId": "string",
    "flags": "object",
    "decisions": "array",
    "endingScore": "object"
  },
  "time": {
    "earthDate": "number",
    "missionHours": "number",
    "speed": "0|1|5|25|100",
    "paused": "boolean"
  },
  "economy": {
    "available": "number",
    "committed": "number",
    "contingency": "number",
    "contracts": "array",
    "cashFlow": "array"
  },
  "agency": {
    "support": "number",
    "politicalCapital": "number",
    "departments": "object",
    "staff": "array",
    "inbox": "array"
  },
  "ship": {
    "design": "object",
    "mass": "object",
    "requirements": "object",
    "risks": "array",
    "rooms": "object",
    "integrity": "number"
  },
  "systems": {
    "propulsion": "object",
    "power": "object",
    "thermal": "object",
    "lifeSupport": "object",
    "avionics": "object",
    "comms": "object"
  },
  "crew": {
    "members": "array",
    "morale": "number",
    "trust": "number",
    "health": "object",
    "relationships": "array"
  },
  "mission": {
    "phase": "string",
    "route": "object",
    "checklists": "object",
    "telemetry": "array",
    "alerts": "array"
  },
  "science": {
    "targets": "array",
    "observations": "array",
    "samples": "array",
    "confidence": "object"
  },
  "colony": {
    "founded": "boolean",
    "resources": "object",
    "buildings": "array",
    "population": "object",
    "governance": "object"
  },
  "logs": {
    "events": "array",
    "failures": "array",
    "investigations": "array",
    "memorial": "array"
  }
}
```
## 16. Fases de desenvolvimento
### F00 - Contrato técnico e inventário - v0.0.1
Criar documentação, árvore de arquivos, convenções, versionamento e critérios de aceite antes de qualquer feature.
**Arquivos:** README.md, CHANGELOG.md, version.json, docs/architecture.md, docs/state-schema.md
**Aceite:** Projeto abre sem erros; Nenhuma dependência paga; Rotas e nomes oficiais definidos; Checklist anti-quebra registrado
### F01 - Base PWA offline - v0.1.0
Criar index, manifest, service worker, cache seguro, atualização e tela de inicialização.
**Arquivos:** index.html, manifest.webmanifest, service-worker.js, src/app.js, styles/base.css
**Aceite:** Instala como PWA; Funciona offline após primeiro carregamento; Atualização não apaga saves
### F02 - Shell mobile horizontal - v0.2.0
Implementar viewport, aviso de rotação, safe areas, escala 16:9 e navegação por toque/teclado.
**Arquivos:** styles/layout.css, src/ui/rotation-guard.js, src/ui/router.js
**Aceite:** Retrato bloqueado com mensagem; Sem corte em 640x360; Desktop com área central controlada
### F03 - Design system - v0.3.0
Criar tokens, componentes, modais, cards, botões, alertas, tooltips, tabelas e foco.
**Arquivos:** styles/tokens.css, styles/components.css, src/ui/components/
**Aceite:** Contraste legível; Alvos de toque >=44px; Estados hover/focus/disabled
### F04 - Núcleo de estado - v0.4.0
Criar store, eventos, selectors, relógio, seed determinística, validação e logs.
**Arquivos:** src/core/store.js, src/core/events.js, src/core/clock.js, src/core/rng.js, src/core/validation.js
**Aceite:** Mesma seed reproduz resultados; Pausa congela simulação; Logs registram causa e origem
### F05 - Save, migração e recuperação - v0.5.0
Usar IndexedDB com slots, autosave, exportação JSON, importação, checksum e migrações.
**Arquivos:** src/data/db.js, src/data/save-manager.js, src/data/migrations.js, src/data/checksum.js
**Aceite:** Save corrompido não quebra jogo; Versões antigas migram; Exportar/importar offline
### F06 - Motor narrativo - v0.6.0
Criar cenas, diálogos, escolhas, condições, flags, prazos, consequências e histórico.
**Arquivos:** src/narrative/engine.js, data/narrative/
**Aceite:** Escolhas condicionais; Decisões com prazo; Histórico consultável
### F07 - Perfil e prólogo - v0.7.0
Implementar diretor, avatar, dificuldade, acessibilidade e prólogo completo.
**Arquivos:** src/features/profile/, data/campaign/prologue.json
**Aceite:** Nova campanha completa; Pular cenas opcional; Nome não quebra layout
### F08 - Painel da agência - v0.8.0
Criar dashboard com recursos, risco, Terra, mensagens e departamentos.
**Arquivos:** src/features/agency/
**Aceite:** Dados vêm do store; Alertas abrem origem; Sem números decorativos
### F09 - Economia e contratos - v0.9.0
Implementar orçamento, compromissos, custos recorrentes, multas, financiamento e fluxo.
**Arquivos:** src/sim/economy.js, src/features/procurement/, data/suppliers/
**Aceite:** Previsão financeira; Contratos têm risco/prazo; Gasto extra exige confirmação
### F10 - Departamentos e equipe terrestre - v1.0.0
Implementar capacidade, líderes, especialistas, carga, confiança e pareceres.
**Arquivos:** src/features/departments/, src/sim/staff.js, data/staff/
**Aceite:** Parecer depende de competência; Sobrecarga aumenta erro; Contratar/demitir persiste
### F11 - Catálogo de componentes - v1.1.0
Criar componentes, variantes, fornecedores, maturidade e compatibilidades.
**Arquivos:** data/components/, src/features/catalog/
**Aceite:** Atributos completos; Comparação lado a lado; Filtros e incompatibilidades
### F12 - Projetista da ARK-01 - v1.2.0
Montar módulos e calcular massa, volume, energia, térmica, delta-v, custo e conflitos.
**Arquivos:** src/features/designer/, src/sim/ship-integration.js
**Aceite:** Atualização em tempo real; Configuração inválida bloqueada; Conflitos explicados
### F13 - Engenharia de requisitos - v1.3.0
Criar requisitos e rastreabilidade entre objetivo, componente, teste e risco.
**Arquivos:** src/features/requirements/, data/requirements.json
**Aceite:** Cada requisito tem status; Mudança propaga impactos; Requisito órfão alertado
### F14 - Confiabilidade e registro de riscos - v1.4.0
Implementar confiabilidade por componente, integração, ambiente, desgaste e incerteza.
**Arquivos:** src/sim/reliability.js, src/sim/risk-register.js
**Aceite:** Risco por sistema; Evidências alteram confiança; Seed reproduz falhas
### F15 - FMEA e cadeias de falha - v1.5.0
Criar modos, causas, sintomas, propagação, detecção, mitigação e investigação.
**Arquivos:** data/failures/, src/sim/failure-engine.js, src/features/investigation/
**Aceite:** Toda falha tem causa; Cascata interrompível; Relatório rastreável
### F16 - Programa de testes - v1.6.0
Implementar bancada, vibração, térmico-vácuo, pressão, software, abortagem e integrado.
**Arquivos:** src/features/testing/, src/sim/tests.js
**Aceite:** Teste custa prazo/dinheiro; Revela incerteza; Resultados alimentam risco
### F17 - Planejamento de missão - v1.7.0
Criar alvo, rota, janela, reservas, perfil e cenários de aborto.
**Arquivos:** src/features/mission-plan/, src/sim/trajectory.js
**Aceite:** Plano inviável explicado; Reservas configuráveis; Carga recalcula rota
### F18 - Seleção da tripulação - v1.8.0
Implementar candidatos, funções, habilidades, saúde, salário e relações.
**Arquivos:** src/features/crew/recruitment.js, data/crew/
**Aceite:** Cobertura de funções; Compatibilidade importa; Sem estereótipos
### F19 - Treinamento e certificação - v1.9.0
Criar simulações, certificações, fadiga, aprendizagem e confiança.
**Arquivos:** src/features/crew/training.js, src/sim/skills.js
**Aceite:** Treino consome prazo; Falhas ensinam; Certificação afeta operação
### F20 - AURA - v2.0.0
Criar assistente contextual que mostra opções, evidências, incerteza e consequências sem decidir.
**Arquivos:** src/features/aura/, data/aura-rules.json
**Aceite:** Nunca inventa dado; Mostra confiança; Pode errar por sensor ruim
### F21 - Mapa interno e compartimentos - v2.1.0
Implementar módulos, transições, hotspots, portas, energia local e estados.
**Arquivos:** src/features/ship-map/, data/ship-rooms.json
**Aceite:** Todos os módulos acessíveis; Estado altera overlays; Toque e teclado
### F22 - Instrumentação funcional - v2.2.0
Construir agulhas SVG, telas, luzes, tendências, alarmes e binding ao store.
**Arquivos:** src/instruments/, src/features/flight-deck/
**Aceite:** Nada incorporado ao fundo; Unidades corretas; Animação suave e limitada
### F23 - Suporte de vida - v2.3.0
Simular pressão, O2, CO2, água, umidade, temperatura, alimento, resíduos e redundância.
**Arquivos:** src/sim/life-support.js
**Aceite:** Balanço coerente; Tripulação altera consumo; Sintomas graduais
### F24 - Energia e térmica - v2.4.0
Simular geração, baterias, barramentos, prioridades, calor, radiadores e loops.
**Arquivos:** src/sim/power.js, src/sim/thermal.js
**Aceite:** Conservação aproximada; Shed de carga; Cascatas térmicas
### F25 - Propulsão e combustível - v2.5.0
Simular empuxo, consumo, pressão, temperatura, ignição, RCS, delta-v e desgaste.
**Arquivos:** src/sim/propulsion.js, src/sim/flight.js
**Aceite:** TWR/delta-v coerentes; Comando move instrumento; Falha depende do estado
### F26 - Aviônicos, sensores e comunicação - v2.6.0
Criar sensores com erro, votação, navegação, latência e perda de enlace.
**Arquivos:** src/sim/avionics.js, src/sim/sensors.js, src/sim/comms.js
**Aceite:** Sensores divergem; AURA cita fonte; Latência por distância
### F27 - Saúde, moral e relações - v2.7.0
Simular sono, fadiga, radiação, doença, estresse, conflito, liderança e luto.
**Arquivos:** src/sim/crew-health.js, src/sim/morale.js, src/features/crew/relationships.js
**Aceite:** Efeitos graduais; Decisões humanas importam; Sem aconselhamento médico real
### F28 - Contagem regressiva - v2.8.0
Implementar go/no-go, clima, falhas tardias, autoridade e sequência procedural.
**Arquivos:** src/features/countdown/, data/checklists/launch.json
**Aceite:** Pode pausar e consultar; Abortar tem efeito; Lançar com vermelho confirma
### F29 - Lançamento e ascensão - v2.9.0
Criar voo por fases, telemetria, staging, abortos e resultado causal.
**Arquivos:** src/features/launch/, src/sim/ascent.js
**Aceite:** Telemetria sistêmica; Falha reflete projeto/teste; Seed reproduz
### F30 - Órbita e partida - v3.0.0
Implementar operações orbitais, montagem, checagem, queima e janela de saída.
**Arquivos:** src/features/orbit/, src/sim/orbit.js
**Aceite:** Combustível real; Queima incompleta muda rota; Retorno quando possível
### F31 - Cruzeiro interestelar - v3.1.0
Criar tempo acelerado, turnos, manutenção, consumo e decisões de longo prazo.
**Arquivos:** src/features/cruise/, src/sim/maintenance.js
**Aceite:** Aceleração segura; Autosave antes de crise; Alertas fatais não pulados
### F32 - Diretor de eventos - v3.2.0
Implementar radiação, micrometeoros, doenças, sinais, conflitos e oportunidades.
**Arquivos:** data/events/space/, src/narrative/event-director.js
**Aceite:** Contexto respeitado; Cooldown; Sem arbitrariedade
### F33 - Sistema estelar e planetas - v3.3.0
Criar mapa, corpos, órbitas visuais, combustível, sensores e alvos.
**Arquivos:** src/features/star-system/, src/sim/planet-generator.js
**Aceite:** Campanha fixa; Expedição por seed; Sem habitabilidade automática
### F34 - Ciência e habitabilidade - v3.4.0
Implementar instrumentos, confiança, sondas, amostras e índice de habitabilidade.
**Arquivos:** src/features/science/, src/sim/habitability.js
**Aceite:** Resultado muda com dados; Vida exige múltiplos testes; Incerteza exibida
### F35 - Sondas e rovers - v3.5.0
Criar montagem, lançamento, autonomia, telemetria, falhas e ciência.
**Arquivos:** src/features/probes/, src/sim/probes.js
**Aceite:** Consome recurso real; Risco ambiental; Dados persistem
### F36 - Entrada, descida e pouso - v3.6.0
Implementar escudo, trajetória, clima, terreno, combustível, abortos e danos.
**Arquivos:** src/features/landing/, src/sim/landing.js
**Aceite:** Janelas de decisão; Combustível limitado; Local importa
### F37 - Exploração de superfície - v3.7.0
Criar setores, EVA, rover, amostras, clima, radiação, retorno e resgate.
**Arquivos:** src/features/surface/, src/sim/eva.js
**Aceite:** Planejamento EVA; Reserva de O2; Resgate condicionado
### F38 - Fundação da colônia - v3.8.0
Implementar habitat, energia, ar, água, alimento, estoque, saúde e mão de obra.
**Arquivos:** src/features/colony/, src/sim/colony.js
**Aceite:** Dependências de construção; Falhas locais; Sem recursos infinitos
### F39 - Expansão e governança - v3.9.0
Criar população, funções, regras, conflitos, educação, reprodução e liderança.
**Arquivos:** src/features/colony/governance.js, src/sim/population.js
**Aceite:** Escolhas éticas ramificam; Governança afeta produtividade; Sem discriminação
### F40 - Pesquisa e tecnologia - v4.0.0
Implementar árvore, evidências, protótipos, fabricação e riscos.
**Arquivos:** src/features/research/, data/tech-tree.json
**Aceite:** Pré-requisitos; Protótipo não é confiável; Pesquisa usa tempo/equipe
### F41 - Campanha completa e finais - v4.1.0
Integrar atos, personagens, decisões globais, condições de finais e epílogos.
**Arquivos:** data/campaign/, src/narrative/endings.js
**Aceite:** Todos os atos alcançáveis; Sem becos não intencionais; Final explica fatores
### F42 - Expedição infinita - v4.2.0
Criar seed, cenário procedural, mutadores, pontuação e compartilhamento.
**Arquivos:** src/features/expedition/, src/sim/scenario-generator.js
**Aceite:** Seeds compartilháveis; Variedade coerente; Pontuação local
### F43 - Áudio, VFX, acessibilidade e idiomas - v4.3.0
Adicionar áudio, alarmes, efeitos, legendas, redução de movimento, daltonismo e PT/EN/ES.
**Arquivos:** src/audio/, src/i18n/, src/accessibility/
**Aceite:** Jogável sem som; Sem flashes perigosos; Strings fora do código
### F44 - Auditoria final e publicação - v4.4.0
Executar auditoria de desempenho, saves, offline, responsividade, limpeza e release.
**Arquivos:** scripts/, release/, version.json
**Aceite:** Sem textos internos na interface; Console limpo; Release vendável e documentada
## 17. Catálogo de fundos
### IMG-BRAND-001 - brand-cover-last-horizon.webp
**Uso:** Capa e divulgação | **Tamanho:** 2560x1440 | **Grupo:** Marca
**Prompt:** Earth seen from high orbit at night with widespread climate disasters and city blackouts, colossal interstellar ark under construction in orbital drydock, hopeful distant star, centered cinematic composition, clean lower-left safe area, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-BRAND-002 - splash-last-horizon.webp
**Uso:** Splash PWA vertical | **Tamanho:** 1290x2796 | **Grupo:** Marca
**Prompt:** vertical composition, luminous Earth fading into darkness below, gigantic ark spacecraft rising toward a distant habitable world, dramatic negative space in upper third for logo, elegant premium mobile splash, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-BRAND-003 - og-last-horizon.webp
**Uso:** Prévia social | **Tamanho:** 1200x630 | **Grupo:** Marca
**Prompt:** wide mission control silhouettes facing panoramic windows, ark spacecraft leaving Earth, focal center and clean right-side title safe area, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-BRAND-004 - app-icon-background.webp
**Uso:** Base do ícone | **Tamanho:** 1024x1024 | **Grupo:** Marca
**Prompt:** simple iconic circular orbital horizon around a small ark silhouette, luminous cyan arc over deep navy, bold readable shape at small scale, no text, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-BRAND-005 - bg-main-menu-earth-orbit.webp
**Uso:** Menu principal | **Tamanho:** 2560x1440 | **Grupo:** Marca
**Prompt:** view from observation window toward damaged Earth and orbital construction docks, quiet solemn atmosphere, left side darker for vertical menu, no cockpit instruments, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-BRAND-006 - bg-loading-stellar-route.webp
**Uso:** Carregamento | **Tamanho:** 2560x1440 | **Grupo:** Marca
**Prompt:** deep space navigation corridor, subtle star trails converging toward a distant blue planet, restrained minimal composition, center clear for loading indicator, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-CAM-001 - bg-campaign-earth-collapse.webp
**Uso:** Terra em colapso | **Tamanho:** 2560x1440 | **Grupo:** Campanha
**Prompt:** Earth from space with huge weather systems, continental fires and partial city blackouts, realistic restrained catastrophe, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-CAM-002 - bg-campaign-emergency-summit.webp
**Uso:** Cúpula global | **Tamanho:** 2560x1440 | **Grupo:** Campanha
**Prompt:** international crisis chamber, empty circular table, abstract climate projections without text, urgent atmosphere, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-CAM-003 - bg-campaign-director-appointment.webp
**Uso:** Nomeação | **Tamanho:** 2560x1440 | **Grupo:** Campanha
**Prompt:** government aerospace auditorium, empty podium, press lights, central safe area for character overlay, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-CAM-004 - bg-campaign-public-address.webp
**Uso:** Pronunciamento | **Tamanho:** 2560x1440 | **Grupo:** Campanha
**Prompt:** global broadcast studio, cameras and practical lighting, clean background for director avatar overlay, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-CAM-005 - bg-campaign-city-shortages.webp
**Uso:** Escassez urbana | **Tamanho:** 2560x1440 | **Grupo:** Campanha
**Prompt:** near-future coastal megacity under rationing and infrastructure stress viewed from distance, non-graphic, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-CAM-006 - bg-campaign-launch-protests.webp
**Uso:** Protestos | **Tamanho:** 2560x1440 | **Grupo:** Campanha
**Prompt:** road outside space center with distant crowd, barriers, emergency lights and launch pad far behind, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-CAM-007 - bg-campaign-memorial-hall.webp
**Uso:** Memorial | **Tamanho:** 2560x1440 | **Grupo:** Campanha
**Prompt:** solemn space memorial with wall of lights without readable names, astronaut helmet on pedestal, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-CAM-008 - bg-campaign-earth-recovery.webp
**Uso:** Recuperação da Terra | **Tamanho:** 2560x1440 | **Grupo:** Campanha
**Prompt:** Earth from orbit showing recovering oceans and green regions after years, hopeful sunrise, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-001 - bg-agency-mission-control.webp
**Uso:** Controle da missão | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** large near-future mission control, curved workstations, panoramic abstract telemetry lights, empty seats, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-002 - bg-agency-director-office.webp
**Uso:** Escritório do diretor | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** space agency director office, Earth model, mission photos without logos, window toward launch complex, dark right side, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-003 - bg-agency-engineering-review.webp
**Uso:** Revisão de engenharia | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** systems engineering review room with physical spacecraft model, blank wall panels, chairs for character overlays, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-004 - bg-agency-propulsion-lab.webp
**Uso:** Laboratório de propulsão | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** advanced rocket propulsion laboratory, engine section on stand, pipes and diagnostics, no flame, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-005 - bg-agency-structures-lab.webp
**Uso:** Laboratório estrutural | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** spacecraft structural lab, composite pressure shell, robotic inspection arms, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-006 - bg-agency-life-support-lab.webp
**Uso:** Laboratório de suporte de vida | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** closed-loop life support lab with water recycling prototypes, plant chambers and air processors, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-007 - bg-agency-medical-center.webp
**Uso:** Centro médico | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** astronaut medical and human performance center, scanner, treadmill enclosure, clinical lighting, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-008 - bg-agency-training-simulator.webp
**Uso:** Simulador de treinamento | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** full-motion spacecraft simulator hall, capsule mockup and observation booth, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-009 - bg-agency-procurement-room.webp
**Uso:** Sala de contratos | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** supplier negotiation room with component samples and sealed proposals, aerospace corporate atmosphere, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-010 - bg-agency-data-center.webp
**Uso:** Data center | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** secure aerospace data center with redundant servers and cooling corridors, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-011 - bg-agency-hangar.webp
**Uso:** Hangar de montagem | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** immense spacecraft assembly hangar, ARK-01 central spine under construction, tiny workers for scale, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-AGY-012 - bg-agency-launch-complex.webp
**Uso:** Complexo de lançamento | **Tamanho:** 2560x1440 | **Grupo:** Agência
**Prompt:** near-future launch complex at dawn, giant heavy launch vehicle, service towers and vapor, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-001 - bg-mfg-blueprint-bay.webp
**Uso:** Sala de projeto | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** dark engineering visualization bay with physically plausible projected wireframe ark, no labels, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-002 - bg-mfg-engine-test-stand.webp
**Uso:** Bancada antes do teste | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** remote rocket engine test stand at night before ignition, vapor and safety lights, foreground for controls, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-003 - bg-mfg-engine-firing.webp
**Uso:** Teste de motor | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** rocket engine static fire on reinforced test stand, intense realistic plume and shock diamonds, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-004 - bg-mfg-tank-assembly.webp
**Uso:** Fabricação de tanques | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** cryogenic tank production line, huge cylindrical tanks, welding rigs and platforms, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-005 - bg-mfg-vibration-test.webp
**Uso:** Teste de vibração | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** spacecraft module on giant vibration table, cables and sensors without labels, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-006 - bg-mfg-thermal-vacuum.webp
**Uso:** Teste térmico-vácuo | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** open thermal vacuum chamber with spacecraft module, black walls and industrial lighting, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-007 - bg-mfg-pressure-test.webp
**Uso:** Teste de pressão | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** sealed habitat pressure test bay, reinforced windows, diagnostic lighting, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-008 - bg-mfg-clean-room.webp
**Uso:** Sala limpa | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** spacecraft avionics clean room, distant technicians, flight computer racks, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-009 - bg-mfg-final-integration.webp
**Uso:** Integração final | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** final spacecraft integration hall, modules joining along central spine, complex cranes, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MFG-010 - bg-mfg-rollout.webp
**Uso:** Transporte ao lançamento | **Tamanho:** 2560x1440 | **Grupo:** Fabricação e testes
**Prompt:** massive launch vehicle rolling toward pad at sunrise, cinematic low angle, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-001 - bg-interior-flight-deck.webp
**Uso:** Cabine de comando | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** ARK-01 command flight deck, forward panoramic windows, empty instrument bezels and blank dark screen surfaces reserved for coded UI, symmetrical, no gauges, no labeled buttons, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-002 - bg-interior-navigation.webp
**Uso:** Navegação | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** navigation room with central star map table switched off, blank display walls, seats and handrails, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-003 - bg-interior-engineering-control.webp
**Uso:** Controle de engenharia | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** engineering control room, rows of blank dark panels and unlabeled switch housings, reactor access behind glass, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-004 - bg-interior-reactor.webp
**Uso:** Reator | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** compact advanced fission or fusion reactor chamber, shielded core housing, coolant pipes, service catwalks, no fantasy energy, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-005 - bg-interior-propulsion-service.webp
**Uso:** Serviço de propulsão | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** spacecraft propulsion service bay, engine feed lines, valves, access platforms and maintenance lighting, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-006 - bg-interior-life-support.webp
**Uso:** Suporte de vida | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** life support room with air scrubbers, water reclamation columns, filter racks and blank panels, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-007 - bg-interior-hydroponics.webp
**Uso:** Hidroponia | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** spacecraft hydroponics greenhouse, modular crops under efficient grow lights, water channels and central aisle, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-008 - bg-interior-medbay.webp
**Uso:** Enfermaria | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** spacecraft medical bay with two treatment beds, diagnostic arch, medicine lockers and neutral lighting, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-009 - bg-interior-crew-quarters.webp
**Uso:** Alojamentos | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** compact long-duration crew quarters, private bunks, personal storage, soft lighting, orderly lived-in feel, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-010 - bg-interior-galley.webp
**Uso:** Refeitório | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** spacecraft galley and communal table, compact appliances, room for crew overlays, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-011 - bg-interior-science-lab.webp
**Uso:** Laboratório científico | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** multidisciplinary spacecraft laboratory with sealed sample cabinets, analyzers and blank screens, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-012 - bg-interior-observation-dome.webp
**Uso:** Cúpula de observação | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** observation dome with wide space view, minimal seating and structural ribs, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-013 - bg-interior-airlock.webp
**Uso:** Câmara de ar | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** dual-door spacecraft airlock, EVA suit mounts, tool lockers, warning light housings without text, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-014 - bg-interior-cargo-bay.webp
**Uso:** Carga | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** organized cargo bay with modular containers, robotic rail system and central aisle, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-015 - bg-interior-comms.webp
**Uso:** Comunicação | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** deep-space communications room with antenna hardware, blank screens and isolated operator station, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-016 - bg-interior-maintenance-tunnel.webp
**Uso:** Túnel de manutenção | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** narrow spacecraft service tunnel with pipes, cables, access panels and utility lights, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-017 - bg-interior-escape-module.webp
**Uso:** Módulo de fuga | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** emergency lifeboat compartment with compact seats, sealed hatches and equipment racks, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-018 - bg-interior-fabrication.webp
**Uso:** Oficina de fabricação | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** onboard workshop with metal and polymer printers, milling unit, spare racks and workbench, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-019 - bg-interior-centrifuge.webp
**Uso:** Anel de gravidade | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** interior corridor of rotating gravity ring, curved floor, handrails, realistic centrifugal architecture, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-INT-020 - bg-interior-quarantine.webp
**Uso:** Quarentena | **Tamanho:** 2560x1440 | **Grupo:** Interior ARK-01
**Prompt:** sealed biosafety quarantine room, observation glass, decontamination equipment, blank status panels, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-001 - bg-mission-countdown-pad.webp
**Uso:** Contagem | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** heavy interstellar launch vehicle on pad at night, vapor, service tower, distant storm clouds, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-002 - bg-mission-liftoff.webp
**Uso:** Decolagem | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** colossal launch vehicle lifting off, realistic exhaust and sound suppression, safe camera distance, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-003 - bg-mission-ascent.webp
**Uso:** Ascensão | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** vehicle climbing through upper atmosphere over cloud deck, Earth curvature beginning, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-004 - bg-mission-stage-separation.webp
**Uso:** Separação | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** clean stage separation in near space, spent booster drifting, precise mechanical detail, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-005 - bg-mission-earth-orbit.webp
**Uso:** Órbita terrestre | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** ARK-01 assembled in Earth orbit, planet filling background, radiators deployed, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-006 - bg-mission-departure-burn.webp
**Uso:** Queima de partida | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** ARK-01 performing long departure burn away from Earth, restrained plume, Moon and Earth behind, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-007 - bg-mission-deep-cruise.webp
**Uso:** Cruzeiro profundo | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** ARK-01 in deep interstellar cruise, dark star field, faint radiator glow, immense loneliness, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-008 - bg-mission-solar-flare.webp
**Uso:** Erupção estelar | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** spacecraft near violent stellar flare at safe distance, energetic particles interacting with shielding subtly, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-009 - bg-mission-micrometeor-storm.webp
**Uso:** Micrometeoros | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** ARK-01 crossing micrometeor stream, small impacts and defensive orientation, restrained realism, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-010 - bg-mission-eva-repair.webp
**Uso:** Reparo EVA | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** two astronauts repairing external hull with tethers, damaged radiator and distant star, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-011 - bg-mission-unknown-signal.webp
**Uso:** Sinal desconhecido | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** deep space with distant ambiguous artificial-looking object and geometric radio source, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-012 - bg-mission-arrival-system.webp
**Uso:** Chegada | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** ARK-01 entering a new star system with several planets and dramatic depth, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-013 - bg-mission-orbital-insertion.webp
**Uso:** Inserção orbital | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** ARK-01 braking above large blue-green planet, atmospheric limb and engine plume, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-014 - bg-mission-atmospheric-entry.webp
**Uso:** Entrada | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** landing craft entering alien atmosphere with plasma sheath, realistic orientation, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-015 - bg-mission-landing-descent.webp
**Uso:** Descida | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** landing craft descending over rugged alien valley, dust and safe site visible, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-016 - bg-mission-emergency-landing.webp
**Uso:** Pouso de emergência | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** damaged landing craft approaching rough terrain in storm, asymmetric plume, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-017 - bg-mission-loss-of-contact.webp
**Uso:** Perda de contato | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** empty mission control under emergency red lighting, one central screen area dark, no text, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-MSN-018 - bg-mission-ark-damaged.webp
**Uso:** Nave avariada | **Tamanho:** 2560x1440 | **Grupo:** Missão
**Prompt:** ARK-01 drifting with localized hull damage, venting gas and dark module, no total destruction, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-001 - bg-planet-aurelia-orbit.webp
**Uso:** Aurelia em órbita | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** orbital view of Aurelia, temperate blue-green exoplanet, continents, oceans, clouds and thin aurora, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-002 - bg-planet-aurelia-surface.webp
**Uso:** Aurelia superfície | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** broad river valley, dark green alien vegetation with plausible ecology, twin moons faintly visible, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-003 - bg-planet-nereid-orbit.webp
**Uso:** Nereid em órbita | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** global ocean exoplanet with powerful storms and volcanic island chains, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-004 - bg-planet-nereid-surface.webp
**Uso:** Nereid superfície | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** ocean beside black volcanic island, heavy waves, possible landing platform, dramatic weather, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-005 - bg-planet-cinder-orbit.webp
**Uso:** Cinder em órbita | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** hot arid planet, iron deserts, canyons, dusty atmosphere and polar ice remnants, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-006 - bg-planet-cinder-surface.webp
**Uso:** Cinder superfície | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** red-brown canyon basin, high winds, mineral deposits and harsh sunlight, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-007 - bg-planet-umbra-orbit.webp
**Uso:** Umbra em órbita | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** frozen exoplanet with cracked ice shell, dark ocean fractures and faint atmosphere, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-008 - bg-planet-umbra-surface.webp
**Uso:** Umbra superfície | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** glacial plains, ice ridges, distant geysers and low blue light, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-009 - bg-planet-verdant-orbit.webp
**Uso:** Verdant em órbita | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** cloud-covered super-earth with vast forests and uncertain atmospheric chemistry, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-010 - bg-planet-verdant-surface.webp
**Uso:** Verdant superfície | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** towering alien forest, mist and bioluminescent microorganisms, beautiful but potentially toxic, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-011 - bg-planet-barren-orbit.webp
**Uso:** Barren em órbita | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** sterile airless mineral world, cratered surface and valuable metals, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-012 - bg-planet-barren-surface.webp
**Uso:** Barren superfície | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** airless mineral plain with sharp shadows, rover tracks and distant ringed planet, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-013 - bg-planet-gas-giant.webp
**Uso:** Gigante gasoso | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** majestic gas giant with turbulent bands, rings and multiple moons, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-014 - bg-planet-anomaly.webp
**Uso:** Anomalia | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** dark rogue world with geometric subsurface lights barely visible through fractures, ambiguous artificial origin, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-015 - bg-planet-orbit-map-neutral.webp
**Uso:** Mapa orbital neutro | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** clean top-down scientific visualization of a fictional star system on dark space, planets without labels, empty areas for coded orbit lines, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-PLN-016 - bg-planet-cave-habitat.webp
**Uso:** Caverna habitável | **Tamanho:** 2560x1440 | **Grupo:** Planetas
**Prompt:** vast lava tube on alien planet, ice deposits, stable shelter potential, expedition lights, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-001 - bg-colony-first-step.webp
**Uso:** Primeiro passo | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** first landing site on Aurelia, crew descending ramp, modular cargo and untouched valley, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-002 - bg-colony-habitat-deployment.webp
**Uso:** Implantação de habitat | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** inflatable and rigid modules deployed by robots, realistic construction sequence, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-003 - bg-colony-solar-farm.webp
**Uso:** Fazenda solar | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** solar and battery field beside early colony, maintenance rovers, changing weather, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-004 - bg-colony-reactor-site.webp
**Uso:** Reator da colônia | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** compact shielded surface reactor separated from habitat, cooling equipment and perimeter, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-005 - bg-colony-water-extraction.webp
**Uso:** Extração de água | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** ice or groundwater extraction facility with pipes toward settlement, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-006 - bg-colony-greenhouse.webp
**Uso:** Estufa | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** pressurized greenhouse interior on alien planet, abundant crops and condensation, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-007 - bg-colony-medical-crisis.webp
**Uso:** Crise médica | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** colony clinic prepared for emergency, empty beds and alarm lighting, no patients, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-008 - bg-colony-dust-storm.webp
**Uso:** Tempestade | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** early colony under severe dust storm, structures sealed and emergency lights, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-009 - bg-colony-night.webp
**Uso:** Noite da colônia | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** colony beneath unfamiliar stars and moons, warm habitat lights and quiet optimism, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-010 - bg-colony-expanded.webp
**Uso:** Colônia expandida | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** mature plausible settlement with habitats, research, agriculture, transit and landing zone, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-011 - bg-colony-council.webp
**Uso:** Conselho | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** modular colony council chamber, circular table and windows toward settlement, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-012 - bg-colony-final-sunrise.webp
**Uso:** Amanhecer final | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** sunrise over thriving colony with distant ARK-01 in sky, emotional final, clean sky area, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-013 - bg-colony-cemetery.webp
**Uso:** Memorial da colônia | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** small dignified memorial field beneath alien sky, simple markers without names, non-funereal hope, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-COL-014 - bg-colony-school.webp
**Uso:** Escola da colônia | **Tamanho:** 2560x1440 | **Grupo:** Colônia
**Prompt:** bright modular classroom and science learning area for first generation, no children visible, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-UI-001 - texture-panel-titanium.webp
**Uso:** Textura titânio | **Tamanho:** 2048x2048 | **Grupo:** UI e texturas
**Prompt:** seamless brushed dark titanium panel texture, subtle scratches, uniform lighting, tileable, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-UI-002 - texture-panel-carbon.webp
**Uso:** Textura compósito | **Tamanho:** 2048x2048 | **Grupo:** UI e texturas
**Prompt:** seamless dark aerospace composite texture, restrained and tileable, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-UI-003 - texture-glass-noise.webp
**Uso:** Ruído de vidro | **Tamanho:** 2048x2048 | **Grupo:** UI e texturas
**Prompt:** subtle dark glass grain and fine dust pattern on black, uniform, tileable, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-UI-004 - bg-modal-engineering.webp
**Uso:** Modal de engenharia | **Tamanho:** 2560x1440 | **Grupo:** UI e texturas
**Prompt:** abstract dark spacecraft blueprint grid with faint lines and no labels, low contrast, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-UI-005 - bg-modal-emergency.webp
**Uso:** Modal de emergência | **Tamanho:** 2560x1440 | **Grupo:** UI e texturas
**Prompt:** dark red emergency-lit spacecraft wall texture, smoke haze, no signs, low detail center, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-UI-006 - bg-save-slots.webp
**Uso:** Gerenciador de partidas | **Tamanho:** 2560x1440 | **Grupo:** UI e texturas
**Prompt:** archive room with illuminated mission data cores, symmetrical shelves and empty center, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-UI-007 - bg-credits.webp
**Uso:** Créditos | **Tamanho:** 2560x1440 | **Grupo:** UI e texturas
**Prompt:** quiet view of ARK-01 crossing a star field, minimal composition with large dark text-safe area, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### IMG-UI-008 - bg-accessibility.webp
**Uso:** Acessibilidade | **Tamanho:** 2560x1440 | **Grupo:** UI e texturas
**Prompt:** neutral dark futuristic control room with soft even lighting and no focal clutter, ultra-realistic cinematic near-future space engineering, premium AAA game background, physically plausible architecture and materials, dark navy and graphite palette, brushed titanium, subtle cyan and amber practical lighting, controlled contrast, volumetric atmosphere, extremely detailed, credible scale, no readable text, no logos, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
## 18. Avatares
### AVT-DIR-001 - avatar-director-neutral-01.webp
**Função:** Diretor opção 1 | **Tamanho:** 1024x1024
**Prompt:** Brazilian male aerospace program director, age 35 to 45, calm authoritative expression, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-DIR-002 - avatar-director-neutral-02.webp
**Função:** Diretora opção 2 | **Tamanho:** 1024x1024
**Prompt:** Black Brazilian female aerospace program director, age 35 to 45, calm authoritative expression, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-DIR-003 - avatar-director-neutral-03.webp
**Função:** Diretor opção 3 | **Tamanho:** 1024x1024
**Prompt:** East Asian male aerospace program director, age 40 to 50, thoughtful expression, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-DIR-004 - avatar-director-neutral-04.webp
**Função:** Diretora opção 4 | **Tamanho:** 1024x1024
**Prompt:** South Asian female aerospace program director, age 30 to 40, focused expression, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-DIR-005 - avatar-director-neutral-05.webp
**Função:** Diretor opção 5 | **Tamanho:** 1024x1024
**Prompt:** Latino male aerospace program director, age 50 to 60, experienced expression, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-DIR-006 - avatar-director-neutral-06.webp
**Função:** Diretora opção 6 | **Tamanho:** 1024x1024
**Prompt:** Middle Eastern female aerospace program director, age 40 to 50, resilient expression, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-ENG-001 - avatar-chief-engineer.webp
**Função:** Engenheira-chefe | **Tamanho:** 1024x1024
**Prompt:** Black female chief systems engineer, age 45, intelligent, direct and composed, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-FLT-001 - avatar-flight-director.webp
**Função:** Diretor de voo | **Tamanho:** 1024x1024
**Prompt:** Latino male flight director, age 50, disciplined and analytical, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-CMD-001 - avatar-ship-commander.webp
**Função:** Comandante | **Tamanho:** 1024x1024
**Prompt:** female spacecraft commander, age 42, mixed heritage, calm under pressure, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-PIL-001 - avatar-pilot.webp
**Função:** Piloto | **Tamanho:** 1024x1024
**Prompt:** East Asian male pilot navigator, age 34, alert and precise, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-ENG-002 - avatar-flight-engineer.webp
**Função:** Engenheiro de bordo | **Tamanho:** 1024x1024
**Prompt:** White male flight engineer, age 38, practical and tired but reliable, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-MED-001 - avatar-medical-officer.webp
**Função:** Médica | **Tamanho:** 1024x1024
**Prompt:** South Asian female medical officer, age 37, empathetic and decisive, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-BIO-001 - avatar-astrobiologist.webp
**Função:** Astrobiólogo | **Tamanho:** 1024x1024
**Prompt:** Black male astrobiologist, age 32, curious and cautious, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-GEO-001 - avatar-planetologist.webp
**Função:** Planetóloga | **Tamanho:** 1024x1024
**Prompt:** Indigenous Latin American female planetologist, age 40, observant and grounded, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-PSY-001 - avatar-mission-psychologist.webp
**Função:** Psicólogo | **Tamanho:** 1024x1024
**Prompt:** Middle Eastern male mission psychologist, age 48, calm and attentive, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
### AVT-TEC-001 - avatar-fabrication-technician.webp
**Função:** Técnica | **Tamanho:** 1024x1024
**Prompt:** White female fabrication technician, age 29, energetic and resourceful, ultra-realistic professional near-future aerospace portrait, neutral dark studio background, chest-up, centered, consistent uniform without logos, soft cinematic light, no text, no watermark
**Negativo:** cartoon, anime, fantasy magic, retro pulp, low resolution, blurry, distorted geometry, duplicated objects, readable text, brand logos, NASA insignia, watermark, UI overlay, game HUD
## 19. Prompt mestre do Codex
```text
Você está trabalhando em **LAST HORIZON - Global Space Agency Simulator**, um PWA mobile-first em HTML, CSS e JavaScript modular, compatível com GitHub Pages e preparado para conversão futura em APK. A agência fictícia oficial é **GSEA - Global Space Exploration Agency**, o programa é **PROJECT HAVEN**, a nave é **ARK-01** e a assistente é **AURA - Autonomous Unified Response Assistant**.

REGRAS INVIOLÁVEIS:
1. Antes de alterar arquivos, audite o estado atual, preserve tudo que funciona e identifique dependências.
2. O jogo é horizontal. Em retrato, mostrar bloqueio elegante de rotação.
3. Interface utilizável por toque, mouse e teclado; alvo mínimo de toque 44 px.
4. Não usar serviços, APIs, mapas, fontes ou bibliotecas pagas.
5. Não usar marca, logotipo, uniforme ou alegação de parceria com a NASA.
6. Estado centralizado; UI nunca mantém cópia divergente do estado de simulação.
7. Aleatoriedade crítica usa seed registrada e reproduzível.
8. Falhas possuem causa, fatores, sintomas, propagação, detecção e mitigação.
9. Saves em IndexedDB com migração, checksum, autosave e recuperação; nunca apagar silenciosamente.
10. Instrumentos são SVG/HTML/Canvas; fundos não contêm ponteiros, números, textos ou luzes funcionais.
11. Textos visíveis vêm do sistema de idioma.
12. Sem comentários de desenvolvimento na interface final: não exibir fase, versão de teste, futuro DLC, TODO ou instruções para Codex.
13. Ao concluir, auditar console, rotas, responsividade, offline, saves, acessibilidade e regressões.

```
## 20. Checklist de release
- Console sem erros.
- PWA instalável e offline.
- Saves novos, antigos, exportados e corrompidos testados.
- Todas as rotas acessíveis por toque e teclado.
- Nenhum texto interno de desenvolvimento na interface.
- Fundos comprimidos em WebP/AVIF com fallback.
- Instrumentos funcionais e não desenhados no fundo.
- Toda falha crítica gera log e investigação.
- Campanha possui caminhos de recuperação e finais testados.
- Créditos e licenças completos.
- Release publicada em pasta limpa.
