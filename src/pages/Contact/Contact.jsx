import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader/PageHeader";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "", showFallback: false });
  const [formData, setFormData] = useState({ name: "", email: "", title: "", message: "" });

  useEffect(() => {
    document.title = "Dheeraj Nichenametla | Contact";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (statusMessage.text) {
      setStatusMessage({ type: "", text: "", showFallback: false });
    }
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(formData.title || `Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Dheeraj,\n\n${formData.message || 'I would like to get in touch with you.'}\n\nBest regards,\n${formData.name || 'Visitor'}\nEmail: ${formData.email || 'Not specified'}`
    );
    return `mailto:dheerajnichenametla@gmail.com?subject=${subject}&body=${body}`;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    // Explicit client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.title.trim() || !formData.message.trim()) {
      setStatusMessage({
        type: "error",
        text: "⚠️ Please fill in all fields (Name, Email, Subject, and Message) before sending.",
        showFallback: false
      });
      return;
    }

    setLoading(true);
    setStatusMessage({ type: "info", text: "Sending your message...", showFallback: false });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_jmnfl0k";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_8nveing";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "KxxmkuRIQNqaq_FAO";

    const templateParams = {
      name: formData.name,
      from_name: formData.name,
      user_name: formData.name,
      email: formData.email,
      from_email: formData.email,
      user_email: formData.email,
      reply_to: formData.email,
      title: formData.title,
      subject: formData.title,
      message: formData.message,
      to_name: "Dheeraj Nichenametla",
    };

    try {
      // 1. Primary Attempt: Send via emailjs.send with explicit parameters map and v4 options object
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      
      setLoading(false);
      setStatusMessage({
        type: "success",
        text: "✅ Message sent successfully! I will get back to you shortly.",
        showFallback: false
      });
      setFormData({ name: "", email: "", title: "", message: "" });
      if (form.current) form.current.reset();

      setTimeout(() => {
        setStatusMessage({ type: "", text: "", showFallback: false });
      }, 7000);
    } catch (primaryError) {
      console.warn("Primary emailjs.send failed, attempting sendForm fallback...", primaryError);
      
      try {
        // 2. Secondary Attempt: Send via sendForm with v4 options object
        await emailjs.sendForm(serviceId, templateId, form.current, { publicKey });
        
        setLoading(false);
        setStatusMessage({
          type: "success",
          text: "✅ Message sent successfully! I will get back to you shortly.",
          showFallback: false
        });
        setFormData({ name: "", email: "", title: "", message: "" });
        if (form.current) form.current.reset();
      } catch (secondaryError) {
        console.error("EmailJS Service Error:", secondaryError);
        setLoading(false);
        
        // 3. Fail-safe Direct Action: Launch mail client automatically so message is never lost!
        window.location.href = getMailtoLink();

        setStatusMessage({
          type: "info",
          text: "📬 Opening your default email application to deliver the message directly to dheerajnichenametla@gmail.com!",
          showFallback: true
        });
      }
    }
  };

  const handleDirectEmailClick = (e) => {
    e.preventDefault();
    window.location.href = getMailtoLink();
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
          <motion.div 
            className="contact-info-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
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
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="contact-form-col card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h2>Send a Message</h2>
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.title}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions-row">
                <button type="submit" disabled={loading} className="btn-primary submit-btn">
                  {loading ? "Sending..." : <>Send Message <FaPaperPlane /></>}
                </button>
                <button type="button" onClick={handleDirectEmailClick} className="btn-secondary direct-mail-btn">
                  <FaEnvelope /> Open Email App
                </button>
              </div>

              {statusMessage.text && (
                <div className={`form-status ${statusMessage.type}`}>
                  <p>{statusMessage.text}</p>
                  {statusMessage.showFallback && (
                    <div className="status-fallback">
                      <p className="fallback-text">If your email client didn't open automatically, click below:</p>
                      <a href={getMailtoLink()} className="fallback-btn">
                        <FaEnvelope /> Open Email App (Direct)
                      </a>
                    </div>
                  )}
                </div>
              )}

              <p className="direct-email-note">
                Or email directly to: <a href="mailto:dheerajnichenametla@gmail.com">dheerajnichenametla@gmail.com</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
