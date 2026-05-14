#!/usr/bin/env python3
"""
vibe-workspace 초기 설정 스크립트
실행 방법: python setup.py
"""
import subprocess
import os
import sys

# Windows 터미널에서 ANSI 색상 활성화 (Windows 10 1511 이상)
if sys.platform == "win32":
    os.system("")


def run(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True)


def c(text, color):
    codes = {
        "cyan": "\033[96m", "yellow": "\033[93m", "green": "\033[92m",
        "red": "\033[91m", "gray": "\033[90m", "reset": "\033[0m",
    }
    print(f"{codes.get(color, '')}{text}{codes['reset']}")


def main():
    print()
    c("⚡ vibe-workspace 설정을 시작합니다...", "cyan")
    print()

    # 1. Git 훅 활성화
    c("🔐 보안 훅 설정 중...", "yellow")
    result = run("git config core.hooksPath .githooks")
    if result.returncode == 0:
        c("  ✅ 보안 훅이 활성화됐어요!", "green")
        c("     이제 API 키가 담긴 파일은 자동으로 커밋이 차단됩니다.", "gray")
    else:
        c("  ⚠️  Git이 설치되어 있는지 확인해주세요.", "red")
    print()

    # 2. Git 사용자 정보 확인
    git_name = run("git config --global user.name").stdout.strip()
    git_email = run("git config --global user.email").stdout.strip()

    if not git_name or not git_email:
        c("📝 Git 사용자 정보를 설정해야 해요.", "yellow")
        print()
        name = input("  이름을 입력하세요 (예: 홍길동): ").strip()
        email = input("  이메일을 입력하세요 (예: hong@email.com): ").strip()
        if name:
            run(f'git config --global user.name "{name}"')
        if email:
            run(f'git config --global user.email "{email}"')
        c("  ✅ Git 사용자 정보가 설정됐어요!", "green")
    else:
        c(f"👤 Git 사용자: {git_name} <{git_email}>", "green")
    print()

    # 3. .env.example 생성
    if not os.path.exists(".env.example"):
        content = (
            "# ============================================================\n"
            "# 환경변수 예시 파일 (.env.example)\n"
            "# 이 파일은 GitHub에 올려도 됩니다 (실제 값이 없으니까요)\n"
            "#\n"
            "# 실제 API 키를 넣으려면:\n"
            "# 1. 이 파일을 복사해서 .env 이름으로 저장하세요\n"
            "# 2. 실제 값을 입력하세요\n"
            "# 3. .env는 절대 GitHub에 올리지 마세요! (.gitignore가 막아줍니다)\n"
            "# ============================================================\n"
            "\n"
            "ANTHROPIC_API_KEY=여기에_실제_API_키를_입력하세요\n"
        )
        with open(".env.example", "w", encoding="utf-8") as f:
            f.write(content)
        c("📄 .env.example 파일을 생성했어요.", "green")

    print()
    c("🎉 설정 완료! 이제 VSCode에서 이 폴더를 열고", "cyan")
    c("   터미널에서 'claude'를 입력해서 시작하세요.", "cyan")
    print()


if __name__ == "__main__":
    main()
