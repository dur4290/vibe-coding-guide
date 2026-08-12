# Build the React guidebook and sync it to both static site folders.

$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$appDir = Get-ChildItem -LiteralPath $projectRoot.Path -Directory |
    Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName "package.json") } |
    Select-Object -First 1 -ExpandProperty FullName
$targets = @(
    (Join-Path $projectRoot.Path "guide-site"),
    (Join-Path $projectRoot.Path "site-repo")
)

if (-not $appDir) {
    throw "React guidebook folder not found."
}

$buildDir = Join-Path $appDir "dist-site"

Push-Location $appDir
try {
    if (Test-Path -LiteralPath $buildDir) {
        $resolvedBuildDir = Resolve-Path -LiteralPath $buildDir
        if (-not $resolvedBuildDir.Path.StartsWith($appDir)) {
            throw "Refusing to delete outside app folder: $($resolvedBuildDir.Path)"
        }
        Remove-Item -LiteralPath $resolvedBuildDir.Path -Recurse -Force
    }

    npx.cmd vite build --outDir dist-site
}
finally {
    Pop-Location
}

foreach ($target in $targets) {
    if (-not (Test-Path -LiteralPath $target)) {
        New-Item -ItemType Directory -Path $target | Out-Null
    }

    $resolvedTarget = Resolve-Path -LiteralPath $target
    if (-not $resolvedTarget.Path.StartsWith($projectRoot.Path)) {
        throw "Refusing to write outside project folder: $($resolvedTarget.Path)"
    }

    foreach ($name in @("index.html", "assets", "chapters", "screenshots")) {
        $item = Join-Path $resolvedTarget.Path $name
        if (Test-Path -LiteralPath $item) {
            $resolvedItem = Resolve-Path -LiteralPath $item
            if (-not $resolvedItem.Path.StartsWith($resolvedTarget.Path)) {
                throw "Refusing to delete outside target folder: $($resolvedItem.Path)"
            }
            Remove-Item -LiteralPath $resolvedItem.Path -Recurse -Force
        }
    }

    Get-ChildItem -LiteralPath $buildDir -Force | ForEach-Object {
        Copy-Item -LiteralPath $_.FullName -Destination $resolvedTarget.Path -Recurse -Force
    }
    New-Item -ItemType File -Path (Join-Path $resolvedTarget.Path ".nojekyll") -Force | Out-Null
}

Write-Host "React guidebook synced to guide-site and site-repo." -ForegroundColor Green
