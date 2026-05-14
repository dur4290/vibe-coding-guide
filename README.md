# ⚡ 내 바이브코딩 워크스페이스

AI와 함께 자동화를 만들고, 코딩을 배우고, 프로젝트를 쌓아가는 공간입니다.

---

## 시작 전 필요한 것

아래 세 가지가 설치되어 있어야 합니다. 터미널에서 명령어를 입력해서 확인하세요.

| 항목 | 확인 명령어 | 없을 때 |
|------|------------|---------|
| **Python 3** | `python --version` | [python.org](https://www.python.org/downloads/) 에서 설치 |
| **Git** | `git --version` | [git-scm.com](https://git-scm.com/downloads) 에서 설치 |
| **Claude Code** | `claude --version` | VSCode 확장 마켓플레이스에서 **Claude Code** 검색 후 설치 |

> **Windows 사용자**: 터미널은 Git Bash 또는 Windows Terminal을 추천합니다.

---

## 처음 시작하는 방법

### 1단계: 초기 설정 (딱 한 번만)

터미널에서:

```bash
python setup.py
```

이 스크립트가 자동으로:
- 🔐 API 키 보안 훅을 설정해줍니다
- 👤 Git 사용자 정보를 등록합니다
- 📄 `.env.example` 파일을 생성합니다

### 2단계: VSCode에서 이 폴더 열기

**파일 → 폴더 열기** → 이 폴더(`vibe-workspace`) 선택

### 3단계: Claude Code 시작

VSCode 터미널(`Ctrl + 백틱`)에서:

```bash
claude
```

그리고 채팅창에:

```
/start
```

를 입력하면 온보딩이 시작됩니다.

---

## 폴더 구조

```
vibe-workspace/
├── projects/          ← 내 프로젝트들
├── scripts/           ← 완성된 자동화 스크립트
├── notes/             ← 메모, 아이디어, 배움 기록
└── .claude/
    ├── commands/      ← 슬래시 커맨드 (/start, /save 등)
    ├── skills/        ← 재사용 스킬 (웹스크래핑, PDF 등)
    └── agents/        ← 자동 실행 에이전트
```

---

## 자주 쓰는 커맨드

| 커맨드 | 언제 쓰나요 |
|--------|-----------|
| `/start` | 처음 시작할 때 — 내 정보 입력 및 첫 프로젝트 추천 |
| `/clarify 자동화하고 싶은 것` | 막연한 아이디어 → 구체적인 실행 계획서 |
| `/idea 아이디어` | 떠오른 아이디어 빠르게 메모 |
| `/daily` | 오늘 배운 것 기록 |
| `/save` | 작업 GitHub에 저장 (보안 확인 포함) |

---

## 🔐 보안 규칙

- **API 키는 `.env` 파일에만** 저장하세요
- **`.env`는 절대 GitHub에 올리지 마세요** (`.gitignore`가 자동으로 막아줍니다)
- 커밋할 때마다 보안 훅이 API 키 패턴을 자동으로 검사합니다

---

## 스킬 만들기

`.claude/skills/` 폴더에 자주 쓰는 기능을 스킬로 만들어두면 재사용이 편해요.

Claude Code에게:
```
파일 정리 스킬 만들어줘
```

라고 하면 `.claude/skills/_template/SKILL.md`를 참고해서 새 스킬을 만들어줍니다.
