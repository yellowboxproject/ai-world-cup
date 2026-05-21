import Link from "next/link";
import { ReactNode } from "react";

export function GoldButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-full bg-gold-gradient px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black transition hover:scale-105"
    >
      {children}
    </Link>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-luxuryGold">Tournament Spotlight</p>
      <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-sm text-zinc-300 md:text-base">{subtitle}</p>}
    </div>
  );
}
