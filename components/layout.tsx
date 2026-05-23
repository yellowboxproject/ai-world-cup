"use client";

import Link from "next/link";
import { Instagram, Menu, Music2, X } from "lucide-react";
import { useState } from "react";

const nav = ["/", "/groups", "/matchups", "/models", "/ranking", "/about"];
const instagramUrl = "https://www.instagram.com/worldcup.ai.models/";
const tiktokUrl = "https://www.tiktok.com/@ai.models.world.cup";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-black tracking-widest text-luxuryGold">AIWC</Link>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Open menu">{open ? <X /> : <Menu />}</button>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => <Link key={item} href={item} className="text-sm uppercase tracking-wider text-zinc-200 transition hover:text-luxuryGold">{item === "/" ? "home" : item.slice(1)}</Link>)}
          <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Follow on Instagram" className="text-zinc-200 transition hover:text-luxuryGold"><Instagram size={18} /></a>
          <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="Follow on TikTok" className="text-zinc-200 transition hover:text-luxuryGold"><Music2 size={18} /></a>
          <Link href="/matchups" className="rounded-full border border-luxuryGold/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-luxuryGold transition hover:bg-luxuryGold hover:text-black">Vote Now</Link>
        </nav>
      </div>
      {open && <nav className="space-y-3 border-t border-white/10 bg-black/95 px-4 py-4 md:hidden">
        {nav.map((item) => <Link onClick={() => setOpen(false)} key={item} href={item} className="block text-sm uppercase tracking-wider">{item === "/" ? "home" : item.slice(1)}</Link>)}
        <div className="flex gap-3 pt-3">
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm"><Instagram size={16} /> Instagram</a>
          <a href={tiktokUrl} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm"><Music2 size={16} /> TikTok</a>
        </div>
        <Link onClick={() => setOpen(false)} href="/matchups" className="block rounded-full bg-gold-gradient px-4 py-3 text-center text-sm font-black uppercase text-black">Vote Now</Link>
      </nav>}
    </header>
  );
}

export function Footer() {
  return <footer className="mt-20 border-t border-white/10 px-4 py-10 text-center text-xs text-zinc-400">
    <div className="mb-4 flex justify-center gap-4">
      <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-luxuryGold">Instagram</a>
      <a href={tiktokUrl} target="_blank" rel="noreferrer" className="hover:text-luxuryGold">TikTok</a>
      <Link href="/matchups" className="hover:text-luxuryGold">Vote Now</Link>
    </div>
    © 2026 AI Model World Cup • Fictional entertainment experience.
  </footer>;
}
