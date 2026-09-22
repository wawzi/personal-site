import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_KEY, SUPABASE_URL } from "./env";

/** Browser-side client, for use inside "use client" components. */
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
}
