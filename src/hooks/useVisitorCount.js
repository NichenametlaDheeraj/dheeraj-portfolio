import { useState, useEffect, useRef } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { sendVisitNotification } from "../lib/notifications";

const SESSION_KEY = "portfolio_session_counted";
const CACHE_KEY = "portfolio_visitor_count_cache";
const RECORD_ID = 1;
const BASE_OFFSET = 48;

/**
 * Robustly extracts a numeric value from any Supabase response shape (number, string, object, array)
 */
function extractNumberFromData(data) {
  if (data === null || data === undefined) return null;
  if (typeof data === "number" && !isNaN(data)) return data;
  if (typeof data === "string") {
    const p = parseInt(data, 10);
    if (!isNaN(p)) return p;
  }
  if (Array.isArray(data) && data.length > 0) {
    return extractNumberFromData(data[0]);
  }
  if (typeof data === "object") {
    if ("visit_count" in data) return extractNumberFromData(data.visit_count);
    if ("count" in data) return extractNumberFromData(data.count);
    if ("increment_visitor_count" in data) return extractNumberFromData(data.increment_visitor_count);
    for (const val of Object.values(data)) {
      const num = extractNumberFromData(val);
      if (num !== null) return num;
    }
  }
  return null;
}

/**
 * Normalizes raw count value to ensure baseline count (49) is maintained
 */
function formatVisitorCount(rawVal) {
  const num = extractNumberFromData(rawVal);
  if (num === null || isNaN(num) || num <= 0) return 49;
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

    console.log("[VisitorCounter] Hook initialized");

    async function fetchOrIncrementCount() {
      // Trigger email notification once per session
      sendVisitNotification();

      const isSessionCounted = sessionStorage.getItem(SESSION_KEY) === "true";
      console.log("[VisitorCounter] Session counted:", isSessionCounted);
      console.log("[VisitorCounter] Supabase configured:", isSupabaseConfigured);

      // Primary: Use Supabase if configured
      if (isSupabaseConfigured && supabase) {
        try {
          if (!isSessionCounted) {
            console.log("[VisitorCounter] Starting visitor increment...");
            console.log("[VisitorCounter] Calling Supabase RPC: increment_visitor_count");

            // Atomically increment via Supabase RPC
            const { data: rpcData, error: rpcError } = await supabase.rpc(
              "increment_visitor_count"
            );

            console.log("[VisitorCounter] RPC raw response:", rpcData);
            if (rpcError) {
              console.error("[VisitorCounter] RPC error:", rpcError);
            }

            const parsedRpcCount = extractNumberFromData(rpcData);

            if (!rpcError && parsedRpcCount !== null) {
              const newCount = formatVisitorCount(parsedRpcCount);
              console.log("[VisitorCounter] Successfully incremented. New count:", newCount);

              // Mark session ONLY AFTER successful RPC execution
              sessionStorage.setItem(SESSION_KEY, "true");
              localStorage.setItem(CACHE_KEY, newCount.toString());
              setCount(newCount);
              setLoading(false);
              return;
            }
          }

          // If session is already counted OR if RPC failed, fetch current count without mutating
          console.log("[VisitorCounter] Fetching current visitor count from database...");
          let fetchedCount = null;

          // 1. Query 'visitor_stats' table
          const { data: statsData, error: statsError } = await supabase
            .from("visitor_stats")
            .select("visit_count")
            .eq("id", RECORD_ID)
            .maybeSingle();

          console.log("[VisitorCounter] visitor_stats select result:", statsData, "error:", statsError);

          if (!statsError && statsData) {
            fetchedCount = formatVisitorCount(statsData.visit_count);
          } else {
            // 2. Secondary fallback: Query 'visitors' table
            const { data: visitorsData, error: visitorsError } = await supabase
              .from("visitors")
              .select("count")
              .eq("id", RECORD_ID)
              .maybeSingle();

            console.log("[VisitorCounter] visitors select result:", visitorsData, "error:", visitorsError);

            if (!visitorsError && visitorsData) {
              fetchedCount = formatVisitorCount(visitorsData.count);
            }
          }

          if (fetchedCount !== null) {
            console.log("[VisitorCounter] Displaying fetched count:", fetchedCount);
            localStorage.setItem(CACHE_KEY, fetchedCount.toString());
            setCount(fetchedCount);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error("[VisitorCounter] Supabase fetch error:", err);
          setError(err);
        }
      } else {
        console.warn("[VisitorCounter] Supabase environment variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are missing or invalid!");
      }

      // Fallback if Supabase is unconfigured or unavailable
      const cached = localStorage.getItem(CACHE_KEY);
      const fallbackVal = cached ? formatVisitorCount(parseInt(cached, 10)) : 49;
      console.log("[VisitorCounter] Using fallback count:", fallbackVal);
      setCount(fallbackVal);
      setLoading(false);
    }

    fetchOrIncrementCount();
  }, []);

  return { count, loading, error };
}
