# Rota para um simulador espacial completo

LAST HORIZON 6.0 já conecta decisões, orçamento, engenharia, fatores humanos, lançamento, órbita terrestre, consumo de propelente e um atlas planetário real. Ainda existe uma distância técnica importante entre essa experiência e um simulador profissional comparável, em profundidade, aos grandes simuladores de voo.

## Entregue nesta versão

- Posições aproximadas dos oito planetas para qualquer data entre 1800 e 2050.
- Coordenadas heliocêntricas J2000, distâncias e tempo-luz.
- Globo terrestre texturizado, iluminação solar e centros de lançamento.
- Órbita terrestre de dois corpos, nós, vis-viva, equação do foguete e janelas de queima.
- Instrumentos da cabine ligados ao estado físico persistente.
- Campanha, economia, tripulação, fadiga, testes, falhas causais e colônia.

## Próximos blocos necessários

### 1. Dinâmica de voo 6-DOF

Modelo de translação e rotação com massa variável, centro de gravidade, tensor de inércia, forças aerodinâmicas, motores individuais, slosh, flexão estrutural e controle de atitude. Esta é a base para transformar lançamento e pouso em pilotagem, não apenas sequência de fases.

### 2. Atmosfera e ambiente terrestre

Atmosfera por altitude e latitude, ventos, turbulência, densidade, temperatura, pressão, clima de lançamento e relevo. Para produto comercial, os dados devem ser versionados e possuir licença de redistribuição clara.

### 3. Efemérides e gravidade N-corpos

Integração de kernels NASA NAIF/SPICE ou consultas Horizons durante a preparação da missão, propagador numérico com Sol, planetas, Lua, J2/J3, pressão de radiação solar e manobras de correção. O jogo deve manter um modo offline determinístico com um pacote de efemérides congelado.

### 4. Aviônicos e navegação

IMU com deriva, GNSS, rastreadores estelares, radar-altímetro, filtro de Kalman, propagação de incerteza, plano de voo, computador de orientação e falhas de sensores. Instrumentos devem consumir esse estado estimado, que não é idêntico ao estado verdadeiro.

### 5. Sistemas da nave

Redes elétricas por barramento, fluxo térmico por nó, ECLSS por volumes, pressurização, fluidos, válvulas, propelente, bombas, telecomunicações, manutenção e inventário físico. Cada falha precisa de causa, detecção, isolamento, consequência e reparo.

### 6. Cockpit e mundo 3D

Motor 3D nativo ou WebGPU, modelos com escala física, iluminação baseada em física, estrelas de catálogo, Terra com terreno e atmosfera, partículas de propulsão, câmeras externas e som espacial/cabine por camadas. Uma experiência visual AAA também exige equipe de arte, áudio, animação, VFX e otimização.

### 7. Conteúdo de longa duração

Campanhas ramificadas, contratos, pesquisa, fabricação, várias classes de nave, Lua/Marte/asteroides, operações de superfície, editor de missão, cenários procedurais validados, modding e telemetria de balanceamento. O objetivo é profundidade sistêmica, não apenas quantidade de telas.

### 8. Produção comercial

Testes de usabilidade, QA em matriz de hardware, acessibilidade completa, localização profissional, crash reporting consentido, licenças de todos os dados e ativos, política de privacidade, classificação indicativa, desempenho mínimo definido e distribuição assinada.

## Sequência recomendada

1. Protótipo 6-DOF de lançamento e retorno com uma única nave.
2. Aviônicos e sensores com estado verdadeiro versus estado estimado.
3. Terra 3D, atmosfera e clima de lançamento.
4. Efemérides SPICE/N-corpos e planejador interplanetário.
5. Sistemas detalhados, manutenção e falhas.
6. Conteúdo modular, carreira longa e polimento audiovisual.

Essa ordem reduz retrabalho: gráficos e conteúdo passam a consumir um modelo físico estável, e não uma sequência visual desconectada.
