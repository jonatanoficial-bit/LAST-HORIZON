# LAST HORIZON — Global Space Agency Simulator

Versão 4.5.0: campanha narrativa, tutorial guiado por especialistas e simulador espacial offline inspirado na Bíblia Oficial do PROJECT HAVEN. Você assume a direção da GSEA, conquista apoio público, integra a ARK-01, certifica sua tripulação, conduz lançamento e cruzeiro, analisa mundos e funda uma colônia cujo futuro depende das suas decisões.

## Como jogar no Windows

1. Extraia todo o ZIP.
2. Abra a pasta `LAST-HORIZON`.
3. Dê dois cliques em `INICIAR_JOGO.bat`.
4. Mantenha a janela do inicializador aberta enquanto joga.

O jogo abre em `http://localhost:8765/`. Também pode ser publicado no GitHub Pages ou servido por qualquer servidor HTTP estático. Depois do primeiro carregamento, o núcleo fica disponível offline.

## O que há nesta versão

- Prólogo cinematográfico em quatro cenas e slot pronto para o vídeo oficial.
- Onze atos guiados, com objetivo visível e explicações da equipe a cada etapa.
- Mensagens de consequência em formato de turno antes da progressão.
- Onze retratos cinematográficos e seis ambientes originais.
- Cabine com trajetória animada, instrumentos funcionais, fases e controle de potência.
- Universo procedural por seed local, sem depender de API, conta ou conexão.
- Construção da ARK-01, testes, falhas causais, tripulação e treinamento.
- Lançamento, cruzeiro, eventos, ciência, sondas, pouso, colônia e epílogo calculado.
- Expedição Infinita, Simulador de Sistemas, Museu e Memorial.
- Autosave, slots, exportação/importação, checksum e migração de saves.
- Interface horizontal responsiva, teclado, contraste, texto ampliado e movimento reduzido.

## Adicionar o vídeo do prólogo

As instruções estão em `assets/video/README.md`. Em resumo, coloque o arquivo em `assets/video/prologo.mp4`, adicione opcionalmente `prologo.vtt` e habilite o vídeo em `video-manifest.json`. Se não houver vídeo, o prólogo ilustrado funciona normalmente.

## Validação técnica

Com Node.js 20 ou superior: `npm test`, `npm run validate` e `npm run audit`. Não há dependências de runtime nem serviços pagos.

O estado central fica em `src/core/store.js`; os cálculos ficam em `src/sim/simulation.js`; persistência em `src/data/save-manager.js`; narrativa em `data/story.json`. A documentação original está preservada em `docs/source-package/` e `docs/production-bible/`.
