#!/usr/bin/env python3
import PyPDF2
import sys

def extract_pdf_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += f"\n--- 第 {page_num + 1} 页 ---\n"
                text += page.extract_text()
            return text
    except Exception as e:
        return f"读取PDF文件时出错: {str(e)}"

if __name__ == "__main__":
    pdf_path = "CodeSphere-需求规格说明书.pdf"
    text = extract_pdf_text(pdf_path)
    print(text) 