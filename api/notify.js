export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type, page, referrer, userAgent } = req.body || {};

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn("Notification skipped: RESEND_API_KEY or NOTIFICATION_EMAIL not set.");
    return res.status(200).json({
      status: "skipped",
      message: "Notification environment variables not configured in Vercel",
    });
  }

  const isResume = type === "resume_download";
  const subject = isResume ? "Someone Downloaded My Resume" : "New Portfolio Visitor";
  const eventText = isResume ? "Resume downloaded" : "Portfolio opened";

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #06b6d4; margin-top: 0;">${subject}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 140px;">Event:</td>
          <td style="padding: 8px 0;">${eventText}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Date & Time:</td>
          <td style="padding: 8px 0;">${timestamp}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Page URL:</td>
          <td style="padding: 8px 0;">${page || "https://dheeraj-portfolio-xr8g.vercel.app/"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Referrer:</td>
          <td style="padding: 8px 0;">${referrer || "Direct Visit"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Device / Browser:</td>
          <td style="padding: 8px 0; word-break: break-word;">${userAgent || "Unknown"}</td>
        </tr>
      </table>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888; margin: 0;">Portfolio Activity Notification • Nichenametla Dheeraj</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Activity <onboarding@resend.dev>",
        to: [toEmail],
        subject: subject,
        html: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      return res.status(500).json({ error: "Email delivery failed", details: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Notification handler error:", err);
    return res.status(500).json({ error: "Internal server error", message: err.message });
  }
}
