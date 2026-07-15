import "./About.css";
import { FaUserGraduate, FaLaptopCode, FaPython, FaDatabase } from "react-icons/fa";

function About() {
  return (
    <section id="about" className="about" data-aos="fade-right">

      <div className="container">

        <h2 className="section-title">About Me</h2>

        <div className="about-container">

          {/* Left Side */}
          <div className="about-text glass">

            <h3>Hello 👋</h3>

            <p>
              I'm <strong>Dheeraj Nichenametla</strong>, a passionate
              Computer Science student with a strong interest in
              Backend Development and Full Stack Web Development.
            </p>

            <p>
              I enjoy building real-world projects using Python,
              Django, MySQL and REST APIs. I'm currently learning
              React, Machine Learning and Generative AI to become
              a skilled Software Engineer.
            </p>

            <a href="/resume.pdf" download className="btn">
              Download Resume
            </a>

          </div>

          {/* Right Side */}
          <div className="about-cards">

            <div className="card glass">
              <FaUserGraduate className="icon" />
              <h3>B.Sc Computer Science</h3>
              <p>2023 - 2026</p>
            </div>

            <div className="card glass">
              <FaLaptopCode className="icon" />
              <h3>Python Full Stack</h3>
              <p>Backend & Frontend Development</p>
            </div>

            <div className="card glass">
              <FaPython className="icon" />
              <h3>Python & Django</h3>
              <p>REST APIs, OOP & Web Apps</p>
            </div>

            <div className="card glass">
              <FaDatabase className="icon" />
              <h3>Database</h3>
              <p>MySQL & SQL</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;