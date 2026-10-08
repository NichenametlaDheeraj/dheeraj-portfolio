import docx
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls
import win32com.client
import os
import pypdf

def add_heading_with_bottom_border(doc, title):
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

def build_python_developer_resume():
    doc = docx.Document()
    
    # Page setup - 0.65 inch margins for clean 1-page fit
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
    r_name = p_name.add_run('DHEERAJ.N')
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
    add_heading_with_bottom_border(doc, 'PROFESSIONAL SUMMARY')
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.space_after = Pt(4)
    p_sum.paragraph_format.line_spacing = 1.15
    r_sum = p_sum.add_run('Results-oriented Python Developer fresher with a strong foundation in core Python programming, Object-Oriented Programming (OOP) concepts, and MySQL database management. Skilled in writing clean, structured code and developing functional software modules. Passionate about backend logic design, algorithm implementation, and database integration to build scalable software applications.')
    r_sum.font.size = Pt(10)

    # 2. TECHNICAL SKILLS
    add_heading_with_bottom_border(doc, 'TECHNICAL SKILLS')
    
    skills = [
        ('Programming:', 'Python, C, SQL'),
        ('Core Concepts:', 'Object-Oriented Programming (OOP), Data Structures, Algorithm Logic, Problem Solving'),
        ('Database:', 'MySQL, CRUD Operations, Database Design, SQL Queries, Joins'),
        ('Developer Tools:', 'Git, GitHub, VS Code, Windows 10')
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

    # 3. PROJECTS
    add_heading_with_bottom_border(doc, 'PROJECTS')
    
    projects = [
        ('Inventory Management System', 'Python, MySQL', [
            'Developed a full inventory management application using Python and MySQL database.',
            'Implemented CRUD operations for product inventory, stock levels, and customer records.',
            'Built automated billing logic and owner dashboard for real-time inventory monitoring.'
        ]),
        ('Movie Ticket Booking System', 'Python', [
            'Designed a Python application for movie scheduling and ticket booking automation.',
            'Implemented seat reservation logic, ticket generation, and owner authentication.'
        ]),
        ('Mobile Recharge System', 'Python', [
            'Built an automated mobile recharge application managing recharge plans, SIM validation, and account balances.'
        ]),
        ('Bike Rental Management System', 'Python', [
            'Developed a rental management workflow in Python for customer registration and vehicle rental tracking.'
        ])
    ]
    
    for title, tech, bullets in projects:
        p_proj = doc.add_paragraph()
        p_proj.paragraph_format.space_before = Pt(3)
        p_proj.paragraph_format.space_after = Pt(1)
        p_proj.paragraph_format.keep_with_next = True
        r_t = p_proj.add_run(title)
        r_t.bold = True
        r_t.font.size = Pt(10)
        r_s = p_proj.add_run(f'  |  Tech Stack: {tech}')
        r_s.font.size = Pt(9.5)
        r_s.font.italic = True
        
        for bullet in bullets:
            p_b = doc.add_paragraph()
            p_b.paragraph_format.space_after = Pt(1.5)
            p_b.paragraph_format.left_indent = Inches(0.2)
            p_b.paragraph_format.line_spacing = 1.15
            r_b = p_b.add_run(f'•  {bullet}')
            r_b.font.size = Pt(9.5)

    # 4. EDUCATION
    add_heading_with_bottom_border(doc, 'EDUCATION')
    
    edu_items = [
        ('B.Sc Computer Science (Honors)', 'Government Degree College', '2026', '85%'),
        ('Intermediate (IPE)', 'Vijayawada Nalanda Junior College', '2023', '65%'),
        ('SSC', 'Nava Bharath English Medium High School, Anantapur', '2021', '90%')
    ]
    for deg, inst, yr, pct in edu_items:
        p_e = doc.add_paragraph()
        p_e.paragraph_format.space_after = Pt(2)
        p_e.paragraph_format.line_spacing = 1.15
        r_d = p_e.add_run(f'{deg}  ')
        r_d.bold = True
        r_d.font.size = Pt(10)
        r_details = p_e.add_run(f'|  {inst}  |  {yr}  |  {pct}')
        r_details.font.size = Pt(10)

    # 5. CERTIFICATIONS
    add_heading_with_bottom_border(doc, 'CERTIFICATIONS')
    p_cert = doc.add_paragraph()
    p_cert.paragraph_format.space_after = Pt(3)
    p_cert.paragraph_format.line_spacing = 1.15
    r_c1 = p_cert.add_run('•  Python Full Stack Development\n•  Frontend Development')
    r_c1.font.size = Pt(10)

    # 6. ADDITIONAL SKILLS
    add_heading_with_bottom_border(doc, 'ADDITIONAL SKILLS')
    p_add = doc.add_paragraph()
    p_add.paragraph_format.space_after = Pt(3)
    p_add.paragraph_format.line_spacing = 1.15
    r_a = p_add.add_run('•  Teamwork & Collaboration   |   Communication Skills   |   Problem-Solving Ability   |   Eagerness to Learn')
    r_a.font.size = Pt(10)

    # 7. LANGUAGES
    add_heading_with_bottom_border(doc, 'LANGUAGES')
    p_lang = doc.add_paragraph()
    p_lang.paragraph_format.space_after = Pt(0)
    p_lang.paragraph_format.line_spacing = 1.15
    r_l = p_lang.add_run('English, Telugu')
    r_l.font.size = Pt(10)

    # Save DOCX
    out_docx = r'e:\dheeraj-portfolio\RESUMES\IT\Python Developer\Dheeraj_N_Python_Developer_Resume.docx'
    out_pdf = r'e:\dheeraj-portfolio\RESUMES\IT\Python Developer\Dheeraj_N_Python_Developer_Resume.pdf'
    
    os.makedirs(os.path.dirname(out_docx), exist_ok=True)
    doc.save(out_docx)
    print(f'DOCX saved to: {out_docx}')
    
    # Convert to PDF via MS Word
    word = win32com.client.Dispatch('Word.Application')
    word.Visible = False
    doc_com = word.Documents.Open(out_docx)
    doc_com.SaveAs(out_pdf, FileFormat=17) # 17 = wdFormatPDF
    doc_com.Close()
    word.Quit()
    print(f'PDF saved to: {out_pdf}')
    
    # ATS Text Extraction Test
    reader = pypdf.PdfReader(out_pdf)
    extracted_text = ''
    for i, page in enumerate(reader.pages):
        extracted_text += f'--- Page {i+1} ---\n' + page.extract_text()
    
    print('==================================================')
    print('EXTRACTED PDF TEXT FOR ATS VALIDATION:')
    print('==================================================')
    print(extracted_text)
    print('==================================================')
    print(f'Total PDF Pages: {len(reader.pages)}')

if __name__ == '__main__':
    build_python_developer_resume()
