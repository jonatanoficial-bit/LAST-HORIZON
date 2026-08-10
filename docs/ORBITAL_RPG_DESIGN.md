# Navegação real e RPG de comando orbital

## Objetivo da versão 13

Transformar a órbita em uma experiência de missão: o jogador pode pilotar quando quiser, mas sua função principal como capitão é interpretar telemetria, assinar uma rota e decidir quais riscos a tripulação carregará para os ciclos futuros.

## Arquitetura do mapa

- Fonte: elementos orbitais aproximados oficiais publicados pelo JPL/NASA.
- Tabela 1 usada de 1800 a 2050; Tabela 2 e correções dos planetas externos usadas fora desse intervalo até o ano 3000.
- Cálculo Kepleriano local e determinístico. Não exige conta, chave, internet ou API paga.
- Escala linear em unidades astronômicas, com três enquadramentos: planetas internos, até Saturno e Sistema Solar completo.
- A data do mapa é a data astronômica da campanha somada ao prazo terrestre e às horas da missão.
- Cada planeta é desenhado em sua posição heliocêntrica calculada, sobre sua órbita elíptica real aproximada.

## Rota GPS

Ao selecionar um planeta, o computador calcula separação atual, transferência de Hohmann, tempo nominal, delta-v de injeção, fase necessária, erro de janela, atraso de sinal e data de chegada. A posição do planeta também é propagada até a data de chegada. A linha da transferência termina nesse futuro geométrico e o ícone da ARK-01 usa o progresso persistido no save.

O jogador precisa:

1. selecionar um planeta real;
2. analisar o parecer de Jun Park;
3. assinar o plano de voo;
4. criar, propagar e executar o nó obrigatório;
5. concluir as decisões abertas do conselho;
6. confirmar a partida interplanetária.

## RPG de comando

Três briefings aparecem na primeira inserção/partida orbital:

- doutrina do corredor orbital;
- política de reserva de propelente;
- autoridade durante o silêncio de rádio.

Cada briefing oferece três ordens sem opção perfeita. Os efeitos imediatos e persistentes incluem orçamento, apoio, influência, confiança, moral, coesão, ciência, confiabilidade, propelente, reputação, risco operacional, prontidão, recompensa e eficiência de combustível. Os modificadores são aplicados às missões orbitais ilimitadas já existentes, de modo que uma decisão narrativa altera a jogabilidade futura.

## Por que não há Google Earth ou API viva

O Google Earth não é um mapa navegável do Universo, e uma incorporação externa tornaria o jogo dependente de conexão, termos e chaves. A documentação oficial do JPL informa que suas APIs não devem ser incorporadas diretamente em páginas por causa da política CORS da NASA. Por isso, o jogo usa os coeficientes oficiais localmente: mantém a procedência científica, funciona offline e evita uma tela vazia se um serviço externo falhar.

Fonte: https://ssd.jpl.nasa.gov/planets/approx_pos.html

Política das APIs SSD/JPL: https://ssd-api.jpl.nasa.gov/doc/index.php

## Arte espacial

O horizonte terrestre usado no para-brisa foi criado especificamente para esta versão e exportado em PNG e WebP. O WebP é usado no jogo; o PNG permanece como fonte de alta qualidade. O shader combina essa referência fotográfica com atmosfera, nuvens, torre, iluminação, telemetria e movimento de câmera.
