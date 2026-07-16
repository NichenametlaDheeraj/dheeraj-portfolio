import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./App.css";

import App from "./App";

import "aos/dist/aos.css";
import AOS from "aos";

import { initGA } from "./analytics";

AOS.init({
  duration: 1000,
  once: true,
});

// Initialize Google Analytics only once
initGA();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);