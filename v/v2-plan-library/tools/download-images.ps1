# Copies every photo referenced in js/projects.js from the old site
# (www.jlangford.com/images/) into images/projects/ so the new site
# no longer depends on the old host.
#
# Run from the project folder:
#   powershell -ExecutionPolicy Bypass -File tools\download-images.ps1

$root   = Split-Path -Parent $PSScriptRoot
$dest   = Join-Path $root "images\projects"
$source = "https://www.jlangford.com/images/"
New-Item -ItemType Directory -Force $dest | Out-Null

$data  = (Get-Content (Join-Path $root "js\projects.js") -Raw) + (Get-Content (Join-Path $root "js\plans.js") -Raw)
# Bare file names only — paths with a slash (plans/...) already live in the repo
$files = [regex]::Matches($data, '"([^"/]+\.(?:jpg|jpeg|png|gif))"') | ForEach-Object { $_.Groups[1].Value }
$files = @($files) + @("sketch%20transparent.png") | Sort-Object -Unique

$ok = 0; $failed = @()
foreach ($f in $files) {
  $out = Join-Path $dest ([uri]::UnescapeDataString($f))
  if (Test-Path $out) { $ok++; continue }
  try {
    Invoke-WebRequest -Uri ($source + $f) -OutFile $out -UseBasicParsing
    $ok++
  } catch {
    $failed += $f
  }
}
Write-Host "$ok of $($files.Count) images in images\projects"
if ($failed.Count) { Write-Host "Failed:"; $failed | ForEach-Object { Write-Host "  $_" } }
