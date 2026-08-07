# Vídeos cinematográficos

O vídeo compacto enviado pelo criador já está integrado como `prologo.mp4` e habilitado em `video-manifest.json`. Ele possui 82.920.366 bytes, fica abaixo do limite de 100 MB por arquivo do GitHub e deve permanecer em todos os pacotes futuros.

Na versão 6.0.1, o mesmo conteúdo audiovisual foi reorganizado sem recompressão para mover o índice MP4 `moov` ao início do arquivo. Esse modo “fast start” permite que navegador e celular comecem a reprodução sem baixar os 82,9 MB completos. O manifesto registra o hash da versão otimizada.

O prólogo tenta iniciar com som. Quando a política do navegador bloqueia autoplay, ele começa silencioso e mostra `ATIVAR SOM`; se a hospedagem falhar, oferece `TENTAR NOVAMENTE` sem pular o vídeo automaticamente. O menu principal também possui `ASSISTIR INTRODUÇÃO`.

Os vídeos de voo são opcionais. Coloque cada MP4 nesta pasta usando exatamente os nomes abaixo:

- `launch-ignition.mp4`
- `launch-maxq.mp4`
- `stage-separation.mp4`
- `orbit-insertion.mp4`
- `departure-burn.mp4`
- `explosion-game-over.mp4`

Depois, altere `enabled` para `true` no item correspondente de `flight-manifest.json`. Cada vídeo aparecerá dentro do para-brisa da cabine, enquanto instrumentos e telemetria continuarão funcionando por cima.

Recomendação: MP4 H.264, 1920×1080, 30 fps, 8 a 12 segundos, sem texto, logotipo, HUD ou barras pretas.

## Diretor cinematográfico v10

As cenas adicionais ficam em `assets/video/cinematics/` e são controladas por `cinematic-manifest.json`. O roteiro e os prompts completos estão em `docs/PACOTE_VIDEOS_IA_GROK_V10.md`.

Esses arquivos são opcionais. Se uma cena habilitada estiver ausente ou não carregar, o jogo remove a sobreposição em até cinco segundos e continua na simulação, preservando o save.
