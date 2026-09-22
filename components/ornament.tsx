/** Thick-over-thin rule, as ruled across a title page. */
export function DoubleRule({ className = "" }: { className?: string }) {
  return <hr className={`rule-double ${className}`} />;
}

/** Centred fleuron flanked by tapering rules — a section break. */
export function Fleuron({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center gap-4 text-brass ${className}`}
    >
      <span className="h-px w-16 bg-linear-to-r from-transparent to-rule-strong sm:w-28" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M12 2c2.2 3.2 2.2 5.4 0 8 -2.2-2.6-2.2-4.8 0-8Zm0 20c-2.2-3.2-2.2-5.4 0-8 2.2 2.6 2.2 4.8 0 8ZM2 12c3.2-2.2 5.4-2.2 8 0-2.6 2.2-4.8 2.2-8 0Zm20 0c-3.2 2.2-5.4 2.2-8 0 2.6-2.2 4.8-2.2 8 0Z"
          fill="currentColor"
          opacity="0.85"
        />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-linear-to-l from-transparent to-rule-strong sm:w-28" />
    </div>
  );
}

/** Small-caps catalogue label with a leading rule. */
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="label inline-flex items-center gap-2.5">
      <span aria-hidden className="h-px w-6 bg-brass" />
      {children}
    </span>
  );
}
