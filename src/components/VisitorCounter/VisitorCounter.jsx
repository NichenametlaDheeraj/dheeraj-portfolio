import React, { useEffect } from "react";
import "./VisitorCounter.css";
import { useVisitorCount } from "../../hooks/useVisitorCount";

function VisitorCounter() {
  const { count, loading } = useVisitorCount();

  useEffect(() => {
    console.log("[VisitorCounter] Component loaded. Current display count:", count, "loading:", loading);
  }, [count, loading]);

  return (
    <div className="visitor-counter glass">
      👁️ Visitors : <span>{loading ? "..." : count !== null && !isNaN(count) ? count : 49}</span>
    </div>
  );
}

export default VisitorCounter;