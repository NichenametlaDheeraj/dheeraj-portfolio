import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./App.css";

import App from "./App";

import "aos/dist/aos.css";
import AOS from "aos";

import { initGA } from "./analytics";
import Clarity from "@microsoft/clarity";

AOS.init({
  duration: 1000,
  once: true,
});

// Google Analytics
initGA();

// Microsoft Clarity
Clarity.init("xn78o9nnn4");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register PWA Service Worker in production
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("PWA Service Worker active:", reg.scope))
      .catch((err) => console.warn("Service Worker registration notice:", err));
  });
}