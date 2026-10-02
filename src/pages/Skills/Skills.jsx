import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { skillsData } from "../../data/skills";
import {
  FaPython, FaJs, FaDatabase, FaHtml5, FaCss3Alt, FaBootstrap,
  FaReact, FaGitAlt, FaGithub, FaRobot, FaCode, FaBrain, FaTerminal, FaFilter
} from "react-icons/fa";
import { SiDjango, SiMysql, SiPostman, SiPandas, SiNumpy } from "react-icons/si";
import "./Skills.css";

const iconMap = {
  "Python": <FaPython />,
  "JavaScript": <FaJs />,
  "SQL": <FaDatabase />,
  "R": <FaTerminal />,
  "C": <FaCode />,
  "Django": <SiDjango />,
  "REST APIs": <SiPostman />,
  "OOP": <FaCode />,
  "HTML5": <FaHtml5 />,
  "CSS3": <FaCss3Alt />,
  "Bootstrap": <FaBootstrap />,
  "React": <FaReact />,
  "MySQL": <SiMysql />,
  "CRUD Operations": <FaDatabase />,
  "Joins & Subqueries": <FaDatabase />,
  "Normalization": <FaDatabase />,
  "Relationships": <FaDatabase />,
  "Constraints": <FaDatabase />,
  "Database Design": <FaDatabase />,
  "Machine Learning": <FaRobot />,
  "Generative AI": <FaBrain />,
  "Prompt Engineering": <FaBrain />,
  "NumPy": <SiNumpy />,
  "Pandas": <SiPandas />,
  "Git": <FaGitAlt />,
  "GitHub": <FaGithub />,
  "VS Code": <FaCode />,
  "Postman": <SiPostman />
};

export default function Skills() {
  const [levelFilter, setLevelFilter] = useState("All");

  useEffect(() => {
    document.title = "Dheeraj Nichenametla | Skills";
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "advanced":
        return "badge-advanced";
      case "intermediate":
        return "badge-intermediate";
      case "learning":
        return "badge-learning";
      default:
        return "badge-intermediate";
    }
  };

  const levels = ["All", "Advanced", "Intermediate", "Learning"];

  return (
    <div className="page-container skills-page">
      <div className="container">
        <PageHeader
          badge="TECHNICAL COMPETENCIES"
          title="Technologies & Skills"
          subtitle="A comprehensive breakdown of my programming languages, frameworks, databases, and development tools."
        />

        {/* Level Filter Bar */}
        <div className="skills-filter-container">
          <span className="skills-filter-label"><FaFilter /> Filter by Level:</span>
          <div className="skills-filter-pills">
            {levels.map((lvl) => (
              <button
                key={lvl}
                className={`skill-level-btn ${levelFilter === lvl ? "active" : ""}`}
                onClick={() => setLevelFilter(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="skills-categories">
          {skillsData.map((categoryGroup, index) => {
            const filteredGroupSkills = categoryGroup.skills.filter(
              (s) => levelFilter === "All" || s.status.toLowerCase() === levelFilter.toLowerCase()
            );

            if (filteredGroupSkills.length === 0) return null;

            return (
              <div className="skill-category-block" key={index}>
                <h2 className="category-title">{categoryGroup.category}</h2>
                <div className="skills-grid">
                  {filteredGroupSkills.map((skill, sIdx) => (
                    <div className="skill-card card" key={sIdx}>
                      <div className="skill-icon">
                        {iconMap[skill.name] || <FaCode />}
                      </div>
                      <div className="skill-details">
                        <h3 className="skill-name">{skill.name}</h3>
                        <span className={`skill-status-badge ${getStatusBadgeClass(skill.status)}`}>
                          {skill.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
