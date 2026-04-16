# Run this before publishing: copies skill files into cli/assets/
# so they get bundled inside the npm package.

$repoRoot = Split-Path $PSScriptRoot -Parent
$assets = Join-Path $PSScriptRoot "assets"

Write-Host "Bundling skill files into cli/assets/ ..."

if (Test-Path $assets) {
    Remove-Item $assets -Recurse -Force
}
New-Item $assets -ItemType Directory | Out-Null

# Copy root skill files
Copy-Item (Join-Path $repoRoot "SKILL.md") (Join-Path $assets "SKILL.md")
Copy-Item (Join-Path $repoRoot "skill.json") (Join-Path $assets "skill.json")

# Copy skill directories
$dirs = @("core", "decisions", "blueprints", "palettes", "components", "anti-patterns", "prompts", "integration", "examples", "maintenance")

foreach ($dir in $dirs) {
    $src = Join-Path $repoRoot $dir
    if (Test-Path $src) {
        Copy-Item $src (Join-Path $assets $dir) -Recurse
        Write-Host "  + $dir/"
    }
}

Write-Host "Done. assets/ is ready for publish."
