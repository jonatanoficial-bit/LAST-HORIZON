# Changelog

## 13.0.0 — 2026-08-10

- Substituído o mapa orbital decorativo por GPS heliocêntrico interativo com órbitas, posições e escalas lineares calculadas a partir das Tabelas 1/2 do JPL.
- Adicionados zoom dos planetas internos, gigantes e Sistema Solar completo, seleção direta no canvas e fonte científica visível.
- A transferência calcula a posição do alvo na data de chegada, desenha a elipse de Hohmann e move a ARK-01 conforme o progresso persistido.
- Adicionados atraso de comunicação, data de chegada, erro de fase, janela, delta-v e parecer de habitabilidade ao plano de voo.
- Criado conselho de comando em formato RPG com três briefings e nove ordens possíveis; decisões alteram missões orbitais futuras, reputação e recursos.
- Progressão de fase agora exige parecer do conselho, nó orbital e rota assinada, com mensagens específicas para cada pendência.
- Novo horizonte espacial cinematográfico original integrado ao WebGL e ao fallback 2D, substituindo a aparência azul abstrata.
- Service worker atualizado para incluir a arte e os novos módulos integralmente offline.
- Migração saveVersion 15 preserva a campanha e força o recálculo apenas de rotas legadas sem geometria física.
- 75/75 testes automatizados aprovados; 59 entidades, 11 etapas, 3 idiomas e 52 referências locais validadas.

## 12.1.0 — 2026-08-10

- Adicionado tutorial persistente de seis etapas, visível durante toda a primeira ascensão e ausente nas missões seguintes após conclusão ou salto.
- O tutorial agora valida o gesto de câmera e exibe instruções, limites físicos e telemetria ao vivo sem depender de orientação ou armazenamento global do navegador.
- Documentados no cockpit os marcos do perfil nominal: Max-Q, separação B1, linha de Kármán e inserção orbital.
- Adicionados yaw e pitch da visão livre no HUD, nuvens panorâmicas, Sol, horizonte reforçado e deslocamento da torre no WebGL.
- A visão 2D de segurança passou a responder ao arraste, eliminando a impressão de fundo azul estático quando WebGL não está disponível.
- Migração saveVersion 14 preserva campanhas e não reabre o tutorial para uma missão que já chegou à navegação orbital.

## 12.0.0 — 2026-08-10

- Resolvida a falha crítica LH-FLIGHT-001: a ignição não depende mais do encerramento do vídeo para criar um estado de voo válido.
- Adicionada recuperação de save pausado por cinematográfica e fallback visual 2D quando WebGL falha ou perde o contexto.
- Adicionados atmosfera, nuvens e torre móvel à visão da subida, mantendo a Terra e o espaço no mesmo renderizador.
- Adicionados modos Comandante e Pilotagem Manual, ordens à tripulação e separação automática no perfil comandado.
- Corrigida a velocidade indicada em solo: 0 m/s relativo à superfície, preservando separadamente a velocidade inercial.
- Adicionado mapa GPS interplanetário baseado em posições JPL aproximadas, com escolha livre entre os planetas reais.
- Adicionados cálculo de Hohmann, distância, janela de fase, velocidade média, delta-v e parecer de habitabilidade.
- A rota confirmada tornou-se requisito para criar o nó de partida e prosseguir ao cruzeiro.
- Migração saveVersion 13 preserva campanhas existentes e recupera voos presos após a ignição.

## 11.0.1 — 2026-08-08

- Corrigido bloqueio crítico quando o orçamento acaba após as quatro decisões de engenharia.
- Adicionado protocolo de reestruturação com crédito emergencial e consequências persistentes.
- Adicionado reinício completo da missão preservando as configurações do jogador.
- Adicionado resgate financeiro mínimo para impedir bloqueio posterior no programa de testes.
- Mantida compatibilidade com os saves da versão 11.0.0.

## 11.0.0 — 2026-08-08

- Integra seis faixas originais em três climas contextuais, com alternância para reduzir repetição.
- Adiciona controles independentes de Música, Falas e Efeitos/Vídeos, persistidos no saveVersion 12.
- Reduz automaticamente a música durante falas e sequências cinematográficas.
- Ativa as dezoito falas gravadas e conecta cada personagem ao evento narrativo correspondente.
- Ativa os doze vídeos e conecta detritos, entrada atmosférica, colisão, pouso, falha e primeiro contato.
- Impede sobreposição de vozes e cinematics, preservando legendas e liberando a mixagem após interrupções.
- Atualiza o ativador de mídia para reconhecer 12 vídeos, 18 vozes e 6 músicas.

## 10.0.2 — 2026-08-08

- Remove a regra duplicada do `.gitignore` que impedia `assets/video/prologo.mp4` de chegar ao GitHub.
- Confirma o prólogo compacto de 82.920.366 bytes, sem recompressão e com `moov` antes de `mdat`.
- Torna o acesso ao prólogo explícito no menu e remove a consulta de versão da URL do MP4 local.
- Corrige o tutorial que elevava o para-brisa acima do cartão e interceptava os toques em `PULAR TUTORIAL`.
- Adiciona fechamento idempotente, delegação de botões, tecla `Esc` e tratamento correto da orientação do celular.
- Atualiza o cache do aplicativo para substituir imediatamente a versão defeituosa.

## 10.0.1 — 2026-08-07

- Corrige a regra responsiva que ocultava todos os controles da cabine em celulares na horizontal.
- Adiciona botão de ignição/decolagem destacado, controles críticos fixos e suporte a arraste para olhar ao redor.
- Adiciona centralização de câmera e tutorial guiado de cinco passos, pulável e reabrível.
- Conecta a câmera WebGL ao deslocamento de visão sem alterar a atitude física da nave.
- Integra os seis primeiros vídeos ao contexto real da simulação: ignição, Max-Q, separação, órbita, partida e docking.
- Mantém cenas futuras opcionais e garante fallback sem travar a missão quando a mídia estiver ausente.

## 10.0.0 — 2026-08-07

- Adiciona simulador jogável de rendezvous e acoplagem orbital com dinâmica relativa Clohessy–Wiltshire.
- Modela RCS, propelente, atitude, Coriolis, gravidade diferencial, fechamento, corredor e contato estrutural.
- Adiciona autoaproximação didática, controle manual em seis eixos, aceleração temporal e interface responsiva.
- Conecta acoplagem ou colisão ao risco, pontuação, confiança e integridade da campanha operacional.
- Evita exploração por repetição: apenas a primeira tentativa de cada contexto altera a pontuação.
- Adiciona diretor cinematográfico para doze vídeos opcionais com fallback sem bloquear o jogo.
- Adiciona manifesto de dezoito vozes e roteiro completo para produção gratuita no BandLab.
- Inclui prompts completos para gerar cenas curtas no Grok mantendo continuidade visual da ARK-01.
- Migra saves para o schema 11 sem apagar campanhas ou operações anteriores.

## 9.0.0 — 2026-08-07

- Adiciona campanha operacional ilimitada com oito famílias de contratos, três atos decisórios por missão e geração determinística por seed.
- Conecta decisões a combustível, risco, habilidade da tripulação, fadiga, casco, confiança, ciência, orçamento, tempo e reputação.
- Adiciona cinco patentes operacionais, histórico persistente, debriefing e renovação de janelas.
- Inclui reabastecimento orbital de contingência para impedir bloqueio permanente de campanhas longas.
- Adiciona sala de operações cinematográfica original e integração completa ao PWA offline.
- Renderiza os locais de pouso e o horizonte da colônia em WebGL procedural com terreno e atmosfera em tempo real.
- Migra saves para o schema 10 sem apagar o progresso das versões anteriores.
- Mantém o vídeo oficial compactado, a cabine 3D, o globo real, o mapa do Sistema Solar e todas as fases anteriores.

## 8.0.0 — 2026-08-07

- Adiciona renderizador WebGL offline específico para o voo da ARK-01.
- Renderiza Terra texturizada, iluminação diurna/noturna, atmosfera, nuvens, estrelas e aquecimento.
- Adiciona modelo tridimensional multiestágio da nave e pluma vinculada ao empuxo físico.
- Transforma a rota de voo em cabine imersiva, ocultando a aparência de dashboard lateral.
- Adiciona HUD, câmeras 3D, orientação contextual do piloto e estados visuais de abortagem e órbita.
- Adiciona áudio procedural reativo a empuxo, Max-Q e eventos de rádio.
- Inclui três níveis de qualidade e fallback bidimensional para dispositivos sem WebGL.
- Mantém o vídeo oficial, campanha, saves, atlas astronômico e funcionamento offline.

## 7.0.0 — 2026-08-07

- Substitui a ascensão animada por um integrador físico de voo 6-DOF.
- Calcula gravidade, atmosfera, rotação terrestre, vento, arrasto, pressão dinâmica, aquecimento e carga g.
- Modela massa variável, combustível, impulso específico, throttle e separação de dois estágios.
- Adiciona guiamento automático com inserção orbital, modo manual, SAS, abortagem e aceleração temporal.
- Redesenha a cabine com horizonte móvel, instrumentos conectados, três câmeras e solução apoastro/periastro.
- Migra saves para o schema 9 e preserva campanhas anteriores.
- Adiciona quatro testes determinísticos de atmosfera, atitude, separação e inserção orbital.

## 6.0.1 — 2026-08-07

- Reorganiza `prologo.mp4` para fast start, preservando integralmente o payload audiovisual.
- Move o átomo `moov` de 82.793.180 bytes para o início do MP4 e ajusta 6.884 offsets internos.
- Trata bloqueio de autoplay com reprodução silenciosa e ativação de som por toque.
- Adiciona estados de carregamento, buffering, conexão lenta, erro e nova tentativa.
- Adiciona replay da introdução no menu e renovação forçada do cache PWA.
- Acrescenta testes específicos de estrutura, hash e controles de reprodução.

## 6.0.0 — 2026-08-07

- Adiciona o Atlas do Sistema Solar, integrado ao menu e à campanha.
- Incorpora globo terrestre WebGL com textura NASA Blue Marble e luz solar dependente da data.
- Adiciona centros de lançamento reais e coordenadas no globo.
- Calcula posições planetárias por elementos keplerianos JPL para 1800–2050.
- Adiciona propagação de tempo, escala linear/logarítmica, seleção e dossiês planetários.
- Preserva funcionamento offline, celulares em horizontal e saves das versões anteriores.
- Eleva o schema de save para 8 e atualiza o cache PWA.

## 5.0.0 — 2026-08-07

- Prólogo antigo de 148,7 MB substituído pela versão compacta de 82,9 MB fornecida pelo autor.
- Corrigido o soft lock móvel na revisão de Arquitetura Habitável quando nenhuma proposta cabia no orçamento.
- Cartões de proposta permanecem analisáveis; insuficiência abre um protocolo de contingência com custo político.
- Novo modelo orbital terrestre de dois corpos com equação vis-viva e propagação kepleriana.
- Mapa orbital mostra nave, órbita, anomalia verdadeira e posição do nó.
- Nós de circularização, elevação, plano e partida têm vetores prograde/normal/radial e delta-v calculado.
- Queimas exigem janela angular, consomem propelente pela equação do foguete e ficam registradas.
- Instrumentos digitais, analógicos, mapa, combustível e progressão de voo usam o mesmo estado orbital.
- Migração de saves para versão 7 preserva campanhas que já estavam em órbita ou cruzeiro.
- Atualização do service worker ignora cache HTTP antigo para reduzir versões misturadas em dispositivos móveis.

## 4.8.0 — 2026-08-06

- Seleção livre de seis retratos substituída por seis estações operacionais obrigatórias.
- Oito candidatos concorrem por comando, voo, engenharia, medicina, ciência e operações.
- Entrevistas guiadas revelam resposta sob pressão, força, risco humano e valores.
- Uma pessoa não pode ocupar duas estações; transferências reabrem automaticamente a vaga anterior.
- Relações positivas e tensões entre pares alteram a coesão calculada da equipe.
- Três simulações obrigatórias consomem orçamento e prazo antes da certificação.
- Fadiga individual cresce por função durante o cruzeiro e aumenta o risco de lançamento e manutenção.
- Rotação de descanso reduz fadiga em troca de quatorze dias e progresso de rota.
- Saves anteriores são migrados para estações equivalentes e permanecem certificados quando já haviam concluído a etapa.

## 4.7.0 — 2026-08-06

- A antiga grade de componentes foi substituída por uma Sala de Engenharia em tela ampla.
- Quatro decisões sequenciais são apresentadas pelo Eng. Rafael Costa, com objetivo e restrição explícitos.
- Cada sistema oferece três propostas, custo, prazo, influência, confiança e risco dominante.
- Especialistas defendem e contestam cada proposta por meio de avatares cinematográficos.
- Massa, energia, térmica e delta-v são recalculados antes da assinatura.
- Contratos comprometidos consomem recursos, avançam turnos e podem ser reabertos com penalidade sem reembolso.
- Revisão final bloqueia configurações fisicamente inválidas ou sem reserva mínima para ensaios.
- Migração de saves atualizada para a versão 5 e cache offline renovado.

## 4.6.0 — 2026-08-06

- Vídeo oficial `Into LAST HORIZON` integrado à abertura da campanha.
- Nova cabine física fotorealista criada especificamente para instrumentação dinâmica.
- Altitude, velocidade, aceleração, empuxo, atitude, propelente e MET atualizados continuamente.
- Instrumentos analógicos com ponteiros reais e leitura digital sincronizada.
- Para-brisa procedural com atmosfera, horizonte terrestre, órbita e espaço profundo em movimento.
- Três câmeras: cabine, externa e trajetória; modo tela cheia incluído.
- Fases de voo temporizadas, confirmação por etapa e vibração proporcional ao regime de motor.
- Manifesto e prompts para cinco vídeos de voo e um vídeo de explosão/game over.

## 4.5.0 — 2026-08-06

- Prólogo cinematográfico ilustrado em quatro cenas e encaixe configurável para vídeo.
- Tutorial guiado durante os onze atos, com objetivos, dicas e especialistas contextuais.
- Decisões encerradas por relatórios de consequência em formato de turno.
- Onze avatares de tripulação e seis cenários cinematográficos originais em WebP e PNG.
- Cabine espacial redesenhada com trajetória, telemetria, instrumentos e fases operacionais.
- Observatório procedural determinístico, totalmente local e sem dependência de API externa.
- Novo estado narrativo, migração de saves para versão 4 e cache PWA `4.5.0-cinematic`.
- Novos testes de integridade narrativa e presença dos recursos visuais.

## 4.4.0 — 2026-08-06

- Campanha sistêmica completa em onze etapas, do mandato da GSEA ao epílogo.
- Projetista da ARK-01 com massa, energia, térmica, delta-v, capacidade e conflitos.
- Testes, risco, falhas causais, tripulação, treinamento, lançamento e abortagem recuperável.
- Cruzeiro determinístico por seed, eventos, ciência com confiança, sondas e escolha planetária.
- Entrada/descida/pouso, fundação da colônia, pesquisa, governança e finais calculados.
- Expedição procedural, simulador livre, Memorial e AURA contextual.
- IndexedDB, checksum, slots, autosave, migração e importação/exportação offline.
- PWA, cache seguro, bloqueio de retrato, toque/teclado e opções de acessibilidade.
- Arte principal original; instrumentos e telemetria continuam ligados ao estado e renderizados por código.
