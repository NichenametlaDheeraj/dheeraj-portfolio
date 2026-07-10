import "./Projects.css";
import {
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";

const projects = [
  {
    title: "Mobile Recharge System",
    image: "/projects/recharge.png",
    description:
      "A Python-based recharge management system with dynamic recharge plans, bill generation and recharge history.",

    tech: ["Python"],

    github: "#",

    live: "#",
  },

  {
    title: "Student Management System",

    image: "/projects/student.png",

    description:
      "Student record management system using Python and MySQL supporting CRUD operations.",

    tech: ["Python", "MySQL"],

    github: "#",

    live: "#",
  },

  {
    title: "Movie Recommendation System",

    image: "/projects/movie.png",

    description:
      "Movie recommendation web application built using Django and REST APIs.",

    tech: ["Django", "REST API", "MySQL"],

    github: "#",

    live: "#",
  },

  {
    title: "Personal Portfolio",

    image: "/projects/portfolio.png",

    description:
      "Modern responsive portfolio website developed using React and custom CSS animations.",

    tech: ["React", "CSS", "JavaScript"],

    github: "#",

    live: "#",
  },
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">

        <h2 className="section-title">
          Featured Projects
        </h2>

        <div className="projects-grid">

          {projects.map((project, index) => (
            <div className="project-card glass" key={index}>

              <img
                src={project.image}
                alt={project.title}
              />

              <div className="project-content">

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-buttons">

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                    GitHub
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Projects;