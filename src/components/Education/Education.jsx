import "./Education.css";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaBrain,
} from "react-icons/fa";

const education = [
  {
    icon: <FaGraduationCap />,
    year: "2023 - 2026",
    title: "Bachelor of Science (Computer Science)",
    place: "Government Degree College (A), Anantapur",
    description:
      "Learning Computer Science fundamentals, programming, databases, web technologies, and software development.",
  },

  {
    icon: <FaLaptopCode />,
    year: "2025 - Present",
    title: "Python Full Stack Development",
    place: "Self Learning",
    description:
      "Building projects with Python, Django, REST APIs, React, MySQL, Git, and GitHub.",
  },

  {
    icon: <FaBrain />,
    year: "Currently Learning",
    title: "Machine Learning & Generative AI",
    place: "Online Courses",
    description:
      "Learning Machine Learning concepts, AI tools, and modern backend development practices.",
  },
];

function Education() {
  return (
    <section id="education" className="education" data-aos="fade-left">

      <div className="container">

        <h2 className="section-title">
          Education & Learning
        </h2>

        <div className="timeline">

          {education.map((item, index) => (

            <div className="timeline-item" key={index}>

              <div className="timeline-icon">
                {item.icon}
              </div>

              <div className="timeline-content glass">

                <span>{item.year}</span>

                <h3>{item.title}</h3>

                <h4>{item.place}</h4>

                <p>{item.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Education;