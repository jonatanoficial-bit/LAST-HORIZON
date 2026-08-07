# LAST HORIZON — Global Space Agency Simulator

Versão 5.0.0: campanha narrativa, tutorial guiado por especialistas e simulador espacial offline inspirado na Bíblia Oficial do PROJECT HAVEN. Você assume a direção da GSEA, conquista apoio público, integra a ARK-01, certifica sua tripulação, conduz lançamento e cruzeiro, analisa mundos e funda uma colônia cujo futuro depende das suas decisões.

## Como jogar no Windows

1. Extraia todo o ZIP.
2. Abra a pasta `LAST-HORIZON`.
3. Dê dois cliques em `INICIAR_JOGO.bat`.
4. Mantenha a janela do inicializador aberta enquanto joga.

O jogo abre em `http://localhost:8765/`. Também pode ser publicado no GitHub Pages ou servido por qualquer servidor HTTP estático. Depois do primeiro carregamento, o núcleo fica disponível offline.

## O que há nesta versão

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

## Vídeos cinematográficos

As instruções estão em `assets/video/README.md`. Os prompts completos para gerar os seis vídeos curtos no Grok estão em `docs/VIDEOS_CURTOS_GROK.md`. Basta usar os nomes indicados e habilitar cada item em `flight-manifest.json`.

## Validação técnica

Com Node.js 20 ou superior: `npm test`, `npm run validate` e `npm run audit`. Não há dependências de runtime nem serviços pagos.

O estado central fica em `src/core/store.js`; os cálculos ficam em `src/sim/simulation.js`; persistência em `src/data/save-manager.js`; narrativa em `data/story.json`. A documentação original está preservada em `docs/source-package/` e `docs/production-bible/`.
