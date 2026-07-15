import "./Skills.css";

import {
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaDatabase,
  FaRobot,
  FaCode,
} from "react-icons/fa";

import {
  SiDjango,
  SiMysql,
  SiPostman,
  SiGithub,
  SiPandas,
  SiNumpy,
  SiJupyter,
} from "react-icons/si";

const skills = [
  {
    icon: <FaPython />,
    name: "Python",
    level: 90,
  },
  {
    icon: <SiDjango />,
    name: "Django",
    level: 85,
  },
  {
    icon: <FaHtml5 />,
    name: "HTML5",
    level: 90,
  },
  {
    icon: <FaCss3Alt />,
    name: "CSS3",
    level: 85,
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
    level: 85,
  },
  {
    icon: <FaDatabase />,
    name: "SQL",
    level: 85,
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
    level: 80,
  },
  {
    icon: <SiPandas />,
    name: "Pandas",
    level: 75,
  },
  {
    icon: <SiNumpy />,
    name: "NumPy",
    level: 75,
  },
  {
    icon: <SiJupyter />,
    name: "Jupyter / Colab",
    level: 85,
  },
  {
    icon: <FaRobot />,
    name: "Machine Learning",
    level: 70,
  },
  {
    icon: <FaRobot />,
    name: "Generative AI",
    level: 65,
  },
  {
    icon: <FaCode />,
    name: "VS Code",
    level: 90,
  },
];

function Skills() {
  return (
    <section
      id="skills"
      className="skills"
      data-aos="zoom-in"
    >
      <div className="container">
        <h2 className="section-title">
          Technical Skills
        </h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              className="skill-card glass"
              key={index}
            >
              <div className="skill-icon">
                {skill.icon}
              </div>

              <h3>{skill.name}</h3>

              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;