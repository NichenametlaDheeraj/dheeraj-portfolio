import "./Hero.css";
import {
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaArrowRight,
} from "react-icons/fa";

import { TypeAnimation } from "react-type-animation";
import { sendResumeDownloadNotification } from "../../lib/notifications";

function Hero() {
  return (
    <section id="home" className="hero" data-aos="fade-up">

      <div className="hero-container">

        {/* LEFT */}

        <div className="hero-left">

          <p className="hero-tag">
            👋 Hello, I'm
          </p>

          <h1>
            Nichenametla <span>Dheeraj</span>
          </h1>

          <TypeAnimation
            sequence={[
              "B.Sc. Computer Science | Python Full Stack Developer",
              2000,

              "Python & Django Developer",
              2000,

              "React & REST API Developer",
              2000,
            ]}
            wrapper="h2"
            speed={50}
            repeat={Infinity}
            className="typing"
          />

          <p className="hero-desc">
            Passionate B.Sc. Computer Science graduate focused on building
            scalable web applications using Python, Django, REST API, MySQL, React, HTML, CSS, and JavaScript.
          </p>

          {/* BUTTONS */}

          <div className="hero-buttons">

            <a
              href="/Resume_Dheeraj_Nichenametla.pdf?v=2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              onClick={sendResumeDownloadNotification}
            >
              <FaDownload />
              Download Resume
            </a>

            <a
              href="#projects"
              className="btn-outline"
            >
              <FaArrowRight />
              View Projects
            </a>

          </div>

          {/* SOCIAL LINKS */}

          <div className="socials">

            <a
              href="https://github.com/NichenametlaDheeraj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nichenametla Dheeraj on GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/nichenametla-dheeraj-740701342/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nichenametla Dheeraj on LinkedIn"
            >
              <FaLinkedin />
            </a>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="profile-card">

            <img
              src="/profile.png"
              alt="Nichenametla Dheeraj - B.Sc Computer Science | Python Full Stack Developer"
              title="Nichenametla Dheeraj"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;