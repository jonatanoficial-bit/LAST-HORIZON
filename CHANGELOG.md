# Changelog

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
