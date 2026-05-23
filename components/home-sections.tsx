"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Nation } from "@/lib/types";

const competitionId = "ai_world_cup_2026";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function modelId(nation: Nation) {
  return `${nation.modelName}-${nation.country}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fetchVoteRows() {
  if (!supabaseUrl || !supabaseKey) return [];
  const response = await fetch(`${supabaseUrl}/rest/v1/votes?select=model_id&competition_id=eq.${competitionId}`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  });
  if (!response.ok) return [];
  return response.json() as Promise<Array<{ model_id: string }>>;
}

export function StatsStrip() {
  const stats = [
    ["48", "Nations"],
    ["12", "Groups"],
    ["1", "Champion"],
    ["Live", "Fan Votes"]
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="gold-outline rounded-2xl bg-black/55 p-4 text-center shadow-glow md:p-6">
            <p className="text-3xl font-black uppercase text-luxuryGold md:text-5xl">{value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-zinc-300 md:mt-2 md:text-xs md:tracking-[0.3em]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TopFanFavorites({ nations }: { nations: Nation[] }) {
  const [totals, setTotals] = useState<Record<string, number>>({});

  useEffect(() => {
    const load = async () => {
      const rows = await fetchVoteRows();
      const counts: Record<string, number> = {};
      for (const nation of nations) counts[modelId(nation)] = 0;
      for (const row of rows) counts[row.model_id] = (counts[row.model_id] || 0) + 1;
      setTotals(counts);
    };
    load();
  }, [nations]);

  const favorites = useMemo(() => {
    return [...nations]
      .map((nation) => ({ nation, votes: totals[modelId(nation)] || 0 }))
      .sort((a, b) => b.votes - a.votes || a.nation.country.localeCompare(b.nation.country))
      .slice(0, 5);
  }, [nations, totals]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center md:gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-luxuryGold md:tracking-[0.45em]">Live Leaderboard</p>
          <h2 className="mt-3 text-3xl font-black uppercase md:text-6xl">Current Fan Favorites</h2>
          <p className="mt-3 max-w-xl text-sm text-zinc-300 md:mt-4 md:text-base">The ranking changes as soon as fans vote. Push your favorite model to the top before the group stage ends.</p>
          <Link href="/matchups" className="mt-5 inline-flex rounded-full bg-gold-gradient px-5 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:scale-105 md:mt-6 md:text-sm">Vote Now</Link>
        </div>
        <div className="gold-outline overflow-hidden rounded-3xl bg-black/60 shadow-glow">
          {favorites.map(({ nation, votes }, index) => (
            <div key={nation.country} className="flex items-center gap-3 border-b border-white/10 p-3 last:border-b-0 md:gap-4 md:p-4">
              <div className="w-8 text-center text-base font-black text-luxuryGold md:w-10 md:text-lg">#{index + 1}</div>
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-zinc-900 md:h-16 md:w-16">
                {nation.image ? <Image src={nation.image} alt={nation.modelName} fill sizes="64px" className="object-cover object-top" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-black uppercase text-white md:text-lg">{nation.modelName}</p>
                <p className="truncate text-xs text-zinc-400 md:text-sm">{nation.flag} {nation.country} · Group {nation.group}</p>
              </div>
              <div className="rounded-full border border-luxuryGold/40 px-3 py-1 text-sm font-black text-white">{votes}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["01", "Choose a matchup", "Open the duel cards and compare both models."],
    ["02", "Cast your vote", "Pick your favorite model directly on the site."],
    ["03", "Watch the ranking", "Every vote updates the live group standings."],
    ["04", "Crown the champion", "The community decides who reaches the top."]
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
      <div className="mb-6 text-center md:mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-luxuryGold md:tracking-[0.45em]">How It Works</p>
        <h2 className="mt-3 text-3xl font-black uppercase md:text-6xl">Vote. Share. Decide.</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-4 md:gap-4">
        {steps.map(([number, title, text]) => (
          <div key={number} className="gold-outline rounded-3xl bg-zinc-950/70 p-5 md:p-6">
            <p className="text-sm font-black text-luxuryGold">{number}</p>
            <h3 className="mt-3 text-lg font-black uppercase text-white md:mt-4 md:text-xl">{title}</h3>
            <p className="mt-2 text-sm text-zinc-400 md:mt-3">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VotingLiveBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
      <div className="gold-outline rounded-3xl bg-gradient-to-r from-luxuryGold/20 via-black to-black p-6 md:p-12">
        <p className="text-xs uppercase tracking-[0.35em] text-luxuryGold md:tracking-[0.45em]">Fan Voting Is Live</p>
        <h2 className="mt-3 text-3xl font-black uppercase md:text-6xl">Every Vote Counts</h2>
        <p className="mt-3 max-w-3xl text-sm text-zinc-300 md:mt-4 md:text-lg">Pick your favorite model, move her up the group ranking, and help decide who becomes the first AI Model World Cup champion.</p>
        <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap md:mt-8">
          <Link href="/matchups" className="rounded-full bg-gold-gradient px-5 py-3 text-center text-xs font-black uppercase tracking-widest text-black transition hover:scale-105 md:px-6 md:text-sm">Start Voting</Link>
          <Link href="/ranking" className="rounded-full border border-luxuryGold/70 px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-luxuryGold transition hover:bg-luxuryGold hover:text-black md:px-6 md:text-sm">See Rankings</Link>
        </div>
      </div>
    </section>
  );
}
