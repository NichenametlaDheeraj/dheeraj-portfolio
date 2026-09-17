import { useState, useEffect, useRef } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { sendVisitNotification } from "../lib/notifications";

const SESSION_KEY = "portfolio_session_counted";
const CACHE_KEY = "portfolio_visitor_count_cache";
const RECORD_ID = 1;
const BASE_OFFSET = 48;

/**
 * Normalizes raw count value to ensure baseline count (49) is maintained
 */
function formatVisitorCount(rawVal) {
  const num = Number(rawVal);
  if (isNaN(num) || num <= 0) return 49;
  return num >= 49 ? num : BASE_OFFSET + num;
}

export function useVisitorCount() {
  const [count, setCount] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = parseInt(cached, 10);
      if (!isNaN(parsed) && parsed > 0) {
        return formatVisitorCount(parsed);
      }
    }
    return 49;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    async function fetchOrIncrementCount() {
      // Trigger email notification once per session
      sendVisitNotification();

      const isSessionCounted = sessionStorage.getItem(SESSION_KEY) === "true";

      // Primary: Use Supabase if configured
      if (isSupabaseConfigured && supabase) {
        try {
          if (!isSessionCounted) {
            // Atomically increment via Supabase RPC
            const { data: rpcData, error: rpcError } = await supabase.rpc(
              "increment_visitor_count"
            );

            if (!rpcError && (typeof rpcData === "number" || typeof rpcData === "string")) {
              const newCount = formatVisitorCount(rpcData);
              // Mark session ONLY AFTER successful RPC execution
              sessionStorage.setItem(SESSION_KEY, "true");
              localStorage.setItem(CACHE_KEY, newCount.toString());
              setCount(newCount);
              setLoading(false);
              return;
            }

            if (rpcError) {
              console.warn("Supabase RPC increment_visitor_count error:", rpcError.message || rpcError);
            }
          }

          // If session is already counted OR if RPC failed, fetch current count without mutating
          let fetchedCount = null;

          // 1. Try querying 'visitor_stats' table
          const { data: statsData, error: statsError } = await supabase
            .from("visitor_stats")
            .select("visit_count")
            .eq("id", RECORD_ID)
            .maybeSingle();

          if (!statsError && statsData && statsData.visit_count !== undefined) {
            fetchedCount = formatVisitorCount(statsData.visit_count);
          } else {
            // 2. Secondary fallback: Try querying 'visitors' table
            const { data: visitorsData, error: visitorsError } = await supabase
              .from("visitors")
              .select("count")
              .eq("id", RECORD_ID)
              .maybeSingle();

            if (!visitorsError && visitorsData && visitorsData.count !== undefined) {
              fetchedCount = formatVisitorCount(visitorsData.count);
            }
          }

          if (fetchedCount !== null) {
            localStorage.setItem(CACHE_KEY, fetchedCount.toString());
            setCount(fetchedCount);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Visitor counter Supabase fetch error:", err.message || err);
          setError(err);
        }
      }

      // Fallback if Supabase is unconfigured or unavailable
      const cached = localStorage.getItem(CACHE_KEY);
      const fallbackVal = cached ? formatVisitorCount(parseInt(cached, 10)) : 49;
      setCount(fallbackVal);
      setLoading(false);
    }

    fetchOrIncrementCount();
  }, []);

  return { count, loading, error };
}
