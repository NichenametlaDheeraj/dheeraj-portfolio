import { useEffect, useState } from "react";

import Loader from "./components/Loader/Loader";
import Background from "./components/Background/Background";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Animated Background */}
      <Background />

      {/* Loader Overlay */}
      {loading && <Loader />}

      {/* Portfolio */}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}

export default App;