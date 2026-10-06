import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projectsData } from "../../data/projects";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCheckCircle, FaChevronRight } from "react-icons/fa";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === projectId);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Nichenametla Dheeraj`;
    } else {
      document.title = "Project Not Found | Nichenametla Dheeraj";
    }
  }, [project]);

  if (!project) {
    return (
      <div className="page-container">
        <div className="container text-center" style={{ padding: "60px 0" }}>
          <h2>Project Not Found</h2>
          <p style={{ color: "var(--text-secondary)", margin: "16px 0 24px" }}>
            The project you're looking for doesn't exist or may have been removed.
          </p>
          <Link to="/projects" className="btn-primary">
            <FaArrowLeft /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container project-details-page">
      <div className="container">
        {/* Breadcrumbs Navigation */}
        <motion.div 
          className="breadcrumbs"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/">Home</Link>
          <FaChevronRight className="breadcrumb-separator" />
          <Link to="/projects">Projects</Link>
          <FaChevronRight className="breadcrumb-separator" />
          <span className="breadcrumb-current">{project.title}</span>
        </motion.div>

        {/* Detail Header */}
        <motion.div 
          className="detail-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-subtitle">{project.subtitle}</p>

          <div className="detail-tags">
            {project.tech.map((t, idx) => (
              <span className="tech-tag" key={idx}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Project Image */}
        {project.image && (
          <motion.div 
            className="detail-image-card card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <img src={project.image} alt={`Nichenametla Dheeraj - ${project.title} Project`} />
          </motion.div>
        )}

        {/* Content Layout */}
        <motion.div 
          className="detail-content-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Main Info */}
          <div className="detail-main card">
            <section className="detail-block">
              <h2>Project Overview</h2>
              <p>{project.overview}</p>
            </section>

            {project.problemPurpose && (
              <section className="detail-block">
                <h2>Problem & Purpose</h2>
                <p>{project.problemPurpose}</p>
              </section>
            )}

            {project.features && project.features.length > 0 && (
              <section className="detail-block">
                <h2>Key Features</h2>
                <ul className="features-list">
                  {project.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheckCircle className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.contribution && (
              <section className="detail-block">
                <h2>My Contribution & Implementation Details</h2>
                <p>{project.contribution}</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="detail-sidebar">
            <div className="sidebar-card card">
              <h3>Technologies Used</h3>
              <div className="sidebar-tags">
                {project.tech.map((t, i) => (
                  <span className="tech-tag" key={i}>{t}</span>
                ))}
              </div>

              <div className="sidebar-divider"></div>

              <h3>Project Links</h3>
              <div className="sidebar-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary sidebar-btn"
                  >
                    <FaGithub /> GitHub Repository
                  </a>
                )}

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary sidebar-btn"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}

                {!project.github && !project.liveDemo && (
                  <p className="no-links-text">Internal repository</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
