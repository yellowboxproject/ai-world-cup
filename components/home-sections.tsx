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
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label} className="gold-outline rounded-2xl bg-black/50 p-6 text-center shadow-glow">
            <p className="text-4xl font-black uppercase text-luxuryGold md:text-5xl">{value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-300">{label}</p>
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
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-luxuryGold">Live Leaderboard</p>
          <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">Current Fan Favorites</h2>
          <p className="mt-4 max-w-xl text-zinc-300">The ranking changes as soon as fans vote. Push your favorite model to the top before the group stage ends.</p>
          <Link href="/matchups" className="mt-6 inline-flex rounded-full bg-gold-gradient px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition hover:scale-105">Vote Now</Link>
        </div>
        <div className="gold-outline overflow-hidden rounded-3xl bg-black/60 shadow-glow">
          {favorites.map(({ nation, votes }, index) => (
            <div key={nation.country} className="flex items-center gap-4 border-b border-white/10 p-4 last:border-b-0">
              <div className="w-10 text-center text-lg font-black text-luxuryGold">#{index + 1}</div>
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-zinc-900">
                {nation.image ? <Image src={nation.image} alt={nation.modelName} fill sizes="64px" className="object-cover object-top" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-black uppercase text-white">{nation.modelName}</p>
                <p className="truncate text-sm text-zinc-400">{nation.flag} {nation.country} · Group {nation.group}</p>
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
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-luxuryGold">How It Works</p>
        <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">Vote. Share. Decide.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map(([number, title, text]) => (
          <div key={number} className="gold-outline rounded-3xl bg-zinc-950/70 p-6">
            <p className="text-sm font-black text-luxuryGold">{number}</p>
            <h3 className="mt-4 text-xl font-black uppercase text-white">{title}</h3>
            <p className="mt-3 text-sm text-zinc-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VotingLiveBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="gold-outline rounded-3xl bg-gradient-to-r from-luxuryGold/20 via-black to-black p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.45em] text-luxuryGold">Fan Voting Is Live</p>
        <h2 className="mt-3 text-4xl font-black uppercase md:text-6xl">Every Vote Counts</h2>
        <p className="mt-4 max-w-3xl text-zinc-300 md:text-lg">Pick your favorite model, move her up the group ranking, and help decide who becomes the first AI Model World Cup champion.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/matchups" className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition hover:scale-105">Start Voting</Link>
          <Link href="/ranking" className="rounded-full border border-luxuryGold/70 px-6 py-3 text-sm font-bold uppercase tracking-widest text-luxuryGold transition hover:bg-luxuryGold hover:text-black">See Rankings</Link>
        </div>
      </div>
    </section>
  );
}
