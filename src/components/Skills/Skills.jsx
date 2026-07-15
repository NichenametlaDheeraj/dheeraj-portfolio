import "./Skills.css";
import {
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";

import {
  SiDjango,
  SiMysql,
  SiPostman,
  SiGithub,
} from "react-icons/si";

const skills = [
  {
    icon: <FaPython />,
    name: "Python",
    level: 95,
  },
  {
    icon: <SiDjango />,
    name: "Django",
    level: 90,
  },
  {
    icon: <FaHtml5 />,
    name: "HTML",
    level: 95,
  },
  {
    icon: <FaCss3Alt />,
    name: "CSS",
    level: 90,
  },
  {
    icon: <FaJs />,
    name: "JavaScript",
    level: 80,
  },
  {
    icon: <FaReact />,
    name: "React",
    level: 75,
  },
  {
    icon: <SiMysql />,
    name: "MySQL",
    level: 90,
  },
  {
    icon: <FaGitAlt />,
    name: "Git",
    level: 80,
  },
  {
    icon: <SiGithub />,
    name: "GitHub",
    level: 85,
  },
  {
    icon: <SiPostman />,
    name: "REST APIs",
    level: 85,
  },
  {
    icon: <FaDatabase />,
    name: "SQL",
    level: 88,
  },
];

function Skills() {
  return (
    <section id="skills" className="skills"data-aos="zoom-in">

      <div className="container">

        <h2 className="section-title">
          Technical Skills
        </h2>

        <div className="skills-grid">

          {skills.map((skill, index) => (

            <div className="skill-card glass" key={index}>

              <div className="skill-icon">
                {skill.icon}
              </div>

              <h3>{skill.name}</h3>

              <div className="progress">

                <div
                  className="progress-bar"
                  style={{ width: `${skill.level}%` }}
                ></div>

              </div>

              <span>{skill.level}%</span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Skills;