import { useState, useEffect } from "react";
import "./PwaInstallBanner.css";
import { FaDownload, FaTimes } from "react-icons/fa";

function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode (installed)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      return;
    }

    // Check if user dismissed the banner during this session
    const isDismissed = sessionStorage.getItem("pwa_banner_dismissed") === "true";
    if (isDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent automatic mini-infobar on mobile
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Also check after app is installed to hide banner
    const handleAppInstalled = () => {
      setShowBanner(false);
      setDeferredPrompt(null);
    };

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
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    sessionStorage.setItem("pwa_banner_dismissed", "true");
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
            <h4>Install Dheeraj Portfolio</h4>
            <p>Add to home screen for faster 1-tap offline access</p>
          </div>
        </div>

        <div className="pwa-banner-actions">
          <button className="pwa-install-btn" onClick={handleInstallClick}>
            <FaDownload className="btn-icon" />
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
