import { useState, useEffect } from "react";
import "./PwaInstallBanner.css";
import { FaDownload, FaTimes, FaMobileAlt } from "react-icons/fa";

function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed app)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://");

    if (isStandalone) {
      return;
    }

    // Check if dismissed during current session
    const isDismissed = sessionStorage.getItem("pwa_banner_dismissed") === "true";
    if (isDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setShowBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    // Mobile fallback timer: Ensure mobile users always see the banner
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    let mobileTimer;
    if (isMobile) {
      mobileTimer = setTimeout(() => {
        setShowBanner(true);
      }, 1200);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      // Mobile guide fallback
      setShowGuideModal(true);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem("pwa_banner_dismissed", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
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
              To install <strong>Dheeraj Portfolio</strong> on your phone:
            </p>
            <ol className="pwa-guide-steps">
              <li>Tap the <strong>3 dots menu</strong> (⋮) in your browser top right corner.</li>
              <li>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
              <li>Tap <strong>Install</strong> to add it to your home screen!</li>
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
