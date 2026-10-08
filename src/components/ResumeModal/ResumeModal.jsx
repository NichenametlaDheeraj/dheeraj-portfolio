import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaFilePdf, FaDownload, FaBriefcase, FaCode, FaDatabase } from "react-icons/fa";
import { sendResumeDownloadNotification } from "../../lib/notifications";
import "./ResumeModal.css";

export const openResumeModal = () => {
  window.dispatchEvent(new Event("openResumeModal"));
};

export const RESUME_ROLES = [
  {
    category: "Software & Web Development",
    icon: <FaCode />,
    roles: [
      { name: "Python Developer", pdf: "/resumes/Dheeraj_N_Python_Developer_Resume.pdf" },
      { name: "Python Full Stack Developer", pdf: "/resumes/Dheeraj_Nichenametla_Python_Full_Stack_Developer_Resume.pdf" },
      { name: "Django Backend Developer", pdf: "/resumes/Dheeraj_Nichenametla_Django_Backend_Developer_Resume.pdf" },
      { name: "Frontend Developer", pdf: "/resumes/Dheeraj_Nichenametla_Frontend_Developer_Resume.pdf" },
      { name: "Software Engineer", pdf: "/resumes/Dheeraj_Nichenametla_Software_Engineer_Resume.pdf" },
      { name: "Junior Web Developer", pdf: "/resumes/Dheeraj_Nichenametla_Junior_Web_Developer_Resume.pdf" },
      { name: "Software Developer", pdf: "/resumes/Dheeraj_Nichenametla_Software_Developer_Resume.pdf" },
      { name: "Junior Developer", pdf: "/resumes/Dheeraj_Nichenametla_Junior_Developer_Resume.pdf" },
    ]
  },
  {
    category: "Database & IT Trainee",
    icon: <FaDatabase />,
    roles: [
      { name: "SQL Database Developer", pdf: "/resumes/Dheeraj_Nichenametla_SQL_Database_Developer_Resume.pdf" },
      { name: "Data Entry & Tech Support", pdf: "/resumes/Dheeraj_Nichenametla_Data_Entry_Technical_Support_Resume.pdf" },
      { name: "IT Graduate Trainee", pdf: "/resumes/Dheeraj_Nichenametla_IT_Graduate_Trainee_Resume.pdf" },
      { name: "Graduate Engineer Trainee", pdf: "/resumes/Dheeraj_Nichenametla_Graduate_Engineer_Trainee_Resume.pdf" },
    ]
  },
  {
    category: "Non-IT, Operations & Admin",
    icon: <FaBriefcase />,
    roles: [
      { name: "Data Entry Executive", pdf: "/resumes/Dheeraj_Nichenametla_Data_Entry_Executive_Resume.pdf" },
      { name: "Back Office Executive", pdf: "/resumes/Dheeraj_Nichenametla_Back_Office_Executive_Resume.pdf" },
      { name: "Customer Support Executive", pdf: "/resumes/Dheeraj_Nichenametla_Customer_Support_Executive_Resume.pdf" },
      { name: "Process Associate", pdf: "/resumes/Dheeraj_Nichenametla_Process_Associate_Resume.pdf" },
      { name: "Documentation Executive", pdf: "/resumes/Dheeraj_Nichenametla_Documentation_Executive_Resume.pdf" },
      { name: "General Graduate Trainee", pdf: "/resumes/Dheeraj_Nichenametla_General_Graduate_Trainee_Resume.pdf" },
      { name: "GIS Data Entry Operator", pdf: "/resumes/Dheeraj_Nichenametla_GIS_Data_Entry_Operator_Resume.pdf" },
      { name: "Banking Back Office Executive", pdf: "/resumes/Dheeraj_Nichenametla_Banking_Back_Office_Executive_Resume.pdf" },
    ]
  }
];

export default function ResumeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="resume-modal-overlay" onClick={onClose}>
        <motion.div
          className="resume-modal-content glass"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="resume-modal-header">
            <div>
              <h3>📄 Select Targeted ATS Resume</h3>
              <p>Choose your hiring role to download a tailored, 1-page ATS resume</p>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <FaTimes />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="resume-modal-tabs">
            {RESUME_ROLES.map((cat, idx) => (
              <button
                key={idx}
                className={`tab-btn ${activeTab === idx ? "active" : ""}`}
                onClick={() => setActiveTab(idx)}
              >
                {cat.icon} <span>{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Role List */}
          <div className="resume-role-list">
            {RESUME_ROLES[activeTab].roles.map((role, rIdx) => (
              <div className="resume-role-card" key={rIdx}>
                <div className="role-info">
                  <FaFilePdf className="pdf-icon" />
                  <span className="role-name">{role.name}</span>
                </div>
                <div className="role-actions">
                  <a
                    href={role.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-download-pdf"
                    onClick={() => {
                      sendResumeDownloadNotification();
                      onClose();
                    }}
                  >
                    <FaDownload /> Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
