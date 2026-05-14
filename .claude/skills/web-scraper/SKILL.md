---
name: web-scraper
description: 웹페이지에서 데이터를 자동으로 수집하는 스크립트를 만들어줍니다
allowed-tools: Read, Write, Bash, Glob
---

# 웹 스크래퍼 스킬

웹페이지에서 데이터를 자동으로 가져오는 Python 스크립트를 만들어드립니다.

## 트리거 문구

- "웹에서 데이터 가져와줘"
- "이 사이트 긁어줘"
- "웹 스크래핑 해줘"
- "XXX 사이트에서 XXX 수집해줘"

---

## 시작 전 반드시 확인 (로봇 규칙)

스크래핑 전에 항상 `사이트주소/robots.txt`를 확인합니다.

**robots.txt가 막고 있으면**: 다른 방법(공식 API, 수동 다운로드 등)을 권장하고, 사용자가 동의할 때만 진행합니다.

---

## 스크립트를 만들기 전에 물어볼 것

사용자에게 6가지를 확인합니다:

1. **목표 URL**: 어떤 사이트에서 가져올 건가요?
2. **수집 대상**: 제목? 가격? 날짜? 링크? 어떤 데이터인가요?
3. **페이지 수**: 1페이지만? 여러 페이지를 돌아야 하나요?
4. **저장 형식**: CSV? JSON? 어디에 저장할까요?
5. **갱신 빈도**: 한 번만 실행? 주기적으로 실행?
6. **로그인 필요 여부**: 로그인 없이 볼 수 있는 페이지인가요?

---

## 도구 선택 기준

| 상황 | 도구 |
|------|------|
| 일반 HTML 페이지 (정적) | `requests` + `BeautifulSoup` |
| JavaScript로 로딩되는 페이지 | `playwright` |
| 로그인이 필요한 경우 | `playwright` |

---

## 스크립트 저장 위치

완성된 스크립트는 `scripts/` 폴더에 저장합니다.
```
scripts/
└── scrape_사이트이름.py
```

수집된 데이터는 스크립트와 같은 폴더 또는 `scripts/data/` 안에 저장합니다.

---

## 스크립트 기본 구조

```python
# scrape_예시.py
# 무엇을 하는 스크립트인지 한 줄 설명

import requests
from bs4 import BeautifulSoup
import csv
from datetime import datetime

# 설정 (여기만 수정하면 됩니다)
URL = "https://example.com"
OUTPUT_FILE = "scripts/data/결과.csv"

def scrape():
    # 페이지 가져오기
    response = requests.get(URL)
    response.encoding = "utf-8"  # 한글 깨짐 방지
    
    # HTML 파싱
    soup = BeautifulSoup(response.text, "html.parser")
    
    # 데이터 추출 (CSS 선택자 사용)
    items = soup.select("div.item")
    
    results = []
    for item in items:
        results.append({
            "제목": item.select_one("h2").text.strip(),
            "수집일시": datetime.now().strftime("%Y-%m-%d %H:%M"),
        })
    
    return results

def save_csv(data, filepath):
    with open(filepath, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
    print(f"저장 완료: {filepath} ({len(data)}건)")

if __name__ == "__main__":
    data = scrape()
    save_csv(data, OUTPUT_FILE)
```

---

## 필요한 패키지 설치

```bash
pip install requests beautifulsoup4
# JavaScript 사이트라면:
pip install playwright
python -m playwright install chromium
```

---

## 주의사항

- 너무 빠르게 요청하면 사이트가 차단할 수 있어요. 여러 페이지를 돌 때는 `time.sleep(1)` 추가를 권장합니다.
- 수집한 데이터는 개인 학습용으로만 사용하세요.
- 사이트 이용약관을 꼭 확인하세요.