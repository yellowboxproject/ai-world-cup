"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = ["/", "/groups", "/matchups", "/models", "/ranking", "/about"];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-black tracking-widest text-luxuryGold">AIWC</Link>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</button>
        <nav className="hidden gap-6 md:flex">
          {nav.map((item) => <Link key={item} href={item} className="text-sm uppercase tracking-wider text-zinc-200 hover:text-luxuryGold">{item === "/" ? "home" : item.slice(1)}</Link>)}
        </nav>
      </div>
      {open && <nav className="space-y-3 border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">{nav.map((item) => <Link onClick={() => setOpen(false)} key={item} href={item} className="block text-sm uppercase tracking-wider">{item === "/" ? "home" : item.slice(1)}</Link>)}</nav>}
    </header>
  );
}

export function Footer() {
  return <footer className="mt-20 border-t border-white/10 px-4 py-8 text-center text-xs text-zinc-400">© 2026 AI Model World Cup • Fictional entertainment experience.</footer>;
}
