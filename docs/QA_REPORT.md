# Relatório de qualidade — release 5.0.0

Data: 7 de agosto de 2026

## Fontes analisadas

- Bíblia Oficial em Markdown, 1.105 linhas, incluindo escopo, 38 telas, 45 fases e manifesto visual.
- Bíblia Oficial em PDF, 53 páginas. As duas cópias PDF enviadas têm SHA-256 idêntico.
- DOCX oficial, prompt inicial, schema de estado, fases estruturadas e 128 prompts de imagem.
- O pacote de produção original completo foi preservado em `docs/production-bible/`.

## Verificações automatizadas

- 25/25 testes aprovados: campanha, economia, saves, recursos visuais, engenharia, tripulação, fadiga, órbita circular, propagação kepleriana, janela de nó, consumo de propelente e partida orbital.
- 59 entidades de jogo validadas, sem IDs duplicados.
- 11 etapas jogáveis e 3 idiomas-base presentes.
- 28 referências estáticas do shell, módulos e dados resolvidas.
- Sintaxe de `app.js` e `service-worker.js` aprovada pelo Node.js.

## Correção de progressão móvel 5.0

- Reproduzida estruturalmente a condição relatada: orçamento menor que todas as opções marcava os três cartões como desabilitados.
- Cartões sem verba agora permanecem selecionáveis e exibem claramente que exigem revisão financeira.
- Um protocolo de contingência libera a diferença exata e registra uso de reserva, crédito, prazo e perda de apoio.
- O fluxo de recuperação foi coberto por teste com orçamento zero e reserva insuficiente.
- O service worker solicita atualização sem usar o cache HTTP anterior, reduzindo mistura de versões no celular.

## Navegação orbital 5.0

- Velocidade e período de uma órbita terrestre circular de 220 km foram verificados em faixas físicas plausíveis.
- Uma propagação de um período retorna à anomalia inicial com erro menor que 0,01 grau.
- Nós exigem janela angular antes da queima e registram vetores prograde, normal e radial.
- Circularização e partida foram executadas em sequência; a reserva diminuiu pela equação do foguete.
- A progressão da cabine permanece bloqueada até a manobra obrigatória, mas oferece propagação automática até a janela.

## Vídeo compacto

- `prologo.mp4` possui 82.920.366 bytes e SHA-256 `B4DBB0C8F475865E0FBDFEC80B33E723389ED4D0CEC00FA6F22A0AFF9775E601`.
- O contêiner MP4 contém assinaturas `ftyp`, `mdat` e `moov`, vídeo AVC/H.264 e áudio AAC.
- O arquivo individual permanece abaixo do limite de 100 MB que bloqueava o envio anterior ao GitHub.

## Sala de Engenharia 4.7

- Quatro revisões e doze propostas validadas contra os componentes existentes.
- Todo especialista citado possui retrato WebP e PNG disponível.
- Compromissos descontam custo, prazo e influência, atualizam confiança e impedem assinatura duplicada.
- Revisões removem o componente, preservam o custo anterior e aplicam nova penalidade.
- A rota nuclear/compacto/fissão/leve foi exercitada integralmente e mantém validade física e 14 bi ou mais para os ensaios.
- Foram encontradas 35 combinações certificáveis dentro da reserva mínima de testes.

## Tripulação operacional 4.8

- Seis estações, oito candidatos, doze candidaturas possíveis e três treinamentos validados.
- Designação bloqueada antes da entrevista e exclusividade de estação testada.
- Uma composição completa foi entrevistada, designada e certificada pelos três módulos.
- Migração de saves antigos mantém uma campanha já certificada em estado jogável.
- Fadiga por função foi exercitada no cruzeiro; rotação de descanso reduziu a carga individual.

## Percurso real no navegador

O novo fluxo foi verificado do menu à campanha, incluindo criação de perfil, vídeo introdutório, prólogo, orientação do especialista, primeira decisão, relatório de consequência e entrada na cabine. O MP4 de 115 segundos atingiu estado de reprodução completo sem erro. Na cabine, quatro ponteiros, dois canvas, três câmeras e o fundo físico carregaram; altitude e velocidade avançaram continuamente durante a fase, e o comando permaneceu bloqueado até o término da telemetria.

- Desktop: composição principal, estados e navegação verificados visualmente.
- 640×360: a cabine ocupa a largura útil, painéis laterais são recolhidos e controles visíveis mantêm pelo menos 44 px.
- Retrato 360×640: bloqueio de orientação e instrução de rotação visíveis.
- Teclado: elementos usam controles nativos e foco visível.
- Console: zero erros no percurso limpo final.

## Offline e saves

O shell, dados, módulos, arte WebP/PNG e ícone estão no precache. A atualização troca o cache da aplicação e não acessa o banco de saves. O navegador de teste não expôs emulação de rede desligada; por isso a transição online→offline foi verificada estruturalmente, não por chaveamento físico da rede. IndexedDB possui fallback local, checksum, migração e exportação/importação; a lógica de checksum e migração passou em testes automatizados.

## Limites assumidos

Esta é uma vertical slice integral, não o volume final AAA. O caminho de campanha é completo e rejogável por seed, mas ainda não possui as centenas de componentes, eventos, personagens, artes, horas narrativas e ciclos de balanceamento descritos em `commercial-roadmap.md`. A interface não exibe essa observação; ela está somente na documentação de produção.

## Arte cinematográfica

Gerada com o fluxo integrado de imagem em modo nativo. Os retratos foram orientados como personagens cinematográficos AAA de ficção científica plausível, enquadramento de busto, uniforme grafite/navy e iluminação ciano/âmbar, sem marcas ou texto. Os cenários foram orientados como sala de missão, hangar de integração, cabine, plataforma, cruzeiro profundo e colônia em Aurelia, sem HUD ou logotipos incorporados. A entrega inclui WebP otimizado e PNG de fallback.

A cabine 4.6 foi gerada separadamente como placa fotorealista 16:9: perspectiva do assento do piloto, para-brisa amplo, ferragens aeroespaciais, três telas apagadas para composição e iluminação pré-lançamento. O exterior, os instrumentos e a telemetria são renderizados em tempo real sobre essa estrutura.
