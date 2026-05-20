---
name: pdf
description: PDF 파일을 읽거나, 텍스트를 추출하거나, 내용을 요약합니다
allowed-tools: Read, Write, Bash, Glob
---

# PDF 스킬

PDF 파일을 다루는 Python 스크립트를 만들어드립니다.

## 트리거 문구

- "PDF 읽어줘"
- "PDF에서 텍스트 뽑아줘"
- "PDF 내용 요약해줘"
- "PDF 파일 처리해줘"

---

## 할 수 있는 것

| 작업 | 설명 |
|------|------|
| 텍스트 추출 | PDF의 글자를 텍스트 파일로 저장 |
| 내용 요약 | Claude가 PDF 내용을 읽고 요약 |
| 페이지 수 확인 | 몇 페이지짜리 PDF인지 확인 |
| 특정 페이지 읽기 | 원하는 페이지만 읽기 |

---

## 필요한 패키지

- `pypdf`: 빠른 텍스트 추출, 기본 PDF 처리
- `pdfplumber`: 표 추출, 더 정확한 텍스트 위치 정보

Claude가 자동으로 설치해줄게요.

---

## 텍스트 추출 기본 코드

```python
# pdf_extract.py
# PDF에서 텍스트를 추출해서 .txt 파일로 저장합니다

import pdfplumber
from pathlib import Path

def extract_text(pdf_path):
    pdf_path = Path(pdf_path)
    output_path = pdf_path.with_suffix(".txt")
    
    all_text = []
    
    with pdfplumber.open(pdf_path) as pdf:
        total = len(pdf.pages)
        print(f"총 {total}페이지 처리 중...")
        
        for i, page in enumerate(pdf.pages, 1):
            text = page.extract_text()
            if text:
                all_text.append(f"--- {i}페이지 ---\n{text}")
            print(f"  {i}/{total} 완료", end="\r")
    
    result = "\n\n".join(all_text)
    output_path.write_text(result, encoding="utf-8")
    print(f"\n저장 완료: {output_path}")
    return result

if __name__ == "__main__":
    import sys
    pdf_file = sys.argv[1] if len(sys.argv) > 1 else input("PDF 파일 경로: ")
    extract_text(pdf_file)
```

---

## 표가 있는 PDF 처리

```python
import pdfplumber
import csv

def extract_tables(pdf_path, output_csv):
    with pdfplumber.open(pdf_path) as pdf:
        all_rows = []
        for page in pdf.pages:
            tables = page.extract_tables()
            for table in tables:
                all_rows.extend(table)
    
    with open(output_csv, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.writer(f)
        writer.writerows(all_rows)
    
    print(f"표 추출 완료: {output_csv}")
```

---

## PDF 내용 요약 방법

텍스트를 추출한 뒤, Claude Code가 로컬 파일을 읽고 요약합니다.  
API 키를 발급받거나 API 호출 코드를 만들지 마세요.

1. 위 코드로 텍스트 추출 → `.txt` 파일 생성
2. Claude Code에: "이 파일 읽고 요약해줘" → `Read` 도구로 읽고 요약

---

## 저장 위치

- 추출된 텍스트: PDF와 같은 폴더에 `파일명.txt`로 저장
- 수집된 표: `scripts/data/` 폴더에 저장

---

## 주의사항

- 스캔된 PDF(이미지로 만든 PDF)는 텍스트 추출이 안 될 수 있어요
- 한글 PDF는 인코딩 문제가 생길 수 있으니, `utf-8`로 저장할 때 문제가 생기면 알려줘요
- 매우 큰 PDF(100페이지 이상)는 시간이 걸릴 수 있어요
- 요약 기능 때문에 Anthropic/OpenAI/Gemini API 키 발급을 안내하지 마세요. 기본 실습에서는 Claude Code의 현재 세션에서 요약합니다
