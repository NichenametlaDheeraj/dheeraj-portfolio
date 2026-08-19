import { useState, useEffect, useRef } from "react";
import "./PwaInstallBanner.css";
import { FaTimes, FaMobileAlt } from "react-icons/fa";

const DISMISSAL_KEY = "pwa_banner_dismissed_session";
const INSTALLED_KEY = "pwaInstalled";

function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const isNavigatingRef = useRef(false);
  const isScrollActiveRef = useRef(false);

  useEffect(() => {
    // Clear legacy 7-day dismissal locks from testing so banner shows on all devices
    localStorage.removeItem("pwaInstallDismissedUntil");
    localStorage.removeItem("pwa_banner_dismissed");

    const isAlreadyInstalled = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        Boolean(window.navigator.standalone) ||
        document.referrer.includes("android-app://") ||
        localStorage.getItem(INSTALLED_KEY) === "true"
      );
    };

    const isDismissed = () => {
      return sessionStorage.getItem(DISMISSAL_KEY) === "true";
    };

    if (isAlreadyInstalled() || isDismissed()) {
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => {
        if (!isAlreadyInstalled() && !isDismissed()) {
          setShowBanner(true);
        }
      }, 2200);
    };

    const handleAppInstalled = () => {
      localStorage.setItem(INSTALLED_KEY, "true");
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Fallback timer: ensure banner appears on ALL devices (Laptop, PC, Tablet, Mobile)
    const fallbackTimer = setTimeout(() => {
      if (!isAlreadyInstalled() && !isDismissed()) {
        setShowBanner(true);
      }
    }, 2500);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Listen for navigation / scroll events to slide up and hide banner
  useEffect(() => {
    if (!showBanner) return;

    isScrollActiveRef.current = false;
    const initialScrollY = window.scrollY;

    const graceTimer = setTimeout(() => {
      isScrollActiveRef.current = true;
    }, 1000);

    const handleNavigation = () => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      setIsSlidingUp(true);
      setTimeout(() => {
        setShowBanner(false);
        setIsSlidingUp(false);
        isNavigatingRef.current = false;
      }, 400);
    };

    const handleScroll = () => {
      if (!isScrollActiveRef.current) return;
      if (window.scrollY > initialScrollY + 80) {
        handleNavigation();
      }
    };

    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (target) {
        const href = target.getAttribute("href");
        if (href && (href.startsWith("#") || href.includes("#"))) {
          handleNavigation();
        }
      }
    };

    window.addEventListener("hashchange", handleNavigation);
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      clearTimeout(graceTimer);
      window.removeEventListener("hashchange", handleNavigation);
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [showBanner]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        localStorage.setItem(INSTALLED_KEY, "true");
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowGuideModal(true);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISSAL_KEY, "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className={`pwa-banner-overlay ${isSlidingUp ? "slide-up" : ""}`}>
        <div className="pwa-banner-card glass">
          <div className="pwa-banner-left">
            <div className="pwa-icon-box">
              <img src="/icons/icon-192.png" alt="Dheeraj Portfolio Icon" />
            </div>
            <div className="pwa-banner-info">
              <h4 className="pwa-title">Install Dheeraj Portfolio</h4>
              <span className="pwa-subtitle">dheeraj-portfolio-xr8g.vercel.app</span>
            </div>
          </div>

          <div className="pwa-banner-actions">
            <button className="pwa-install-btn" onClick={handleInstallClick}>
              Install
            </button>

            <button className="pwa-close-btn" onClick={handleDismiss} aria-label="Dismiss banner">
              <FaTimes />
            </button>
          </div>
        </div>
      </div>

      {showGuideModal && (
        <div className="pwa-guide-modal-overlay" onClick={() => setShowGuideModal(false)}>
          <div className="pwa-guide-modal glass" onClick={(e) => e.stopPropagation()}>
            <div className="pwa-guide-header">
              <div className="pwa-guide-title-box">
                <FaMobileAlt className="pwa-guide-icon" />
                <h3>Install Portfolio App</h3>
              </div>
              <button className="pwa-close-btn" onClick={() => setShowGuideModal(false)}>
                <FaTimes />
              </button>
            </div>
            <p className="pwa-guide-desc">
              To install <strong>Dheeraj Portfolio</strong> on your device:
            </p>
            <ol className="pwa-guide-steps">
              <li>Open your browser menu (<strong>⋮</strong> or <strong>Share icon</strong>).</li>
              <li>Select <strong>"Install app"</strong> or <strong>"Add to Home Screen / Desktop"</strong>.</li>
              <li>Click <strong>Install</strong> to add it to your device!</li>
            </ol>
            <button className="pwa-guide-ok-btn" onClick={() => setShowGuideModal(false)}>
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PwaInstallBanner;
