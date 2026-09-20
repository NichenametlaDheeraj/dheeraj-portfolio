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
import PwaInstallBanner from "./components/PwaInstallBanner/PwaInstallBanner";
import { sendVisitNotification } from "./lib/notifications";

function App() {
  const [loading, setLoading] = useState(true);

  // Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Google Analytics & Visit Notifications
  useEffect(() => {
    logPageView();
    sendVisitNotification();
  }, []);

  return (
    <>
      {/* Animated Background */}
      <Background />

      {/* Loading Screen */}
      {loading && <Loader />}

      {/* Portfolio Sections */}
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />

      {/* In-Website PWA Install Notification Bar */}
      <PwaInstallBanner />
    </>
  );
}

export default App;