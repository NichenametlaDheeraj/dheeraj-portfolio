import { useEffect, useState } from "react";
import "./VisitorCounter.css";

function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.countapi.xyz/hit/dheeraj-portfolio/visitors"
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data.value);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="visitor-counter glass">
      👁️ Visitors :
      <span>{count ? count : "..."}</span>
    </div>
  );
}

export default VisitorCounter;