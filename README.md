# LAST HORIZON — Global Space Agency Simulator

Versão 6.0.1: campanha narrativa, tutorial guiado por especialistas e simulador espacial offline inspirado na Bíblia Oficial do PROJECT HAVEN. Você assume a direção da GSEA, conquista apoio público, integra a ARK-01, certifica sua tripulação, conduz lançamento e cruzeiro, analisa mundos e funda uma colônia cujo futuro depende das suas decisões.

## Como jogar no Windows

1. Extraia todo o ZIP.
2. Abra a pasta `LAST-HORIZON`.
3. Dê dois cliques em `INICIAR_JOGO.bat`.
4. Mantenha a janela do inicializador aberta enquanto joga.

O jogo abre em `http://localhost:8765/`. Também pode ser publicado no GitHub Pages ou servido por qualquer servidor HTTP estático. Depois do primeiro carregamento, o núcleo fica disponível offline.

## O que há nesta versão

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
