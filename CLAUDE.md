# 내 바이브코딩 워크스페이스

Claude Code가 이 파일을 읽고 내 작업 환경을 이해합니다.

---

## 🚀 자동 초기 설정

**대화가 시작될 때마다 `.setup-done` 파일이 있는지 확인해줘.**

없으면 → 아무 말 없이 자동으로 실행해:
1. `git config core.hooksPath .githooks` (보안 훅 활성화)
2. `.setup-done` 파일 생성
3. `.claude/commands/start.md`를 읽고 온보딩 시작

있으면 → 바로 사용자 요청을 처리해.

---

## 나에 대해

*(아직 설정되지 않았어요. `/start`를 입력하면 자동으로 채워집니다)*

---

## 폴더 구조

```
vibe-workspace/
├── projects/          ← 진행 중인 프로젝트
├── scripts/           ← 완성된 자동화 스크립트
├── notes/
│   ├── tasks/         ← /clarify로 만든 자동화 계획서
│   ├── daily/         ← /daily로 만든 배움 기록
│   └── ideas/         ← /idea로 저장한 아이디어
└── .claude/
    ├── commands/      ← 슬래시 커맨드
    ├── skills/        ← 재사용 스킬
    └── agents/        ← 서브 에이전트
```

---

## 커맨드

| 커맨드 | 용도 |
|--------|------|
| `/start` | 처음 시작할 때 — 내 정보 입력 → 워크스페이스 개인화 |
| `/clarify 자동화하고 싶은 것` | 막연한 아이디어 → 구체적인 실행 계획서 (`notes/tasks/`에 저장) |
| `/idea 아이디어` | 아이디어 빠르게 메모 (`notes/ideas/`에 저장) |
| `/daily` | 오늘 배운 것 기록 (`notes/daily/`에 저장) |
| `/save` | GitHub에 저장 (보안 확인 → 커밋 메시지 확인 → push) |

커맨드 실행 시 `.claude/commands/커맨드명.md`를 먼저 읽고 지시를 따라줘.

---

## 스킬

`.claude/skills/` 안의 각 폴더가 하나의 스킬이야.  
스킬을 사용할 때는 해당 폴더의 `SKILL.md`를 먼저 읽고 사용해줘.

| 스킬 | 트리거 |
|------|--------|
| `web-scraper` | "웹에서 데이터 가져와줘", "이 사이트 긁어줘" |
| `pdf` | "PDF 읽어줘", "PDF 내용 요약해줘" |
| `skill-creator` | "새 스킬 만들어줘", "XXX 스킬 만들어줘" |

---

## 에이전트

`.claude/agents/` 안의 에이전트는 특정 상황에서 자동으로 도와줘:

| 에이전트 | 역할 |
|----------|------|
| `code-simplifier` | 코드 이해가 안 갈 때, 새 코드가 만들어졌을 때 주석·정리 |
| `markdown-optimizer` | 스킬·커맨드 파일이 너무 길어졌을 때 토큰 절약 최적화 |

---

## 대화 규칙

- **항상 한국어로** 답해줘
- 나는 코딩 초보야. 어려운 개념은 쉽게 설명해줘
- 코드를 만들 때는 각 줄에 간단한 주석으로 역할을 설명해줘
- 뭔가 실패하면 원인을 먼저 설명하고, 해결방법을 알려줘
- 다음 단계가 뭔지 항상 알려줘

---

## 보안 규칙

Git 커밋 전에 반드시 확인:
1. `.env` 파일이 스테이징에 포함되어 있지 않은지
2. 코드에 API 키 패턴이 없는지 (`sk-ant-`, `sk-proj-`, `API_KEY =`, `password =`)

API 키는 항상 `.env`에 저장, `.env`는 절대 git에 올리지 마.

```python
# ❌ 위험
api_key = "sk-ant-api03-..."

# ✅ 안전
import os
api_key = os.environ.get("ANTHROPIC_API_KEY")
```

---

## 새 프로젝트 시작

"새 프로젝트 시작할게" 라고 하면:
1. `projects/프로젝트이름/` 폴더 생성
2. `projects/프로젝트이름/README.md` 생성
3. 첫 번째로 뭘 해야 할지 알려줘
