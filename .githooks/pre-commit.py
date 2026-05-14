#!/usr/bin/env python3
"""
커밋 보안 검사 — API 키 / 비밀번호 자동 차단
"""
import subprocess
import re
import sys


def run(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True).stdout


def check_env_files():
    staged = run("git diff --cached --name-only")
    env_files = [f for f in staged.splitlines() if re.match(r"^\.env", f)]
    if env_files:
        print()
        print("🚨 위험: .env 파일을 커밋하려고 해요!")
        print()
        for f in env_files:
            print(f"   파일: {f}")
        print()
        print("❌ 커밋이 차단됐습니다.")
        print("💡 .env 파일에는 API 키가 들어있어요. 절대 GitHub에 올리면 안 됩니다.")
        print("   .gitignore에 .env가 포함되어 있는지 확인하세요.")
        print()
        sys.exit(1)


def check_api_patterns():
    diff = run("git diff --cached -U0")
    # 추가된 줄만 검사 (주석 줄 제외)
    added = [
        line for line in diff.splitlines()
        if line.startswith("+") and not line.startswith("+++")
    ]

    patterns = [
        (r"sk-ant-api[0-9]",                "Anthropic API 키"),
        (r"sk-proj-[A-Za-z0-9]",            "Anthropic 프로젝트 API 키"),
        (r"ANTHROPIC_API_KEY\s*=\s*['\"]sk", "Anthropic API 키 할당"),
        (r"openai\.api_key\s*=\s*['\"]sk",   "OpenAI API 키"),
        (r"sk-[A-Za-z0-9]{48}",             "OpenAI 형식 API 키"),
        (r"AIza[A-Za-z0-9_-]{35}",          "Google API 키"),
        (r"password\s*=\s*['\"][^'\"]{6}",   "비밀번호 하드코딩"),
        (r"secret\s*=\s*['\"][^'\"]{8}",     "시크릿 하드코딩"),
    ]

    for pattern, label in patterns:
        hits = [
            line for line in added
            if re.search(pattern, line, re.IGNORECASE)
            and not line.lstrip("+").lstrip().startswith("#")
        ]
        if hits:
            print()
            print(f"🚨 위험: {label} 가 발견됐어요!")
            print()
            for h in hits[:5]:
                print(f"   {h}")
            print()
            print("❌ 커밋이 차단됐습니다.")
            print("💡 API 키는 .env 파일에 저장하고 os.environ.get()으로 읽으세요.")
            sys.exit(1)


print("🔍 보안 검사 중...")
check_env_files()
check_api_patterns()
print("✅ 보안 검사 통과! 커밋을 진행합니다.")
sys.exit(0)
