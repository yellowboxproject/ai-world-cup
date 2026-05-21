import { HeroSection, MatchCard, NationCard } from "@/components/cards";
import { GoldButton, SectionTitle } from "@/components/ui";
import { featuredMatch, nations } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <section className="-mt-24 px-4 pb-16 text-center">
        <div className="flex justify-center gap-4"><GoldButton href="/groups">Enter The Tournament</GoldButton><GoldButton href="/matchups">View Matchups</GoldButton></div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="Featured Match" subtitle="Spotlight clash under cinematic lights." /><MatchCard home={featuredMatch.home} away={featuredMatch.away} /></section>
      <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="Nations Preview" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{nations.slice(0,8).map((n)=><NationCard key={n.country} nation={n} />)}</div></section>
      <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="About the Competition" subtitle="A fictional women’s AI World Cup where every nation is represented by a digital superstar model." /></section>
      <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="Fan Voting Coming Soon" subtitle="Live polls, creator collabs, and matchday experiences built for TikTok-era fans." /></section>
    </main>
  );
}
