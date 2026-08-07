# Estado persistido

O saveVersion atual é `3`. Os domínios persistidos são `meta`, `profile`, `campaign`, `time`, `economy`, `agency`, `ship`, `systems`, `crew`, `mission`, `science`, `colony`, `logs` e `ui`.

- `meta.seed` e `meta.rngState` reproduzem decisões aleatórias.
- `ship.design` é a única fonte da configuração; massa, energia, térmica e delta-v são derivados.
- `mission.testsCompleted`, `risks` e `logs.failures` preservam a cadeia de evidência.
- `science.targets[*].confidence` pondera habitabilidade; nenhum mundo recebe certeza instantânea.
- `logs.events` registra a origem humana ou sistêmica de cada transição.

O importador aceita versões anteriores, adiciona estruturas ausentes e nunca remove decisões existentes.
# Schema de estado — versão 9

O bloco `mission.flight6d` persiste posição/velocidade cartesianas, atitude, velocidades angulares, controles, estágio, propelente, massa, integridade, objetivos e falhas. Ao alcançar uma órbita estável, `commitFlightToOrbit` transfere periastro, apoastro e propelente para `mission.orbit`, mantendo um único encadeamento físico entre lançamento e navegação.
