import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { metricsData, certificationsData } from "../../data/achievements";
import { FaAward, FaCalendarAlt, FaBuilding, FaCheckCircle } from "react-icons/fa";
import "./Achievements.css";

export default function Achievements() {
  useEffect(() => {
    document.title = "Dheeraj Nichenametla | Achievements";
  }, []);

  return (
    <div className="page-container achievements-page">
      <div className="container">
        <PageHeader
          badge="MILESTONES & CREDENTIALS"
          title="Achievements & Certifications"
          subtitle="Key technical milestones, certifications, and portfolio statistics."
        />

        {/* Statistics Row */}
        <div className="metrics-grid">
          {metricsData.map((item, idx) => (
            <div className="metric-card card" key={idx}>
              <span className="metric-number">{item.number}</span>
              <span className="metric-label">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="certifications-section">
          <h2 className="section-title text-left">Certifications</h2>

          <div className="certifications-grid">
            {certificationsData.map((cert, idx) => (
              <div className="cert-card card" key={idx}>
                <div className="cert-header">
                  <div className="cert-icon">
                    <FaAward />
                  </div>
                  <div>
                    <h3 className="cert-title">{cert.title}</h3>
                    <div className="cert-meta">
                      <span className="cert-issuer"><FaBuilding /> {cert.issuer}</span>
                      <span className="cert-date"><FaCalendarAlt /> {cert.date}</span>
                    </div>
                  </div>
                </div>
                <p className="cert-desc">{cert.description}</p>
                <div className="cert-status">
                  <FaCheckCircle className="status-icon" /> Verified Credential
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
