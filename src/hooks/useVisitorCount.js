import { useState, useEffect, useRef } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { sendVisitNotification } from "../lib/notifications";

const SESSION_KEY = "portfolio_session_counted";
const CACHE_KEY = "portfolio_visitor_count_cache";
const RECORD_ID = 1;
const BASE_OFFSET = 48; // Baseline offset so existing 49 views are preserved
const FALLBACK_HITS_URL = "https://hits.sh/dheeraj-portfolio-xr8g.vercel.app.svg";

function formatVisitorCount(rawVal) {
  const num = Number(rawVal) || 0;
  return num >= 49 ? num : BASE_OFFSET + num;
}

export function useVisitorCount() {
  const [count, setCount] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? formatVisitorCount(parseInt(cached, 10)) : 49;
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
            const { data: rpcData, error: rpcError } = await supabase.rpc(
              "increment_visitor_count"
            );

            if (!rpcError && (typeof rpcData === "number" || typeof rpcData === "string")) {
              const formatted = formatVisitorCount(rpcData);
              sessionStorage.setItem(SESSION_KEY, "true");
              localStorage.setItem(CACHE_KEY, formatted.toString());
              setCount(formatted);
              setLoading(false);
              return;
            }

            const { data: selectData, error: selectError } = await supabase
              .from("visitors")
              .select("count")
              .eq("id", RECORD_ID)
              .maybeSingle();

            let currentVal = 48;
            if (!selectError && selectData && selectData.count !== undefined) {
              currentVal = Number(selectData.count);
            }

            const nextVal = currentVal + 1;

            const { error: upsertErr } = await supabase
              .from("visitors")
              .upsert({ id: RECORD_ID, count: nextVal }, { onConflict: "id" });

            if (!upsertErr) {
              const formatted = formatVisitorCount(nextVal);
              sessionStorage.setItem(SESSION_KEY, "true");
              localStorage.setItem(CACHE_KEY, formatted.toString());
              setCount(formatted);
              setLoading(false);
              return;
            }

            const { error: updateErr } = await supabase
              .from("visitors")
              .update({ count: nextVal })
              .eq("id", RECORD_ID);

            if (!updateErr) {
              const formatted = formatVisitorCount(nextVal);
              sessionStorage.setItem(SESSION_KEY, "true");
              localStorage.setItem(CACHE_KEY, formatted.toString());
              setCount(formatted);
              setLoading(false);
              return;
            }
          } else {
            const { data: selectData, error: selectErr } = await supabase
              .from("visitors")
              .select("count")
              .eq("id", RECORD_ID)
              .maybeSingle();

            if (!selectErr && selectData && selectData.count !== undefined) {
              const formatted = formatVisitorCount(selectData.count);
              localStorage.setItem(CACHE_KEY, formatted.toString());
              setCount(formatted);
              setLoading(false);
              return;
            }
          }
        } catch (sbErr) {
          console.warn("Supabase fetch notice:", sbErr.message);
        }
      }

      // 2. Secondary: Edge hit counter service
      try {
        const res = await fetch(FALLBACK_HITS_URL);
        if (res.ok) {
          const svgText = await res.text();
          const match = svgText.match(/hits:\s*(\d+)/i);
          if (match && match[1]) {
            const rawVal = parseInt(match[1], 10);
            const formatted = formatVisitorCount(rawVal);
            sessionStorage.setItem(SESSION_KEY, "true");
            localStorage.setItem(CACHE_KEY, formatted.toString());
            setCount(formatted);
            setLoading(false);
            return;
          }
        }
      } catch (hitsErr) {
        console.warn("Hits counter service notice:", hitsErr.message);
      }

      // 3. Final Fallback: Cached value or default 49
      const cached = localStorage.getItem(CACHE_KEY);
      const fallbackVal = cached ? formatVisitorCount(parseInt(cached, 10)) : 49;
      setCount(fallbackVal);
      setLoading(false);
    }

    fetchOrIncrementCount();
  }, []);

  return { count, loading, error };
}

