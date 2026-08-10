# Falhas conhecidas

## LH-FLIGHT-001 — Voo bloqueado após o vídeo de ignição

- **Estado:** resolvido na versão 12.0.0; mantido como registro de regressão.
- **Prioridade:** crítica / bloqueia a campanha.
- **Versão observada:** 11.0.1, publicação Vercel, rota `#/flight`.
- **Registro:** 2026-08-08.
- **Evidência:** `docs/evidence/LH-FLIGHT-001-after-ignition.png`.

### Estado reproduzido

Após autorizar a ignição, o vídeo `01-launch-ignition.mp4` é reproduzido corretamente. Quando termina, a cabine retorna com telemetria incoerente ou congelada: altitude 0,00 km, velocidade aproximada de 465 m/s, pitch e yaw em 90°, T+40 s e periastro negativo. A missão não continua automaticamente e os comandos manuais não produzem movimento visual observável.

### Sintomas confirmados pelo jogador

1. O vídeo de ignição termina normalmente.
2. A visão 3D fica visualmente estática.
3. Arrastar o mouse altera números/atitude, mas não muda a câmera de forma perceptível.
4. Guidance, controles manuais e continuidade automática não avançam a ascensão.
5. Não existe uma saída funcional para prosseguir, resultando em bloqueio da campanha.

### Investigação necessária na retomada

- Verificar se o ciclo `requestAnimationFrame` e o controlador de voo são remontados depois que a camada cinematográfica é removida.
- Confirmar que `igniteFlight`, `stepFlight` e o renderizador WebGL usam a mesma instância persistida de `mission.flight6d`.
- Auditar o estado de pausa e o relógio após a Promise do vídeo, incluindo falha de autoplay, `ended`, `skip` e fechamento manual.
- Verificar se o WebGL recebe pose/câmera atualizadas; números mudando sem imagem indica possível separação entre telemetria e renderização.
- Reproduzir em Chrome desktop e celular com save existente e campanha nova.
- Criar recuperação antibloqueio: reiniciar a fase de voo e retornar à contagem regressiva sem perder toda a campanha.

### Critérios obrigatórios para encerrar a falha

- O final do vídeo sempre devolve o controle ao simulador e inicia o avanço físico.
- Guidance produz ascensão contínua, Max-Q, separação e inserção orbital.
- Controles manuais alteram atitude e visão 3D de forma clara.
- Arrastar mouse/toque move a câmera, sem alterar indevidamente a atitude da nave.
- Pausar, pular tutorial e pular vídeo não interrompem o loop.
- Se WebGL ou vídeo falhar, aparece uma rota de recuperação em vez de uma tela presa.
- Teste automatizado cobre a transição: ignição → vídeo concluído → primeiro passo físico → imagem/câmera atualizada.

### Resolução implementada em 2026-08-10

- A ignição altera o estado físico antes de abrir o vídeo e usa um bloqueio temporário com liberação garantida em `finally`.
- A migração saveVersion 13 remove travas cinematográficas persistidas em saves existentes.
- O renderizador ganhou céu atmosférico, nuvens e torre móvel; a câmera vertical deixou de exibir apenas o fundo espacial escuro.
- Perda ou falha do WebGL substitui o canvas por uma vista 2D funcional alimentada pela mesma telemetria.
- O modo Comandante executa automaticamente guidance e separação; a pilotagem manual permanece opcional.
- O botão **RECUPERAR VOO** reinicia relógio, guidance e imagem sem apagar a campanha.

### Reforço visual e tutorial na versão 12.1.0

- O shader ganhou referências direcionais visíveis — nuvens panorâmicas, Sol, horizonte e torre deslocável — para que o arraste produza movimento inequívoco.
- O fallback 2D também usa yaw e pitch da visão livre; a câmera deixa de alterar somente números quando WebGL não está disponível.
- O HUD mostra os graus de visão em tempo real e o tutorial só libera a etapa de câmera depois de reconhecer um gesto.
- A primeira ascensão mantém um painel instrucional fixo e pulável, com os marcos físicos do perfil nominal e distinção explícita entre separação de estágio e acoplagem.
