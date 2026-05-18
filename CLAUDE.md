# 내 바이브코딩 워크스페이스

Claude Code가 이 파일을 읽고 내 작업 환경을 이해합니다.

---

## 🚀 자동 초기 설정

**대화가 시작될 때마다 `.setup-done` 파일이 있는지 확인해줘.**

없으면 → 아무 말 없이 자동으로 실행해:
1. `git rev-parse --is-inside-work-tree`로 Git 저장소인지 확인
2. Git 저장소이면 `git config core.hooksPath .githooks` 실행 (보안 훅 활성화)
3. Git 저장소가 아니면 훅 설정은 건너뛰기 (`/save` 때 다시 설정)
4. `.setup-done` 파일 생성
5. `.claude/commands/start.md`를 읽고 온보딩 시작

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
│   ├── ideas/         ← /idea로 저장한 아이디어
│   └── reports/       ← 마크다운 보고서와 조사 문서
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
| `slash-command-creator` | "새 커맨드 만들어줘", "/XXX 커맨드 만들어줘" |
| `subagent-creator` | "새 에이전트 만들어줘", "XXX 에이전트 만들어줘" |

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
- 새 프로젝트를 만들 때는 짧은 README로 끝내지 말고, `.claude/references/project-readme-guide.md`를 참고해서 실행 계획서 수준으로 작성해줘
- 프로젝트 README에는 입력, 출력, 폴더 구조, 만들 기능, 첫 번째 작업, 다음에 Claude에게 요청할 말을 반드시 포함해줘
- 프로젝트를 만든 뒤 `.claude/references/project-quality-checklist.md`로 빠진 부분이 없는지 확인해줘

---

## 작업 방식

- 바로 코딩하지 말고 먼저 목표와 입력/출력을 확인해줘.
- 요구가 애매하면 추측하지 말고 질문해줘.
- 필요한 것만 작게 만들고, 요청받지 않은 기능은 추가하지 마.
- 기존 파일을 고칠 때는 필요한 부분만 수정해줘.
- 새 프로젝트나 코드를 만든 뒤에는 실행 방법과 확인 방법을 알려줘.
- 복잡해지면 더 단순한 방법이 있는지 먼저 설명해줘.

자세한 기준은 `.claude/references/coding-behavior-guide.md`를 참고해줘.

---

## 자동 저장 규칙

학생이 파일 저장 위치를 따로 말하지 않아도, 새 파일은 아래 기준으로 먼저 분류해서 저장해줘.

| 요청 유형 | 저장 위치 | 파일명 규칙 |
|-----------|-----------|-------------|
| 마크다운 보고서, 조사 문서, 정리 자료 | `notes/reports/` | `YYYY-MM-DD-짧은-주제.md` |
| 아이디어 메모 | `notes/ideas/` | `YYYY-MM-DD-짧은-주제.md` |
| 자동화 계획서, 요구사항 정리 | `notes/tasks/` | `YYYY-MM-DD-짧은-주제.md` |
| 배움 기록, 회고 | `notes/daily/` | `YYYY-MM-DD.md` |
| 새 코딩 프로젝트 | `projects/프로젝트이름/` | 프로젝트 폴더 안에 파일 생성 |
| 완성된 단일 자동화 스크립트 | `scripts/` | `기능이름.py` |

마크다운 보고서를 만들 때는 먼저 `notes/reports/` 폴더가 있는지 확인하고, 없으면 자동으로 만들어줘. 파일을 만든 뒤에는 학생에게 저장된 경로와 VSCode 미리보기 여는 방법만 짧게 알려줘.

파일 정리 자동화처럼 단일 Python 스크립트를 만들 때는 먼저 `scripts/` 폴더에 저장해줘. 예를 들어 파일 정리 스크립트는 `scripts/organize.py`로 저장하는 것이 기본이야.

---

## 보안 규칙

Git 커밋 전에 반드시 확인:
1. `.env` 파일이 스테이징에 포함되어 있지 않은지
2. 코드에 API 키 패턴이 없는지 (`sk-ant-`, `sk-proj-`, `API_KEY =`, `password =`)

API 키는 항상 `.env`에 저장, `.env`는 절대 git에 올리지 마.

```python
# ❌ 위험
api_key = "실제_API_키_문자열"

# ✅ 안전
import os
api_key = os.environ.get("ANTHROPIC_API_KEY")
```

---

## 새 프로젝트 시작

"새 프로젝트 시작할게" 라고 하면:
1. `projects/프로젝트이름/` 폴더 생성
2. `src/`, `input/`, `output/`, `notes/` 폴더 생성
3. `.claude/references/project-readme-guide.md` 읽기
4. `projects/프로젝트이름/README.md`를 실행 계획서 수준으로 생성
5. `.claude/references/project-quality-checklist.md`로 점검
6. 첫 번째로 뭘 해야 할지 알려줘

README가 너무 짧아지면 안 돼. 학생이 다음 날 다시 열어도 바로 이어서 작업할 수 있어야 해.
