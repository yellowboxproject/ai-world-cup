"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Nation } from "@/lib/types";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center">
      <div className="absolute inset-0 bg-stadium-glow" />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-luxuryGold">Global Tournament 2026</p>
        <h1 className="text-5xl font-black uppercase leading-[0.9] md:text-8xl">AI Model World Cup</h1>
        <p className="text-lg text-zinc-200 md:text-2xl">48 Nations. 48 Queens. One Dream.</p>
      </motion.div>
    </section>
  );
}

export function NationCard({ nation }: { nation: Nation }) {
  return <article className="gold-outline rounded-2xl bg-zinc-900/70 p-4 shadow-glow"><p className="text-2xl">{nation.flag}</p><h3 className="mt-2 text-xl font-bold">{nation.country}</h3><p className="text-zinc-300">{nation.modelName}</p><span className="mt-3 inline-block rounded-full border border-luxuryGold/40 px-2 py-1 text-xs">{nation.status}</span></article>;
}

export function MatchCard({ home, away }: { home: Nation; away: Nation }) {
  return <article className="gold-outline rounded-3xl bg-black/70 p-6"><p className="text-xs uppercase tracking-widest text-luxuryGold">Group Stage</p><div className="mt-5 space-y-2 text-2xl font-bold"><p>{home.flag} {home.country} — {home.modelName}</p><p className="text-sm text-zinc-500">vs</p><p>{away.flag} {away.country} — {away.modelName}</p></div><button className="mt-5 rounded-full bg-gold-gradient px-5 py-2 text-sm font-bold text-black">Vote Now</button></article>;
}

export function ModelProfileCard({ nation }: { nation: Nation }) {
  const imagePath = `/models/${nation.country.toLowerCase().replace(/\s+/g, "-")}-${nation.modelName.toLowerCase()}.jpg`;
  return <article className="gold-outline rounded-2xl bg-zinc-900/60 p-4"><div className="relative h-56 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900"> <Image src={imagePath} alt={nation.modelName} fill className="object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}} /><div className="absolute inset-0 grid place-content-center text-center text-zinc-400"><p className="text-xs uppercase tracking-[0.3em]">Cinematic Placeholder</p><p className="text-lg font-semibold">{nation.modelName}</p></div></div><h3 className="mt-4 text-xl font-bold">#{nation.number} {nation.modelName}</h3><p className="text-zinc-300">{nation.flag} {nation.country}</p><div className="mt-3 flex flex-wrap gap-2 text-xs">{["Captain Energy","Golden Smile","Street Star","Ice Queen","Rising Star"].slice(0,3).map((t)=><span key={t} className="rounded-full border border-luxuryGold/40 px-2 py-1">{t}</span>)}</div></article>;
}

export function RankingTable({ data }: { data: Nation[] }) {
  return <div className="overflow-x-auto rounded-2xl gold-outline"><table className="min-w-full text-left text-sm"><thead className="bg-zinc-900"><tr><th className="p-3">Nation</th><th>W</th><th>L</th><th>Votes</th><th>Pts</th></tr></thead><tbody>{data.map((n, i)=><tr key={n.country} className="border-t border-white/10"><td className="p-3">{i+1}. {n.flag} {n.country}</td><td>{(n.number%5)+1}</td><td>{n.number%3}</td><td>{n.votes}</td><td>{Math.floor(n.votes/5000)}</td></tr>)}</tbody></table></div>;
}
