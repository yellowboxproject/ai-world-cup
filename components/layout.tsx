"use client";

import Link from "next/link";
import { BarChart3, Home, Instagram, Menu, Music2, Trophy, Users, Vote, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/groups", label: "Groups" },
  { href: "/matchups", label: "Matchups" },
  { href: "/models", label: "Models" },
  { href: "/ranking", label: "Ranking" },
  { href: "/about", label: "About" }
];

const mobileNav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/matchups", label: "Vote", icon: Vote },
  { href: "/ranking", label: "Ranking", icon: BarChart3 },
  { href: "/models", label: "Models", icon: Users }
];

const instagramUrl = "https://www.instagram.com/worldcup.ai.models/";
const tiktokUrl = "https://www.tiktok.com/@ai.models.world.cup";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-lg font-black tracking-widest text-luxuryGold">
          <Trophy size={18} /> AIWC
        </Link>
        <Link href="/matchups" className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-black uppercase tracking-widest text-black md:hidden">
          Vote
        </Link>
        <button className="rounded-full border border-white/15 p-2 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Open menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`text-sm uppercase tracking-wider transition hover:text-luxuryGold ${pathname === item.href ? "text-luxuryGold" : "text-zinc-200"}`}>
              {item.label}
            </Link>
          ))}
          <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Follow on Instagram" className="text-zinc-200 transition hover:text-luxuryGold"><Instagram size={18} /></a>
          <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="Follow on TikTok" className="text-zinc-200 transition hover:text-luxuryGold"><Music2 size={18} /></a>
          <Link href="/matchups" className="rounded-full border border-luxuryGold/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-luxuryGold transition hover:bg-luxuryGold hover:text-black">Vote Now</Link>
        </nav>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-black/95 px-4 py-4 shadow-2xl md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {nav.map((item) => (
              <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className={`rounded-2xl border px-4 py-4 text-sm font-bold uppercase tracking-wider ${pathname === item.href ? "border-luxuryGold bg-luxuryGold/10 text-luxuryGold" : "border-white/10 text-white"}`}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm"><Instagram size={16} /> Instagram</a>
            <a href={tiktokUrl} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm"><Music2 size={16} /> TikTok</a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 px-2 pb-[calc(env(safe-area-inset-bottom)+0.35rem)] pt-2 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-bold uppercase tracking-wide ${active ? "bg-luxuryGold text-black" : "text-zinc-300"}`}>
              <Icon size={18} />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Footer() {
  return <footer className="mt-20 border-t border-white/10 px-4 pb-28 pt-10 text-center text-xs text-zinc-400 md:pb-10">
    <div className="mb-4 flex justify-center gap-4">
      <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-luxuryGold">Instagram</a>
      <a href={tiktokUrl} target="_blank" rel="noreferrer" className="hover:text-luxuryGold">TikTok</a>
      <Link href="/matchups" className="hover:text-luxuryGold">Vote Now</Link>
    </div>
    © 2026 AI Model World Cup • Fictional entertainment experience.
  </footer>;
}
