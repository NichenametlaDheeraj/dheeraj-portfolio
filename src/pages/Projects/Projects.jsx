import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader/PageHeader";
import { projectsData } from "../../data/projects";
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaFolderOpen, FaSearch, FaTimes } from "react-icons/fa";
import "./Projects.css";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    document.title = "Dheeraj Nichenametla | Projects";
  }, []);

  const categories = ["All", "Python", "Django", "React", "MySQL", "Machine Learning"];

  // Helper to count projects matching a category
  const getCategoryCount = (category) => {
    if (category === "All") return projectsData.length;
    return projectsData.filter((p) =>
      p.categories.includes(category) || p.tech.includes(category)
    ).length;
  };

  useEffect(() => {
    let result = projectsData;

    // Filter by Category
    if (activeFilter !== "All") {
      result = result.filter((p) =>
        p.categories.includes(activeFilter) || p.tech.includes(activeFilter)
      );
    }

    // Filter by Live Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }

    setFilteredProjects(result);
  }, [activeFilter, searchQuery]);

  const handleReset = () => {
    setActiveFilter("All");
    setSearchQuery("");
  };

  return (
    <div className="page-container projects-page">
      <div className="container">
        <PageHeader
          badge="PORTFOLIO & CASE STUDIES"
          title="Featured Projects"
          subtitle="Real-world applications I've built using Python, Django, React, MySQL and related technologies."
        />

        {/* Live Search & Filter Control Bar */}
        <motion.div 
          className="projects-control-bar"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Live Search Box */}
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects by name, technology, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Category Filter Pills with Item Counts */}
          <div className="filter-bar">
            {categories.map((cat) => {
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  <span>{cat}</span>
                  <span className="filter-count-badge">{count}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Counter */}
        <div className="results-meta">
          <span>Showing {filteredProjects.length} of {projectsData.length} Projects</span>
        </div>

        {/* Projects Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            className="projects-grid"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.08 } }
            }}
          >
            {filteredProjects.map((project, idx) => (
              <motion.div 
                className="project-card card" 
                key={project.id}
                variants={{
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } }
                }}
              >
                <div className="card-top-accent"></div>
                {project.image && (
                  <div className="project-card-image">
                    <img src={project.image} alt={project.title} />
                    <span className="project-index">0{idx + 1}</span>
                  </div>
                )}
                <div className="project-card-body">
                  <h2 className="project-card-title">{project.title}</h2>
                  <p className="project-card-subtitle">{project.subtitle}</p>
                  <p className="project-card-desc">{project.shortDescription}</p>

                  <div className="project-card-tags">
                    {project.tech.map((t, i) => (
                      <span className="tech-tag" key={i}>{t}</span>
                    ))}
                  </div>

                  <div className="project-card-actions">
                    <Link to={`/projects/${project.id}`} className="btn-primary card-btn">
                      View Project Details <FaArrowRight />
                    </Link>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline card-btn-icon"
                        aria-label={`View ${project.title} on GitHub`}
                        title="GitHub Repository"
                      >
                        <FaGithub />
                      </a>
                    )}

                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline card-btn-icon"
                        aria-label={`View ${project.title} Live Demo`}
                        title="Live Demo"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State Section */
          <motion.div 
            className="empty-state card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="empty-icon">
              <FaFolderOpen />
            </div>
            <h3>No matching projects found</h3>
            <p>Try clearing your search query or switching category filters.</p>
            <button className="btn-primary" onClick={handleReset}>
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
