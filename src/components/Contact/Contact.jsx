import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Contact() {
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .sendForm(
        "service_jmnfl0k",
        "template_8nveing",
        form.current,
        "KxxmkuRIQNqaq_FAO"
      )
      .then(() => {
        setLoading(false);
        setMessage("✅ Message sent successfully!");
        form.current.reset();

        setTimeout(() => {
          setMessage("");
        }, 4000);
      })
      .catch((error) => {
        console.error(error);

        setLoading(false);

        setMessage("❌ Failed to send message.");

        setTimeout(() => {
          setMessage("");
        }, 4000);
      });
  };

  return (
    <section className="contact" id="contact">

      <div className="container">

        <h2 className="section-title">
          Get In Touch
        </h2>

        <p className="section-subtitle">
          Have a project, internship opportunity, or any questions?
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

                <a href="tel:+918019479721">
                  +91 8019479721
                </a>
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

          <form
            ref={form}
            onSubmit={sendEmail}
            className="contact-form"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />

            <input
              type="text"
              name="title"
              placeholder="Subject"
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              required
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {message && (
              <p className="status">
                {message}
              </p>
            )}

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contact;