import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import PageHeader from "../../components/PageHeader/PageHeader";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    document.title = "Dheeraj Nichenametla | Contact";
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    // Securely retrieve EmailJS configuration from Vite environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_jmnfl0k";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_8nveing";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "KxxmkuRIQNqaq_FAO";

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setLoading(false);
        setStatusMessage({
          type: "success",
          text: "Message sent successfully! I will get back to you shortly."
        });
        form.current.reset();

        setTimeout(() => {
          setStatusMessage({ type: "", text: "" });
        }, 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setLoading(false);
        setStatusMessage({
          type: "error",
          text: "Failed to send message. Please try emailing directly."
        });

        setTimeout(() => {
          setStatusMessage({ type: "", text: "" });
        }, 5000);
      });
  };

  return (
    <div className="page-container contact-page">
      <div className="container">
        <PageHeader
          badge="GET IN TOUCH"
          title="Let's Build Something Together"
          subtitle="Whether you have a job opportunity, project inquiry, or technical question, feel free to reach out."
        />

        <div className="contact-grid">
          {/* Left Column: Contact Information */}
          <div className="contact-info-col">
            <div className="info-item card">
              <div className="info-icon-badge">
                <FaEnvelope />
              </div>
              <div>
                <h3>Email</h3>
                <a href="mailto:dheerajnichenametla@gmail.com" className="info-link">
                  dheerajnichenametla@gmail.com
                </a>
              </div>
            </div>

            <div className="info-item card">
              <div className="info-icon-badge">
                <FaPhoneAlt />
              </div>
              <div>
                <h3>Phone</h3>
                <a href="tel:+918019479721" className="info-link">
                  +91 8019479721
                </a>
              </div>
            </div>

            <div className="info-item card">
              <div className="info-icon-badge">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3>Location</h3>
                <p className="info-text">Anantapur, Andhra Pradesh, India</p>
              </div>
            </div>

            {/* Social Profiles */}
            <div className="contact-socials-card card">
              <h3>Connect on Platforms</h3>
              <div className="socials-row">
                <a
                  href="https://github.com/NichenametlaDheeraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="GitHub Profile"
                >
                  <FaGithub /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/nichenametla-dheeraj-740701342/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-col card">
            <h2>Send a Message</h2>
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Subject</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Project Opportunity / Inquiry"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary submit-btn">
                {loading ? "Sending..." : <>Send Message <FaPaperPlane /></>}
              </button>

              {statusMessage.text && (
                <div className={`form-status ${statusMessage.type}`}>
                  {statusMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
