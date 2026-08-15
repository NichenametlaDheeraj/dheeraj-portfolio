import React from "react";
import "./VisitorCounter.css";
import { useVisitorCount } from "../../hooks/useVisitorCount";

function VisitorCounter() {
  const { count, loading } = useVisitorCount();

  return (
    <div className="visitor-counter glass">
      👁️ Visitors : <span>{loading ? "..." : count !== null ? count : "--"}</span>
    </div>
  );
}

export default VisitorCounter;