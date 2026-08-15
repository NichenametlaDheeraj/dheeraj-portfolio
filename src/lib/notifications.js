const VISIT_NOTIFIED_KEY = "portfolio_visit_notified";
const RESUME_NOTIFIED_KEY = "portfolio_resume_notified";

/**
 * Sends a portfolio visit notification to the serverless function (Max 1 per browser session)
 */
export function sendVisitNotification() {
  try {
    if (sessionStorage.getItem(VISIT_NOTIFIED_KEY) === "true") {
      return;
    }

    sessionStorage.setItem(VISIT_NOTIFIED_KEY, "true");

    const payload = {
      type: "visit",
      page: window.location.href,
      referrer: document.referrer || "Direct Visit",
      userAgent: navigator.userAgent,
    };

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.warn("Visit notification warning:", err));
  } catch (err) {
    console.warn("Visit notification error:", err);
  }
}

/**
 * Sends a resume download notification to the serverless function (Max 1 per browser session)
 */
export function sendResumeDownloadNotification() {
  try {
    if (sessionStorage.getItem(RESUME_NOTIFIED_KEY) === "true") {
      return;
    }

    sessionStorage.setItem(RESUME_NOTIFIED_KEY, "true");

    const payload = {
      type: "resume_download",
      page: window.location.href,
      referrer: document.referrer || "Direct Visit",
      userAgent: navigator.userAgent,
    };

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.warn("Resume notification warning:", err));
  } catch (err) {
    console.warn("Resume notification error:", err);
  }
}
