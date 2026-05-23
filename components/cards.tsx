"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Nation } from "@/lib/types";

const competitionId = "ai_world_cup_2026";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function modelId(nation: Nation) {
  return `${nation.modelName}-${nation.country}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function supabaseRequest(path: string, options: RequestInit = {}) {
  if (!supabaseUrl || !supabaseKey) throw new Error("Supabase environment variables are missing");
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!response.ok) throw new Error(await response.text());
  return response;
}

async function fetchVoteRows(query = "select=model_id") {
  const response = await supabaseRequest(`votes?${query}&competition_id=eq.${competitionId}`, { method: "GET" });
  return response.json() as Promise<Array<{ model_id: string }>>;
}

function countVotes(rows: Array<{ model_id: string }>, ids: string[]) {
  return ids.reduce<Record<string, number>>((acc, id) => {
    acc[id] = rows.filter((row) => row.model_id === id).length;
    return acc;
  }, {});
}

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative mx-auto aspect-[16/9] w-full max-w-[1920px] md:min-h-screen">
        <Image src="/models/hero-banner.png" alt="AI Model World Cup cinematic stadium hero" fill priority sizes="100vw" className="object-contain object-center md:object-cover" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent md:h-32" />
        <Link href="/groups" aria-label="Enter the tournament" className="absolute left-[13%] top-[76%] z-20 h-[8%] w-[18%] rounded-full outline-none transition hover:bg-luxuryGold/10 focus-visible:ring-2 focus-visible:ring-luxuryGold" />
        <Link href="/matchups" aria-label="View matchups" className="absolute left-[33%] top-[76%] z-20 h-[8%] w-[16%] rounded-full outline-none transition hover:bg-luxuryGold/10 focus-visible:ring-2 focus-visible:ring-luxuryGold" />
      </div>
    </section>
  );
}

export function NationCard({ nation }: { nation: Nation }) {
  return (
    <Link href="/models" className="block transition hover:-translate-y-1 hover:opacity-95">
      <article className="gold-outline overflow-hidden rounded-2xl bg-zinc-900/70 shadow-glow cursor-pointer">
        <div className="relative h-64 bg-zinc-950">
          {nation.image ? <Image src={nation.image} alt={`${nation.modelName} — ${nation.country}`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-top" /> : null}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-2xl backdrop-blur">{nation.flag}</div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">{nation.modelName}</h3>
          <p className="text-zinc-300">{nation.country}</p>
          <span className="mt-3 inline-block rounded-full border border-luxuryGold/40 px-2 py-1 text-xs">{nation.status}</span>
        </div>
      </article>
    </Link>
  );
}

function MatchModelPanel({ team }: { team: Nation }) {
  return (
    <div className="relative h-80 min-w-0 overflow-hidden bg-zinc-950">
      {team.image ? <Image src={team.image} alt={`${team.modelName} — ${team.country}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5">
        <p className="text-3xl">{team.flag}</p>
        <h3 className="text-3xl font-black uppercase tracking-wide text-white">{team.modelName}</h3>
        <p className="text-luxuryGold">{team.country}</p>
      </div>
    </div>
  );
}

function VotingControls({ home, away }: { home: Nation; away: Nation }) {
  const homeId = modelId(home);
  const awayId = modelId(away);
  const matchId = useMemo(() => `${home.country}-${away.country}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"), [home.country, away.country]);
  const votedKey = `aiwc-voted-${matchId}`;
  const [votes, setVotes] = useState({ home: 0, away: 0 });
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const loadVotes = async () => {
      try {
        const savedVote = window.localStorage.getItem(votedKey);
        if (savedVote) setSelected(savedVote);
        const rows = await fetchVoteRows(`select=model_id&match_id=eq.${matchId}`);
        const counts = countVotes(rows, [homeId, awayId]);
        setVotes({ home: counts[homeId] || 0, away: counts[awayId] || 0 });
        setStatus("ready");
      } catch {
        setStatus("offline");
      }
    };
    loadVotes();
  }, [awayId, homeId, matchId, votedKey]);

  const vote = async (side: "home" | "away") => {
    if (selected || status === "saving") return;
    const team = side === "home" ? home : away;
    const id = side === "home" ? homeId : awayId;
    setStatus("saving");
    try {
      await supabaseRequest("votes", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ competition_id: competitionId, match_id: matchId, model_id: id, model_name: team.modelName, country: team.country })
      });
      setVotes((current) => ({ ...current, [side]: current[side] + 1 }));
      setSelected(side);
      window.localStorage.setItem(votedKey, side);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-3 px-4 py-5 text-center">
      <p className="text-xs uppercase tracking-widest text-luxuryGold">Vote for your favorite</p>
      <div className="grid gap-2">
        <button disabled={Boolean(selected) || status === "saving" || status === "offline"} onClick={() => vote("home")} className="rounded-full bg-gold-gradient px-4 py-2 text-xs font-black uppercase tracking-widest text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60">Vote {home.modelName}</button>
        <button disabled={Boolean(selected) || status === "saving" || status === "offline"} onClick={() => vote("away")} className="rounded-full border border-luxuryGold/70 px-4 py-2 text-xs font-black uppercase tracking-widest text-luxuryGold transition hover:bg-luxuryGold hover:text-black disabled:cursor-not-allowed disabled:opacity-60">Vote {away.modelName}</button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
        <span>{home.modelName}: <strong className="text-white">{votes.home}</strong></span>
        <span>{away.modelName}: <strong className="text-white">{votes.away}</strong></span>
      </div>
      {selected ? <p className="text-xs text-luxuryGold">Vote counted. Share this duel on Instagram or TikTok.</p> : null}
      {status === "error" ? <p className="text-xs text-red-400">Vote error. Please refresh and try again.</p> : null}
      {status === "offline" ? <p className="text-xs text-red-400">Voting database unavailable.</p> : null}
    </div>
  );
}

export function MatchCard({ home, away }: { home: Nation; away: Nation }) {
  return (
    <article className="gold-outline overflow-hidden rounded-3xl bg-black/80 p-0">
      <div className="grid md:grid-cols-[1fr_190px_1fr]">
        <MatchModelPanel team={home} />
        <div className="grid place-content-center bg-black text-center">
          <p className="text-xs uppercase tracking-widest text-luxuryGold">Group Stage</p>
          <p className="my-2 text-3xl font-black">VS</p>
          <VotingControls home={home} away={away} />
        </div>
        <MatchModelPanel team={away} />
      </div>
    </article>
  );
}

export function ModelProfileCard({ nation }: { nation: Nation }) {
  return (
    <article className="gold-outline overflow-hidden rounded-2xl bg-zinc-900/60">
      <div className="relative h-80 bg-gradient-to-br from-zinc-800 to-zinc-900">
        {nation.image ? <Image src={nation.image} alt={nation.modelName} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-top" /> : <div className="absolute inset-0 grid place-content-center text-center text-zinc-400"><p className="text-xs uppercase tracking-[0.3em]">Cinematic Placeholder</p><p className="text-lg font-semibold">{nation.modelName}</p></div>}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">#{nation.number} {nation.modelName}</h3>
        <p className="text-zinc-300">{nation.flag} {nation.country}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">{["Captain Energy","Golden Smile","Street Star"].map((t)=><span key={t} className="rounded-full border border-luxuryGold/40 px-2 py-1">{t}</span>)}</div>
      </div>
    </article>
  );
}

export function RankingTable({ data }: { data: Nation[] }) {
  const [voteTotals, setVoteTotals] = useState<Record<string, number>>({});
  useEffect(() => {
    const load = async () => {
      try {
        const rows = await fetchVoteRows("select=model_id");
        const ids = data.map(modelId);
        setVoteTotals(countVotes(rows, ids));
      } catch {
        setVoteTotals({});
      }
    };
    load();
  }, [data]);

  return <div className="overflow-x-auto rounded-2xl gold-outline"><table className="min-w-full text-left text-sm"><thead className="bg-zinc-900"><tr><th className="p-3">Nation</th><th>W</th><th>L</th><th>Votes</th><th>Pts</th></tr></thead><tbody>{data.map((n, i)=>{const votes = voteTotals[modelId(n)] || 0; return <tr key={n.country} className="border-t border-white/10"><td className="p-3">{i+1}. {n.flag} {n.country}</td><td>0</td><td>0</td><td>{votes}</td><td>0</td></tr>;})}</tbody></table></div>;
}
