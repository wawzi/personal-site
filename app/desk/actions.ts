"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string; ok?: boolean };

/**
 * Every write needs the user id for the row's `user_id` column. RLS
 * checks it again on the way in, so a mismatch is rejected by the
 * database rather than trusted from here.
 */
async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not signed in.");
  return { supabase, user };
}

function parseTags(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 12);
}

/* ── Notes ──────────────────────────────────────────────── */

export async function createNote(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!title && !body) return { error: "A note needs a title or a body." };

  try {
    const { supabase, user } = await requireUser();
    const { error } = await supabase.from("notes").insert({
      user_id: user.id,
      title,
      body,
      tags: parseTags(formData.get("tags")),
    });
    if (error) return { error: error.message };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Something went wrong." };
  }

  revalidatePath("/desk/notes");
  revalidatePath("/desk");
  return { ok: true };
}

export async function updateNote(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing note id." };

  try {
    const { supabase } = await requireUser();
    const { error } = await supabase
      .from("notes")
      .update({
        title: String(formData.get("title") ?? "").trim(),
        body: String(formData.get("body") ?? "").trim(),
        tags: parseTags(formData.get("tags")),
      })
      .eq("id", id);
    if (error) return { error: error.message };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Something went wrong." };
  }

  revalidatePath("/desk/notes");
  return { ok: true };
}

export async function deleteNote(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase } = await requireUser();
  await supabase.from("notes").delete().eq("id", id);

  revalidatePath("/desk/notes");
  revalidatePath("/desk");
}

export async function toggleNotePin(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const pinned = String(formData.get("pinned") ?? "") === "true";
  if (!id) return;

  const { supabase } = await requireUser();
  await supabase.from("notes").update({ pinned: !pinned }).eq("id", id);

  revalidatePath("/desk/notes");
}

/* ── Diary ──────────────────────────────────────────────── */

export async function createEntry(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return { error: "An entry needs something in it." };

  const rawWhen = String(formData.get("entry_at") ?? "").trim();
  // datetime-local gives no zone; let the browser value stand as local time.
  const entryAt = rawWhen ? new Date(rawWhen) : new Date();
  if (Number.isNaN(entryAt.getTime())) {
    return { error: "That date doesn't look right." };
  }

  try {
    const { supabase, user } = await requireUser();
    const { error } = await supabase.from("diary_entries").insert({
      user_id: user.id,
      entry_at: entryAt.toISOString(),
      title: String(formData.get("title") ?? "").trim(),
      body,
      mood: String(formData.get("mood") ?? "").trim() || null,
      weather: String(formData.get("weather") ?? "").trim() || null,
    });
    if (error) return { error: error.message };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Something went wrong." };
  }

  revalidatePath("/desk/diary");
  revalidatePath("/desk");
  return { ok: true };
}

export async function deleteEntry(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase } = await requireUser();
  await supabase.from("diary_entries").delete().eq("id", id);

  revalidatePath("/desk/diary");
  revalidatePath("/desk");
}
