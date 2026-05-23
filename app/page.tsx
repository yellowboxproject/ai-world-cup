import { HeroSection, MatchCard, NationCard } from "@/components/cards";
import { HowItWorks, StatsStrip, TopFanFavorites, VotingLiveBanner } from "@/components/home-sections";
import { GoldButton, SectionTitle } from "@/components/ui";
import { featuredMatch, nations } from "@/lib/data";

const instagramUrl = "https://www.instagram.com/worldcup.ai.models/";
const tiktokUrl = "https://www.tiktok.com/@ai.models.world.cup";

export default function HomePage() {
  const liveMatches = [
    [nations[0], nations[1]],
    [nations[2], nations[3]],
    [nations[4], nations[5]]
  ] as const;

  return (
    <main>
      <HeroSection />
      <section className="-mt-24 px-4 pb-10 text-center">
        <div className="flex flex-wrap justify-center gap-4"><GoldButton href="/groups">Enter The Tournament</GoldButton><GoldButton href="/matchups">Vote Now</GoldButton></div>
      </section>

      <StatsStrip />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="gold-outline rounded-3xl bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-8 text-center shadow-glow md:p-12">
          <p className="text-xs uppercase tracking-[0.45em] text-luxuryGold">Community Vote</p>
          <h2 className="mt-4 text-4xl font-black uppercase md:text-6xl">Join The Fan Vote</h2>
          <p className="mx-auto mt-4 max-w-3xl text-zinc-300 md:text-lg">Every matchup is decided by the community. Follow us on Instagram and TikTok, vote for your favorite nations, and help crown the first AI Model World Cup champion.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="rounded-full border border-luxuryGold/70 px-6 py-3 text-sm font-bold uppercase tracking-widest text-luxuryGold transition hover:bg-luxuryGold hover:text-black">Follow Instagram</a>
            <a href={tiktokUrl} target="_blank" rel="noreferrer" className="rounded-full border border-luxuryGold/70 px-6 py-3 text-sm font-bold uppercase tracking-widest text-luxuryGold transition hover:bg-luxuryGold hover:text-black">Follow TikTok</a>
            <GoldButton href="/matchups">Vote Now</GoldButton>
          </div>
        </div>
      </section>

      <VotingLiveBanner />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle title="Live Matchups" subtitle="Vote now and move your favorite models up the group rankings." />
        <div className="grid gap-6">
          {liveMatches.map(([home, away]) => <MatchCard key={`${home.country}-${away.country}`} home={home} away={away} />)}
        </div>
      </section>

      <TopFanFavorites nations={nations} />
      <HowItWorks />

      <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="Featured Match" subtitle="Vote. Share. Decide the champion." /><MatchCard home={featuredMatch.home} away={featuredMatch.away} /></section>
      <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="Nations Preview" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{nations.slice(0,8).map((n)=><NationCard key={n.country} nation={n} />)}</div></section>
      <section className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="About the Competition" subtitle="A fictional women’s AI World Cup where every nation is represented by a digital superstar model. Every group is shaped by fan votes and every matchup can change the road to the title." /></section>
    </main>
  );
}
