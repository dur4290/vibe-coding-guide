# 1C3-vibe-coding-guide 프로젝트 규칙

## 프로젝트 개요
데이터과학과 학생 대상 바이브코딩 입문 가이드 웹서비스.
AI 실력 향상 및 공모전 활용을 원하는 학생이 혼자 따라할 수 있는 독립 가이드북.

## 기술 스택
- Vanilla JS + Hash Routing (빌드 툴 없음)
- HTML/CSS/JS 정적 파일
- highlight.js (코드 블록)
- GitHub Pages 배포

## 디렉토리 구조
```
1C3-vibe-coding-guide/
├── index.html              ← SPA 진입점
├── assets/
│   ├── css/main.css        ← 디자인 시스템
│   └── js/
│       ├── router.js       ← 해시 라우터
│       ├── progress.js     ← localStorage 진도 관리
│       └── hint.js         ← 힌트 토글
├── chapters/               ← 각 챕터 HTML
├── screenshots/            ← 챕터별 스크린샷
└── vibe-starter/           ← 배포용 학생 워크스페이스 템플릿
```

## 콘텐츠 규칙
- 한국어 전용
- 타겟: Windows 사용자, 코딩 완전 초보
- 필수 선행조건: Claude Pro 구독 (월 ₩30,000) — 인트로에서 명시
- 스크린샷은 `screenshots/chX/step-Y.png` 형식으로 저장
- 힌트 박스: `.hint-box` 클래스, 자유 토글

## 배포
- GitHub Pages: 별도 저장소 생성 후 Pages 활성화
- lab.haiinu.com: 교수님 협의 후 링크 연결
- vibe-starter: 별도 GitHub 저장소로 분리 배포
