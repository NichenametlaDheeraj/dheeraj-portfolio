import "./Footer.css";

import {
  FaGithub,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";

import VisitorCounter from "../VisitorCounter/VisitorCounter";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        {/* Visitor Counter */}
        <VisitorCounter />

        <h2>Dheeraj Nichenametla</h2>

        <p>
          Python Backend Developer | React Learner | AI Enthusiast
        </p>

        <div className="footer-social">

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

        <p className="copyright">
          Made with <FaHeart color="red" /> by Dheeraj Nichenametla
        </p>

      </div>

    </footer>
  );
}

export default Footer;