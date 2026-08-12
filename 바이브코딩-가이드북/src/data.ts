import { Chapter } from './types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'Ch1',
    title: 'Ch1. 개발 환경 설정',
    subtitle: 'VSCode와 Python 준비하기',
    duration: '15~20분',
    goal: '코딩에 필요한 VSCode와 Python 실행 환경을 확인하고, 없을 때만 설치합니다.',
    steps: [
      {
        id: 'Ch1-S1',
        number: 1,
        title: 'VSCode 공식 사이트 접속',
        why: 'VSCode는 코드를 작성하고 Claude Code와 대화하는 창입니다. 마이크로소프트에서 만든 무료 프로그램입니다.',
        action: '브라우저에서 VSCode 공식 사이트로 이동한 뒤 Download for Windows 버튼을 클릭하세요.',
        links: [{ label: 'VSCode 공식 사이트', url: 'https://code.visualstudio.com' }],
        hint: '사이트가 자동으로 Windows용 다운로드 버튼을 보여줍니다.',
        example: '다운로드 폴더에 VSCode 설치 파일이 저장되면 성공입니다.',
        screenshots: [{ src: 'screenshots/ch1/step-1.png', alt: 'VSCode 공식 사이트 메인 화면' }],
        screenshotPlaceholder: '화면 예시: VSCode 공식 사이트 메인 화면'
      },
      {
        id: 'Ch1-S2',
        number: 2,
        title: 'VSCode 설치 파일 실행',
        why: '앞으로 모든 실습은 VSCode에서 진행하므로 먼저 편집기를 설치해야 합니다.',
        action: '다운로드된 VSCodeSetup-xxx.exe 파일을 더블클릭해서 실행하고 설치를 완료하세요.',
        warning: '설치 중간에 "PATH에 추가" 옵션이 나오면 체크하세요. 나중에 터미널에서 code 명령어를 쓸 수 있게 됩니다.',
        hint: '"PATH에 추가"는 설치 진행 중 "추가 작업 선택" 단계에서 나옵니다. 이 옵션이 없다면 기본 설정으로 진행해도 됩니다.',
        example: '설치 완료 후 VSCode가 정상 실행되면 다음 단계로 넘어갑니다.',
        screenshots: [{ src: 'screenshots/ch1/step-2.png', alt: 'VSCode 설치 파일 실행 화면' }],
        screenshotPlaceholder: '화면 예시: VSCode 설치 파일 실행 화면'
      },
      {
        id: 'Ch1-S3',
        number: 3,
        title: 'VSCode 언어 설정 확인',
        why: 'VSCode는 영어로 사용해도 괜찮습니다. 교수자 화면도 영어일 수 있으니 언어 설정을 꼭 맞출 필요는 없습니다.',
        action: 'VSCode 화면이 영어든 한국어든 그대로 진행할 수 있는지 확인하세요.',
        hint: '그래도 한국어로 바꾸고 싶다면 Extensions에서 Korean Language Pack for Visual Studio Code를 설치하고 VSCode를 재시작하세요.',
        example: 'File은 파일, Terminal은 터미널처럼 메뉴 이름만 다를 뿐 같은 기능입니다.'
      },
      {
        id: 'Ch1-S4',
        number: 4,
        title: 'Python이 이미 설치되어 있는지 확인',
        why: 'Python은 자동화 스크립트에 사용하는 프로그래밍 언어입니다. 데이터과학과 비즈니스프로그래밍1을 수강했다면 이미 Anaconda 또는 Python이 설치되어 있을 가능성이 높습니다.',
        action: 'VSCode에서 Terminal > New Terminal을 열고 Python 버전을 확인하세요. 버전 번호까지 나오면 설치 단계는 건너뛰어도 됩니다.',
        commands: ['python --version'],
        warning: 'Python이라고만 나오고 버전 번호가 없으면 아직 정상 연결이 아닙니다. Windows 실행 별칭이 잡혔거나 VSCode가 실제 Anaconda Python을 찾지 못한 상태일 수 있습니다.',
        hint: 'Anaconda를 설치한 기억이 있다면 Windows 시작 메뉴에서 Anaconda Prompt를 열고 python --version을 입력해보세요.',
        example: 'Python 3.x.x처럼 버전 번호까지 나오면 Python 설치 여부 확인은 성공입니다.',
        screenshots: [{ src: 'screenshots/ch1/step-4.png', alt: '터미널에서 python --version 실행 결과' }],
        screenshotPlaceholder: '화면 예시: 터미널에서 python --version 실행 결과'
      },
      {
        id: 'Ch1-S5',
        number: 5,
        title: '필요한 경우에만 Anaconda 설치',
        why: '앞 단계에서 Python 버전이 나오지 않았고 Anaconda Prompt도 없다면 Anaconda를 설치해 Python 환경을 준비합니다.',
        action: 'Anaconda 다운로드 페이지에서 가입 화면이 나오면 Skip Registration을 누르고, Anaconda Distribution의 Windows 64-Bit Graphical Installer를 선택하세요.',
        links: [
          { label: 'Anaconda 다운로드', url: 'https://www.anaconda.com/download' },
          { label: 'Anaconda 설치 참고 영상', url: 'https://youtu.be/dhlyYaeOCJo?si=Y4cyTafv2GtfB5MN' }
        ],
        warning: '설치 옵션 화면에서 Add Anaconda3 to my PATH environment variable과 Register Anaconda3 as my default Python을 체크하면 VSCode와 PowerShell에서 Python을 찾기 쉬워집니다.',
        hint: '회원가입하지 않아도 됩니다. 가입 화면에서는 Skip Registration을 누르고, 다음 화면에서 Miniconda가 아니라 Anaconda Distribution을 선택하세요.',
        example: '이미 Python 버전이 확인됐다면 이 단계는 체크하고 넘어가도 됩니다.',
        screenshots: [
          { src: 'screenshots/ch1/step-5.png', alt: 'Anaconda Distribution의 Windows 64-Bit Graphical Installer 선택 화면' },
          { src: 'screenshots/ch1/anaconda-install-12.png', alt: 'Anaconda 설치 1-2단계 화면' },
          { src: 'screenshots/ch1/anaconda-install-34.png', alt: 'Anaconda 설치 3-4단계 화면' },
          { src: 'screenshots/ch1/anaconda-install-56.png', alt: 'Anaconda 설치 5-6단계 화면' }
        ],
        screenshotPlaceholder: '화면 예시: Anaconda Distribution의 Windows 64-Bit Graphical Installer 선택 및 설치 옵션 화면'
      },
      {
        id: 'Ch1-S6',
        number: 6,
        title: 'VSCode에서 Python 연결 확인',
        why: '설치가 끝났더라도 VSCode 터미널에서 Python이 잘 연결되었는지 마지막으로 확인해야 합니다.',
        action: 'VSCode를 다시 열고 터미널에서 Python 버전을 다시 확인하세요.',
        commands: ['python --version'],
        warning: 'Python이라고만 나오고 버전 번호가 없으면 아직 성공이 아닙니다. Ctrl + Shift + P에서 Python: Select Interpreter를 선택하고 Anaconda Python 경로를 지정하세요.',
        hint: '일반적인 Anaconda Python 경로는 C:\\ProgramData\\anaconda3\\python.exe입니다. 설치 위치에 따라 다를 수 있습니다.',
        example: 'Python 3.x.x처럼 버전 번호가 정상 출력되면 Ch1 완료입니다.',
        screenshots: [{ src: 'screenshots/ch1/step-4.png', alt: 'VSCode 터미널에서 Python 버전 확인 결과' }]
      }
    ]
  },
  {
    id: 'Ch2',
    title: 'Ch2. Claude Code 시작하기',
    subtitle: 'VSCode 안에서 Claude Code 설치하고 로그인하기',
    duration: '10~15분',
    goal: 'VSCode 안에서 Claude Code를 열고 Pro 계정으로 로그인한 뒤 첫 대화를 확인합니다.',
    steps: [
      {
        id: 'Ch2-S1',
        number: 1,
        title: 'Claude Code 확장 설치',
        why: 'Claude Code는 VSCode 확장으로 설치해서 사용합니다. 설치가 끝나면 VSCode 안에서 AI와 대화하며 파일을 만들고 수정할 수 있습니다.',
        action: 'VSCode 왼쪽의 퍼즐 모양 아이콘을 클릭하거나 Ctrl + Shift + X를 눌러 확장 프로그램 탭을 여세요. 검색창에 Claude Code를 입력하고 Anthropic에서 제공하는 확장을 설치하세요.',
        warning: 'Claude Pro 구독이 필요합니다. claude.ai에서 Pro 구독이 되어 있어야 Claude Code를 원활히 사용할 수 있습니다.',
        links: [{ label: 'Claude', url: 'https://claude.ai' }],
        hint: '비슷한 이름의 확장이 여러 개 보이면 게시자가 Anthropic인지 확인하세요.',
        example: 'Install 버튼이 사라지고 설치 완료 상태가 되면 성공입니다.',
        screenshots: [{ src: 'screenshots/ch2/step-1-2.png', alt: 'VSCode 확장 탭에서 Claude Code 검색 및 설치 화면' }],
        screenshotPlaceholder: '화면 예시: VSCode 확장 탭에서 Claude Code 검색 및 설치 화면'
      },
      {
        id: 'Ch2-S2',
        number: 2,
        title: 'Claude Code 패널 열기',
        why: '이 패널이 앞으로 Claude와 대화하며 작업을 맡기는 공간입니다.',
        action: 'VSCode 왼쪽 사이드바의 Claude Code 아이콘을 클릭하세요. 아이콘이 안 보이면 Ctrl + Shift + P를 누르고 Claude Code를 검색해 열 수 있습니다.',
        hint: '아이콘이 안 보이면 VSCode를 완전히 닫았다가 다시 열어보세요. 그래도 없으면 Developer: Reload Window를 실행해보세요.',
        example: 'Claude Code 패널이 VSCode 안에 열리면 다음 단계로 넘어갑니다.',
        screenshots: [{ src: 'screenshots/ch2/step-3.png', alt: 'VSCode에서 Claude Code 패널 열기' }],
        screenshotPlaceholder: '화면 예시: VSCode에서 Claude Code 패널 열기'
      },
      {
        id: 'Ch2-S3',
        number: 3,
        title: '로그인하고 첫 대화 테스트',
        why: 'Claude가 실제로 응답하는지 확인해야 다음 챕터에서 워크스페이스 작업을 맡길 수 있습니다.',
        action: 'Claude Pro 계정으로 로그인한 뒤 아래 문장을 입력해보세요.',
        commands: ['안녕하세요! 저는 코딩 초보입니다. 자기소개 해주세요.'],
        hint: '응답이 없으면 로그인 상태를 확인하고 Claude Code 패널을 새로 열어보세요. 그래도 안 되면 VSCode를 다시 시작한 뒤 같은 문장을 다시 입력해보세요.',
        example: 'Claude가 응답하면 연결 성공입니다.',
        screenshotPlaceholder: '화면 예시: VSCode에서 Claude와 첫 대화'
      }
    ]
  },
  {
    id: 'Ch3',
    title: 'Ch3. Git 기초',
    subtitle: '워크스페이스 내려받고 저장 흐름 익히기',
    duration: '25~30분',
    goal: 'GitHub 계정과 학생 워크스페이스를 준비하고, /start와 /save로 작업 기록을 남기는 흐름을 익힙니다.',
    steps: [
      {
        id: 'Ch3-S1',
        number: 1,
        title: 'Git 다운로드와 설치',
        why: 'Git은 코드의 변경 내역을 기록하는 도구입니다. 게임의 세이브 포인트처럼 작업 중간중간 저장해둘 수 있습니다.',
        action: 'git-scm.com에 접속해서 Windows용 Git을 다운로드하고 기본 설정으로 설치하세요.',
        links: [{ label: 'Git 공식 사이트', url: 'https://git-scm.com' }],
        example: '설치가 끝나면 Claude에게 git --version으로 설치 여부를 확인해달라고 할 수 있습니다.',
        screenshots: [{ src: 'screenshots/ch3/step-1.png', alt: 'git-scm.com 메인 화면' }],
        screenshotPlaceholder: '화면 예시: git-scm.com 메인 화면'
      },
      {
        id: 'Ch3-S2',
        number: 2,
        title: '내 이름과 이메일 등록',
        why: 'Git은 변경사항을 기록할 때 누가 작업했는지 표시합니다.',
        action: 'Claude Code에 아래처럼 요청하세요. 홍길동과 email@example.com은 본인 정보로 바꾸면 됩니다.',
        commands: [
          `Git 사용자 정보를 등록해줘.

이름: 홍길동
이메일: email@example.com

등록한 뒤 git config --global user.name으로 잘 저장됐는지 확인해줘.`
        ],
        hint: 'Claude가 터미널 명령을 대신 실행해줄 수 있습니다. 학생은 터미널을 직접 많이 만지기보다, 무엇을 해야 하는지 정확히 요청하는 데 집중하면 됩니다.',
        example: 'Claude가 등록한 이름을 다시 보여주면 성공입니다.'
      },
      {
        id: 'Ch3-S3',
        number: 3,
        title: 'GitHub 계정 만들기',
        why: 'GitHub는 Git으로 관리하는 코드를 인터넷에 올려두는 공간입니다. 내 작업물을 백업하고 공유할 수 있습니다.',
        action: 'github.com에 접속해서 Sign up을 클릭하고 계정을 만드세요.',
        links: [{ label: 'GitHub', url: 'https://github.com' }],
        hint: 'username은 나중에 포트폴리오 URL로 사용됩니다. github.com/내username 형태가 되니 신중하게 정하세요.',
        screenshots: [{ src: 'screenshots/ch3/step-2.png', alt: 'GitHub 가입 화면' }],
        screenshotPlaceholder: '화면 예시: GitHub 가입 화면'
      },
      {
        id: 'Ch3-S4',
        number: 4,
        title: '학생 배포용 저장소 열기',
        why: '이 워크스페이스에는 Claude Code가 따라야 할 규칙과 자주 쓰는 슬래시 커맨드가 미리 세팅되어 있습니다.',
        action: '아래 학생 배포용 저장소 링크를 여세요.',
        links: [{ label: '학생 배포용 워크스페이스', url: 'https://github.com/dur4290/vibe-coding-guide' }],
        example: 'GitHub 저장소 화면이 열리면 다음 단계로 넘어갑니다.',
        screenshots: [{ src: 'screenshots/ch3/step-3.png', alt: '학생 배포용 GitHub 저장소 화면' }],
        screenshotPlaceholder: '화면 예시: 학생 배포용 GitHub 저장소 화면'
      },
      {
        id: 'Ch3-S5',
        number: 5,
        title: 'Download ZIP으로 내려받기',
        why: '처음에는 복잡한 clone 대신 ZIP으로 내려받는 편이 가장 쉽습니다.',
        action: 'GitHub 화면에서 초록색 Code 버튼을 누른 뒤 Download ZIP을 클릭하세요. 다운로드가 끝나면 압축을 해제하세요.',
        hint: '압축을 푼 폴더 이름이 길게 보이면 vibe-workspace처럼 짧게 바꿔도 됩니다.',
        example: '폴더 안에 CLAUDE.md, README.md, projects, notes가 보이면 맞게 받은 것입니다.'
      },
      {
        id: 'Ch3-S6',
        number: 6,
        title: 'VSCode에서 워크스페이스 폴더 열기',
        why: 'Claude Code는 VSCode에서 열린 폴더를 기준으로 파일을 읽고 수정합니다.',
        action: 'VSCode에서 File > Open Folder를 선택하고 방금 압축을 푼 워크스페이스 폴더를 여세요.',
        hint: '폴더 위치는 바탕화면이나 문서 폴더처럼 찾기 쉬운 곳을 추천합니다.',
        example: '왼쪽 파일 탐색기에 CLAUDE.md, README.md, projects, notes 폴더가 보이면 성공입니다.',
        screenshots: [{ src: 'screenshots/ch3/step-4.png', alt: 'VSCode에서 File > Open Folder로 워크스페이스 폴더 열기' }],
        screenshotPlaceholder: '화면 예시: VSCode에서 File > Open Folder로 워크스페이스 폴더 열기'
      },
      {
        id: 'Ch3-S7',
        number: 7,
        title: '/start 커맨드로 워크스페이스 개인화',
        why: '처음 한 번 내 이름과 목표를 저장해두면 Claude가 이후 대화에서 내 상황을 더 잘 이해합니다.',
        action: 'Claude Code 입력창에 아래 명령어를 입력하세요.',
        commands: ['/start'],
        hint: '한 번만 하면 됩니다. 이후 Claude가 대화할 때마다 CLAUDE.md의 정보를 참고합니다.',
        example: 'Claude가 이름, 목표, 관심사를 물어보고 CLAUDE.md를 업데이트하면 성공입니다.'
      },
      {
        id: 'Ch3-S8',
        number: 8,
        title: 'Claude Code 유용한 내장 커맨드 익히기',
        why: '대화가 길어질수록 토큰을 아끼고 이전 작업을 다시 찾는 습관이 중요합니다.',
        action: '아래 커맨드를 꼭 외울 필요는 없지만, 언제 쓰는지 감을 잡아두세요.',
        commands: ['/clear', '/resume', '/compact', '/account&usage'],
        hint: '/clear는 새 주제로 넘어갈 때 대화를 비워 토큰을 절약합니다. 이전 대화가 필요하면 /resume으로 다시 볼 수 있습니다. /compact는 현재 대화를 요약해 토큰 사용을 줄입니다. 대화가 길어지면 Claude가 자동으로 compact를 하기도 합니다. 토큰 사용량은 /account&usage에서 확인할 수 있습니다.',
        example: '새 프로젝트를 시작할 때는 /clear, 예전 작업으로 돌아갈 때는 /resume, 대화가 너무 길어졌을 때는 /compact, 사용량이 궁금할 때는 /account&usage를 떠올리면 됩니다.'
      },
      {
        id: 'Ch3-S9',
        number: 9,
        title: 'git status로 현재 상태 확인',
        why: '어떤 파일이 변경됐는지 확인하는 Git 기본 명령어입니다.',
        action: 'Claude Code에 현재 워크스페이스 상태를 확인해달라고 요청하세요.',
        commands: ['git status를 실행해서 현재 변경된 파일이 있는지 알려줘.'],
        example: '변경된 파일 목록이나 "nothing to commit" 같은 메시지가 보입니다.'
      },
      {
        id: 'Ch3-S10',
        number: 10,
        title: 'git add와 git commit 이해',
        why: 'git add는 저장할 파일을 선택하고, git commit은 세이브 포인트를 만드는 명령어입니다.',
        action: '명령어 의미를 먼저 이해하세요. 실제 저장은 뒤에서 /save로 진행합니다.',
        commands: ['git add .', 'git commit -m "CLAUDE.md 수정: 내 이름 추가"'],
        hint: '지금은 명령어를 외우는 것보다 add가 선택, commit이 기록이라는 감각만 잡으면 됩니다.',
        example: 'Claude가 /save를 실행할 때 내부적으로 이런 과정을 차례로 진행합니다.'
      },
      {
        id: 'Ch3-S11',
        number: 11,
        title: 'GitHub에 빈 저장소 만들기',
        why: '내 워크스페이스를 GitHub에 올려두면 다른 PC에서도 이어서 작업할 수 있고 백업도 됩니다.',
        action: 'GitHub 오른쪽 위 + 버튼 > New repository를 선택하고 first-vibe-coding처럼 짧은 이름의 저장소를 만드세요.',
        warning: 'Add a README file은 체크하지 마세요. README를 체크하면 처음 push할 때 충돌이 날 수 있습니다.',
        example: 'Create repository를 누른 뒤 새 저장소 주소가 보이면 성공입니다.'
      },
      {
        id: 'Ch3-S12',
        number: 12,
        title: '워크스페이스와 GitHub 저장소 연결',
        why: '저장소 연결이 되어 있어야 /save로 작업 내용을 GitHub에 올릴 수 있습니다.',
        action: '새 저장소 화면에 보이는 주소를 복사한 뒤 Claude Code에 아래처럼 요청하세요. 주소는 본인 주소로 바꾸면 됩니다.',
        commands: [
          `이 워크스페이스를 내 GitHub 저장소에 연결해줘.

저장소 주소:
https://github.com/내아이디/first-vibe-coding.git

해야 할 일:
- git init이 안 되어 있으면 실행
- 기본 브랜치는 main으로 설정
- remote origin을 위 저장소 주소로 연결
- 아직 커밋하지 말고 연결 상태만 확인`
        ],
        hint: '학생이 직접 터미널을 많이 만지기보다 Claude에게 필요한 명령을 실행하게 맡기면 됩니다.',
        example: 'Claude가 remote origin 연결 상태를 확인해주면 다음 단계로 넘어갑니다.'
      },
      {
        id: 'Ch3-S13',
        number: 13,
        title: '/save로 첫 커밋과 push',
        why: '/save는 변경된 파일을 확인하고, 보안 문제가 없는지 본 뒤, 커밋과 push까지 진행하는 저장 커맨드입니다.',
        action: 'Claude Code 입력창에 아래를 입력하세요.',
        commands: ['/save 첫 워크스페이스 설정 저장'],
        warning: '처음 push할 때 GitHub 로그인 창이 뜰 수 있습니다. 브라우저나 VSCode 인증 창이 열리면 본인 계정으로 로그인하고 승인하세요.',
        hint: '/save가 실행되지 않으면 Claude Code 패널을 새로 열고 다시 입력하세요. 그래도 안 되면 "현재 워크스페이스에서 /save와 같은 방식으로 git status, 보안 확인, 커밋, push를 차례대로 진행해줘"라고 요청하세요.',
        example: 'GitHub 저장소에 워크스페이스 파일이 올라가면 Ch3 완료입니다.'
      }
    ]
  },
  {
    id: 'Ch4',
    title: 'Ch4. 마크다운으로 AI와 문서 만들기',
    subtitle: '문서 생성과 수정 흐름 익히기',
    duration: '25분',
    goal: 'Claude에게 보고서 작성을 요청하고 notes/reports 폴더에 마크다운 파일을 자동 저장하는 흐름을 연습합니다.',
    steps: [
      {
        id: 'Ch4-S1',
        number: 1,
        title: '마크다운이 무엇인지 이해하기',
        why: '마크다운은 .md로 끝나는 텍스트 문서입니다. 제목, 목록, 표, 링크 같은 약속으로 보기 좋은 문서로 미리볼 수 있습니다.',
        action: '마크다운 문법을 외우려 하지 말고, Claude가 목적에 맞게 문서를 만들어준다는 점을 이해하세요.',
        commands: ['# 큰 제목\n\n## 작은 제목\n\n- 첫 번째 항목\n- 두 번째 항목\n\n| 도구 | 특징 |\n|------|------|\n| Claude | 긴 글과 코드 작업에 강함 |\n| ChatGPT | 다양한 질문과 아이디어 정리에 강함 |'],
        example: '우리는 원하는 문서의 목적과 내용을 말하고, Claude가 마크다운 형식으로 작성하게 하면 됩니다.'
      },
      {
        id: 'Ch4-S2',
        number: 2,
        title: '워크스페이스 저장 규칙 확인',
        why: 'CLAUDE.md에는 Claude가 따라야 할 작업 규칙이 들어 있습니다. 저장 위치 규칙을 적어두면 새 파일을 알맞은 폴더에 만들 수 있습니다.',
        action: 'Ch3에서 받은 워크스페이스를 VSCode로 열어둔 상태에서 왼쪽 파일 탐색기의 CLAUDE.md를 확인하세요.',
        hint: '이 워크스페이스에서는 마크다운 보고서와 조사 문서를 notes/reports 폴더에 저장합니다.',
        example: 'vibe-workspace/notes/reports/2026-05-18-ai-tools-report.md처럼 날짜와 제목이 들어간 파일이 만들어집니다.'
      },
      {
        id: 'Ch4-S3',
        number: 3,
        title: 'Claude Code 모드 이해하기',
        why: 'Claude Code는 작업 속도와 안전성을 조절하는 모드가 있습니다. 문서나 코드를 바로 만들기 전에 어떤 모드인지 알면 실수로 파일이 바뀌는 일을 줄일 수 있습니다.',
        action: 'Claude Code 입력창 아래쪽의 모드 표시를 확인하고, Shift + Tab으로 모드가 바뀌는 흐름을 살펴보세요. 지금은 Plan Mode를 사용할 준비만 하면 됩니다.',
        commands: [
          'Normal Mode: 기본 모드입니다. 파일 수정이나 명령 실행 전에 확인을 받으며 진행합니다.',
          'Auto-Accept Mode: 파일 수정 같은 작업을 자동으로 승인합니다. 빠르지만 초반에는 결과를 확인하는 습관을 먼저 들이는 편이 좋습니다.',
          'Plan Mode: 파일을 바로 고치지 않고 먼저 읽고 계획을 세웁니다. 보고서 구조를 잡거나 작업 방향을 정할 때 좋습니다.',
          'Shift + Tab: Normal Mode, Auto-Accept Mode, Plan Mode를 차례로 전환할 때 사용합니다.'
        ],
        warning: 'Auto-Accept Mode는 편리하지만 Claude가 만든 변경을 곧바로 받아들이는 모드입니다. 처음에는 Normal Mode나 Plan Mode로 결과를 확인하면서 진행하세요.',
        hint: 'Plan Mode가 켜져 있으면 Claude가 바로 파일을 만들기보다 먼저 계획을 보여줍니다. 다음 단계에서 이 모드를 사용해 보고서 구조부터 잡아봅니다.',
        example: '모드 표시에서 Plan Mode를 찾고, 언제 써야 하는지 이해했다면 다음 단계로 넘어가면 됩니다.'
      },
      {
        id: 'Ch4-S4',
        number: 4,
        title: 'Plan Mode에서 보고서 구조 잡기',
        why: '바로 파일을 만들기보다 먼저 구조를 잡으면 더 좋은 결과가 나옵니다.',
        action: 'Claude Code 입력창에서 Plan Mode를 켠 뒤 아래 문장을 입력하세요.',
        commands: [
          `내가 처음 써볼 AI 도구 3개를 비교하는 마크다운 보고서를 만들고 싶어.
먼저 어떤 구조로 조사하고 작성하면 좋을지 계획을 세워줘.
비교 표, 추천 사용자, 내가 써볼 만한 상황이 포함되면 좋겠어.
아직 파일은 만들지 말고 계획만 보여줘.`
        ],
        hint: '계획이 마음에 들지 않으면 "대학생이 읽기 쉽게 바꿔줘"처럼 추가 요청하면 됩니다.',
        example: '보고서 목차와 조사 방향이 제안되면 성공입니다.'
      },
      {
        id: 'Ch4-S5',
        number: 5,
        title: '마크다운 파일 만들기',
        why: '계획이 괜찮다면 이제 실제 파일 생성을 요청합니다.',
        action: '아래 조건을 그대로 복사해서 Claude에게 요청하세요.',
        commands: [
          `좋아. 이 계획대로 마크다운 보고서를 작성해줘.

조건:
- 파일은 워크스페이스 안의 notes/reports/ 폴더에 저장해줘.
- 파일명은 오늘 날짜와 주제가 보이게 정해줘.
- 제목, 요약, 비교 표, 추천 사용자, 내가 써볼 만한 상황을 포함해줘.
- 출처 링크를 넣는다면 공식 사이트 링크만 사용해줘.
- 초보자가 읽기 쉽게 너무 딱딱하지 않은 문장으로 써줘.`
        ],
        hint: 'reports 폴더가 안 보이면 "notes/reports 폴더가 없으면 만들고, 방금 작성한 마크다운 보고서를 그 안에 저장해줘"라고 요청하세요.',
        example: 'VSCode 왼쪽 파일 탐색기에서 notes/reports 폴더 안에 .md 파일이 생기면 성공입니다.'
      },
      {
        id: 'Ch4-S6',
        number: 6,
        title: 'VSCode에서 미리보기',
        why: '마크다운 파일은 원본 텍스트로도 볼 수 있고 보기 좋은 문서 형태로 미리볼 수도 있습니다.',
        action: 'notes/reports 안의 .md 파일을 클릭한 뒤 Ctrl + Shift + V를 누르세요.',
        hint: '화면 오른쪽 위의 미리보기 아이콘을 눌러도 됩니다. 원본과 미리보기를 나란히 열면 수정 결과를 바로 확인할 수 있습니다.',
        example: '문서가 보기 좋은 형태로 열리면 성공입니다.'
      },
      {
        id: 'Ch4-S7',
        number: 7,
        title: '문서 수정 요청하기',
        why: '파일을 사람이 직접 다 고치는 대신 Claude에게 개선을 요청하는 흐름을 익힙니다.',
        action: '방금 만든 보고서를 아래 방향으로 수정해달라고 요청하세요.',
        commands: [
          `방금 만든 보고서를 조금 수정해줘.

수정 방향:
- 첫 문단을 더 친절하게 바꿔줘.
- 표에 "추천 사용자" 열을 추가해줘.
- 마지막에 "내가 써볼 만한 도구 3개" 섹션을 추가해줘.
- 저장 위치는 그대로 notes/reports/ 안의 같은 파일로 해줘.`
        ],
        example: '미리보기에서 문장이 바뀌고 표에 새 열이 추가되었다면 Claude와 파일을 함께 수정하는 흐름을 익힌 겁니다.'
      },
      {
        id: 'Ch4-S8',
        number: 8,
        title: '바이브코딩 흐름 이해하기',
        why: '바이브코딩도 문서 작업과 같은 흐름입니다. 목표를 말하고, Claude가 파일을 만들고, 우리는 결과를 확인하고 다시 수정 요청을 합니다.',
        action: '계획 세우기, 파일 생성, 자동 저장 위치 확인, 미리보기, 수정 요청의 흐름을 정리하세요.',
        hint: '오늘은 코드 대신 문서로 연습했을 뿐입니다. 마지막 프로젝트에서도 같은 방식으로 진행합니다.',
        example: '이 흐름을 이해하면 Ch5에서 파일을 만들고 고치는 과정이 훨씬 덜 낯설어집니다.'
      }
    ]
  },
  {
    id: 'Ch5',
    title: 'Ch5. 실습 - 파일 정리 자동화',
    subtitle: 'Python 스크립트로 테스트 폴더 정리하기',
    duration: '30분',
    goal: 'Claude와 함께 파일들을 확장자별로 자동 분류하는 Python 스크립트를 만들고 안전하게 테스트합니다.',
    steps: [
      {
        id: 'Ch5-S1',
        number: 1,
        title: '워크스페이스 폴더를 VSCode로 열기',
        why: 'Ch3에서 내려받은 워크스페이스 안에서 프로젝트 파일을 만들어야 합니다.',
        action: '워크스페이스 폴더가 닫혀 있다면 VSCode의 파일 > 폴더 열기로 다시 열어주세요.',
        example: '왼쪽 파일 탐색기에 CLAUDE.md와 notes, projects 같은 폴더가 보이면 준비 완료입니다.'
      },
      {
        id: 'Ch5-S2',
        number: 2,
        title: 'VSCode에서 Claude Code 열기',
        why: 'Claude가 워크스페이스 폴더와 CLAUDE.md 규칙을 읽은 상태에서 작업해야 합니다.',
        action: '왼쪽 사이드바에서 Claude Code 아이콘을 클릭해서 패널을 여세요.',
        example: 'Claude Code 입력창이 보이면 다음 단계로 갑니다.',
        screenshotPlaceholder: '화면 예시: 워크스페이스 폴더에서 Claude Code 패널 열기'
      },
      {
        id: 'Ch5-S3',
        number: 3,
        title: '테스트 폴더 만들기',
        why: '처음부터 실제 다운로드 폴더를 정리하지 않고 안전한 테스트 폴더에서 먼저 연습합니다.',
        action: 'Claude 입력창에 아래 내용을 그대로 입력하세요.',
        commands: [
          `바탕화면에 'test-downloads' 폴더를 만들고,
안에 테스트용 빈 파일을 6개 정도 만들어줘.

예시:
- report.pdf
- photo.jpg
- screenshot.png
- music.mp3
- memo.txt
- data.csv`
        ],
        example: '바탕화면에 test-downloads 폴더와 테스트 파일들이 생기면 성공입니다.',
        screenshotPlaceholder: '화면 예시: Claude에 테스트 폴더 생성을 요청하는 화면'
      },
      {
        id: 'Ch5-S4',
        number: 4,
        title: '테스트 폴더 정리 스크립트 요청',
        why: '코드를 몰라도 조건을 정확히 말하면 Claude가 Python 스크립트를 만들어줄 수 있습니다.',
        action: 'Claude에게 아래처럼 요청하세요.',
        commands: [
          `방금 바탕화면에 만든 test-downloads 폴더를 정리해주는 Python 스크립트를 만들어줘.

조건:
- 파일은 반드시 scripts/organize.py 경로에 저장
- PDF 파일은 '문서' 폴더로 이동
- 이미지 파일(jpg, jpeg, png, gif, webp)은 '사진' 폴더로 이동
- 음악 파일(mp3, wav, flac)은 '음악' 폴더로 이동
- 그 외 파일은 '기타' 폴더로 이동
- 폴더가 없으면 자동으로 만들어줘
- 실제 다운로드 폴더는 건드리지 말고 바탕화면의 test-downloads 폴더만 대상으로 해줘
- 각 줄에 주석으로 설명도 달아줘`
        ],
        warning: '처음부터 실제 다운로드 폴더를 정리하지 마세요. 테스트 폴더에서 성공한 뒤에만 실제 폴더 적용을 요청하는 것이 안전합니다.',
        screenshotPlaceholder: '화면 예시: Claude에 스크립트 요청하는 화면'
      },
      {
        id: 'Ch5-S5',
        number: 5,
        title: '생성된 코드 확인하기',
        why: '자동화 스크립트는 파일을 실제로 이동시킬 수 있으므로 대상 경로를 확인해야 합니다.',
        action: 'VSCode 왼쪽 파일 탐색기에서 scripts/organize.py를 열고 정리 대상 경로가 바탕화면의 test-downloads인지 확인하세요.',
        hint: '코드가 이해되지 않으면 Claude에게 "이 코드를 초보자도 이해할 수 있게 한 줄씩 설명해줘"라고 물어보세요.',
        example: '파일이 scripts/organize.py 경로에 있고 바탕화면의 test-downloads만 대상으로 하면 다음 단계로 갑니다.'
      },
      {
        id: 'Ch5-S6',
        number: 6,
        title: '스크립트 실행하기',
        why: '직접 실행해봐야 자동 분류가 실제로 작동하는지 확인할 수 있습니다.',
        action: 'Claude에게 scripts/organize.py를 실행해달라고 요청하세요.',
        commands: ['scripts/organize.py를 실행해줘'],
        warning: '스크립트가 실행되면 파일이 실제로 이동됩니다. 지금은 바탕화면의 test-downloads 폴더만 대상으로 해야 합니다.',
        hint: '오류가 나면 오류 메시지를 복사해서 Claude에게 "이 오류가 났어. 왜 그런지 설명하고 고쳐줘"라고 요청하세요.',
        example: 'test-downloads 폴더 안에 문서, 사진, 음악, 기타 폴더가 생기고 파일들이 분류되면 성공입니다.',
        screenshotPlaceholder: '화면 예시: 스크립트 실행 후 폴더가 분류된 결과'
      },
      {
        id: 'Ch5-S7',
        number: 7,
        title: '실제 다운로드 폴더 적용 전 미리보기 요청',
        why: '실제 파일을 옮기는 자동화는 항상 미리보기와 확인 단계를 넣는 습관이 좋습니다.',
        action: '테스트가 성공했을 때만 Claude에게 실제 다운로드 폴더 적용 전 미리보기 기능을 추가해달라고 요청하세요.',
        commands: [
          `테스트 폴더에서는 잘 됐어.
이제 실제 다운로드 폴더에 적용하기 전에,
어떤 파일이 어디로 이동될지 먼저 미리보기로 보여주는 기능을 추가해줘.
내가 확인한 뒤에만 실제 이동되게 해줘.`
        ],
        warning: '실제 다운로드 폴더 적용은 선택입니다. 수업 중에는 테스트 폴더 성공까지만 해도 충분합니다.'
      },
      {
        id: 'Ch5-S8',
        number: 8,
        title: '스크립트 개선 요청하기',
        why: '개선 요청을 주고받으며 결과물을 다듬는 것이 바이브코딩의 핵심입니다.',
        action: '아래 예시 중 하나를 골라 Claude에게 개선을 요청해보세요.',
        commands: [
          '"이동한 파일 목록을 화면에 출력해줘"',
          '"같은 이름의 파일이 있을 때 덮어쓰지 말고 숫자를 붙여서 저장해줘"',
          '"오늘 날짜 폴더 안에 분류해줘 (예: 문서/2026-05-14/)"',
          '"실행 전에 어떤 파일이 어디로 갈지 미리 보여주고 확인 받아줘"'
        ],
        example: '개선 요청 후 코드가 바뀌고 실행 결과가 더 좋아졌다면 성공입니다.'
      },
      {
        id: 'Ch5-S9',
        number: 9,
        title: '/save로 완성본 저장',
        why: '완성한 파일을 GitHub에 저장하면 나중에 다시 열어도 어떤 작업을 했는지 추적할 수 있습니다.',
        action: 'VSCode 왼쪽 파일 탐색기에서 scripts/organize.py 파일이 보이면 Claude Code 입력창에 /save를 입력하세요.',
        commands: ['/save 파일 정리 자동화 완성'],
        hint: '/save는 작업 내용을 커밋으로 기록하고 GitHub에 push합니다.',
        example: 'GitHub 저장소에 scripts/organize.py가 올라가면 모든 챕터 완료입니다.',
        screenshotPlaceholder: '화면 예시: VSCode 파일 탐색기에 완성된 scripts/organize.py가 보이는 화면'
      }
    ]
  }
];

export const INTRO_CONTENT = {
  title: '바이브코딩 가이드북',
  subtitle: '코딩을 몰라도 괜찮아요. AI와 함께라면 됩니다.',
  description: '이 가이드를 끝내면 AI에게 원하는 것을 말해서 실제로 돌아가는 프로그램을 만들 수 있습니다. 코딩 문법을 외우기보다 무엇을 만들지 방향을 잡고, AI가 만든 결과를 확인하며 피드백하는 연습을 합니다.',
  howMessage: 'AI(Claude Code)에게 원하는 기능을 자연어로 설명하면 AI가 코드를 생성해줍니다. 여러분은 결과를 보고 피드백을 주면 됩니다. 코드를 직접 짜는 것보다 방향을 잡는 것이 핵심입니다.',
  metaInfo: {
    totalChapters: 5,
    estimatedTime: '약 1~2시간',
    workspaceProject: '파일 정리 자동화 Python 스크립트 1개',
    costRequire: 'Claude Pro 구독 필요',
    pcRecommend: 'Windows 10 이상 PC',
    internetCheck: '소프트웨어 다운로드와 Claude Code 사용을 위한 인터넷 연결',
    workspaceRepoUrl: 'https://github.com/dur4290/vibe-coding-guide',
    warningRepoCheck: '현재 읽고 있는 이 가이드북과 Ch3에서 내려받을 실습용 워크스페이스 저장소는 서로 다릅니다. 실습 폴더는 Ch3에서 Download ZIP으로 내려받습니다.'
  },
  overview: [
    { num: 1, title: '개발 환경 설정', time: '15~20분', summary: 'VSCode와 Python이 준비되어 있는지 확인하고, 없을 때만 설치합니다.' },
    { num: 2, title: 'Claude Code 시작하기', time: '10~15분', summary: 'AI 코딩 도구인 Claude Code 확장을 설치하고 첫 대화를 확인합니다.' },
    { num: 3, title: 'Git 기초', time: '25~30분', summary: 'GitHub 계정과 학생 워크스페이스를 준비하고 저장 흐름을 익힙니다.' },
    { num: 4, title: '마크다운 문서 만들기', time: '20분', summary: 'Claude Code와 함께 마크다운 보고서를 만들며 파일 생성과 수정 흐름을 연습합니다.' },
    { num: 5, title: '실습 프로젝트', time: '30분', summary: 'Claude Code를 이용해 파일 정리 자동화 스크립트를 실제로 만들어봅니다.' }
  ]
};
