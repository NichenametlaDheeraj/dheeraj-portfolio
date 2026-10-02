import React from "react";
import "./PageHeader.css";

export default function PageHeader({ badge, title, subtitle }) {
  return (
    <div className="page-header">
      {badge && <span className="header-badge">{badge}</span>}
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      <div className="header-divider"></div>
    </div>
  );
}
