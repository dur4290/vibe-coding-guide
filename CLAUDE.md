# 바이브코딩 가이드 제작 저장소

Claude Code가 이 저장소를 열면 아래 기준으로 작업합니다.

---

## 저장소 목적

데이터과학과 학생 대상 바이브코딩 입문 가이드와 학생 배포용 워크스페이스 템플릿을 제작합니다.

- `guide-site/`: GitHub Pages로 배포할 정적 웹 가이드
- `vibe-workspace/`: 학생에게 배포할 Claude Code 워크스페이스 템플릿

---

## 작업 원칙

- 항상 한국어로 작성합니다.
- 대상 독자는 Windows 사용자이자 코딩 입문자입니다.
- 설명은 짧고 직접적으로, 전문 용어는 필요한 경우 쉽게 풀어 씁니다.
- 스크린샷 파일은 사용자가 직접 촬영하므로 임의 생성하지 않습니다.
- `vibe-workspace/`는 배포용 템플릿이므로 개인 정보, 실제 API 키, 로컬 절대경로를 넣지 않습니다.
- 바로 코딩하지 말고 목표, 입력, 출력, 확인 방법을 먼저 짧게 잡습니다.
- 요구가 애매하면 추측하지 말고 질문합니다.
- 필요한 부분만 작게 수정하고, 요청받지 않은 기능이나 리팩터링은 하지 않습니다.
- 자세한 코딩 행동 기준은 `.claude/references/coding-behavior-guide.md`를 참고합니다.

---

## guide-site 수정 기준

- 빌드 도구 없이 HTML/CSS/JS만 사용합니다.
- 라우팅은 `assets/js/router.js`의 Hash Routing 구조를 유지합니다.
- 챕터 콘텐츠는 `chapters/*.html`에 작성합니다.
- 힌트 박스는 `.hint-box`, `.hint-toggle`, `.hint-content` 구조를 유지합니다.
- 단계 완료 체크박스는 `.step-complete`와 `data-step-id`를 사용합니다.

---

## vibe-workspace 수정 기준

- 학생이 VSCode에서 폴더를 열고 Claude 패널에서 `/start`를 입력하는 흐름을 기준으로 합니다.
- `.claude/commands/`, `.claude/skills/`, `.claude/agents/`의 문서는 초보자가 이해할 수 있게 유지합니다.
- 보안 훅은 `.githooks/`에 둡니다.
- `.env.example`은 배포에 포함하고, 실제 `.env`는 절대 포함하지 않습니다.

---

## 보안 규칙

커밋 전 확인:

1. `.env` 파일이 포함되어 있지 않은지
2. 실제 API 키나 토큰이 문서/코드에 들어 있지 않은지
3. 예시 키는 실제 키 패턴과 겹치지 않게 작성했는지

위험한 예시 대신 아래처럼 씁니다.

```python
# 위험한 예시는 실제 키 모양으로 쓰지 않습니다.
api_key = "실제_API_키_문자열"

# 실제 코드는 환경변수에서 읽습니다.
import os
api_key = os.environ.get("ANTHROPIC_API_KEY")
```
