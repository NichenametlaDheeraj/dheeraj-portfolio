import "./Projects.css";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Inventory Management System",
    image: "/projects/inventory.png",
    tech: ["Python", "MySQL"],
    description:
      "A desktop application to manage inventory, billing, customer records, owner dashboard, stock updates, and sales management.",
    github:
      "https://github.com/NichenametlaDheeraj/Inventory-Management-System",
  },
  {
    title: "Movie Ticket Booking System",
    image: "/projects/movie.png",
    tech: ["Python"],
    description:
      "A movie ticket booking system with movie scheduling, seat selection, ticket generation, and owner authentication.",
    github:
      "https://github.com/NichenametlaDheeraj/Movie-Ticket-Booking-System",
  },
  {
    title: "Mobile Recharge System",
    image: "/projects/recharge.png",
    tech: ["Python"],
    description:
      "A recharge management system with SIM validation, recharge plans, balance management, and recharge history.",
    github:
      "https://github.com/NichenametlaDheeraj/Mobile-Recharge-System",
  },
  {
    title: "Bike Rental Management System",
    image: "/projects/bike.png",
    tech: ["Python"],
    description:
      "A bike rental system with customer management, booking, rental tracking, billing, and return management.",
    github:
      "https://github.com/NichenametlaDheeraj/Bike-Rental-Management-System",
  },
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card glass" key={index}>
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              )}

              <div className="project-content">
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>

                <div className="project-buttons">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                    <span>View Code</span>
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