import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { logPageView } from "./analytics";

import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader/Loader";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PwaInstallBanner from "./components/PwaInstallBanner/PwaInstallBanner";
import PageTransition from "./components/PageTransition/PageTransition";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import { sendVisitNotification } from "./lib/notifications";

import Home from "./pages/Home/Home";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Education from "./pages/Education/Education";
import Achievements from "./pages/Achievements/Achievements";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Initial Loader screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Track page views and visit notifications on location change
  useEffect(() => {
    logPageView();
    sendVisitNotification();
  }, [location.pathname]);

  return (
    <>
      <ProgressBar />
      <ScrollToTop />

      {/* Ambient background */}
      <Background />

      {/* Initial loading screen */}
      {loading && <Loader />}

      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Content Router with Smooth Page Transitions */}
      <main id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/experience" element={<Navigate to="/" replace />} />
            <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/projects/:projectId" element={<PageTransition><ProjectDetails /></PageTransition>} />
            <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
            <Route path="/achievements" element={<PageTransition><Achievements /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Shared Footer across all routes */}
      <Footer />

      {/* PWA Install Notification Banner */}
      <PwaInstallBanner />
    </>
  );
}

export default App;