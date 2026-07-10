import "./Hero.css";
import { FaGithub, FaLinkedin, FaDownload, FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

function Hero() {
  return (
    <section id="home" className="hero">

      <div className="hero-container">

        {/* Left Side */}
        <div className="hero-left">

          <p className="hero-tag">
            👋 Hello, I'm
          </p>

          <h1>
            Dheeraj
            <span> Nichenametla</span>
          </h1>

          <TypeAnimation
            sequence={[
              "Python Backend Developer",
              2000,
              "Django Developer",
              2000,
              "React Learner",
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
            Passionate Computer Science student building
            scalable web applications using Python, Django,
            REST APIs and modern web technologies.
          </p>

          <div className="hero-buttons">

            <a href="/resume.pdf" download className="btn">
              <FaDownload />
              Resume
            </a>

            <a href="#projects" className="btn-outline">
              <FaArrowRight />
              Projects
            </a>

          </div>

          <div className="socials">

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

          </div>

        </div>

        {/* Right Side */}

        <div className="hero-right">

          <div className="profile-card">

            <img
              src="/profile.jpeg"
              alt="Dheeraj"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;