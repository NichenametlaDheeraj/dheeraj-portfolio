import "./About.css";
import { FaUserGraduate, FaLaptopCode, FaPython, FaDatabase, FaDownload, FaFilePdf } from "react-icons/fa";
import { sendResumeDownloadNotification } from "../../lib/notifications";

function About() {
  const roleResumes = [
    { label: "Python Developer", path: "/resumes/Dheeraj_N_Python_Developer_Resume.pdf" },
    { label: "Python Full Stack", path: "/resumes/Dheeraj_Nichenametla_Python_Full_Stack_Developer_Resume.pdf" },
    { label: "Django Backend", path: "/resumes/Dheeraj_Nichenametla_Django_Backend_Developer_Resume.pdf" },
    { label: "Frontend Developer", path: "/resumes/Dheeraj_Nichenametla_Frontend_Developer_Resume.pdf" },
    { label: "SQL Database", path: "/resumes/Dheeraj_Nichenametla_SQL_Database_Developer_Resume.pdf" },
    { label: "Data Entry Executive", path: "/resumes/Dheeraj_Nichenametla_Data_Entry_Executive_Resume.pdf" },
  ];

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

            <div className="resume-section-header">
              <h4>📄 Role-Specific ATS Resumes</h4>
              <p className="resume-subtitle">Download target ATS-friendly resumes tailored for specific job roles:</p>
            </div>

            <div className="role-resume-grid">
              {roleResumes.map((role, idx) => (
                <a
                  key={idx}
                  href={role.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="role-resume-btn"
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