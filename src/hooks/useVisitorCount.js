import { useState, useEffect, useRef } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { sendVisitNotification } from "../lib/notifications";

const SESSION_KEY = "portfolio_session_counted";
const RECORD_ID = 1;

export function useVisitorCount() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    async function fetchOrIncrementCount() {
      // Always trigger visit notification once per session regardless of Supabase state
      sendVisitNotification();

      if (!isSupabaseConfigured || !supabase) {
        console.warn(
          "Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) not set."
        );
        setLoading(false);
        setError("Supabase env vars missing");
        return;
      }

      try {
        const isSessionCounted =
          sessionStorage.getItem(SESSION_KEY) === "true";

        if (!isSessionCounted) {
          // 1. Try atomic RPC function if created in Supabase
          const { data: rpcData, error: rpcError } = await supabase.rpc(
            "increment_visitor_count"
          );

          if (!rpcError && (typeof rpcData === "number" || typeof rpcData === "string")) {
            sessionStorage.setItem(SESSION_KEY, "true");
            setCount(Number(rpcData));
            setLoading(false);
            return;
          }

          // 2. Direct fallback using existing "visitors" table & "count" column
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
            .upsert(
              {
                id: RECORD_ID,
                count: nextVal,
              },
              { onConflict: "id" }
            );

          if (!upsertErr) {
            sessionStorage.setItem(SESSION_KEY, "true");
            setCount(nextVal);
          } else {
            // Fallback: try update if upsert isn't permitted
            const { error: updateErr } = await supabase
              .from("visitors")
              .update({ count: nextVal })
              .eq("id", RECORD_ID);

            if (!updateErr) {
              sessionStorage.setItem(SESSION_KEY, "true");
              setCount(nextVal);
            } else {
              console.warn("Visitor count update notice:", updateErr.message);
              setCount(currentVal || null);
            }
          }
        } else {
          // Session already counted: Read current count from "visitors" table
          const { data: selectData, error: selectErr } = await supabase
            .from("visitors")
            .select("count")
            .eq("id", RECORD_ID)
            .maybeSingle();

          if (!selectErr && selectData && selectData.count !== undefined) {
            setCount(Number(selectData.count));
          } else {
            console.warn("Visitor count fetch notice:", selectErr?.message);
          }
        }
      } catch (err) {
        console.warn("Visitor counter notice:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrIncrementCount();
  }, []);

  return { count, loading, error };
}

