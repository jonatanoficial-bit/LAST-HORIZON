$ErrorActionPreference = "Stop"
$gameRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Update-MediaManifest {
    param(
        [string]$ManifestPath,
        [string]$MediaFolder,
        [string]$CollectionName
    )
    $manifest = Get-Content -LiteralPath $ManifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $items = $manifest.$CollectionName
    $enabledCount = 0
    foreach ($item in $items) {
        $exists = Test-Path -LiteralPath (Join-Path $MediaFolder $item.src)
        $item.enabled = $exists
        if ($exists) { $enabledCount++ }
    }
    $json = $manifest | ConvertTo-Json -Depth 10
    [System.IO.File]::WriteAllText($ManifestPath, $json, $utf8NoBom)
    return $enabledCount
}

try {
    $videoCount = Update-MediaManifest -ManifestPath (Join-Path $gameRoot "assets\video\cinematic-manifest.json") -MediaFolder (Join-Path $gameRoot "assets\video\cinematics") -CollectionName "cues"
    $voiceCount = Update-MediaManifest -ManifestPath (Join-Path $gameRoot "assets\audio\voice-manifest.json") -MediaFolder (Join-Path $gameRoot "assets\audio\voices") -CollectionName "lines"
    $musicCount = Update-MediaManifest -ManifestPath (Join-Path $gameRoot "assets\audio\music-manifest.json") -MediaFolder (Join-Path $gameRoot "assets\audio\music") -CollectionName "tracks"
    Write-Host "LAST HORIZON - MIDIA ATUALIZADA" -ForegroundColor Cyan
    Write-Host "Videos encontrados e habilitados: $videoCount / 12"
    Write-Host "Vozes encontradas e habilitadas: $voiceCount / 18"
    Write-Host "Musicas encontradas e habilitadas: $musicCount / 6"
    Write-Host "Arquivos ausentes permaneceram desabilitados e nao travarao o jogo." -ForegroundColor Green
}
catch {
    Write-Host "Nao foi possivel atualizar os manifestos: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
