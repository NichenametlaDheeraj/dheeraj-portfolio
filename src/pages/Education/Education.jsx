import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { educationData } from "../../data/education";
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from "react-icons/fa";
import "./Education.css";

export default function Education() {
  useEffect(() => {
    document.title = "Dheeraj Nichenametla | Education";
  }, []);

  return (
    <div className="page-container education-page">
      <div className="container">
        <PageHeader
          badge="ACADEMIC BACKGROUND"
          title="Education"
          subtitle="My academic background, degrees, and professional software engineering training."
        />

        <div className="education-list">
          {educationData.map((edu, idx) => (
            <div className="education-card card" key={idx}>
              <div className="edu-icon">
                <FaGraduationCap />
              </div>

              <div className="edu-content">
                <div className="edu-header">
                  <div>
                    <h2 className="edu-degree">{edu.degree}</h2>
                    <h3 className="edu-institution">
                      <FaUniversity className="institution-icon" /> {edu.institution}
                    </h3>
                  </div>
                  <span className="edu-period">
                    <FaCalendarAlt /> {edu.period}
                  </span>
                </div>

                <p className="edu-desc">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
