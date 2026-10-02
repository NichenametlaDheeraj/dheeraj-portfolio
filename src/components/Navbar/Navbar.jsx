import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaDownload } from "react-icons/fa";
import { sendResumeDownloadNotification } from "../../lib/notifications";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Achievements", path: "/achievements" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`header-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <div className="logo-badge">DN</div>
          <div className="logo-text">
            <span className="logo-name">Dheeraj Nichenametla</span>
            <span className="logo-title">Python Full Stack Developer</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={closeMenu}
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile Resume Button */}
          <div className="mobile-resume-container">
            <a
              href="/Resume_Dheeraj_Nichenametla.pdf?v=2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary resume-btn-mobile"
              onClick={() => {
                sendResumeDownloadNotification();
                closeMenu();
              }}
            >
              <FaDownload />
              <span>Download Resume</span>
            </a>
          </div>
        </nav>

        {/* Desktop Resume Button */}
        <div className="nav-actions">
          <a
            href="/Resume_Dheeraj_Nichenametla.pdf?v=2"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary resume-btn-desktop"
            onClick={sendResumeDownloadNotification}
          >
            <FaDownload />
            <span>Download Resume</span>
          </a>

          {/* Hamburger Toggle */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;