# 바이브코딩 가이드 제작 저장소

데이터과학과 학생을 위한 바이브코딩 입문 가이드와 학생 배포용 워크스페이스 템플릿을 함께 관리하는 저장소입니다.

---

## 구성

```
1C3-vibe-coding-guide/
├── guide-site/        # GitHub Pages용 정적 웹 가이드
├── site-repo/         # 사이트 배포 전용 저장소 루트
├── vibe-workspace/    # 학생 배포용 Claude Code 워크스페이스 템플릿
├── rule.md            # 프로젝트 규칙
└── roadmap.md         # 진행 상황과 배포 체크리스트
```

---

## 배포 저장소 역할

- 사이트 배포용: `dur4290/vide-guide-version`
- 학생 워크스페이스 배포용: `dur4290/vibe-coding-guide`

학생 안내 링크는 `vibe-coding-guide`를 사용하고, 사이트 배포는 `vide-guide-version`에서 처리합니다.

---

## guide-site

`guide-site/`는 빌드 도구 없이 동작하는 정적 SPA입니다.

- `index.html`: 앱 진입점
- `chapters/`: 챕터별 HTML 콘텐츠
- `assets/js/router.js`: Hash Routing
- `assets/js/progress.js`: localStorage 기반 진도 관리
- `assets/js/hint.js`: 힌트/답 토글
- `assets/css/main.css`: 디자인 시스템

로컬 확인:

```bash
cd guide-site
python -m http.server 8080
```

그 다음 브라우저에서 `http://localhost:8080`을 엽니다.

---

## vibe-workspace

`vibe-workspace/`는 학생에게 별도 저장소로 배포할 템플릿입니다.

학생은 VSCode에서 이 폴더를 열고 Claude 패널에서 `/start`를 입력하면 됩니다.

포함된 기능:

- `/start`, `/clarify`, `/idea`, `/daily`, `/save` 슬래시 커맨드
- `web-scraper`, `pdf`, `skill-creator` 등 재사용 스킬
- `code-simplifier`, `markdown-optimizer` 에이전트
- `.githooks/pre-commit` 보안 검사
- `.env.example` 환경변수 예시

---

## site-repo

`site-repo/`는 `guide-site/` 내용을 저장소 루트 형태로 복사해 둔 배포 전용 폴더입니다.

수정은 `guide-site/`에서 하고, 배포 전 아래 명령으로 동기화합니다.

```powershell
.\scripts\sync-site-repo.cmd
```

---

## 배포 전 체크

- `guide-site/screenshots/`에 실제 스크린샷 추가
- GitHub Pages 또는 Cloudflare Pages가 `site-repo/` 루트 기준으로 올바르게 서빙되는지 확인
- `vibe-workspace/`를 별도 배포 저장소로 분리하거나 remote 정리
- `roadmap.md`의 배포 체크리스트 갱신
