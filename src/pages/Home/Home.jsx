import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight,
  FaGraduationCap, FaLaptopCode, FaPython, FaBrain
} from "react-icons/fa";
import { projectsData } from "../../data/projects";
import { sendResumeDownloadNotification } from "../../lib/notifications";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    document.title = "Dheeraj Nichenametla | Python Full Stack Developer";
  }, []);

  const featuredProjects = projectsData.slice(0, 3);

  return (
    <div className="page-container home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Left Column */}
          <div className="hero-content">
            <h1 className="hero-name">Dheeraj Nichenametla</h1>
            <h2 className="hero-title">Python Full Stack Developer</h2>

            <p className="hero-description">
              Building scalable web applications with <strong>Python, Django, React, REST APIs, MySQL</strong>, and emerging <strong>AI technologies</strong>. Computer Science graduate focused on software engineering excellence.
            </p>

            {/* Quick Tech Bar */}
            <div className="quick-tech-bar">
              <span>Python</span>
              <span className="dot">•</span>
              <span>Django</span>
              <span className="dot">•</span>
              <span>React</span>
              <span className="dot">•</span>
              <span>REST APIs</span>
              <span className="dot">•</span>
              <span>MySQL</span>
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

            {/* Social Icons */}
            <div className="hero-socials">
              <a
                href="https://github.com/NichenametlaDheeraj"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/nichenametla-dheeraj-740701342/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:dheerajnichenametla@gmail.com"
                aria-label="Send Email"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="hero-image-wrapper">
            <div className="profile-image-container">
              <div className="profile-backdrop-card"></div>
              <div className="profile-image-card">
                <img
                  src="/profile.png"
                  alt="Dheeraj Nichenametla - Python Full Stack Developer"
                  className="profile-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIOGRAPHY & ABOUT SECTION */}
      <section className="about-section">
        <div className="container">
          <div className="section-header-designer">
            <span className="section-number">01 / BIOGRAPHY</span>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Computer Science background, technical focus, and software engineering aspiration.</p>
          </div>

          <div className="about-grid">
            {/* Left Column: Introduction */}
            <div className="about-intro card">
              <h2>Professional Profile</h2>
              <p>
                I'm <strong>Dheeraj Nichenametla</strong>, a Computer Science student and <strong>Python Full Stack Developer</strong> based in Anantapur, Andhra Pradesh.
              </p>
              <p>
                My technical foundation is built on solid Computer Science principles, object-oriented programming, and relational database management. I specialize in developing web applications using <strong>Python, Django, REST APIs, and MySQL</strong>, paired with <strong>React</strong> on the frontend.
              </p>
              <p>
                I have built full-stack applications engineering RESTful services, designing efficient database schemas, and writing clean application workflows. Currently, I am expanding my knowledge into <strong>Machine Learning and Generative AI</strong> to craft intelligent, data-driven software products.
              </p>
              <p>
                My goal is to work as an Entry-Level Software Engineer delivering clean, scalable code and enterprise-grade software applications.
              </p>
            </div>

            {/* Right Column: Info Cards */}
            <div className="about-info-cards">
              <div className="info-card card">
                <div className="info-icon">
                  <FaGraduationCap />
                </div>
                <div>
                  <h3>Degree</h3>
                  <p>B.Sc Computer Science (2023 – 2026)</p>
                  <span className="info-sub">Government Degree College (Autonomous)</span>
                </div>
              </div>

              <div className="info-card card">
                <div className="info-icon">
                  <FaLaptopCode />
                </div>
                <div>
                  <h3>Career Focus</h3>
                  <p>Python Backend + Full Stack Development</p>
                  <span className="info-sub">Web Services, REST APIs, System Architecture</span>
                </div>
              </div>

              <div className="info-card card">
                <div className="info-icon">
                  <FaPython />
                </div>
                <div>
                  <h3>Core Technologies</h3>
                  <p>Python, Django, React, MySQL</p>
                  <span className="info-sub">HTML5, CSS3, JavaScript ES6+, SQL</span>
                </div>
              </div>

              <div className="info-card card">
                <div className="info-icon">
                  <FaBrain />
                </div>
                <div>
                  <h3>Technical Interests</h3>
                  <p>REST APIs, Machine Learning, Generative AI</p>
                  <span className="info-sub">Pandas, NumPy, Automated Workflows</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED PROJECTS SECTION */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header-designer">
            <span className="section-number">02 / FEATURED WORK</span>
            <h2 className="section-title">Selected Projects</h2>
            <p className="section-subtitle">Real-world applications engineered for scale, reliability, and business impact.</p>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project, idx) => (
              <div className="project-card card" key={project.id}>
                <div className="card-top-accent"></div>
                {project.image && (
                  <div className="project-card-image">
                    <img src={project.image} alt={project.title} />
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
              </div>
            ))}
          </div>

          <div className="view-all-wrapper">
            <Link to="/projects" className="btn-outline view-all-btn">
              View All 6 Projects <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <span className="cta-badge">LET'S CONNECT</span>
            <h2>Let's Build Something Together</h2>
            <p>
              Looking for a dedicated Python Full Stack Developer for entry-level software engineering roles or technical applications? Let's discuss your engineering goals.
            </p>
            <Link to="/contact" className="btn-primary cta-btn">
              Get In Touch <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
