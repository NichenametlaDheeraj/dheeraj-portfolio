import "./Projects.css";
import {
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";

const projects = [
  {
    title: "Inventory Management System",
    tech: ["Python", "MySQL"],
    description:
      "A desktop application to manage inventory, billing, customer records, and owner dashboard.",
    github: "https://github.com/NichenametlaDheeraj/Inventory-Management-System",
    live: "#",
  },
  {
    title: "Movie Ticket Booking System",
    tech: ["Python"],
    description:
      "Movie scheduling, seat booking, ticket generation, and owner authentication.",
    github: "https://github.com/NichenametlaDheeraj/Movie-Ticket-Booking-System",
    live: "#",
  },
  {
    title: "Mobile Recharge System",
    tech: ["Python"],
    description:
      "Recharge plans, SIM validation, and balance management.",
    github: "https://github.com/NichenametlaDheeraj/Mobile-Recharge-System",
    live: "#",
  },
  {
    title: "Bike Rental Management System",
    tech: ["Python"],
    description:
      "Customer management, rental tracking, booking, and billing.",
    github: "https://github.com/NichenametlaDheeraj/Bike-Rental-Management-System",
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