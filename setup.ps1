# ============================================================
# vibe-workspace 초기 설정 스크립트
# 실행 방법: 터미널에서 .\setup.ps1 입력
# ============================================================

Write-Host ""
Write-Host "⚡ vibe-workspace 설정을 시작합니다..." -ForegroundColor Cyan
Write-Host ""

# ── Git 훅 활성화 ────────────────────────────────────────
Write-Host "🔐 보안 훅 설정 중..." -ForegroundColor Yellow
git config core.hooksPath .githooks

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ 보안 훅이 활성화됐어요!" -ForegroundColor Green
    Write-Host "     이제 API 키가 담긴 파일은 자동으로 커밋이 차단됩니다." -ForegroundColor Gray
} else {
    Write-Host "  ⚠️  Git이 설치되어 있는지 확인해주세요." -ForegroundColor Red
}

Write-Host ""

# ── Git 사용자 정보 확인 ─────────────────────────────────
$gitName = git config --global user.name 2>$null
$gitEmail = git config --global user.email 2>$null

if (-not $gitName -or -not $gitEmail) {
    Write-Host "📝 Git 사용자 정보를 설정해야 해요." -ForegroundColor Yellow
    Write-Host ""
    $name = Read-Host "  이름을 입력하세요 (예: 홍길동)"
    $email = Read-Host "  이메일을 입력하세요 (예: hong@email.com)"

    if ($name) { git config --global user.name $name }
    if ($email) { git config --global user.email $email }

    Write-Host "  ✅ Git 사용자 정보가 설정됐어요!" -ForegroundColor Green
} else {
    Write-Host "👤 Git 사용자: $gitName <$gitEmail>" -ForegroundColor Green
}

Write-Host ""

# ── .env 파일 예시 생성 ──────────────────────────────────
if (-not (Test-Path ".env.example")) {
    @"
# ============================================================
# 환경변수 예시 파일 (.env.example)
# 이 파일은 GitHub에 올려도 됩니다 (실제 값이 없으니까요)
#
# 실제 API 키를 넣으려면:
# 1. 이 파일을 복사해서 .env 이름으로 저장하세요
# 2. 실제 값을 입력하세요
# 3. .env는 절대 GitHub에 올리지 마세요! (.gitignore가 막아줍니다)
# ============================================================

ANTHROPIC_API_KEY=여기에_실제_API_키를_입력하세요
"@ | Out-File -FilePath ".env.example" -Encoding utf8
    Write-Host "📄 .env.example 파일을 생성했어요." -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 설정 완료! 이제 VSCode에서 이 폴더를 열고" -ForegroundColor Cyan
Write-Host "   왼쪽 사이드바의 Claude 패널에서 /start를 입력하세요." -ForegroundColor Cyan
Write-Host ""
