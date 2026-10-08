import "./About.css";
import { FaUserGraduate, FaLaptopCode, FaPython, FaDatabase, FaDownload } from "react-icons/fa";
import { sendResumeDownloadNotification } from "../../lib/notifications";
import { openResumeModal } from "../ResumeModal/ResumeModal";

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
              I'm <strong>Nichenametla Dheeraj</strong>, a <strong>B.Sc. Computer Science</strong> graduate and <strong>Python Full Stack Developer</strong>.
            </p>

            <p>
              I enjoy building real-world web applications using Python, Django, REST API, MySQL, HTML, CSS, JavaScript, and React.
            </p>

            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                sendResumeDownloadNotification();
                openResumeModal();
              }}
            >
              <FaDownload /> Download Resume
            </button>

          </div>

          {/* Right Side */}
          <div className="about-cards">

            <div className="card glass">
              <FaUserGraduate className="icon" />
              <h3>B.Sc Computer Science</h3>
              <p>2023 - 2026 | 85% Marks</p>
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