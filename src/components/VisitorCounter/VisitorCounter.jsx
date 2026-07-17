import { useEffect, useState } from "react";
import "./VisitorCounter.css";
import { supabase } from "../../supabase";

function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleVisitor = async () => {
      // Get current visitor count
      const { data, error } = await supabase
        .from("visitors")
        .select("count")
        .eq("id", 1)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      let currentCount = data.count ?? 0;

      // Check if this browser has already visited
      const hasVisited = localStorage.getItem("portfolio_visited");

      if (!hasVisited) {
        currentCount++;

        // Update count in Supabase
        const { error: updateError } = await supabase
          .from("visitors")
          .update({ count: currentCount })
          .eq("id", 1);

        if (updateError) {
          console.error(updateError);
          return;
        }

        // Save browser flag
        localStorage.setItem("portfolio_visited", "true");
      }

      setCount(currentCount);
    };

    handleVisitor();
  }, []);

  return (
    <div className="visitor-counter glass">
      👁️ Visitors : <span>{count}</span>
    </div>
  );
}

export default VisitorCounter;