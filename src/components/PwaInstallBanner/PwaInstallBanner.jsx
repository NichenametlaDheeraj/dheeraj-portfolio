import { useState, useEffect, useRef } from "react";
import "./PwaInstallBanner.css";
import { FaTimes } from "react-icons/fa";

const DISMISSAL_KEY = "pwaInstallDismissedUntil";
const INSTALLED_KEY = "pwaInstalled";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const isNavigatingRef = useRef(false);

  const isMobileDevice = () => {
    const userAgentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(
      navigator.userAgent
    );
    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    return userAgentCheck || isMobileViewport;
  };

  useEffect(() => {
    const isAlreadyInstalled = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        Boolean(window.navigator.standalone) ||
        document.referrer.includes("android-app://") ||
        localStorage.getItem(INSTALLED_KEY) === "true"
      );
    };

    const isDismissed = () => {
      const dismissedUntil = localStorage.getItem(DISMISSAL_KEY);
      if (!dismissedUntil) return false;
      const dismissedTime = Number(dismissedUntil);
      if (isNaN(dismissedTime)) return false;
      return Date.now() < dismissedTime;
    };

    if (isAlreadyInstalled()) {
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Only display the custom banner on supported mobile devices
      if (!isMobileDevice() || isAlreadyInstalled() || isDismissed()) {
        return;
      }

      setShowBanner(true);
    };

    const handleAppInstalled = () => {
      localStorage.setItem(INSTALLED_KEY, "true");
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (!showBanner) return;

    const initialScrollY = window.scrollY;

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
      // Hide banner only if user scrolls down past initial position by more than 60px
      if (window.scrollY > initialScrollY + 60 || window.scrollY > 120) {
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
      window.removeEventListener("hashchange", handleNavigation);
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [showBanner]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(INSTALLED_KEY, "true");
    }
    setShowBanner(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    const dismissedUntil = Date.now() + SEVEN_DAYS_MS;
    localStorage.setItem(DISMISSAL_KEY, dismissedUntil.toString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
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
  );
}

export default PwaInstallBanner;
