"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Plate } from "@/lib/types";

function formatCaptured(iso?: string) {
  if (!iso) return null;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function Gallery({
  plates,
  collections,
}: {
  plates: Plate[];
  collections: string[];
}) {
  const [shown, setShown] = useState<Set<string>>(() => new Set(collections));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => plates.filter((p) => shown.has(p.collection)),
    [plates, shown],
  );

  function toggle(collection: string) {
    setShown((prev) => {
      const next = new Set(prev);
      if (next.has(collection)) next.delete(collection);
      else next.add(collection);
      return next;
    });
    setOpenIndex(null);
  }

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) =>
        i === null || visible.length === 0
          ? i
          : (i + delta + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    }

    document.addEventListener("keydown", onKey);
    // Freeze the page behind the viewer.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, step]);

  const open = openIndex === null ? null : visible[openIndex];

  return (
    <div>
      {/* Filters — each collection is independently shown or hidden */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {collections.map((c) => {
          const on = shown.has(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              aria-pressed={on}
              className={`label inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 transition-all ${
                on
                  ? "border-brass bg-brass/15 text-ink"
                  : "border-rule text-ink-faint line-through decoration-ink-faint/60 opacity-60 hover:opacity-100"
              }`}
            >
              <span
                aria-hidden
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  on ? "bg-brass" : "bg-transparent ring-1 ring-ink-faint/50"
                }`}
              />
              {c}
            </button>
          );
        })}

        <span aria-hidden className="mx-1 h-4 w-px bg-rule" />

        <button
          type="button"
          onClick={() => setShown(new Set(collections))}
          className="label px-2 py-1.5 transition-colors hover:text-brass"
        >
          Show all
        </button>
        <button
          type="button"
          onClick={() => {
            setShown(new Set());
            setOpenIndex(null);
          }}
          className="label px-2 py-1.5 transition-colors hover:text-brass"
        >
          Hide all
        </button>

        <span className="label ml-auto tabular-nums">
          {visible.length} of {plates.length}
        </span>
      </div>

      {visible.length === 0 ? (
        <p className="border border-dashed border-rule py-16 text-center font-display text-lg italic text-ink-faint">
          Every collection is hidden.
        </p>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {visible.map((plate, i) => (
            <figure key={plate.id} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group block w-full cursor-zoom-in border border-rule bg-leaf p-2.5 text-left shadow-[var(--shadow-plate)] transition-colors hover:border-brass"
              >
                <Image
                  src={plate.src}
                  alt={plate.title}
                  width={plate.width}
                  height={plate.height}
                  unoptimized
                  className="h-auto w-full"
                />
                <figcaption className="px-0.5 pt-2.5 pb-0.5">
                  <span className="block font-display text-base leading-snug text-ink transition-colors group-hover:text-brass">
                    {plate.title}
                  </span>
                  <span className="label mt-1 block">
                    {[plate.collection, plate.place, formatCaptured(plate.capturedOn)]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgb(12_10_7/0.92)] p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-xl text-white/70 transition-colors hover:border-white/60 hover:text-white"
          >
            ×
          </button>

          {visible.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous plate"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-2 z-10 px-4 py-6 text-3xl text-white/50 transition-colors hover:text-white sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next plate"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-2 z-10 px-4 py-6 text-3xl text-white/50 transition-colors hover:text-white sm:right-6"
              >
                ›
              </button>
            </>
          )}

          <figure
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-3xl overflow-auto bg-leaf p-3 shadow-2xl sm:p-4"
          >
            <Image
              src={open.src}
              alt={open.title}
              width={open.width}
              height={open.height}
              unoptimized
              className="h-auto w-full"
            />
            <figcaption className="px-1 pt-4 pb-1">
              <h3 className="font-display text-xl font-semibold text-ink">
                {open.title}
              </h3>
              {open.caption && (
                <p className="mt-1 text-ink-soft italic font-display">
                  {open.caption}
                </p>
              )}
              <p className="label mt-2">
                {[open.collection, open.place, formatCaptured(open.capturedOn)]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
