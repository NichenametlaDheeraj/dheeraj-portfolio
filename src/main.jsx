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