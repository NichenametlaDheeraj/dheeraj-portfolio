import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFolderOpen } from "react-icons/fa";
import "./NotFound.css";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | Dheeraj Nichenametla";
  }, []);

  return (
    <div className="page-container not-found-page">
      <div className="container not-found-content">
        <div className="not-found-card card">
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
        </div>
      </div>
    </div>
  );
}
