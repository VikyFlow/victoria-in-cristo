import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabaseTypes";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] Manca VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. " +
      "Tutte le operazioni che richiedono DB restituiranno fallback locali."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});