# Vídeos cinematográficos

O vídeo compacto enviado pelo criador já está integrado como `prologo.mp4` e habilitado em `video-manifest.json`. Ele possui 82.920.366 bytes, fica abaixo do limite de 100 MB por arquivo do GitHub e deve permanecer em todos os pacotes futuros.

Os vídeos de voo são opcionais. Coloque cada MP4 nesta pasta usando exatamente os nomes abaixo:

- `launch-ignition.mp4`
- `launch-maxq.mp4`
- `stage-separation.mp4`
- `orbit-insertion.mp4`
- `departure-burn.mp4`
- `explosion-game-over.mp4`

Depois, altere `enabled` para `true` no item correspondente de `flight-manifest.json`. Cada vídeo aparecerá dentro do para-brisa da cabine, enquanto instrumentos e telemetria continuarão funcionando por cima.

Recomendação: MP4 H.264, 1920×1080, 30 fps, 8 a 12 segundos, sem texto, logotipo, HUD ou barras pretas.
