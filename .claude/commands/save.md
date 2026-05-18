# /save — 작업 저장 (git commit + push)

오늘 작업을 GitHub에 저장합니다.

## 사용법

```
/save
/save 파일 정리 자동화 완성
```

---

## 실행 순서

### 0단계: Git 저장소 연결 확인

먼저 현재 폴더가 Git 저장소인지 확인해:

```bash
git rev-parse --is-inside-work-tree
```

실패하면 아직 Git 저장소가 아니야. 사용자에게 GitHub 저장소 주소를 물어봐:

```
아직 이 폴더가 Git 저장소로 연결되어 있지 않아요.
GitHub에서 빈 저장소를 만든 뒤 주소를 알려주세요.
예: https://github.com/아이디/first-vibe-coding.git
```

주소를 받으면 아래 순서로 연결해:

```bash
git init
git branch -M main
git remote add origin 받은_저장소_주소
```

이미 Git 저장소지만 remote가 없으면:

```bash
git remote -v
```

결과가 비어 있는지 확인하고, 비어 있으면 사용자에게 GitHub 저장소 주소를 받아 `git remote add origin 받은_저장소_주소`를 실행해.

---

### 1단계: 변경 파일 확인

먼저 아래 명령으로 변경된 파일을 확인해:

```bash
git status --short
git diff --stat
```

변경된 파일이 없으면 → "저장할 변경사항이 없어요!" 하고 끝내.

---

### 2단계: 보안 확인 (절대 건너뛰지 마)

`git add .`를 하기 전에 먼저 확인해. 아직 스테이징되지 않은 파일과 새 파일도 검사해야 합니다.

확인 대상:

- `git status --short`에 보이는 모든 변경 파일
- `git diff`에 보이는 수정 내용
- 새로 만들어진 파일 중 Git에 아직 추가되지 않은 파일

아래에 해당하면 → **즉시 중단**, 어느 파일인지 알려줘:

- `.env`, `.env.local`, `.env.production` 같은 실제 환경변수 파일
- 파일명에 `secret`, `credential`, `token`, `password`가 들어간 파일
- 아래 패턴이 코드나 문서에 들어간 경우:
  - `sk-ant-`, `sk-proj-` (API 키)
  - `ANTHROPIC_API_KEY = "sk`
  - `OPENAI_API_KEY = "sk`
  - `password = "`
  - `secret = "`

보안 문제 없으면 → 다음 단계로.

---

### 3단계: 커밋 메시지 제안

변경 내용을 분석해서 아래 형식으로 커밋 메시지를 제안해:

```
<타입>: <한 줄 요약>
```

**타입 선택 기준:**

| 타입 | 사용 시점 |
|------|---------|
| `feat` | 새 기능, 새 스크립트 추가 |
| `fix` | 오류 수정 |
| `docs` | README, 메모, 아이디어 파일 |
| `refactor` | 코드 개선 (기능 변화 없음) |
| `chore` | 설정 파일, 폴더 정리 |

예시:
- `feat: 다운로드 폴더 자동 정리 스크립트 추가`
- `fix: 한글 파일명 처리 오류 수정`
- `docs: 오늘 배운 것 기록`

---

### 4단계: 사용자 확인

제안한 메시지를 보여주고 확인 받아:

```
📝 이 메시지로 저장할까요?

  feat: 다운로드 폴더 자동 정리 스크립트 추가

변경된 파일:
  - scripts/organize.py (새 파일)
  - notes/tasks/20260514-다운로드정리.md (새 파일)

[네 / 메시지 수정할게요 / 취소]
```

- "네" → 바로 실행
- 다른 메시지 → 받아서 사용
- "취소" → 중단

---

### 5단계: 저장 실행

```bash
git add .
git diff --cached --stat
git diff --cached -U0
git commit -m "커밋 메시지"
```

커밋 직전에도 staged diff를 다시 보고, 2단계의 보안 패턴이 들어가 있으면 커밋하지 마.
pre-commit 보안 훅이 실패하면 오류 내용을 설명하고 중단해.

커밋 후에는 upstream이 있는지 확인해:

```bash
git rev-parse --abbrev-ref --symbolic-full-name @{u}
```

성공하면:

```bash
git push
```

실패하면 첫 push일 가능성이 높으므로:

```bash
git push -u origin main
```

---

### 6단계: 결과 알려주기

성공하면:
```
✅ 저장 완료!
  커밋: feat: 다운로드 폴더 자동 정리 스크립트 추가
  GitHub에서 확인: https://github.com/...
```

실패하면 오류 분석해서 해결 방법 알려줘:
- push 실패 → remote 설정 확인 방법 안내
- 처음 push → GitHub 저장소 만드는 방법 안내

---

## 주의사항

- 보안 확인은 절대 건너뛰지 마
- 사용자 확인 없이 커밋하지 마
- 한 번에 너무 많은 파일 변경이 있으면 주제별로 나눠서 커밋할지 물어봐
