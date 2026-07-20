from pathlib import Path
import zipfile
from docx import Document
import pandas as pd

base = Path(r'c:\Users\jacks\Downloads')
cv = base / 'Bridgit_Etyang CV.docx'
xlsx = base / 'Bridgit_Etyang_Financial_Analysis (1).xlsx'
pbix = base / "Bridgit_Etyang's Power BI Project.pbix.zip"

print('cv exists', cv.exists())
print('xlsx exists', xlsx.exists())
print('pbix exists', pbix.exists())

if cv.exists():
    doc = Document(cv)
    txt = '\n'.join(p.text for p in doc.paragraphs)
    print('CV text length', len(txt))
    print(txt[:12000])

if xlsx.exists():
    xl = pd.ExcelFile(xlsx)
    print('xlsx sheets', xl.sheet_names)
    for s in xl.sheet_names[:5]:
        df = pd.read_excel(xlsx, sheet_name=s)
        print('sheet', s, 'shape', df.shape)
        print(df.head(8).to_string(index=False))

if pbix.exists():
    with zipfile.ZipFile(pbix) as z:
        print('pbix entries', z.namelist()[:100])
