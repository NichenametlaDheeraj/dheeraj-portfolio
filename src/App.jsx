import "./index.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Education from "./components/Education/Education";
import Achievements from "./components/Achievements/Achievements";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      {/* Animated Background */}
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Cursor Glow */}
      <div className="cursor-glow"></div>

      {/* Scroll Progress */}
      <div id="progressBar"></div>

      {/* Website */}
      <Navbar />

      <main>

        <Hero />

        <About />

        <Skills />

        <Projects />

        <Education />

        <Achievements />

        <Contact />

      </main>

      <Footer />

    </>
  );
}

export default App;