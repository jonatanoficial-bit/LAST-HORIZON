# LAST HORIZON — Global Space Agency Simulator

Versão 11.0.1: simulador espacial offline e gratuito inspirado na Bíblia Oficial do PROJECT HAVEN. Esta correção emergencial elimina bloqueios por falta de orçamento sem apagar as consequências das decisões.

- Projeto inválido e sem verba: reestruturação emergencial com 80 bi, dívida, atraso e perda de apoio, confiança e moral.
- Alternativa definitiva na mesma tela: reiniciar toda a missão preservando idioma, acessibilidade e mixagem de áudio.
- Programa de testes sem verba: financiamento apenas da sequência mínima necessária para avançar.
- Saves existentes, inclusive o turno 012 mostrado no erro, continuam compatíveis e recebem as novas rotas automaticamente.

## Como jogar no Windows

1. Extraia todo o ZIP.
2. Abra a pasta `LAST-HORIZON`.
3. Dê dois cliques em `INICIAR_JOGO.bat`.
4. Mantenha a janela do inicializador aberta enquanto joga.

O jogo abre em `http://localhost:8765/`. Também pode ser publicado no GitHub Pages ou servido por qualquer servidor HTTP estático. Depois do primeiro carregamento, o núcleo fica disponível offline.

Para adicionar vídeos do Grok ou vozes do BandLab, copie os arquivos para as pastas indicadas na documentação e dê dois cliques em `ATIVAR_MIDIA.bat`. O ativador habilita somente os arquivos realmente encontrados; mídia ausente nunca bloqueia a campanha.

## O que há nesta versão

- Seis músicas originais alternadas entre calma, suspense psicológico e perseguição conforme a situação.
- Música em 22% por padrão, falas em 90% e efeitos/vídeos em 56%, todos ajustáveis separadamente em Configurações.
- Redução automática da trilha durante falas e cinematics para manter a equipe inteligível.
- Dezoito falas gravadas, com legendas, ligadas a lançamento, voo, rendezvous, decisões, falhas, pouso e colônia.
- Doze vídeos ativos: lançamento, Max-Q, separação, órbita, partida, docking, colisão, detritos, entrada, pouso, falha e primeiro contato.
- `prologo.mp4` removido da lista de arquivos ignorados pelo Git e identificado claramente no menu como mídia local incluída.
- Tutorial da cabine sempre acima do para-brisa, com botões por delegação segura, fechamento por `Esc` e proteção contra abertura duplicada.
- Tutorial aguarda o celular ser girado para a horizontal antes de abrir.
- Botão grande `IGNIÇÃO E DECOLAR` sempre visível, inclusive em celular na horizontal.
- Câmera da cabine controlada por arraste/toque, comando `CENTRALIZAR` e controles de voo móveis restaurados.
- Tutorial de cinco passos com Jun Park, opção de pular e botão `GUIA DE VOO` para rever quando quiser.
- Todos os vídeos entregues integrados ao momento físico ou narrativo correspondente.
- Simulador de rendezvous baseado nas equações de Hill/Clohessy–Wiltshire em uma órbita terrestre de 220 km.
- Seis eixos de comando por teclado e toque, RCS com consumo, atitude, Coriolis, gravidade diferencial, corredor de aproximação e aceleração temporal.
- Autoaproximação didática que pode ser desligada a qualquer momento para controle manual.
- Acoplagem exige velocidade, alinhamento e desvio seguros; impactos danificam casco e alteram a missão ativa.
- Resultado do treinamento não pode ser repetido para acumular artificialmente pontuação ou confiança.
- Diretor cinematográfico opcional com doze encaixes de vídeo, fallback automático e botão para pular.
- Dezoito encaixes de voz com legendas, nomes de arquivo e roteiro completo para gravação no BandLab.
- Pacote de prompts do Grok para lançamento, Max-Q, separação, órbita, acoplagem, colisão, impacto, entrada, pouso e primeiro contato.
- Central cinematográfica de Operações Orbitais, acessível a partir do ato 5, com quadro de contratos e debriefing persistente.
- Oito famílias de missão — salvamento, detritos, ciência, exploração lunar, logística, manutenção, prospecção e sinais — recombinadas em ciclos ilimitados.
- Cada contrato contém três crises guiadas pela tripulação e três soluções por crise; risco, habilidade, propelente, casco, fadiga, confiança, ciência, tempo e orçamento participam do resultado.
- Progressão de carreira em cinco patentes, reputação operacional e histórico completo de êxitos e falhas.
- Reabastecimento orbital de contingência evita que uma campanha longa fique irrecuperavelmente presa por falta de propelente.
- Superfícies planetárias WebGL procedurais para os três locais de pouso, com relevo, atmosfera, céu, iluminação e voo de reconhecimento em tempo real.
- Horizonte tridimensional da colônia preserva visualmente o local selecionado e cresce junto com a campanha.
- Novo ambiente cinematográfico original da central orbital, incluído localmente em PNG e WebP e disponível offline.
- Vertical slice WebGL com Terra esférica, textura Blue Marble, atmosfera, nuvens procedurais e iluminação solar.
- Campo estelar, brilho atmosférico, cidades noturnas e aquecimento de reentrada calculados em shader.
- Modelo 3D da ARK-01 na câmera externa, com corpo multiestágio, aletas, iluminação e pluma reativa.
- Cabine em tela ampla com estrutura do para-brisa, HUD, vetor prógrado e telemetria sobre a cena.
- Áudio procedural de motor e fluxo aerodinâmico conectado ao empuxo e à pressão dinâmica.
- Comunicações contextuais de Jun Park para ignição, Max-Q, separação, linha de Kármán, costeio e órbita.
- Perfis gráficos alto, médio e leve para computadores e celulares.
- Versão 7.0.0 com voo pilotável em seis graus de liberdade: posição e velocidade 3D, pitch, yaw e roll.
- Gravidade terrestre, rotação do planeta, atmosfera em camadas, vento, arrasto, Max-Q e aquecimento aerodinâmico.
- Propulsão com massa variável, vazão por impulso específico, dois estágios e separação comandada.
- Guiamento automático físico com subida, costeio até o apoastro e queima de circularização.
- Controles por toque e teclado, SAS, guidance, throttle, aceleração temporal, pausa e abortagem.
- Cabine redesenhada com horizonte dinâmico, câmeras de cabine/externa/trajetória e solução orbital ao vivo.
- Estado completo do voo persistido no save e transferido ao módulo de manobras orbitais.
- Correção do vídeo introdutório: índice MP4 movido do final para o início sem recompressão ou perda de qualidade.
- Reprodução compatível com bloqueio de autoplay: tentativa com som, fallback silencioso e botão para ativar áudio.
- Tela de carregamento informa buffering, conexão lenta e erro de mídia; permite tentar novamente.
- Comando `ASSISTIR INTRODUÇÃO` no menu principal para rever ou testar o vídeo a qualquer momento.
- Atualização do PWA força a remoção do cache anterior e recarrega as janelas abertas uma vez.
- Atlas astronômico persistente, acessível pelo menu principal e durante toda a campanha.
- Globo terrestre WebGL interativo com textura global Blue Marble da NASA incorporada ao jogo.
- Iluminação diurna/noturna calculada para a data escolhida, arraste para rotação e zoom.
- Rede de centros de lançamento com coordenadas reais e destaque direto no globo.
- Mapa do Sistema Solar com os oito planetas e posições heliocêntricas calculadas por elementos JPL.
- Data UTC ajustável entre 1800 e 2050, propagação acelerada e sincronização com o relógio da missão.
- Escalas logarítmica e linear; seleção de planetas, distâncias, tempo-luz e dados físicos.
- Rota da ARK-01 sobreposta ao mapa depois do lançamento.
- Nova migração de save mantém campanhas anteriores e acrescenta o estado do observatório.
- Vídeo oficial `Into LAST HORIZON` integrado antes do prólogo interativo.
- Vídeo introdutório substituído pela versão compacta de 82,9 MB, adequada ao limite de arquivos do GitHub.
- Correção definitiva do bloqueio da Arquitetura Habitável: propostas nunca ficam inacessíveis por falta de verba.
- Protocolo de contingência libera reserva ou crédito emergencial com consequências políticas e de cronograma.
- Mecânica orbital de dois corpos com equação vis-viva, período, anomalia e propagação kepleriana.
- Nós de circularização, elevação de apogeu, correção de plano e partida interestelar.
- Janelas de queima, propagação até o nó e consumo calculado pela equação do foguete.
- Cabine, mapa orbital, instrumentos e reserva de propelente ligados ao mesmo estado físico persistente.
- Sala de Engenharia cinematográfica com quatro revisões técnicas guiadas pelo Eng. Rafael Costa.
- Três propostas por sistema, pareceres conflitantes da equipe e projeção física antes da assinatura.
- Orçamento, influência, confiança e cronograma afetados por cada contrato; revisão tem custo e não devolve o investimento anterior.
- Centro de Seleção com seis estações operacionais e dois candidatos possíveis por função.
- Entrevistas cinematográficas com respostas, forças, riscos humanos e valores de cada candidato.
- Relações de sinergia e conflito recalculam a coesão da equipe.
- Três exercícios obrigatórios certificam a tripulação e afetam orçamento, prazo, confiança e fadiga.
- Fadiga individual cresce durante o cruzeiro, altera risco operacional e pode ser reduzida com rotação de descanso.
- Onze atos guiados, com objetivo visível e explicações da equipe a cada etapa.
- Mensagens de consequência em formato de turno antes da progressão.
- Onze retratos cinematográficos e seis ambientes originais.
- Cabine física redesenhada com para-brisa dinâmico, vibração, telemetria contínua e instrumentos analógicos/digitais.
- Câmeras de cabine, externa e trajetória, além de modo tela cheia.
- Cinco fases de voo com altitude, velocidade, aceleração, empuxo, atitude e combustível calculados em tempo real.
- Encaixes prontos para vídeos de ignição, Max-Q, separação, órbita, partida e falha catastrófica.
- Universo procedural por seed local, sem depender de API, conta ou conexão.
- Construção da ARK-01, testes, falhas causais, tripulação e treinamento.
- Lançamento, cruzeiro, eventos, ciência, sondas, pouso, colônia e epílogo calculado.
- Expedição Infinita, Simulador de Sistemas, Museu e Memorial.
- Autosave, slots, exportação/importação, checksum e migração de saves.
- Interface horizontal responsiva, teclado, contraste, texto ampliado e movimento reduzido.

## Limite de fidelidade

O atlas é uma simulação astronômica aproximada, apropriada à leitura estratégica do jogo. Ele não substitui uma efeméride operacional. O modelo orbital planetário usa elementos JPL e dinâmica kepleriana; missões reais exigem efemérides N-corpos SPICE/Horizons, forças perturbadoras, propagação de covariância e validação independente. O plano para chegar a esse nível está em `docs/ROADMAP_SIMULADOR_REALISTA.md`.

## Vídeos cinematográficos

As instruções estão em `assets/video/README.md`. Os prompts completos para gerar os seis vídeos curtos no Grok estão em `docs/VIDEOS_CURTOS_GROK.md`. Basta usar os nomes indicados e habilitar cada item em `flight-manifest.json`.

## Validação técnica

Com Node.js 20 ou superior: `npm test`, `npm run validate` e `npm run audit`. Não há dependências de runtime nem serviços pagos.

O estado central fica em `src/core/store.js`; os cálculos ficam em `src/sim/simulation.js`; persistência em `src/data/save-manager.js`; narrativa em `data/story.json`. A documentação original está preservada em `docs/source-package/` e `docs/production-bible/`.
