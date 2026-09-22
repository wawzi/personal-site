import { createClient } from "@/lib/supabase/server";
import type { DiaryEntry, Note } from "@/lib/types";

/**
 * Reads for the private wing.
 *
 * No `user_id` filter appears in these queries on purpose — Row Level
 * Security scopes every row to the signed-in user at the database.
 * Filtering here too would only hide a missing policy.
 */

export async function listNotes(): Promise<Note[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("pinned", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error) throw new Error(`Could not load notes: ${error.message}`);
  return data ?? [];
}

export async function listDiaryEntries(): Promise<DiaryEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("diary_entries")
    .select("*")
    .order("entry_at", { ascending: false });

  if (error) throw new Error(`Could not load the diary: ${error.message}`);
  return data ?? [];
}

export async function deskCounts(): Promise<{ notes: number; diary: number }> {
  const supabase = await createClient();

  const [notes, diary] = await Promise.all([
    supabase.from("notes").select("*", { count: "exact", head: true }),
    supabase.from("diary_entries").select("*", { count: "exact", head: true }),
  ]);

  return { notes: notes.count ?? 0, diary: diary.count ?? 0 };
}
