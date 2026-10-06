import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const currentYear = 2026;

  return (
    <footer className="footer">
      <div className="container footer-content">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-badge">DN</div>
            <div>
              <h3>Nichenametla Dheeraj</h3>
              <p className="footer-role">B.Sc. Computer Science | Python Full Stack Developer</p>
            </div>
          </div>
          <p className="footer-desc">
            Building scalable, reliable web applications with Python, Django, React, REST APIs, and MySQL. Focused on software engineering excellence and modern web solutions.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/education">Education</Link></li>
            <li><Link to="/achievements">Achievements</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Social / Connect Column */}
        <div className="footer-social-col">
          <h4 className="footer-title">Connect</h4>
          <p className="footer-connect-text">
            Feel free to reach out for software engineering opportunities, projects, or entry-level hiring.
          </p>
          <div className="footer-social">
            <a
              href="https://github.com/NichenametlaDheeraj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/nichenametla-dheeraj-740701342/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:dheerajnichenametla@gmail.com"
              aria-label="Send Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© {currentYear} Nichenametla Dheeraj. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;