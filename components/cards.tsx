"use client";

import Image from "next/image";
import Link from "next/link";
import { Nation } from "@/lib/types";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative mx-auto aspect-[16/9] w-full max-w-[1920px] md:min-h-screen">
        <Image
          src="/models/hero-banner.png"
          alt="AI Model World Cup cinematic stadium hero"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center md:object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent md:h-32" />
        <Link
          href="/groups"
          aria-label="Enter the tournament"
          className="absolute left-[13%] top-[76%] z-20 h-[8%] w-[18%] rounded-full outline-none transition hover:bg-luxuryGold/10 focus-visible:ring-2 focus-visible:ring-luxuryGold"
        />
        <Link
          href="/matchups"
          aria-label="View matchups"
          className="absolute left-[33%] top-[76%] z-20 h-[8%] w-[16%] rounded-full outline-none transition hover:bg-luxuryGold/10 focus-visible:ring-2 focus-visible:ring-luxuryGold"
        />
      </div>
    </section>
  );
}

export function NationCard({ nation }: { nation: Nation }) {
  return (
    <Link href="/models" className="block transition hover:-translate-y-1 hover:opacity-95">
      <article className="gold-outline overflow-hidden rounded-2xl bg-zinc-900/70 shadow-glow cursor-pointer">
        <div className="relative h-64 bg-zinc-950">
          {nation.image ? (
            <Image src={nation.image} alt={`${nation.modelName} — ${nation.country}`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-top" />
          ) : null}
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

export function MatchCard({ home, away }: { home: Nation; away: Nation }) {
  return (
    <article className="gold-outline overflow-hidden rounded-3xl bg-black/70 p-0">
      <div className="grid md:grid-cols-[1fr_auto_1fr]">
        {[home, away].map((team) => (
          <div key={team.country} className="relative h-80 bg-zinc-950">
            {team.image ? <Image src={team.image} alt={team.modelName} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-top" /> : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-3xl">{team.flag}</p>
              <h3 className="text-3xl font-black uppercase">{team.modelName}</h3>
              <p className="text-luxuryGold">{team.country}</p>
            </div>
          </div>
        ))}
        <div className="grid place-content-center bg-black px-5 py-6 text-center md:-order-none md:px-8">
          <p className="text-xs uppercase tracking-widest text-luxuryGold">Group Stage</p>
          <p className="my-3 text-3xl font-black">VS</p>
          <button onClick={() => alert("Fan voting coming soon")} className="rounded-full bg-gold-gradient px-5 py-2 text-sm font-bold text-black transition hover:scale-105">Vote Now</button>
        </div>
      </div>
    </article>
  );
}

export function ModelProfileCard({ nation }: { nation: Nation }) {
  return (
    <article className="gold-outline overflow-hidden rounded-2xl bg-zinc-900/60">
      <div className="relative h-80 bg-gradient-to-br from-zinc-800 to-zinc-900">
        {nation.image ? (
          <Image src={nation.image} alt={nation.modelName} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover object-top" />
        ) : (
          <div className="absolute inset-0 grid place-content-center text-center text-zinc-400"><p className="text-xs uppercase tracking-[0.3em]">Cinematic Placeholder</p><p className="text-lg font-semibold">{nation.modelName}</p></div>
        )}
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
  return <div className="overflow-x-auto rounded-2xl gold-outline"><table className="min-w-full text-left text-sm"><thead className="bg-zinc-900"><tr><th className="p-3">Nation</th><th>W</th><th>L</th><th>Votes</th><th>Pts</th></tr></thead><tbody>{data.map((n, i)=><tr key={n.country} className="border-t border-white/10"><td className="p-3">{i+1}. {n.flag} {n.country}</td><td>{(n.number%5)+1}</td><td>{n.number%3}</td><td>{n.votes}</td><td>{Math.floor(n.votes/5000)}</td></tr>)}</tbody></table></div>;
}
