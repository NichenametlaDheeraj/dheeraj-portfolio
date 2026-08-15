import { useState, useEffect, useRef } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { sendVisitNotification } from "../lib/notifications";

const SESSION_KEY = "portfolio_session_counted";
const CACHE_KEY = "portfolio_visitor_count_cache";
const RECORD_ID = 1;
const FALLBACK_HITS_URL = "https://hits.sh/dheeraj-portfolio-xr8g.vercel.app.svg";

export function useVisitorCount() {
  const [count, setCount] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? parseInt(cached, 10) : null;
  });
  const [loading, setLoading] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    return !cached;
  });
  const [error, setError] = useState(null);
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    async function fetchOrIncrementCount() {
      // Trigger email notification once per session
      sendVisitNotification();

      const isSessionCounted = sessionStorage.getItem(SESSION_KEY) === "true";

      // 1. Primary: Try Supabase if env vars are present
      if (isSupabaseConfigured && supabase) {
        try {
          if (!isSessionCounted) {
            // Try RPC increment function
            const { data: rpcData, error: rpcError } = await supabase.rpc(
              "increment_visitor_count"
            );

            if (!rpcError && (typeof rpcData === "number" || typeof rpcData === "string")) {
              const val = Number(rpcData);
              sessionStorage.setItem(SESSION_KEY, "true");
              localStorage.setItem(CACHE_KEY, val.toString());
              setCount(val);
              setLoading(false);
              return;
            }

            // Fallback: Direct select & upsert on "visitors" table
            const { data: selectData, error: selectError } = await supabase
              .from("visitors")
              .select("count")
              .eq("id", RECORD_ID)
              .maybeSingle();

            let currentVal = 0;
            if (!selectError && selectData && selectData.count !== undefined) {
              currentVal = Number(selectData.count);
            }

            const nextVal = currentVal + 1;

            const { error: upsertErr } = await supabase
              .from("visitors")
              .upsert({ id: RECORD_ID, count: nextVal }, { onConflict: "id" });

            if (!upsertErr) {
              sessionStorage.setItem(SESSION_KEY, "true");
              localStorage.setItem(CACHE_KEY, nextVal.toString());
              setCount(nextVal);
              setLoading(false);
              return;
            }

            const { error: updateErr } = await supabase
              .from("visitors")
              .update({ count: nextVal })
              .eq("id", RECORD_ID);

            if (!updateErr) {
              sessionStorage.setItem(SESSION_KEY, "true");
              localStorage.setItem(CACHE_KEY, nextVal.toString());
              setCount(nextVal);
              setLoading(false);
              return;
            }
          } else {
            // Read current count from Supabase
            const { data: selectData, error: selectErr } = await supabase
              .from("visitors")
              .select("count")
              .eq("id", RECORD_ID)
              .maybeSingle();

            if (!selectErr && selectData && selectData.count !== undefined) {
              const val = Number(selectData.count);
              localStorage.setItem(CACHE_KEY, val.toString());
              setCount(val);
              setLoading(false);
              return;
            }
          }
        } catch (sbErr) {
          console.warn("Supabase fetch notice:", sbErr.message);
        }
      }

      // 2. Secondary: Edge hit counter service (works automatically without requiring env vars)
      try {
        const res = await fetch(FALLBACK_HITS_URL);
        if (res.ok) {
          const svgText = await res.text();
          const match = svgText.match(/hits:\s*(\d+)/i);
          if (match && match[1]) {
            const hitsVal = parseInt(match[1], 10);
            sessionStorage.setItem(SESSION_KEY, "true");
            localStorage.setItem(CACHE_KEY, hitsVal.toString());
            setCount(hitsVal);
            setLoading(false);
            return;
          }
        }
      } catch (hitsErr) {
        console.warn("Hits counter service notice:", hitsErr.message);
      }

      // 3. Final Fallback: Cached value or default 1
      const cached = localStorage.getItem(CACHE_KEY);
      const fallbackVal = cached ? parseInt(cached, 10) : 1;
      setCount(fallbackVal);
      setLoading(false);
    }

    fetchOrIncrementCount();
  }, []);

  return { count, loading, error };
}

