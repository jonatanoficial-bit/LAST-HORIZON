$ErrorActionPreference = "Stop"
$gameRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8765
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$mime = @{ ".html"="text/html; charset=utf-8"; ".js"="text/javascript; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".json"="application/json; charset=utf-8"; ".webmanifest"="application/manifest+json"; ".svg"="image/svg+xml"; ".png"="image/png"; ".webp"="image/webp"; ".pdf"="application/pdf" }
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
    $bytes = [IO.File]::ReadAllBytes($candidate)
    $ext = [IO.Path]::GetExtension($candidate).ToLowerInvariant()
    $context.Response.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" })
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
    $context.Response.OutputStream.Close()
  }
} finally { $listener.Stop(); $listener.Close() }
