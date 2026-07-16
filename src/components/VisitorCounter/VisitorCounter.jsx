import { useEffect, useState } from "react";
import "./VisitorCounter.css";
import { supabase } from "../../supabase";

function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateVisitor = async () => {
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

      const current = data.count ?? 0;
      const newCount = current + 1;

      // Update visitor count
      const { error: updateError } = await supabase
        .from("visitors")
        .update({ count: newCount })
        .eq("id", 1);

      if (updateError) {
        console.error(updateError);
        return;
      }

      setCount(newCount);
    };

    updateVisitor();
  }, []);

  return (
    <div className="visitor-counter glass">
      👁 Visitors : <span>{count}</span>
    </div>
  );
}

export default VisitorCounter;