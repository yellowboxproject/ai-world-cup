"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Nation } from "@/lib/types";

const competitionId = "ai_world_cup_2026";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const flagCodes: Record<string, string> = {
  Mexico: "mx",
  "South Africa": "za",
  "South Korea": "kr",
  "Czech Republic": "cz",
  Canada: "ca",
  "Bosnia & Herzegovina": "ba",
  Qatar: "qa",
  Switzerland: "ch",
  Brazil: "br",
  Morocco: "ma",
  Haiti: "ht",
  Scotland: "gb-sct",
  USA: "us",
  Paraguay: "py",
  Australia: "au",
  Türkiye: "tr",
  Germany: "de",
  Curaçao: "cw",
  "Côte d'Ivoire": "ci",
  Ecuador: "ec",
  Netherlands: "nl",
  Japan: "jp",
  Sweden: "se",
  Tunisia: "tn",
  Belgium: "be",
  Egypt: "eg",
  Iran: "ir",
  "New Zealand": "nz",
  Spain: "es",
  "Cabo Verde": "cv",
  "Saudi Arabia": "sa",
  Uruguay: "uy",
  France: "fr",
  Senegal: "sn",
  Iraq: "iq",
  Norway: "no",
  Argentina: "ar",
  Algeria: "dz",
  Austria: "at",
  Jordan: "jo",
  Portugal: "pt",
  "DR Congo": "cd",
  Uzbekistan: "uz",
  Colombia: "co",
  England: "gb-eng",
  Croatia: "hr",
  Ghana: "gh",
  Panama: "pa"
};

function CountryFlag({ country, className = "h-4 w-6" }: { country: string; className?: string }) {
  const code = flagCodes[country];
  if (!code) return null;
  return (
    <img
      src={`https://flagcdn.com/${code}.svg`}
      alt={`${country} flag`}
      className={`${className} inline-block rounded-[2px] object-cover shadow-sm ring-1 ring-white/20`}
      loading="lazy"
    />
  );
}

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

function useVoteTotals(data: Nation[]) {
  const [voteTotals, setVoteTotals] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const rows = await fetchVoteRows("select=model_id");
        const ids = data.map(modelId);
        setVoteTotals(countVotes(rows, ids));
      } catch {
        setVoteTotals({});
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [data]);

  return { voteTotals, loading };
}

function enrichAndSort(data: Nation[], voteTotals: Record<string, number>) {
  return [...data]
    .map((nation) => ({ nation, votes: voteTotals[modelId(nation)] || 0 }))
    .sort((a, b) => b.votes - a.votes || a.nation.country.localeCompare(b.nation.country));
}

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative mx-auto h-[62vh] min-h-[460px] w-full max-w-[1920px] md:h-auto md:min-h-screen">
        <Image src="/models/hero-banner.png" alt="AI Model World Cup cinematic stadium hero" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20 md:bg-transparent" />
        <div className="absolute inset-x-4 bottom-7 z-20 rounded-3xl border border-luxuryGold/40 bg-black/70 p-4 backdrop-blur md:hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-luxuryGold">AI Model World Cup</p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-none">Vote your champion</h1>
          <p className="mt-2 text-sm text-zinc-300">48 models. 12 groups. Live fan rankings.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href="/matchups" className="rounded-full bg-gold-gradient px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-black">Vote Now</Link>
            <Link href="/ranking" className="rounded-full border border-luxuryGold/70 px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-luxuryGold">Rankings</Link>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent md:h-32" />
        <Link href="/groups" aria-label="Enter the tournament" className="absolute left-[13%] top-[76%] z-20 hidden h-[8%] w-[18%] rounded-full outline-none transition hover:bg-luxuryGold/10 focus-visible:ring-2 focus-visible:ring-luxuryGold md:block" />
        <Link href="/matchups" aria-label="View matchups" className="absolute left-[33%] top-[76%] z-20 hidden h-[8%] w-[16%] rounded-full outline-none transition hover:bg-luxuryGold/10 focus-visible:ring-2 focus-visible:ring-luxuryGold md:block" />
      </div>
    </section>
  );
}

export function NationCard({ nation }: { nation: Nation }) {
  return (
    <Link href="/models" className="block transition hover:-translate-y-1 hover:opacity-95">
      <article className="gold-outline overflow-hidden rounded-2xl bg-zinc-900/70 shadow-glow cursor-pointer">
        <div className="relative h-56 bg-zinc-950 sm:h-64">
          {nation.image ? <Image src={nation.image} alt={`${nation.modelName} — ${nation.country}`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-top" /> : null}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 backdrop-blur"><CountryFlag country={nation.country} className="h-5 w-8" /></div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">{nation.modelName}</h3>
          <p className="flex items-center gap-2 text-zinc-300"><CountryFlag country={nation.country} />{nation.country}</p>
          <span className="mt-3 inline-block rounded-full border border-luxuryGold/40 px-2 py-1 text-xs">{nation.status}</span>
        </div>
      </article>
    </Link>
  );
}

function MatchModelPanel({ team }: { team: Nation }) {
  return (
    <div className="relative h-64 min-w-0 overflow-hidden bg-zinc-950 sm:h-72 md:h-80">
      {team.image ? <Image src={team.image} alt={`${team.modelName} — ${team.country}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover object-top" /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <CountryFlag country={team.country} className="mb-2 h-6 w-10" />
        <h3 className="text-2xl font-black uppercase leading-none tracking-wide text-white sm:text-3xl">{team.modelName}</h3>
        <p className="mt-1 text-sm text-luxuryGold">{team.country}</p>
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
    <div className="space-y-3 p-4 text-center md:px-4 md:py-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxuryGold">Tap to vote</p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
        <button disabled={Boolean(selected) || status === "saving" || status === "offline"} onClick={() => vote("home")} className="min-h-12 rounded-2xl bg-gold-gradient px-3 py-3 text-xs font-black uppercase tracking-widest text-black transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:rounded-full">Vote {home.modelName}</button>
        <button disabled={Boolean(selected) || status === "saving" || status === "offline"} onClick={() => vote("away")} className="min-h-12 rounded-2xl border border-luxuryGold/70 px-3 py-3 text-xs font-black uppercase tracking-widest text-luxuryGold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 md:rounded-full md:hover:bg-luxuryGold md:hover:text-black">Vote {away.modelName}</button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
        <span className="rounded-xl bg-white/5 px-2 py-2">{home.modelName}: <strong className="text-white">{votes.home}</strong></span>
        <span className="rounded-xl bg-white/5 px-2 py-2">{away.modelName}: <strong className="text-white">{votes.away}</strong></span>
      </div>
      {selected ? <p className="text-xs text-luxuryGold">Vote counted. Share this duel on Instagram or TikTok.</p> : null}
      {status === "error" ? <p className="text-xs text-red-400">Vote error. Please refresh and try again.</p> : null}
      {status === "offline" ? <p className="text-xs text-red-400">Voting database unavailable.</p> : null}
    </div>
  );
}

export function MatchCard({ home, away }: { home: Nation; away: Nation }) {
  return (
    <article className="gold-outline overflow-hidden rounded-3xl bg-black/80 p-0 shadow-glow">
      <div className="grid grid-cols-2 md:grid-cols-[1fr_190px_1fr]">
        <MatchModelPanel team={home} />
        <div className="col-span-2 grid place-content-center bg-black text-center md:col-span-1 md:order-none">
          <p className="pt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-luxuryGold md:pt-0">Group Stage</p>
          <p className="my-1 text-3xl font-black md:my-2">VS</p>
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
      <div className="relative h-72 bg-gradient-to-br from-zinc-800 to-zinc-900 sm:h-80">
        {nation.image ? <Image src={nation.image} alt={nation.modelName} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-top" /> : <div className="absolute inset-0 grid place-content-center text-center text-zinc-400"><p className="text-xs uppercase tracking-[0.3em]">Cinematic Placeholder</p><p className="text-lg font-semibold">{nation.modelName}</p></div>}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">#{nation.number} {nation.modelName}</h3>
        <p className="flex items-center gap-2 text-zinc-300"><CountryFlag country={nation.country} />{nation.country}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">{["Captain Energy","Golden Smile","Street Star"].map((t)=><span key={t} className="rounded-full border border-luxuryGold/40 px-2 py-1">{t}</span>)}</div>
      </div>
    </article>
  );
}

export function GlobalRankingTable({ data }: { data: Nation[] }) {
  const { voteTotals, loading } = useVoteTotals(data);
  const ranked = enrichAndSort(data, voteTotals);
  return <div className="overflow-x-auto rounded-2xl gold-outline shadow-glow"><table className="min-w-full text-left text-sm"><thead className="bg-zinc-900"><tr><th className="p-3">Rank</th><th>Model</th><th>Nation</th><th>Group</th><th>Votes</th></tr></thead><tbody>{ranked.map(({ nation, votes }, i)=><tr key={nation.country} className="border-t border-white/10"><td className="p-3 font-black text-luxuryGold">#{i+1}</td><td className="font-bold text-white">{nation.modelName}</td><td className="flex items-center gap-2 py-3"><CountryFlag country={nation.country} />{nation.country}</td><td>Group {nation.group}</td><td className="font-black text-white">{loading ? "..." : votes}</td></tr>)}</tbody></table></div>;
}

export function RankingTable({ data }: { data: Nation[] }) {
  const { voteTotals, loading } = useVoteTotals(data);
  const ranked = enrichAndSort(data, voteTotals);

  return (
    <>
      <div className="space-y-2 md:hidden">
        {ranked.map(({ nation, votes }, i) => (
          <div key={nation.country} className="flex items-center gap-3 rounded-2xl border border-luxuryGold/30 bg-black/70 p-3">
            <div className="w-7 text-center font-black text-luxuryGold">{i + 1}</div>
            <CountryFlag country={nation.country} className="h-5 w-8" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-black text-white">{nation.modelName}</p>
              <p className="truncate text-xs text-zinc-400">{nation.country}</p>
            </div>
            <div className="rounded-full bg-luxuryGold px-3 py-1 text-sm font-black text-black">{loading ? "..." : votes}</div>
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto rounded-2xl gold-outline md:block">
        <table className="min-w-full text-left text-sm"><thead className="bg-zinc-900"><tr><th className="p-3">Rank</th><th>Model / Nation</th><th>W</th><th>L</th><th>Votes</th><th>Pts</th></tr></thead><tbody>{ranked.map(({ nation, votes }, i)=><tr key={nation.country} className="border-t border-white/10"><td className="p-3 font-black text-luxuryGold">{i+1}</td><td><div className="flex items-center gap-2"><CountryFlag country={nation.country} /><strong className="text-white">{nation.modelName}</strong><span className="text-zinc-400">— {nation.country}</span></div></td><td>0</td><td>0</td><td className="font-black text-white">{loading ? "..." : votes}</td><td>0</td></tr>)}</tbody></table>
      </div>
    </>
  );
}
