import "./Contact.css";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact">

      <div className="container">

        <h2 className="section-title">
          Get In Touch
        </h2>

        <p className="contact-subtitle">
          I'm currently looking for internship and full-time Software
          Engineering opportunities. Feel free to reach out!
        </p>

        <div className="contact-wrapper">

          {/* Left */}

          <div className="contact-info glass">

            <h3>Contact Information</h3>

            <div className="info-box">

              <FaEnvelope className="contact-icon"/>

              <div>
                <h4>Email</h4>

                <a href="mailto:dheerajnichenametla@gmail.com">
                  dheerajnichenametla@gmail.com
                </a>

              </div>

            </div>

            <div className="info-box">

              <FaPhoneAlt className="contact-icon"/>

              <div>

                <h4>Phone</h4>

                <a href="tel:+918019479721">
                  +91 8019479721
                </a>

              </div>

            </div>

            <div className="info-box">

              <FaMapMarkerAlt className="contact-icon"/>

              <div>

                <h4>Location</h4>

                <p>Andhra Pradesh, India</p>

              </div>

            </div>

            <div className="social-links">

              <a
                href="https://github.com/NichenametlaDheeraj"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub/>
              </a>

              <a
                href="https://www.linkedin.com/in/nichenametla-dheeraj-740701342/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin/>
              </a>

            </div>

          </div>

          {/* Right */}

          <form className="contact-form glass">

            <input
              type="text"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              required
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="7"
              placeholder="Write your message..."
            ></textarea>

            <button className="btn">

              <FaPaperPlane/>

              Send Message

            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Contact;