# Arquitetura

LAST HORIZON é um PWA estático sem dependências externas. `app.js` coordena rotas, ações e renderização; toda mutação atravessa o store central. O store clona o estado, aplica a transação, registra a causa, recalcula seletores derivados e só então notifica a interface.

O motor de simulação calcula integração da nave, testes, lançamento, cruzeiro, ciência, colônia e finais. Aleatoriedade crítica usa Mulberry32 com seed e estado persistidos. Saves são envelopes com versão e checksum; migrações são aditivas.

Dados narrativos e de balanceamento vivem em JSON. Fundos não carregam instrumentos funcionais: medidores, tendências, luzes e estados são HTML/CSS ligados ao store. O service worker faz cache do shell e limpa somente caches antigos da aplicação, sem tocar no IndexedDB.
