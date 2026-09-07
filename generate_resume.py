import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

def create_ats_resume(output_path):
    # Set page margins (0.4 inch / ~28.8 pt for max clean fit on single page)
    margin = 28.8
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )

    styles = getSampleStyleSheet()

    # Custom typography styles
    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#1E293B')
    )

    title_style = ParagraphStyle(
        'RoleTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=14,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#2563EB')
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#475569')
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=11.5,
        alignment=TA_JUSTIFY,
        textColor=colors.HexColor('#334155')
    )

    project_title_style = ParagraphStyle(
        'ProjectTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor('#1E293B')
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=11,
        textColor=colors.HexColor('#334155'),
        leftIndent=10
    )

    story = []

    # 1. HEADER SECTION
    story.append(Paragraph("DHEERAJ NICHENAMETLA", name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Python Backend & Full-Stack Developer", title_style))
    story.append(Spacer(1, 4))
    
    contact_line = (
        "Anantapur, Andhra Pradesh, India &nbsp;|&nbsp; +91 8019479721 &nbsp;|&nbsp; "
        "<a href='mailto:dheerajnichenametla@gmail.com' color='#2563EB'><u>dheerajnichenametla@gmail.com</u></a><br/>"
        "Portfolio: <a href='https://dheeraj-portfolio-xr8g.vercel.app/' color='#2563EB'><u>dheeraj-portfolio-xr8g.vercel.app</u></a> &nbsp;|&nbsp; "
        "LinkedIn: <a href='https://www.linkedin.com/in/nichenametla-dheeraj-740701342/' color='#2563EB'><u>nichenametla-dheeraj</u></a> &nbsp;|&nbsp; "
        "GitHub: <a href='https://github.com/NichenametlaDheeraj' color='#2563EB'><u>NichenametlaDheeraj</u></a>"
    )
    story.append(Paragraph(contact_line, contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=6, spaceBefore=0))

    # Helper function for section titles
    def add_section_header(title_text):
        story.append(Paragraph(title_text.upper(), section_heading))
        story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#3B82F6'), spaceAfter=5, spaceBefore=1))

    # 2. PROFESSIONAL SUMMARY
    add_section_header("Professional Summary")
    summary_text = (
        "Motivated Computer Science student and <b>Python Backend & Full-Stack Developer</b> with expertise in building scalable "
        "web applications using Python, Django, REST APIs, and MySQL. Proficient in modern frontend technologies including React, JavaScript, "
        "and responsive CSS. Strong background in object-oriented programming, data structures, and database management, currently expanding "
        "skills in Machine Learning, Data Analysis (Pandas, NumPy), and Generative AI."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 6))

    # 3. TECHNICAL SKILLS
    add_section_header("Technical Skills")
    skills_data = [
        "<b>Languages & Backend:</b> Python, Django, REST APIs, Object-Oriented Programming (OOP), SQL",
        "<b>Frontend Development:</b> HTML5, CSS3, JavaScript (ES6+), React.js, Responsive Web Design",
        "<b>Databases & Tools:</b> MySQL, PostgreSQL, Git, GitHub, Postman, VS Code, Jupyter Notebook, Google Colab",
        "<b>Data Science & AI (Learning):</b> Pandas, NumPy, Machine Learning Fundamentals, Generative AI"
    ]
    for skill in skills_data:
        story.append(Paragraph(f"• {skill}", bullet_style))
        story.append(Spacer(1, 2))
    story.append(Spacer(1, 4))

    # 4. FEATURED PROJECTS
    add_section_header("Featured Projects")
    
    projects = [
        {
            "name": "KRISHISETU — Agriculture Marketplace Web App",
            "tech": "React, Django, MySQL, REST APIs",
            "bullets": [
                "Architected a full-stack digital agriculture marketplace connecting farmers directly with end consumers.",
                "Implemented secure user authentication, interactive product catalog, dynamic cart management, and order tracking APIs."
            ]
        },
        {
            "name": "Inventory Management System",
            "tech": "Python, MySQL, Desktop GUI",
            "bullets": [
                "Engineered a desktop application for real-time inventory tracking, automated billing, and customer record management.",
                "Designed MySQL relational database schemas for stock updates, sales analysis, and owner security dashboard."
            ]
        },
        {
            "name": "Movie Ticket Booking System",
            "tech": "Python, OOP, Database",
            "bullets": [
                "Built a modular booking application supporting movie schedule management, interactive seat allocation, and ticket generation.",
                "Incorporated owner authorization controls and streamlined transaction flow for error-free booking operations."
            ]
        },
        {
            "name": "Mobile Recharge & Management System",
            "tech": "Python, Data Validation",
            "bullets": [
                "Developed a telecom management platform providing SIM card validation, custom recharge plans, and transaction history tracking.",
                "Enforced real-time balance calculations and user plan notifications using Python data structures."
            ]
        },
        {
            "name": "Bike Rental Management System",
            "tech": "Python, File/Data Operations",
            "bullets": [
                "Created a bike rental tracking system featuring customer onboarding, vehicle availability logs, and dynamic billing.",
                "Automated rental tracking calculations and return verification to streamline daily fleet operations."
            ]
        }
    ]

    for p in projects:
        title_p = f"<b>{p['name']}</b> | <i>{p['tech']}</i>"
        story.append(Paragraph(title_p, project_title_style))
        story.append(Spacer(1, 1))
        for b in p['bullets']:
            story.append(Paragraph(f"• {b}", bullet_style))
            story.append(Spacer(1, 1))
        story.append(Spacer(1, 3))
    
    story.append(Spacer(1, 2))

    # 5. EDUCATION & LEARNING
    add_section_header("Education & Learning")
    edu_items = [
        "<b>Bachelor of Science in Computer Science</b> (2023 – 2026)<br/>"
        "<i>Government Degree College (Autonomous), Anantapur (Affiliated to Sri Krishnadevaraya University)</i><br/>"
        "• Coursework: Core Computer Science, Data Structures, Relational Database Systems, Operating Systems, Web Technologies.",
        "<b>Python Full Stack Development</b> (2025 – Present) | <i>Self-Directed Project Training</i><br/>"
        "• Hands-on mastery in building end-to-end applications with Django backend APIs, React interfaces, and MySQL integration."
    ]
    for edu in edu_items:
        story.append(Paragraph(edu, body_style))
        story.append(Spacer(1, 3))

    story.append(Spacer(1, 3))

    # 6. KEY ACHIEVEMENTS & CERTIFICATIONS
    add_section_header("Key Achievements & Metrics")
    achievements = [
        "<b>10+ Projects Completed:</b> Built and deployed multiple backend & full-stack software applications.",
        "<b>20+ GitHub Repositories:</b> Actively maintaining open-source code and structured technical projects.",
        "<b>300+ Problems Solved:</b> Practiced algorithmic problem-solving across core Python and Data Structures.",
        "<b>1000+ Hours of Hands-on Coding:</b> Dedicated development in Python, Django, MySQL, and Web Technologies."
    ]
    for ach in achievements:
        story.append(Paragraph(f"• {ach}", bullet_style))
        story.append(Spacer(1, 1.5))

    # Build PDF document
    doc.build(story)
    print(f"Successfully generated ATS-friendly resume at: {output_path}")

if __name__ == "__main__":
    out_file = os.path.abspath("public/Resume_Dheeraj_Nichenametla.pdf")
    create_ats_resume(out_file)
