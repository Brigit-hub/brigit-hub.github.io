from pathlib import Path
from docx import Document

doc_dir = Path(__file__).parent / "docs"
files = list(doc_dir.glob("*.docx")) if doc_dir.exists() else []

if not files:
    print("No .docx files found in 'docs/' directory.")
    print("Place Word documents in the 'docs/' folder and re-run.")
else:
    for p in files:
        print('FILE:', p)
        doc = Document(p)
        text = [para.text.strip() for para in doc.paragraphs if para.text.strip()]
        print('PARAGRAPHS:', len(text))
        for line in text[:50]:
            print(line)
        print('---')
