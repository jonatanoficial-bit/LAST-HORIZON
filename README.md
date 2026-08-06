# LAST HORIZON — Global Space Agency Simulator

Versão 4.6.0: campanha narrativa, tutorial guiado por especialistas e simulador espacial offline inspirado na Bíblia Oficial do PROJECT HAVEN. Você assume a direção da GSEA, conquista apoio público, integra a ARK-01, certifica sua tripulação, conduz lançamento e cruzeiro, analisa mundos e funda uma colônia cujo futuro depende das suas decisões.

## Como jogar no Windows

1. Extraia todo o ZIP.
2. Abra a pasta `LAST-HORIZON`.
3. Dê dois cliques em `INICIAR_JOGO.bat`.
4. Mantenha a janela do inicializador aberta enquanto joga.

O jogo abre em `http://localhost:8765/`. Também pode ser publicado no GitHub Pages ou servido por qualquer servidor HTTP estático. Depois do primeiro carregamento, o núcleo fica disponível offline.

## O que há nesta versão

- Vídeo oficial `Into LAST HORIZON` integrado antes do prólogo interativo.
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

## Vídeos cinematográficos

As instruções estão em `assets/video/README.md`. Os prompts completos para gerar os seis vídeos curtos no Grok estão em `docs/VIDEOS_CURTOS_GROK.md`. Basta usar os nomes indicados e habilitar cada item em `flight-manifest.json`.

## Validação técnica

Com Node.js 20 ou superior: `npm test`, `npm run validate` e `npm run audit`. Não há dependências de runtime nem serviços pagos.

O estado central fica em `src/core/store.js`; os cálculos ficam em `src/sim/simulation.js`; persistência em `src/data/save-manager.js`; narrativa em `data/story.json`. A documentação original está preservada em `docs/source-package/` e `docs/production-bible/`.
