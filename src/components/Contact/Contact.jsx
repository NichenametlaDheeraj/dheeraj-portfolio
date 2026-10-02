import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "", showFallback: false });
  const [formData, setFormData] = useState({ name: "", email: "", title: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: "", text: "", showFallback: false });

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
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      
      setLoading(false);
      setStatusMessage({
        type: "success",
        text: "✅ Message sent successfully!",
        showFallback: false
      });
      setFormData({ name: "", email: "", title: "", message: "" });
      if (form.current) form.current.reset();

      setTimeout(() => {
        setStatusMessage({ type: "", text: "", showFallback: false });
      }, 5000);
    } catch (primaryError) {
      console.warn("Primary emailjs.send failed, trying sendForm fallback...", primaryError);
      
      try {
        await emailjs.sendForm(serviceId, templateId, form.current, { publicKey });
        
        setLoading(false);
        setStatusMessage({
          type: "success",
          text: "✅ Message sent successfully!",
          showFallback: false
        });
        setFormData({ name: "", email: "", title: "", message: "" });
        if (form.current) form.current.reset();
      } catch (secondaryError) {
        console.error("EmailJS Error:", secondaryError);
        setLoading(false);
        setStatusMessage({
          type: "error",
          text: "Could not send automatically via EmailJS API.",
          showFallback: true
        });
      }
    }
  };

  const getMailtoLink = () => {
    const subject = encodeURIComponent(formData.title || "Portfolio Inquiry");
    const body = encodeURIComponent(
      `Hi Dheeraj,\n\n${formData.message}\n\nBest regards,\n${formData.name || 'Visitor'} (${formData.email || 'No email specified'})`
    );
    return `mailto:dheerajnichenametla@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have a software engineering opportunity, project, or any questions?
          Feel free to contact me.
        </p>

        <div className="contact-wrapper">
          {/* Left */}
          <div className="contact-info">
            <div className="info-card">
              <FaEnvelope className="icon" />
              <div>
                <h3>Email</h3>
                <a href="mailto:dheerajnichenametla@gmail.com">
                  dheerajnichenametla@gmail.com
                </a>
              </div>
            </div>

            <div className="info-card">
              <FaPhoneAlt className="icon" />
              <div>
                <h3>Phone</h3>
                <a href="tel:+918019479721">+91 8019479721</a>
              </div>
            </div>

            <div className="info-card">
              <FaMapMarkerAlt className="icon" />
              <div>
                <h3>Location</h3>
                <p>Anantapur, Andhra Pradesh, India</p>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://github.com/NichenametlaDheeraj"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/nichenametla-dheeraj-740701342/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Right */}
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="title"
              placeholder="Subject"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {statusMessage.text && (
              <div className={`status ${statusMessage.type}`}>
                <p>{statusMessage.text}</p>
                {statusMessage.showFallback && (
                  <a href={getMailtoLink()} className="fallback-btn">
                    <FaPaperPlane /> Open Email App (Direct)
                  </a>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;