# Estado persistido

O saveVersion atual é `11`. Os domínios persistidos são `meta`, `profile`, `campaign`, `time`, `economy`, `agency`, `ship`, `systems`, `crew`, `mission`, `operations`, `cinematics`, `astronomy`, `science`, `colony`, `logs` e `ui`.

`operations` registra ciclo, reputação, patente, missões concluídas ou comprometidas, contrato ativo, quadro procedural e último debriefing. A migração cria esse domínio para saves antigos sem alterar atos, nave, tripulação ou colônia.

`mission.rendezvous` preserva posição e velocidade relativas, atitude, velocidades angulares, propelente RCS, tempo, menor distância e resultado. `mission.rendezvousHistory` mantém até vinte tentativas com contexto e informa se o resultado já afetou a pontuação. `cinematics` reserva o histórico para vídeos e falas opcionais.

- `meta.seed` e `meta.rngState` reproduzem decisões aleatórias.
- `ship.design` é a única fonte da configuração; massa, energia, térmica e delta-v são derivados.
- `mission.testsCompleted`, `risks` e `logs.failures` preservam a cadeia de evidência.
- `science.targets[*].confidence` pondera habitabilidade; nenhum mundo recebe certeza instantânea.
- `logs.events` registra a origem humana ou sistêmica de cada transição.

O importador aceita versões anteriores, adiciona estruturas ausentes e nunca remove decisões existentes.
# Schema de voo — versões 9 a 11

O bloco `mission.flight6d` persiste posição/velocidade cartesianas, atitude, velocidades angulares, controles, estágio, propelente, massa, integridade, objetivos e falhas. Ao alcançar uma órbita estável, `commitFlightToOrbit` transfere periastro, apoastro e propelente para `mission.orbit`, mantendo um único encadeamento físico entre lançamento e navegação.
