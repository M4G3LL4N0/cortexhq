"use client";

import type { ReactNode } from "react";

export function RevealOnScroll({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}) {
  const Comp = Tag;
  return (
    <Comp data-reveal className={className}>
      {children}
    </Comp>
  );
}

export function StaggerOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-stagger className={className}>
      {children}
    </div>
  );
}
