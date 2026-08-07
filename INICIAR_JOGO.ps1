$ErrorActionPreference = "Stop"
$gameRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8765
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$mime = @{ ".html"="text/html; charset=utf-8"; ".js"="text/javascript; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".json"="application/json; charset=utf-8"; ".webmanifest"="application/manifest+json"; ".svg"="image/svg+xml"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".webp"="image/webp"; ".pdf"="application/pdf"; ".mp4"="video/mp4"; ".vtt"="text/vtt; charset=utf-8" }
$listener.Start()
Start-Process "http://localhost:$port/"
Write-Host "LAST HORIZON iniciado em http://localhost:$port/"
Write-Host "Mantenha esta janela aberta. Pressione Ctrl+C para encerrar."
try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $relative = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($relative)) { $relative = "index.html" }
    $candidate = [IO.Path]::GetFullPath((Join-Path $gameRoot $relative))
    if (-not $candidate.StartsWith([IO.Path]::GetFullPath($gameRoot)) -or -not (Test-Path -LiteralPath $candidate -PathType Leaf)) {
      $context.Response.StatusCode = 404
      $candidate = Join-Path $gameRoot "404.html"
    }
    $ext = [IO.Path]::GetExtension($candidate).ToLowerInvariant()
    $context.Response.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" })
    $file = Get-Item -LiteralPath $candidate
    $start = 0L
    $end = $file.Length - 1L
    $range = $context.Request.Headers["Range"]
    $context.Response.AddHeader("Accept-Ranges", "bytes")
    if ($range -and $range -match '^bytes=(\d+)-(\d*)$') {
      $start = [long]$Matches[1]
      if ($Matches[2]) { $end = [Math]::Min([long]$Matches[2], $end) }
      if ($start -gt $end) {
        $context.Response.StatusCode = 416
        $context.Response.Close()
        continue
      }
      $context.Response.StatusCode = 206
      $context.Response.AddHeader("Content-Range", "bytes $start-$end/$($file.Length)")
    }
    $remaining = $end - $start + 1L
    $context.Response.ContentLength64 = $remaining
    $input = [IO.File]::OpenRead($candidate)
    try {
      [void]$input.Seek($start, [IO.SeekOrigin]::Begin)
      $buffer = New-Object byte[] 65536
      while ($remaining -gt 0) {
        $read = $input.Read($buffer, 0, [Math]::Min($buffer.Length, [int][Math]::Min($remaining, [int]::MaxValue)))
        if ($read -le 0) { break }
        $context.Response.OutputStream.Write($buffer, 0, $read)
        $remaining -= $read
      }
    } finally {
      $input.Dispose()
      $context.Response.OutputStream.Close()
    }
  }
} finally { $listener.Stop(); $listener.Close() }
