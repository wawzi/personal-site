import type { ReactNode } from "react";

/**
 * A boxed module with a labelled title bar — the basic unit of
 * this layout. `action` sits at the right of the bar for small
 * controls (edit, add, a count).
 */
export function Panel({
  title,
  action,
  children,
  className = "",
  bodyClassName = "panel-body",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-head">
        <h2 className="label">{title}</h2>
        {action}
      </header>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
