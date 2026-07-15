import "./Hero.css";
import {
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaArrowRight,
} from "react-icons/fa";

import { TypeAnimation } from "react-type-animation";

function Hero() {
  return (
    <section id="home" className="hero"data-aos="fade-up">

      <div className="hero-container">

        {/* LEFT */}

        <div className="hero-left">

          <p className="hero-tag">
            👋 Hello, I'm
          </p>

          <h1>
            Dheeraj <span>Nichenametla</span>
          </h1>

          <TypeAnimation
            sequence={[
              "Python Full Stack Developer",
              2000,

              "Django Developer",
              2000,

              "React Developer",
              2000,

              "Machine Learning Enthusiast",
              2000,

              "Generative AI Learner",
              2000,
            ]}
            wrapper="h2"
            speed={50}
            repeat={Infinity}
            className="typing"
          />

          <p className="hero-desc">
            Passionate Computer Science student focused on building
            scalable web applications using Python, Django, React,
            REST APIs, MySQL, Machine Learning, and Generative AI.
            I enjoy solving real-world problems through clean,
            efficient, and user-friendly software.
          </p>

          {/* BUTTONS */}

          <div className="hero-buttons">

            <a
              href="/Resume_Dheeraj_Nichenametla.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
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
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/nichenametla-dheeraj-740701342/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="profile-card">

            <img
              src="/profile.jpeg"
              alt="Dheeraj Nichenametla"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;