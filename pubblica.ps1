# =====================================================
#  I Racconti del Riccio - Script di pubblicazione
# =====================================================
# Scansiona la cartella racconti/, ricostruisce l'indice
# e fa commit + push automatico su GitHub.
# Lanciato dal file "pubblica.bat" (doppio click).
# =====================================================

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "  I Racconti del Riccio  " -ForegroundColor Cyan -BackgroundColor DarkGreen
Write-Host ""

# --- 1. Verifica cartella ---
if (-not (Test-Path "racconti")) {
    Write-Host "[ERRORE] Cartella 'racconti/' non trovata." -ForegroundColor Red
    exit 1
}

# --- 2. Scansiona racconti (ignora file che iniziano con _) ---
$files = Get-ChildItem -Path "racconti" -Filter "*.txt" |
    Where-Object { -not $_.Name.StartsWith("_") } |
    Sort-Object Name |
    ForEach-Object { $_.Name }

if ($files.Count -eq 0) {
    Write-Host "[ATTENZIONE] Nessun racconto trovato nella cartella racconti/" -ForegroundColor Yellow
    Write-Host "Aggiungi almeno un file .txt prima di pubblicare." -ForegroundColor Yellow
    exit 0
}

Write-Host "Racconti trovati ($($files.Count)):" -ForegroundColor Green
foreach ($f in $files) {
    Write-Host "   - $f" -ForegroundColor Gray
}
Write-Host ""

# --- 3. Normalizza tutti i .txt in UTF-8 senza BOM ---
# Cosi' le accentate vengono lette correttamente dal sito.
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
foreach ($f in $files) {
    $path = Join-Path "racconti" $f
    try {
        $content = Get-Content -Path $path -Raw
        [System.IO.File]::WriteAllText((Resolve-Path $path), $content, $utf8NoBom)
    } catch {
        Write-Host "   (non sono riuscito a normalizzare $f, lo lascio com'e')" -ForegroundColor DarkYellow
    }
}

# --- 4. Aggiorna l'indice ---
$manifest = [ordered]@{ files = $files } | ConvertTo-Json
$manifestPath = "racconti/index.json"
[System.IO.File]::WriteAllText((Resolve-Path . | Join-Path -ChildPath $manifestPath), $manifest, $utf8NoBom)
Write-Host "Indice aggiornato." -ForegroundColor Green
Write-Host ""

# --- 5. Git ---
$status = git status --porcelain
if (-not $status) {
    Write-Host "Nessuna modifica da pubblicare: il sito e' gia' aggiornato." -ForegroundColor Yellow
    Write-Host ""
    return
}

Write-Host "Modifiche pronte per la pubblicazione:" -ForegroundColor Cyan
git status --short
Write-Host ""

$msg = Read-Host "Messaggio del commit (premi Invio per quello di default)"
if ([string]::IsNullOrWhiteSpace($msg)) {
    $msg = "Aggiornamento racconti - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

Write-Host ""
Write-Host "Pubblicazione in corso..." -ForegroundColor Cyan
git add -A
git commit -m "$msg"
git push

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host " Fatto! Tra 30-60 secondi il sito sara' aggiornato online. " -ForegroundColor Green
Write-Host " https://pietroaldotorito.github.io/racconti-leone/         " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
