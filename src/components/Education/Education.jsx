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
    place: "Government Degree College (Autonomous), Anantapuramu",
    description:
      "Studying Computer Science fundamentals, Object-Oriented Programming, Database Systems, Web Development, and Data Structures.",
  },

  {
    icon: <FaLaptopCode />,
    year: "Dec 2024 - Jul 2025",
    title: "Python Full Stack Development",
    place: "Course & Practical Implementation",
    description:
      "Completed comprehensive training building full-stack web applications with Python, Django, REST APIs, React, MySQL, Git, and GitHub.",
  },

  {
    icon: <FaGraduationCap />,
    year: "2021 - 2023",
    title: "Intermediate (Higher Secondary)",
    place: "Nalanda Junior College, Vijayawada",
    description:
      "Completed Higher Secondary Education focusing on Mathematics, Physics, and Chemistry (MPC).",
  },

  {
    icon: <FaGraduationCap />,
    year: "2020 - 2021",
    title: "Secondary School Certificate (SSC / 10th)",
    place: "Nava Bharath English Medium School",
    description:
      "Completed Secondary School Education with a strong foundation in Science and Mathematics.",
  },

  {
    icon: <FaBrain />,
    year: "Currently Learning",
    title: "Machine Learning & Generative AI",
    place: "Self Learning & Online Courses",
    description:
      "Learning Machine Learning algorithms, Data Analysis (Pandas, NumPy), Generative AI tools, and advanced backend practices.",
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