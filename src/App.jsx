import { useEffect, useState } from "react";
import { logPageView } from "./analytics";

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

  // Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Google Analytics - Track Page Visit
  useEffect(() => {
    logPageView();
  }, []);

  return (
    <>
      {/* Animated Background */}
      <Background />

      {/* Loading Screen */}
      {loading && <Loader />}

      {/* Portfolio Sections */}
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