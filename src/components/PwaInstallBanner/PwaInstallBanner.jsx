import { useState, useEffect } from "react";
import "./PwaInstallBanner.css";
import { FaTimes } from "react-icons/fa";

const DISMISSAL_KEY = "pwaInstallDismissedUntil";
const INSTALLED_KEY = "pwaInstalled";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

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

      if (isAlreadyInstalled() || isDismissed()) {
        return;
      }

      setDeferredPrompt(e);
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
    <div className="pwa-banner-overlay">
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
