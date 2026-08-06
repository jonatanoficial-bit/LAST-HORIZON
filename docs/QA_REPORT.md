# Relatório de qualidade — release 4.4.0

Data: 6 de agosto de 2026

## Fontes analisadas

- Bíblia Oficial em Markdown, 1.105 linhas, incluindo escopo, 38 telas, 45 fases e manifesto visual.
- Bíblia Oficial em PDF, 53 páginas. As duas cópias PDF enviadas têm SHA-256 idêntico.
- DOCX oficial, prompt inicial, schema de estado, fases estruturadas e 128 prompts de imagem.
- O pacote de produção original completo foi preservado em `docs/production-bible/`.

## Verificações automatizadas

- 8/8 testes aprovados: seed determinística, integração, economia de testes, ciência por confiança, recursos finitos, final, checksum e migração.
- 59 entidades de jogo validadas, sem IDs duplicados.
- 11 etapas jogáveis e 3 idiomas-base presentes.
- 9 referências do shell resolvidas.
- Sintaxe de `app.js` e `service-worker.js` aprovada pelo Node.js.

## Percurso real no navegador

Uma campanha foi percorrida do menu ao epílogo: perfil, política pública, quatro componentes, quatro testes, seis tripulantes, treinamento, lançamento, ascensão, quatro ciclos de cruzeiro, eventos, duas sondas, destino, pouso, quatro construções, governo e final. Resultado: fluxo completo sem erro de console.

- Desktop: composição principal, estados e navegação verificados visualmente.
- 640×360: menu integral visível, controles mantêm pelo menos 44 px.
- Retrato 360×640: bloqueio de orientação e instrução de rotação visíveis.
- Teclado: elementos usam controles nativos e foco visível.
- Console: zero erros no percurso limpo final.

## Offline e saves

O shell, dados, módulos, arte WebP/PNG e ícone estão no precache. A atualização troca o cache da aplicação e não acessa o banco de saves. O navegador de teste não expôs emulação de rede desligada; por isso a transição online→offline foi verificada estruturalmente, não por chaveamento físico da rede. IndexedDB possui fallback local, checksum, migração e exportação/importação; a lógica de checksum e migração passou em testes automatizados.

## Limites assumidos

Esta é uma vertical slice integral, não o volume final AAA. O caminho de campanha é completo e rejogável por seed, mas ainda não possui as centenas de componentes, eventos, personagens, artes, horas narrativas e ciclos de balanceamento descritos em `commercial-roadmap.md`. A interface não exibe essa observação; ela está somente na documentação de produção.

## Arte principal

Gerada com o fluxo integrado de imagem, seguindo o prompt `IMG-BRAND-005`: observação orbital da Terra em colapso controlado, ARK-01 em construção, janela panorâmica, área escura para menu, engenharia plausível, paleta navy/grafite/ciano/âmbar, sem texto, HUD, logotipo ou identidade NASA. A entrega inclui WebP comprimido e PNG de fallback.
