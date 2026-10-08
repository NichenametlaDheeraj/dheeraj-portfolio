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

def build_resume(file_name, folder_path, summary_text, skills_list, projects_list, edu_list, cert_list, add_skills_text, lang_text):
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
    r_sum = p_sum.add_run(summary_text)
    r_sum.font.size = Pt(10)

    # 2. SKILLS SECTION
    heading_title = 'TECHNICAL SKILLS' if projects_list else 'CORE SKILLS & COMPETENCIES'
    add_heading(doc, heading_title)
    
    for cat, items in skills_list:
        p_sk = doc.add_paragraph()
        p_sk.paragraph_format.space_after = Pt(2)
        p_sk.paragraph_format.line_spacing = 1.15
        r_cat = p_sk.add_run(f'•  {cat} ')
        r_cat.bold = True
        r_cat.font.size = Pt(10)
        r_it = p_sk.add_run(items)
        r_it.font.size = Pt(10)

    # 3. PROJECTS (If Applicable)
    if projects_list:
        add_heading(doc, 'PROJECTS')
        for title, tech, bullets in projects_list:
            p_proj = doc.add_paragraph()
            p_proj.paragraph_format.space_before = Pt(3)
            p_proj.paragraph_format.space_after = Pt(1)
            p_proj.paragraph_format.keep_with_next = True
            r_t = p_proj.add_run(title)
            r_t.bold = True
            r_t.font.size = Pt(10)
            if tech:
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
    add_heading(doc, 'EDUCATION')
    for deg, inst, yr, pct in edu_list:
        p_e = doc.add_paragraph()
        p_e.paragraph_format.space_after = Pt(2)
        p_e.paragraph_format.line_spacing = 1.15
        r_d = p_e.add_run(f'{deg}  ')
        r_d.bold = True
        r_d.font.size = Pt(10)
        r_details = p_e.add_run(f'|  {inst}  |  {yr}  |  {pct}')
        r_details.font.size = Pt(10)

    # 5. CERTIFICATIONS (If Applicable)
    if cert_list:
        add_heading(doc, 'CERTIFICATIONS')
        p_cert = doc.add_paragraph()
        p_cert.paragraph_format.space_after = Pt(3)
        p_cert.paragraph_format.line_spacing = 1.15
        r_c1 = p_cert.add_run('\n'.join([f'•  {c}' for c in cert_list]))
        r_c1.font.size = Pt(10)

    # 6. ADDITIONAL SKILLS / STRENGTHS
    if add_skills_text:
        add_heading(doc, 'CORE STRENGTHS & CAPABILITIES')
        p_add = doc.add_paragraph()
        p_add.paragraph_format.space_after = Pt(3)
        p_add.paragraph_format.line_spacing = 1.15
        r_a = p_add.add_run(add_skills_text)
        r_a.font.size = Pt(10)

    # 7. LANGUAGES
    add_heading(doc, 'LANGUAGES')
    p_lang = doc.add_paragraph()
    p_lang.paragraph_format.space_after = Pt(0)
    p_lang.paragraph_format.line_spacing = 1.15
    r_l = p_lang.add_run(lang_text)
    r_l.font.size = Pt(10)

    # Save Paths
    os.makedirs(folder_path, exist_ok=True)
    out_docx = os.path.join(folder_path, f'{file_name}.docx')
    out_pdf = os.path.join(folder_path, f'{file_name}.pdf')
    
    doc.save(out_docx)
    return out_docx, out_pdf

# Standard verified education
STD_EDU = [
    ('B.Sc Computer Science (Honors)', 'Government Degree College', '2026', '85%'),
    ('Intermediate (IPE)', 'Vijayawada Nalanda Junior College', '2023', '65%'),
    ('SSC', 'Nava Bharath English Medium High School, Anantapur', '2021', '90%')
]

STD_CERTS = ['Python Full Stack Development', 'Frontend Development']
STD_STRENGTHS = '•  Teamwork & Collaboration   |   Communication Skills   |   Problem-Solving Ability   |   Eagerness to Learn'
STD_LANG = 'English, Telugu'

def run_all_tier1_generation():
    base_resumes = r'e:\dheeraj-portfolio\RESUMES'
    
    roles_data = [
        # --- IT ROLES ---
        {
            'file_name': 'Dheeraj_Nichenametla_Python_Full_Stack_Developer_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'Python Full Stack Developer'),
            'summary': 'Results-oriented Python Full Stack Developer fresher with hands-on skill in building dynamic web applications using Python, Django, MySQL, HTML, CSS, Bootstrap, and JavaScript. Strong understanding of Object-Oriented Programming, Database Design, CRUD Operations, REST APIs, and Responsive Web Development.',
            'skills': [
                ('Programming Languages:', 'Python, JavaScript, SQL, C'),
                ('Frontend Development:', 'HTML5, CSS3, Bootstrap, Responsive Web Design'),
                ('Backend & Frameworks:', 'Python, Django, Object-Oriented Programming (OOP), REST APIs'),
                ('Database & Tools:', 'MySQL, CRUD Operations, Joins, Normalization, Git, GitHub, VS Code')
            ],
            'projects': [
                ('Employee Management System', 'Django, Python, MySQL, HTML, CSS, Bootstrap', [
                    'Developed backend & admin modules using Django and MySQL for attendance and leave requests.',
                    'Implemented CRUD operations, employee department management, and responsive UI.'
                ]),
                ('Inventory Management System', 'Python, MySQL', [
                    'Built a database-backed inventory application handling stock, billing, and customer records.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Django_Backend_Developer_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'Django Backend Developer'),
            'summary': 'Dedicated Python Backend Developer fresher specializing in Django framework, MySQL database architecture, ORM, RESTful API concepts, and backend business logic design. Passionate about writing scalable, clean backend code.',
            'skills': [
                ('Backend Development:', 'Python, Django, REST APIs, Object-Oriented Programming (OOP)'),
                ('Database Management:', 'MySQL, CRUD Operations, Relational Database Design, Joins, Normalization'),
                ('Programming & Tools:', 'Python, SQL, C, Git, GitHub, VS Code, Windows 10')
            ],
            'projects': [
                ('Employee Management System', 'Django, Python, MySQL', [
                    'Engineered backend logic and database models using Django ORM and MySQL database.',
                    'Implemented secure admin authorization, leave request workflows, and CRUD operations.'
                ]),
                ('Inventory Management System', 'Python, MySQL', [
                    'Developed database integration and backend logic for billing and inventory tracking.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Software_Developer_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'Software Developer'),
            'summary': 'High-achieving B.Sc Computer Science graduate (85%) seeking a Software Developer role. Strong foundation in core programming, Python, C, Object-Oriented Programming (OOP), SQL databases, and software logic implementation.',
            'skills': [
                ('Programming:', 'Python, C, SQL, R Programming'),
                ('Software Concepts:', 'Object-Oriented Programming (OOP), Data Structures, Algorithm Logic, Problem Solving'),
                ('Databases & Tools:', 'MySQL, CRUD Operations, Database Design, Git, GitHub, VS Code, Windows 10')
            ],
            'projects': [
                ('Inventory Management System', 'Python, MySQL', [
                    'Built a complete desktop application using Python and MySQL for inventory and customer tracking.'
                ]),
                ('Movie Ticket Booking System', 'Python', [
                    'Implemented seat scheduling logic, ticket generation algorithms, and owner authentication.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Software_Engineer_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'Software Engineer'),
            'summary': 'Computer Science graduate with strong academic performance (85%) seeking an entry-level Software Engineer position. Proficient in Python, C, SQL databases, algorithm design, OOP principles, and web application fundamentals.',
            'skills': [
                ('Core Languages:', 'Python, C, SQL, R Programming'),
                ('Engineering Fundamentals:', 'Object-Oriented Programming (OOP), Software Lifecycle, Data Structures, DB Design'),
                ('Web & Database:', 'HTML5, CSS3, Django, MySQL, CRUD Operations, Git, GitHub')
            ],
            'projects': [
                ('Employee Management System', 'Django, Python, MySQL', [
                    'Designed software architecture and database relations for employee tracking.'
                ]),
                ('Movie Ticket Booking System', 'Python', [
                    'Developed modular code structure for seat allocation and booking logic.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Junior_Web_Developer_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'Junior Web Developer'),
            'summary': 'Enthusiastic Web Developer fresher with skills across full-stack web technologies including HTML5, CSS3, JavaScript, Bootstrap, Python, and Django. Passionate about creating responsive, interactive, and user-friendly web interfaces.',
            'skills': [
                ('Frontend Web:', 'HTML5, CSS3, Bootstrap, JavaScript, Responsive Web Design'),
                ('Backend Web:', 'Python, Django, REST APIs (Concepts), Object-Oriented Programming'),
                ('Database & Tools:', 'MySQL, CRUD Operations, Git, GitHub, VS Code')
            ],
            'projects': [
                ('Employee Management System', 'Django, HTML, CSS, Bootstrap, MySQL', [
                    'Built responsive frontend UI and connected it with Django backend views and MySQL DB.'
                ]),
                ('To-Do List Application', 'Python', [
                    'Created interactive task creation, deletion, and update features.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Frontend_Developer_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'Frontend Developer'),
            'summary': 'Motivated Frontend Developer fresher certified in Frontend Development. Skilled in building clean, responsive web pages using HTML5, CSS3, JavaScript, Bootstrap, and modern layout principles.',
            'skills': [
                ('Frontend Skills:', 'HTML5, CSS3, Bootstrap, JavaScript, Responsive Web Design'),
                ('Core Technologies:', 'UI/UX Design Concepts, Cross-Browser Compatibility, Mobile-First Design'),
                ('Developer Tools:', 'Git, GitHub, VS Code, Windows 10')
            ],
            'projects': [
                ('Employee Management System - UI', 'HTML5, CSS3, Bootstrap, JavaScript', [
                    'Designed clean, responsive admin and employee dashboards with intuitive UI layouts.'
                ]),
                ('To-Do List Application', 'JavaScript, HTML, CSS', [
                    'Developed an interactive user interface with real-time DOM manipulation.'
                ])
            ],
            'certs': ['Frontend Development', 'Python Full Stack Development']
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Junior_Developer_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'Junior Developer'),
            'summary': 'Versatile Computer Science graduate eager to start a career as a Junior Developer. Possesses strong fundamentals in Python, C, web development technologies, MySQL, and problem-solving.',
            'skills': [
                ('Languages:', 'Python, C, SQL, JavaScript'),
                ('Development Skills:', 'Object-Oriented Programming (OOP), Web Basics, Database Design'),
                ('Tools & OS:', 'Git, GitHub, VS Code, Windows 10, MS Office')
            ],
            'projects': [
                ('Inventory Management System', 'Python, MySQL', [
                    'Implemented core business logic, database queries, and owner dashboard.'
                ]),
                ('Mobile Recharge System', 'Python', [
                    'Built plan management logic, SIM validation, and account balance logic.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_SQL_Database_Developer_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'SQL Database'),
            'summary': 'Detail-oriented Database Developer fresher proficient in SQL, MySQL relational database design, table normalization, complex JOINs, constraints, and CRUD operations. Skilled in writing efficient database queries and backend data logic.',
            'skills': [
                ('Database Systems:', 'MySQL, Relational Database Management Systems (RDBMS), SQL'),
                ('Database Concepts:', 'CRUD Operations, Table Normalization, Joins, Constraints, DB Design'),
                ('Programming & Tools:', 'Python, C, Git, GitHub, VS Code, MS Excel')
            ],
            'projects': [
                ('Inventory Management Database', 'MySQL, Python', [
                    'Designed normalized relational database schemas for product inventory and sales records.'
                ]),
                ('Employee Management System DB', 'MySQL, Django', [
                    'Created database tables, primary/foreign key relationships, and query logic.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Data_Entry_Technical_Support_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'Data Entry Technical Support'),
            'summary': 'Adaptable IT fresher possessing strong computer operations skills, MS Office expertise, fast data entry capabilities, and technical troubleshooting aptitude. Experienced in Windows 10 and Python data handling.',
            'skills': [
                ('Computer & OS:', 'Windows 10, System Configuration, Troubleshooting Concepts'),
                ('Office Applications:', 'MS Excel, MS Word, MS PowerPoint, Data Entry Accuracy'),
                ('Technical Skills:', 'Python, SQL, MySQL Basics, File Management')
            ],
            'projects': [
                ('Technical Data Management Projects', 'Excel, Python, Windows 10', [
                    'Managed structured data records and handled system setup configurations.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_IT_Graduate_Trainee_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'IT Graduate Trainee'),
            'summary': 'Top-performing B.Sc Computer Science graduate (85%) seeking an IT Graduate Trainee position. Strong technical background across Python, SQL, web technologies, MS Office, and software development lifecycle principles.',
            'skills': [
                ('Technical Foundation:', 'Python, C, SQL, MySQL, HTML/CSS'),
                ('Core Competencies:', 'Software Lifecycle Concepts, OOP, Data Logic, Problem Solving'),
                ('Tools & Environment:', 'Git, GitHub, VS Code, MS Office, Windows 10')
            ],
            'projects': [
                ('Employee Management System', 'Django, Python, MySQL', [
                    'Demonstrated end-to-end software development lifecycle capabilities.'
                ]),
                ('Inventory Management System', 'Python, MySQL', [
                    'Built database-backed data management workflows.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Graduate_Engineer_Trainee_Resume',
            'folder': os.path.join(base_resumes, 'IT', 'Graduate Engineer Trainee'),
            'summary': 'Computer Science honors graduate with academic distinction (85%) eager to join as a Graduate Engineer Trainee. Solid foundation in software development, Python, C, SQL, data structures, and problem-solving.',
            'skills': [
                ('Programming & Logic:', 'Python, C, SQL, Data Structures, OOP'),
                ('Database & Web:', 'MySQL, CRUD Operations, HTML, CSS, Django'),
                ('Tools & Platforms:', 'Git, GitHub, VS Code, Windows 10, Arduino IDE')
            ],
            'projects': [
                ('Inventory Management System', 'Python, MySQL', [
                    'Developed object-oriented Python modules and relational database tables.'
                ]),
                ('Movie Ticket Booking System', 'Python', [
                    'Implemented modular programming logic and authentication features.'
                ])
            ],
            'certs': STD_CERTS
        },

        # --- NON-IT & OPERATIONS ROLES ---
        {
            'file_name': 'Dheeraj_Nichenametla_Data_Entry_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Data Entry'),
            'summary': 'Detail-oriented Computer Science graduate seeking a Data Entry Executive role. Proficient in MS Office (Excel, Word), Windows 10, fast keyboard typing, record management, and 100% data accuracy.',
            'skills': [
                ('Office Applications:', 'MS Excel, MS Word, MS PowerPoint, MS Office Suite'),
                ('Data Handling:', 'Data Accuracy, Speed Typing, Data Transcription, Record Keeping'),
                ('Computer Skills:', 'Windows 10, Internet Research, File Management, Communication')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Data_Entry_Operator_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Data Entry Operator'),
            'summary': 'Computer-proficient fresher seeking a Data Entry Operator position. Skilled in accurate data transcription, record verification, MS Office suite, and structured file organization.',
            'skills': [
                ('Data Operations:', 'Data Entry Precision, Speed Typing, Record Verification, Form Filling'),
                ('Software Tools:', 'MS Office (Excel, Word), Windows 10, File Archiving'),
                ('Professional Strengths:', 'Attention to Detail, Accuracy, Time Management, Communication')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Back_Office_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Back Office Executive'),
            'summary': 'Organized graduate looking for a Back Office Executive role. Excellent skills in administrative documentation, MS Office data maintenance, file organization, and cross-team support.',
            'skills': [
                ('Back Office Operations:', 'Documentation, Record Management, File Organization, Data Tracking'),
                ('Computer Tools:', 'MS Excel, MS Word, MS PowerPoint, Windows 10, Email Handling'),
                ('Key Competencies:', 'Teamwork, Problem Solving, Communication, Organizational Discipline')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Office_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Office Executive'),
            'summary': 'Versatile Computer Science graduate seeking an Office Executive role. Strong capabilities in office administration, MS Office operations, presentation preparation, documentation, and communication.',
            'skills': [
                ('Office Skills:', 'Office Administration, Documentation, Task Coordination, Presentation Skills'),
                ('Computer Tools:', 'MS Office (Word, Excel, PowerPoint), Windows 10, Internet Applications'),
                ('Personal Capacities:', 'Good Communication, Interaction Skills, Teamwork, Positive Thinking')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Admin_Assistant_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Admin Assistant'),
            'summary': 'Resourceful fresher seeking an Admin Assistant position. Proficient in managing office documentation, scheduling, MS Office tools, record archiving, and providing administrative support.',
            'skills': [
                ('Admin Capabilities:', 'Administrative Support, Document Filing, Task Scheduling, Record Archiving'),
                ('Software Applications:', 'MS Office (Word, Excel, PowerPoint), Windows 10'),
                ('Strengths:', 'Multitasking, Communication Skills, Organization, Hardworking Attitude')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Process_Associate_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Process Associate'),
            'summary': 'Analytical B.Sc Computer Science graduate seeking a Process Associate role. Strong aptitude for process compliance, data verification, MS Office, logical problem solving, and teamwork.',
            'skills': [
                ('Process Capabilities:', 'Process Execution, Data Verification, Quality Adherence, Workflows'),
                ('Computer Tools:', 'MS Office (Excel, Word), Computer Operations, Windows 10'),
                ('Core Strengths:', 'Problem Solving, Analytical Thinking, Teamwork, Communication')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Process_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Process Executive'),
            'summary': 'Process-driven fresher aiming for a Process Executive position. Skilled in handling computer-based workflows, MS Office tools, documentation, data verification, and quality standards.',
            'skills': [
                ('Process Management:', 'Process Operations, Data Accuracy, Documentation, Standard Compliance'),
                ('Software Literacy:', 'MS Excel, MS Word, Windows 10, Computer Tools'),
                ('Key Abilities:', 'Attention to Detail, Problem Solving, Communication, Learning Eagerness')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Customer_Support_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Customer Support'),
            'summary': 'Customer-oriented fresher with excellent English and Telugu communication skills. Proficient in computer operations, active listening, problem-solving, and delivering positive customer experiences.',
            'skills': [
                ('Communication:', 'English (Fluent), Telugu (Fluent), Active Listening, Verbal Clarity'),
                ('Customer Handling:', 'Query Resolution, Patient Communication, Service Orientation'),
                ('Computer Skills:', 'MS Office, Windows 10, Computer Operations, Documentation')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Customer_Service_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Customer Service Executive'),
            'summary': 'Dedicated graduate seeking a Customer Service Executive role. Strong interpersonal abilities, positive attitude, problem resolution skills, and computer proficiency.',
            'skills': [
                ('Customer Service:', 'Customer Care, Query Handling, Problem Resolution, Positive Attitude'),
                ('Interpersonal Skills:', 'Good Interaction Skills, Communication, Team Collaboration'),
                ('Software Literacy:', 'MS Office, Windows 10, Record Entry')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Customer_Care_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Customer Care Executive'),
            'summary': 'Empathetic fresher seeking a Customer Care Executive role. Fluent in English and Telugu with strong communication skills, active listening, computer operations, and service orientation.',
            'skills': [
                ('Customer Interaction:', 'Verbal Communication, Customer Relationship, Active Listening'),
                ('Language Proficiency:', 'English, Telugu'),
                ('Computer Operations:', 'MS Office, Windows 10, Computer Literacy, Problem Solving')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Non_Voice_Process_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Non Voice Process'),
            'summary': 'Computer-literate fresher seeking a Non-Voice Process Executive role. Strong written English communication, fast data entry, MS Office proficiency, and attention to detail.',
            'skills': [
                ('Non-Voice Skills:', 'Written Communication, Email Handling, Data Entry Accuracy, Fast Typing'),
                ('Computer Applications:', 'MS Excel, MS Word, Windows 10, File Archiving'),
                ('Core Strengths:', 'Problem Solving, Quality Focus, Teamwork, Attention to Detail')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Voice_Process_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Voice Process'),
            'summary': 'Communicative fresher seeking a Voice Process Executive role. Fluent in English and Telugu with excellent interaction skills, telephone etiquette, active listening, and problem solving.',
            'skills': [
                ('Voice Communication:', 'Fluent English & Telugu, Spoken Clarity, Active Listening, Telephonic Etiquette'),
                ('Interpersonal:', 'Interaction Ability, Presentation Skills, Patient Attitude'),
                ('Computer Baseline:', 'MS Office, Windows 10, Data Logging')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Office_Assistant_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Office Assistant'),
            'summary': 'Dependable fresher seeking an Office Assistant position. Skilled in basic computer operations, MS Office, document filing, record handling, and supporting day-to-day office tasks.',
            'skills': [
                ('Office Support:', 'Document Filing, Record Handling, Office Assistance, Printing/Scanning'),
                ('Computer Tools:', 'MS Office (Word, Excel), Windows 10, Basic Internet Handling'),
                ('Personal Attributes:', 'Hardworking, Reliable, Good Communication, Teamwork')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Documentation_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Documentation Executive'),
            'summary': 'Detail-conscious Computer Science graduate seeking a Documentation Executive role. Proficient in MS Word formatting, record organization, data verification, and document management.',
            'skills': [
                ('Documentation:', 'MS Word Formatting, Document Structure, Record Organization, File Hygiene'),
                ('Data Precision:', 'Data Verification, Error Checking, MS Excel Tracking'),
                ('Computer Baseline:', 'Windows 10, MS Office Suite, Communication Skills')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Records_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Records Executive'),
            'summary': 'Organized fresher seeking a Records Executive position. Skilled in data classification, record archiving, MS Excel tracking, data accuracy, and file retrieval.',
            'skills': [
                ('Record Management:', 'File Archiving, Data Classification, Record Retrieval, Data Accuracy'),
                ('Software Tools:', 'MS Excel, MS Word, Windows 10, File Systems'),
                ('Key Competencies:', 'Systematic Organization, Attention to Detail, Problem Solving')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_General_Graduate_Trainee_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'General Graduate Trainee'),
            'summary': 'Adaptable B.Sc Computer Science graduate (85%) seeking a General Graduate Trainee position. Strong analytical mind, communication skills, MS Office proficiency, and eager learning attitude.',
            'skills': [
                ('Academic Strengths:', 'B.Sc CS (Honors) 85%, Analytical Thinking, Computer Literacy'),
                ('Software Tools:', 'MS Office (Word, Excel, PowerPoint), Windows 10'),
                ('Core Capacities:', 'Good Communication, Teamwork, Problem Solving, Fast Learning')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_General_Fresher_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'General Fresher'),
            'summary': 'Well-rounded Computer Science graduate (85%) seeking entry-level opportunities across corporate functions. Strong background in computer applications, MS Office, teamwork, and problem solving.',
            'skills': [
                ('Computer Literacy:', 'MS Office (Word, Excel, PowerPoint), Windows 10, Internet Tools'),
                ('Professional Skills:', 'Good Communication, Presentation Skills, Problem Solving'),
                ('Personal Qualities:', 'Dedicated, Hardworking, Positive Thinking, Teamwork')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Graduate_Trainee_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Graduate Trainee'),
            'summary': 'High-performing graduate eager to start a corporate career as a Graduate Trainee. Excellent academic background, computer proficiency, strong communication, and problem-solving skills.',
            'skills': [
                ('Qualifications:', 'B.Sc Computer Science (Honors) 85%, High Academic Standing'),
                ('Computer Skills:', 'MS Office, Windows 10, Computer Applications'),
                ('Soft Skills:', 'Eagerness to Learn, Communication, Problem Solving, Teamwork')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Sales_Support_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Sales Support Executive'),
            'summary': 'Organised graduate seeking a Sales Support Executive role. Skilled in sales data tracking, MS Excel reporting, document management, and assisting sales teams with client communications.',
            'skills': [
                ('Sales Support:', 'Sales Record Tracking, MS Excel Reporting, Document Maintenance'),
                ('Communication:', 'Client Coordination, English & Telugu Communication, Follow-up'),
                ('Computer Tools:', 'MS Office, Windows 10, Data Precision')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Client_Coordination_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Client Coordination Executive'),
            'summary': 'Communicative graduate seeking a Client Coordination Executive role. Strong skills in client communication (English & Telugu), document follow-up, presentation, and team coordination.',
            'skills': [
                ('Client Coordination:', 'Client Interaction, Follow-up Management, Service Orientation'),
                ('Communication:', 'Verbal & Written English, Telugu Fluency, Presentation Skills'),
                ('Software Tools:', 'MS Office (Word, Excel, PowerPoint), Windows 10')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Business_Support_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Business Support Executive'),
            'summary': 'Computer-proficient graduate seeking a Business Support Executive role. Excellent skills in MS Office suite, administrative documentation, process coordination, and team assistance.',
            'skills': [
                ('Business Support:', 'Administrative Assistance, Document Preparation, Process Support'),
                ('Software Applications:', 'MS Office (Word, Excel, PowerPoint), Windows 10'),
                ('Key Abilities:', 'Communication, Problem Solving, Teamwork, Organization')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Warehouse_Data_Entry_Executive_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Warehouse Data Entry Executive'),
            'summary': 'Precision-driven fresher seeking a Warehouse Data Entry Executive position. Skilled in fast data entry, stock record maintenance, MS Excel, and inventory data handling.',
            'skills': [
                ('Data Entry Operations:', 'Stock Record Maintenance, Speed Data Entry, Precision Logging'),
                ('Software Tools:', 'MS Excel, MS Word, Windows 10'),
                ('Core Strengths:', 'Data Accuracy, Inventory Logic Understanding, Teamwork')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Inventory_Data_Associate_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Inventory Data Associate'),
            'summary': 'Computer Science graduate with project experience in inventory systems seeking an Inventory Data Associate role. Proficient in SQL, MySQL, MS Excel, and stock data tracking.',
            'skills': [
                ('Inventory Data:', 'Stock Tracking, Data Entry Precision, MS Excel Reporting'),
                ('Technical Skills:', 'SQL, MySQL Basics, Database Data Logic, Python'),
                ('Competencies:', 'Problem Solving, Data Accuracy, Teamwork')
            ],
            'projects': [
                ('Inventory Management System', 'Python, MySQL', [
                    'Built database-backed inventory tracking and customer record management.'
                ])
            ],
            'certs': STD_CERTS
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Computer_Operator_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Computer Operator'),
            'summary': 'Skilled Computer Science graduate seeking a Computer Operator position. Experienced in Windows 10, MS Office suite, file management, system operations, and basic troubleshooting.',
            'skills': [
                ('Computer Operations:', 'Windows 10, System Operations, Printing/Scanning, File Backup'),
                ('Software Applications:', 'MS Word, MS Excel, MS PowerPoint, Internet Browsing'),
                ('Technical Strengths:', 'Basic System Troubleshooting, Hardware Setup Basics, Communication')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Computer_Assistant_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Computer Assistant'),
            'summary': 'Tech-savvy fresher seeking a Computer Assistant role. Proficient in MS Office software, data entry, computer file organization, and assisting staff with IT tools.',
            'skills': [
                ('Computer Assistance:', 'System Operation Assistance, Data Entry, File Organization'),
                ('Software Applications:', 'MS Office (Word, Excel, PowerPoint), Windows 10'),
                ('Personal Attributes:', 'Eagerness to Help, Fast Learning, Communication')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Office_Computer_Operator_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Office Computer Operator'),
            'summary': 'Reliable computer graduate seeking an Office Computer Operator position. Expert in MS Word, Excel, internet operations, file printing/archiving, and administrative computer support.',
            'skills': [
                ('Office Computer Skills:', 'MS Office, Windows 10, Document Printing/Scanning, Internet Operations'),
                ('Data Handling:', 'Data Entry Precision, File Archiving, Record Maintenance'),
                ('Work Ethic:', 'Hardworking, Dedicated, Positive Attitude')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Documentation_Assistant_Resume',
            'folder': os.path.join(base_resumes, 'NON-IT', 'Documentation Assistant'),
            'summary': 'Detail-oriented fresher seeking a Documentation Assistant role. Proficient in document formatting in MS Word, record filing, proofreading, and maintaining document archives.',
            'skills': [
                ('Documentation Support:', 'MS Word Document Formatting, Proofreading, File Maintenance'),
                ('Office Tools:', 'MS Excel, MS Word, Windows 10, Data Verification'),
                ('Personal Competencies:', 'Attention to Detail, Accuracy, Organizational Discipline')
            ],
            'projects': None,
            'certs': None
        },

        # --- MAPPING & OTHER DOMAIN TIER 1 ROLES ---
        {
            'file_name': 'Dheeraj_Nichenametla_GIS_Data_Entry_Operator_Resume',
            'folder': os.path.join(base_resumes, 'MAPPING', 'GIS Data Entry Operator'),
            'summary': 'Precision-focused Computer Science graduate seeking a GIS Data Entry Operator role. Skilled in computer-based data entry, MS Excel, spatial data verification, and high-accuracy record keeping.',
            'skills': [
                ('Data Entry:', 'Computer Data Entry, MS Excel, High Accuracy, Data Verification'),
                ('Technical Foundation:', 'B.Sc Computer Science, Windows 10, File Management'),
                ('Domain Interest:', 'Interested in Spatial Data & GIS Data Entry Operations')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Map_Data_Verification_Associate_Resume',
            'folder': os.path.join(base_resumes, 'MAPPING', 'Map Data Verification Associate'),
            'summary': 'Quality-conscious computer graduate seeking a Map Data Verification Associate position. Skilled in data validation, MS Excel, error checking, and spatial data record verification.',
            'skills': [
                ('Data Verification:', 'Error Checking, Record Validation, Quality Control, MS Excel'),
                ('Computer Literacy:', 'Windows 10, MS Office, File Hygiene, Computer Operations'),
                ('Core Strengths:', 'Attention to Detail, Analytical Thinking, Teamwork')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Banking_Back_Office_Executive_Resume',
            'folder': os.path.join(base_resumes, 'BANKING', 'Banking Back Office Executive'),
            'summary': 'Detail-conscious Computer Science graduate seeking a Banking Back Office Executive role. Proficient in accurate data processing, MS Office, document verification, and back-office operations.',
            'skills': [
                ('Back Office Processing:', 'Data Verification, Document Handling, Record Processing'),
                ('Software Tools:', 'MS Excel, MS Word, Windows 10, Data Entry Precision'),
                ('Key Capacities:', 'Accuracy, Confidentiality, Problem Solving, Teamwork')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Financial_Data_Entry_Executive_Resume',
            'folder': os.path.join(base_resumes, 'BANKING', 'Financial Data Entry Executive'),
            'summary': 'Precision-minded computer graduate seeking a Financial Data Entry Executive role. Proficient in MS Excel, fast numerical data entry, record maintenance, and 100% data accuracy.',
            'skills': [
                ('Data Entry:', 'Numerical Data Entry, 100% Precision, Fast Keyboard Speed'),
                ('Office Applications:', 'MS Excel, MS Word, Windows 10, File Tracking'),
                ('Attributes:', 'Attention to Detail, Reliability, Hardworking Attitude')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_Banking_Documentation_Executive_Resume',
            'folder': os.path.join(base_resumes, 'BANKING', 'Banking Documentation Executive'),
            'summary': 'Organized graduate seeking a Documentation Executive role in banking back-office operations. Skilled in document verification, file handling, MS Word formatting, and record hygiene.',
            'skills': [
                ('Documentation:', 'Document Verification, MS Word Formatting, Record Hygiene'),
                ('Software & OS:', 'MS Office (Excel, Word), Windows 10, File Archiving'),
                ('Strengths:', 'Precision, Process Discipline, Communication')
            ],
            'projects': None,
            'certs': None
        },
        {
            'file_name': 'Dheeraj_Nichenametla_HR_Admin_Assistant_Resume',
            'folder': os.path.join(base_resumes, 'HR', 'HR Admin Assistant'),
            'summary': 'Communicative Computer Science graduate seeking an HR Admin Assistant role. Proficient in employee record documentation, MS Office scheduling, communication, and administrative support.',
            'skills': [
                ('HR Admin Support:', 'Employee Record Filing, Task Scheduling, Documentation'),
                ('Software Applications:', 'MS Office (Word, Excel, PowerPoint), Windows 10'),
                ('Interpersonal:', 'Communication Skills, Interaction Ability, Teamwork')
            ],
            'projects': None,
            'certs': None
        }
    ]

    word = win32com.client.Dispatch('Word.Application')
    word.Visible = False

    generated_results = []

    try:
        for role in roles_data:
            out_docx, out_pdf = build_resume(
                role['file_name'],
                role['folder'],
                role['summary'],
                role['skills'],
                role['projects'],
                STD_EDU,
                role.get('certs'),
                STD_STRENGTHS,
                STD_LANG
            )
            
            # Convert to PDF via MS Word
            doc_com = word.Documents.Open(out_docx)
            doc_com.SaveAs(out_pdf, FileFormat=17) # 17 = wdFormatPDF
            doc_com.Close()
            
            # Audit PDF
            reader = pypdf.PdfReader(out_pdf)
            pg_count = len(reader.pages)
            
            generated_results.append({
                'name': role['file_name'],
                'docx': out_docx,
                'pdf': out_pdf,
                'pages': pg_count
            })
            print(f'Successfully generated: {role["file_name"]} | Pages: {pg_count}')
            
    finally:
        word.Quit()
        
    print('==================================================')
    print(f'BATCH GENERATION COMPLETE! Total Resumes: {len(generated_results)}')
    print('==================================================')

if __name__ == '__main__':
    run_all_tier1_generation()
