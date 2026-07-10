import "./Achievements.css";
import {
  FaProjectDiagram,
  FaLaptopCode,
  FaGithub,
  FaCertificate,
  FaClock,
  FaCode,
} from "react-icons/fa";

const achievements = [
  {
    icon: <FaProjectDiagram />,
    number: "10+",
    title: "Projects Completed",
  },
  {
    icon: <FaLaptopCode />,
    number: "12+",
    title: "Technologies Learned",
  },
  {
    icon: <FaGithub />,
    number: "20+",
    title: "GitHub Repositories",
  },
  {
    icon: <FaCertificate />,
    number: "8+",
    title: "Certifications",
  },
  {
    icon: <FaClock />,
    number: "1000+",
    title: "Coding Hours",
  },
  {
    icon: <FaCode />,
    number: "300+",
    title: "Problems Solved",
  },
];

function Achievements() {
  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <h2 className="section-title">Achievements</h2>

        <div className="achievement-grid">
          {achievements.map((item, index) => (
            <div className="achievement-card glass" key={index}>
              <div className="achievement-icon">
                {item.icon}
              </div>

              <h3>{item.number}</h3>

              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;