# 1C3-vibe-coding-guide 로드맵

## 목표
데이터과학과 학생 대상 바이브코딩 입문 가이드 웹서비스 제작 및 배포.

## 현재 상태
🔵 진행 중 — Phase 4 (배포)

## 단계별 계획

### Phase 0: 프로젝트 세팅 🟢
- [x] 1C3-vibe-coding-guide 폴더 구조 생성
- [x] rule.md, roadmap.md 작성
- [x] vibe-workspace 템플릿 파일 작성

### Phase 1: SPA 쉘 구현 🟢
- [x] index.html (레이아웃 + 라우터 연결)
- [x] assets/css/main.css (디자인 시스템)
- [x] assets/js/router.js (해시 기반 라우터)
- [x] assets/js/progress.js (localStorage 진도)
- [x] assets/js/hint.js (힌트 토글)

### Phase 2: 챕터 콘텐츠 작성 🟢
- [x] chapters/intro.html
- [x] chapters/ch1-setup.html
- [x] chapters/ch2-claude.html
- [x] chapters/ch3-git.html
- [x] chapters/ch4-project.html

### Phase 3: 스크린샷 촬영 및 교체 🟡
- [ ] 사용자가 Windows 환경에서 직접 촬영
- [ ] screenshots/chX/ 폴더에 저장

### Phase 4: 배포 🔵
- [x] 사이트 GitHub 저장소 생성 (dur4290/vide-guide-version)
- [x] 학생 배포용 GitHub 저장소 생성 (dur4290/vibe-coding-guide)
- [x] 사이트 배포 전용 루트 생성 (`site-repo/`)
- [ ] GitHub Pages 활성화 (Settings → Pages → Branch: main)
- [x] vibe-workspace 별도 저장소 생성 (dur4290/vibe-coding-guide)
- [ ] 원본/배포/학생용 remote 최종 점검
- [x] KAKAO_OPEN_CHAT_URL 실제 URL로 교체 (index.html 2곳, ch4-project.html 1곳)
- [ ] lab.haiinu.com 링크 연결 (교수님 협의)

## 리소스
- 참고 HTML: C:\Users\mazer\OneDrive\박경\INU\2학년\1학기\데이터과학을위한계량경영학\W10-몬테카를로시뮬레이션.html
- 배포 예정: GitHub Pages → lab.haiinu.com 링크

## 배포 주의사항
- 현재 루트 저장소 안에 `guide-site/.git`, `vibe-workspace/.git`가 함께 있음
- 사이트 배포용 루트는 `site-repo/`를 사용
- 원본 수정은 `guide-site/`에서 하고 `scripts/sync-site-repo.cmd`로 동기화
- 배포 전 결정 필요:
  - `guide-site/`를 GitHub Pages 저장소로 따로 유지할지
  - `vibe-workspace/`를 학생 배포용 템플릿 저장소로 따로 유지할지
  - 루트 저장소는 제작/관리용으로만 둘지
- `vibe-workspace` remote는 별도 템플릿 저장소로 정리 필요

## 세션 로그
- 2026-05-14: 프로젝트 설계 완료, Phase 0 시작
- 2026-05-14: Phase 1·2 완료, Phase 4 진행 중
- 2026-05-18: 배포 전 문서/설정/진도 계산 정합성 정리
- 2026-05-18: 사이트 저장소(dur4290/vide-guide-version)와 학생 배포 저장소(dur4290/vibe-coding-guide) 역할 분리 반영
- 2026-05-18: Ch4 마크다운 문서 만들기 챕터 추가, PDF/Word 변환 제외, 워크스페이스 `notes/reports/` 자동 저장 규칙 반영
- 2026-05-18: Ch1에서 VSCode 한국어 설정을 선택사항으로 조정하고, Python/Anaconda는 기존 설치 확인 후 필요 시 설치하는 흐름으로 변경
