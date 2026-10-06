import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaFolderOpen } from "react-icons/fa";
import "./NotFound.css";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | Nichenametla Dheeraj";
  }, []);

  return (
    <div className="page-container not-found-page">
      <div className="container not-found-content">
        <motion.div 
          className="not-found-card card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="error-code">404</span>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist or has been moved.</p>

          <div className="not-found-buttons">
            <Link to="/" className="btn-primary">
              <FaHome /> Go Home
            </Link>
            <Link to="/projects" className="btn-outline">
              <FaFolderOpen /> View Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
