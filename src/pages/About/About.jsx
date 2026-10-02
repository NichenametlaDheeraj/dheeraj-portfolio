import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { FaGraduationCap, FaLaptopCode, FaPython, FaBrain } from "react-icons/fa";
import "./About.css";

export default function About() {
  useEffect(() => {
    document.title = "Dheeraj Nichenametla | About";
  }, []);

  return (
    <div className="page-container about-page">
      <div className="container">
        <PageHeader
          badge="01 / BIOGRAPHY"
          title="About Me"
          subtitle="Python Full Stack Developer passionate about building robust backend solutions and modern web applications."
        />

        <div className="about-grid">
          {/* Left Column: Introduction */}
          <div className="about-intro card">
            <h2>Professional Profile</h2>
            <p>
              I'm <strong>Dheeraj Nichenametla</strong>, a Computer Science student and <strong>Python Full Stack Developer</strong> based in Anantapur, Andhra Pradesh.
            </p>
            <p>
              My technical foundation is built on solid Computer Science principles, object-oriented programming, and relational database management. I specialize in developing web applications using <strong>Python, Django, REST APIs, and MySQL</strong>, paired with <strong>React</strong> on the frontend.
            </p>
            <p>
              I have built projects engineering RESTful services, designing efficient database schemas, and writing clean full-stack workflows. Currently, I am expanding my knowledge into <strong>Machine Learning and Generative AI</strong> to craft intelligent, data-driven software products.
            </p>
            <p>
              My goal is to work as an Entry-Level Software Engineer delivering clean, scalable code and enterprise-grade software applications.
            </p>
          </div>

          {/* Right Column: Info Cards */}
          <div className="about-info-cards">
            <div className="info-card card">
              <div className="info-icon">
                <FaGraduationCap />
              </div>
              <div>
                <h3>Degree</h3>
                <p>B.Sc Computer Science (2023 – 2026)</p>
                <span className="info-sub">Government Degree College (Autonomous)</span>
              </div>
            </div>

            <div className="info-card card">
              <div className="info-icon">
                <FaLaptopCode />
              </div>
              <div>
                <h3>Career Focus</h3>
                <p>Python Backend + Full Stack Development</p>
                <span className="info-sub">Web Services, REST APIs, System Architecture</span>
              </div>
            </div>

            <div className="info-card card">
              <div className="info-icon">
                <FaPython />
              </div>
                <div>
                <h3>Core Technologies</h3>
                <p>Python, Django, React, MySQL</p>
                <span className="info-sub">HTML5, CSS3, JavaScript ES6+, SQL</span>
              </div>
            </div>

            <div className="info-card card">
              <div className="info-icon">
                <FaBrain />
              </div>
              <div>
                <h3>Technical Interests</h3>
                <p>REST APIs, Machine Learning, Generative AI</p>
                <span className="info-sub">Pandas, NumPy, Automated Workflows</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
