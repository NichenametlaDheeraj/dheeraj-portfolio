import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight,
  FaGraduationCap, FaLaptopCode, FaPython, FaBrain, FaFilePdf
} from "react-icons/fa";
import { projectsData } from "../../data/projects";
import { sendResumeDownloadNotification } from "../../lib/notifications";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    document.title = "Nichenametla Dheeraj | Python Full Stack Developer";
  }, []);

  const featuredProjects = projectsData.slice(0, 3);

  const roleResumes = [
    { label: "Python Developer", path: "/resumes/Dheeraj_N_Python_Developer_Resume.pdf" },
    { label: "Python Full Stack", path: "/resumes/Dheeraj_Nichenametla_Python_Full_Stack_Developer_Resume.pdf" },
    { label: "Django Backend", path: "/resumes/Dheeraj_Nichenametla_Django_Backend_Developer_Resume.pdf" },
    { label: "Frontend Developer", path: "/resumes/Dheeraj_Nichenametla_Frontend_Developer_Resume.pdf" },
    { label: "SQL Database", path: "/resumes/Dheeraj_Nichenametla_SQL_Database_Developer_Resume.pdf" },
    { label: "Data Entry Executive", path: "/resumes/Dheeraj_Nichenametla_Data_Entry_Executive_Resume.pdf" },
  ];

  return (
    <div className="page-container home-page">
      {/* HERO SECTION */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="container hero-grid">
          {/* Left Column */}
          <div className="hero-content">
            <h1 className="hero-name">Nichenametla Dheeraj</h1>
            <h2 className="hero-title">B.Sc. Computer Science | Python Full Stack Developer</h2>

            <p className="hero-description">
              Building scalable web applications with <strong>Python, Django, REST API, MySQL, React, HTML, CSS, and JavaScript</strong>. Computer Science graduate focused on software engineering excellence.
            </p>

            {/* Quick Tech Bar */}
            <div className="quick-tech-bar">
              <span>Python</span>
              <span className="dot">•</span>
              <span>Django</span>
              <span className="dot">•</span>
              <span>REST API</span>
              <span className="dot">•</span>
              <span>MySQL</span>
              <span className="dot">•</span>
              <span>React</span>
              <span className="dot">•</span>
              <span>HTML</span>
              <span className="dot">•</span>
              <span>CSS</span>
              <span className="dot">•</span>
              <span>JavaScript</span>
            </div>

            {/* Action Buttons */}
            <div className="hero-buttons">
              <Link to="/projects" className="btn-primary">
                View My Projects <FaArrowRight />
              </Link>
              <a
                href="/Resume_Dheeraj_Nichenametla.pdf?v=2"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                onClick={sendResumeDownloadNotification}
              >
                <FaDownload /> Download Resume
              </a>
            </div>

            {/* Social Icons / Connect With Me */}
            <div className="hero-socials">
              <a
                href="https://github.com/NichenametlaDheeraj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nichenametla Dheeraj on GitHub"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/nichenametla-dheeraj-740701342/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nichenametla Dheeraj on LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:dheerajnichenametla@gmail.com"
                aria-label="Email Nichenametla Dheeraj"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="profile-image-container">
              <div className="profile-backdrop-card"></div>
              <div className="profile-image-card">
                <img
                  src="/profile.png"
                  alt="Nichenametla Dheeraj - B.Sc Computer Science | Python Full Stack Developer"
                  title="Nichenametla Dheeraj"
                  className="profile-img"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* BIOGRAPHY & ABOUT SECTION */}
      <motion.section 
        className="about-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container">
          <div className="section-header-designer">
            <span className="section-number">01 / BIOGRAPHY</span>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Genuine education, skills, career focus, and software engineering background.</p>
          </div>

          <div className="about-grid">
            {/* Left Column: Introduction */}
            <div className="about-intro card">
              <h2>Professional Profile</h2>
              <p>
                I'm <strong>Nichenametla Dheeraj</strong>, a <strong>B.Sc. Computer Science</strong> graduate and <strong>Python Full Stack Developer</strong> based in Anantapur, Andhra Pradesh, India.
              </p>
              <p>
                My technical foundation is built on solid Computer Science principles, object-oriented programming, and relational database management. I specialize in developing full-stack web applications using <strong>Python, Django, REST API, MySQL, HTML, CSS, JavaScript, and React</strong>.
              </p>
              <p>
                I have built projects engineering RESTful services, designing efficient database schemas, and writing clean application workflows. Currently, I am expanding my knowledge into <strong>Machine Learning and Generative AI</strong> to craft intelligent software products.
              </p>
              <p>
                My goal is to deliver clean, scalable code and enterprise-grade software applications as a Python Full Stack Developer.
              </p>

              <div className="home-resume-section">
                <h3 className="home-resume-heading">📄 Role-Specific ATS Resumes</h3>
                <p className="home-resume-sub">Select and download ATS-friendly resumes tailored for specific roles:</p>
                <div className="home-resume-grid">
                  {roleResumes.map((role, idx) => (
                    <a
                      key={idx}
                      href={role.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-resume-btn"
                      onClick={sendResumeDownloadNotification}
                    >
                      <span className="btn-left">
                        <FaFilePdf className="pdf-icon" />
                        {role.label}
                      </span>
                      <FaDownload className="dl-icon" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Info Cards */}
            <div className="about-info-cards">
              <div className="info-card card">
                <div className="info-icon">
                  <FaGraduationCap />
                </div>
                <div>
                  <h3>Education</h3>
                  <p>B.Sc. Computer Science (2023 – 2026)</p>
                  <span className="info-sub">Government Degree College (Autonomous), Anantapur, Andhra Pradesh, India</span>
                </div>
              </div>

              <div className="info-card card">
                <div className="info-icon">
                  <FaLaptopCode />
                </div>
                <div>
                  <h3>Career Focus</h3>
                  <p>Python Full Stack Development</p>
                  <span className="info-sub">Web Services, REST APIs, System Architecture</span>
                </div>
              </div>

              <div className="info-card card">
                <div className="info-icon">
                  <FaPython />
                </div>
                <div>
                  <h3>Technical Skills</h3>
                  <p>Python, Django, REST API, MySQL</p>
                  <span className="info-sub">HTML, CSS, JavaScript, React</span>
                </div>
              </div>

              <div className="info-card card">
                <div className="info-icon">
                  <FaBrain />
                </div>
                <div>
                  <h3>Technical Interests</h3>
                  <p>REST API Engineering & Machine Learning</p>
                  <span className="info-sub">Pandas, NumPy, Automated Workflows</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SELECTED PROJECTS SECTION */}
      <motion.section 
        className="featured-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container">
          <div className="section-header-designer">
            <span className="section-number">02 / FEATURED WORK</span>
            <h2 className="section-title">Selected Projects</h2>
            <p className="section-subtitle">Real-world applications engineered for scale, reliability, and usability.</p>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project, idx) => (
              <motion.div 
                className="project-card card" 
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                <div className="card-top-accent"></div>
                {project.image && (
                  <div className="project-card-image">
                    <img src={project.image} alt={`Nichenametla Dheeraj - ${project.title} Project`} />
                    <span className="project-index">0{idx + 1}</span>
                  </div>
                )}
                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-subtitle">{project.subtitle}</p>
                  <p className="project-card-desc">{project.shortDescription}</p>
                  <div className="project-card-tags">
                    {project.tech.map((t, tIdx) => (
                      <span className="tech-tag" key={tIdx}>{t}</span>
                    ))}
                  </div>
                  <div className="project-card-actions">
                    <Link to={`/projects/${project.id}`} className="btn-primary card-btn">
                      View Project Details <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="view-all-wrapper">
            <Link to="/projects" className="btn-outline view-all-btn">
              View All 6 Projects <FaArrowRight />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* CONNECT WITH ME CTA SECTION */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="container">
          <div className="cta-card">
            <span className="cta-badge">CONNECT WITH ME</span>
            <h2>Find Me Online & Let's Connect</h2>
            <p>
              Looking for a dedicated Python Full Stack Developer for software engineering opportunities or technical projects? Connect with me directly on LinkedIn, GitHub, or send me an email.
            </p>
            <div className="cta-actions" style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
              <Link to="/contact" className="btn-primary cta-btn">
                Get In Touch <FaArrowRight />
              </Link>
              <a 
                href="https://www.linkedin.com/in/nichenametla-dheeraj-740701342/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary cta-btn"
              >
                <FaLinkedin /> LinkedIn Profile
              </a>
              <a 
                href="https://github.com/NichenametlaDheeraj" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary cta-btn"
              >
                <FaGithub /> GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
