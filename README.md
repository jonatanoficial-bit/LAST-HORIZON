# LAST HORIZON — Global Space Agency Simulator

Versão jogável completa e offline do PROJECT HAVEN, construída a partir da Bíblia Oficial fornecida. Você dirige a GSEA, integra a ARK-01, compra evidência por testes, certifica tripulação, conduz lançamento e cruzeiro, estuda planetas, pousa, funda a colônia e recebe um epílogo calculado pelas decisões tomadas.

## Jogar

No Windows, dê dois cliques em `INICIAR_JOGO.bat`. O navegador abrirá em `http://localhost:8765/`. Mantenha a janela do inicializador aberta enquanto joga.

Também é possível publicar a pasta inteira no GitHub Pages ou servir com qualquer servidor HTTP estático. Após o primeiro carregamento, o service worker mantém o núcleo do jogo disponível offline.

## Controles

- Toque ou mouse: todos os elementos interativos têm alvo mínimo de 44 px.
- Teclado: `Tab`, `Shift+Tab`, `Enter`, `Espaço` e teclas nativas de formulário.
- Orientação: o jogo exige horizontal em dispositivos móveis.
- Opções: alto contraste, texto ampliado, movimento reduzido, paleta daltônica, áudio e PT/EN/ES para a interface-base.

## Saves

Autosave e slots usam IndexedDB, com fallback local, checksum, migração e exportação/importação JSON. Um checksum inválido nunca é apagado silenciosamente; o jogo informa a falha e preserva o registro.

## Modos

- Campanha PROJECT HAVEN: progressão completa do Ato I ao epílogo.
- Expedição Infinita: orçamento e pressão inicial variam por seed compartilhável.
- Simulador de Sistemas: falhas de suporte de vida, energia, térmica e casco com mitigação causal.
- Museu e Memorial: decisões, falhas, sintomas, propagação, detecção e mitigação.

## Validação técnica

Com Node.js 20 ou superior: `npm test`, `npm run validate` e `npm run audit`. O jogo não possui dependências de runtime nem serviços pagos.

## Estrutura

O estado é centralizado em `src/core/store.js`; cálculos e causalidade ficam em `src/sim/simulation.js`; persistência está em `src/data/save-manager.js`; dados balanceáveis e narrativos ficam em `data/`. A documentação original enviada foi preservada em `docs/source-package/`.
