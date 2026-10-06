import React, { useEffect } from "react";
import { motion } from "framer-motion";
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
        <motion.div 
          className="metrics-grid"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {metricsData.map((item, idx) => (
            <motion.div 
              className="metric-card card" 
              key={idx}
              variants={{
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
              }}
            >
              <span className="metric-number">{item.number}</span>
              <span className="metric-label">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <motion.div 
          className="certifications-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="section-title text-left">Certifications</h2>

          <div className="certifications-grid">
            {certificationsData.map((cert, idx) => (
              <motion.div 
                className="cert-card card" 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 * idx }}
              >
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
