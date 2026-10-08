import docx
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls
import win32com.client
import os
import pypdf

def add_heading(doc, title):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(title.upper())
    run.font.name = 'Calibri'
    run.font.size = Pt(11)
    run.font.bold = True
    run.font.color.rgb = RGBColor(30, 30, 30)
    
    pPr = p._p.get_or_add_pPr()
    xml_str = '<w:pBdr ' + nsdecls('w') + '><w:bottom w:val="single" w:sz="6" w:space="1" w:color="CCCCCC"/></w:pBdr>'
    pBdr = parse_xml(xml_str)
    pPr.append(pBdr)

def build_jd_tailored_data_entry_resume():
    doc = docx.Document()
    
    # 0.65 inch margins
    for section in doc.sections:
        section.top_margin = Inches(0.65)
        section.bottom_margin = Inches(0.65)
        section.left_margin = Inches(0.7)
        section.right_margin = Inches(0.7)
        
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Calibri'
    font.size = Pt(10)
    font.color.rgb = RGBColor(40, 40, 40)
    
    # Header: Name
    p_name = doc.add_paragraph()
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(2)
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_name = p_name.add_run('DHEERAJ NICHENAMETLA')
    r_name.font.name = 'Calibri'
    r_name.font.size = Pt(17)
    r_name.font.bold = True
    r_name.font.color.rgb = RGBColor(20, 20, 20)
    
    # Contact Info
    p_contact = doc.add_paragraph()
    p_contact.paragraph_format.space_after = Pt(6)
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_contact = p_contact.add_run('Phone: 8019479721   |   Email: dheerajnichenametla@gmail.com')
    r_contact.font.name = 'Calibri'
    r_contact.font.size = Pt(10)
    
    # 1. PROFESSIONAL SUMMARY
    add_heading(doc, 'PROFESSIONAL SUMMARY')
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.space_after = Pt(4)
    p_sum.paragraph_format.line_spacing = 1.15
    r_sum = p_sum.add_run('Detail-oriented Computer Science graduate (85% B.Sc) seeking a Data Entry Executive / Data Entry Operator role. Proficient in MS Office suite (Excel, Word, PowerPoint), Windows 10, high-speed numerical and alphanumeric data transcription, and record management. Recognized for 100% data accuracy, systematic file organization, fast learning, and clear English and Telugu communication skills.')
    r_sum.font.size = Pt(10)

    # 2. CORE SKILLS & COMPETENCIES
    add_heading(doc, 'CORE SKILLS & COMPETENCIES')
    
    skills = [
        ('Data Processing & Entry:', 'High-Speed Typing, Alphanumeric Data Entry, 100% Data Accuracy, Verification'),
        ('Software Applications:', 'MS Excel (Data Tables, Formatting), MS Word, MS PowerPoint, MS Office Suite'),
        ('Operating Systems & Tools:', 'Windows 10, File Archiving & Management, Internet Research, Computer Operations'),
        ('Key Strengths:', 'Attention to Detail, Systematic Record Keeping, Problem Solving, Communication')
    ]
    for cat, items in skills:
        p_sk = doc.add_paragraph()
        p_sk.paragraph_format.space_after = Pt(2)
        p_sk.paragraph_format.line_spacing = 1.15
        r_cat = p_sk.add_run(f'•  {cat} ')
        r_cat.bold = True
        r_cat.font.size = Pt(10)
        r_it = p_sk.add_run(items)
        r_it.font.size = Pt(10)

    # 3. EDUCATION
    add_heading(doc, 'EDUCATION')
    edu_list = [
        ('B.Sc Computer Science (Honors)', 'Government Degree College', '2026', '85%'),
        ('Intermediate (IPE)', 'Vijayawada Nalanda Junior College', '2023', '65%'),
        ('SSC', 'Nava Bharath English Medium High School, Anantapur', '2021', '90%')
    ]
    for deg, inst, yr, pct in edu_list:
        p_e = doc.add_paragraph()
        p_e.paragraph_format.space_after = Pt(2)
        p_e.paragraph_format.line_spacing = 1.15
        r_d = p_e.add_run(f'{deg}  ')
        r_d.bold = True
        r_d.font.size = Pt(10)
        r_details = p_e.add_run(f'|  {inst}  |  {yr}  |  {pct}')
        r_details.font.size = Pt(10)

    # 4. CERTIFICATIONS & ACADEMIC HIGHLIGHTS
    add_heading(doc, 'CERTIFICATIONS & TECHNICAL HIGHLIGHTS')
    p_cert = doc.add_paragraph()
    p_cert.paragraph_format.space_after = Pt(3)
    p_cert.paragraph_format.line_spacing = 1.15
    r_c1 = p_cert.add_run('•  Python Full Stack Development Certification\n•  Frontend Development Certification\n•  Computer Science Academic Distinction (85% Aggregate)')
    r_c1.font.size = Pt(10)

    # 5. CORE STRENGTHS & CAPABILITIES
    add_heading(doc, 'CORE STRENGTHS & CAPABILITIES')
    p_add = doc.add_paragraph()
    p_add.paragraph_format.space_after = Pt(3)
    p_add.paragraph_format.line_spacing = 1.15
    r_a = p_add.add_run('•  Dedicated & Hardworking   |   Teamwork & Collaboration   |   Problem-Solving Ability   |   Eagerness to Learn')
    r_a.font.size = Pt(10)

    # 6. LANGUAGES
    add_heading(doc, 'LANGUAGES')
    p_lang = doc.add_paragraph()
    p_lang.paragraph_format.space_after = Pt(0)
    p_lang.paragraph_format.line_spacing = 1.15
    r_l = p_lang.add_run('English, Telugu')
    r_l.font.size = Pt(10)

    # Save Paths
    folder_path = r'e:\dheeraj-portfolio\RESUMES\NON-IT\Data Entry'
    os.makedirs(folder_path, exist_ok=True)
    out_docx = os.path.join(folder_path, 'Dheeraj_Nichenametla_Data_Entry_JD_Tailored_Resume.docx')
    out_pdf = os.path.join(folder_path, 'Dheeraj_Nichenametla_Data_Entry_JD_Tailored_Resume.pdf')
    
    doc.save(out_docx)
    
    # Convert to PDF via MS Word
    word = win32com.client.Dispatch('Word.Application')
    word.Visible = False
    doc_com = word.Documents.Open(out_docx)
    doc_com.SaveAs(out_pdf, FileFormat=17) # 17 = wdFormatPDF
    doc_com.Close()
    word.Quit()
    
    # Perform ATS Audit
    reader = pypdf.PdfReader(out_pdf)
    text = ''
    for page in reader.pages:
        text += page.extract_text()
        
    print('==================================================')
    print('TAILORED DATA ENTRY RESUME ATS TEXT EXTRACTION:')
    print('==================================================')
    print(text)
    print('==================================================')
    print(f'Total Pages: {len(reader.pages)}')
    print(f'DOCX: {out_docx}')
    print(f'PDF: {out_pdf}')

if __name__ == '__main__':
    build_jd_tailored_data_entry_resume()
