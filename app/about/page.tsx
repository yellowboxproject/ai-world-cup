import Link from "next/link";
import { SectionTitle } from "@/components/ui";

const chapters = [
  {
    number: "01",
    title: "48 nations enter the arena",
    text: "Each country is represented by one AI-generated model with her own visual identity, jersey, attitude, and tournament energy."
  },
  {
    number: "02",
    title: "The fans decide the momentum",
    text: "Every matchup becomes a public duel. Visitors vote for their favorite model and the group rankings evolve with the community."
  },
  {
    number: "03",
    title: "From group stage to legend",
    text: "The road starts with 12 groups, but only the strongest fan favorites will build the story, the hype, and the path to the crown."
  }
];

const pillars = ["AI Models", "Global Football Energy", "Fan Voting", "Social Storytelling"];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionTitle title="About" subtitle="The story behind a fictional global AI tournament." />
          <div className="mt-8 flex flex-wrap gap-3">
            {pillars.map((pillar) => (
              <span key={pillar} className="rounded-full border border-luxuryGold/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-luxuryGold">
                {pillar}
              </span>
            ))}
          </div>
        </div>
        <div className="gold-outline rounded-3xl bg-gradient-to-br from-luxuryGold/15 via-black to-zinc-950 p-8 shadow-glow md:p-10">
          <p className="text-xs uppercase tracking-[0.45em] text-luxuryGold">Tournament Manifesto</p>
          <h2 className="mt-4 text-4xl font-black uppercase leading-tight text-white md:text-6xl">
            48 Queens. One Crown. The fans write the story.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-300">
            AI Model World Cup is a fictional entertainment tournament where digital models represent nations in a cinematic, FIFA-style competition. It mixes football culture, AI visuals, fan voting, and social-media storytelling into one global event.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/matchups" className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition hover:scale-105">
              Vote Now
            </Link>
            <Link href="/ranking" className="rounded-full border border-luxuryGold/70 px-6 py-3 text-sm font-bold uppercase tracking-widest text-luxuryGold transition hover:bg-luxuryGold hover:text-black">
              See Rankings
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-6 md:grid-cols-3">
        {chapters.map((chapter) => (
          <article key={chapter.number} className="gold-outline rounded-3xl bg-black/60 p-6 shadow-glow">
            <p className="text-sm font-black text-luxuryGold">{chapter.number}</p>
            <h3 className="mt-4 text-2xl font-black uppercase text-white">{chapter.title}</h3>
            <p className="mt-4 leading-relaxed text-zinc-400">{chapter.text}</p>
          </article>
        ))}
      </section>

      <section className="mt-20 gold-outline rounded-3xl bg-zinc-950/80 p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-luxuryGold">The Format</p>
            <h2 className="mt-3 text-4xl font-black uppercase text-white md:text-5xl">A tournament built for reels, duels and daily hype.</h2>
          </div>
          <div className="space-y-5 text-zinc-300">
            <p>
              The competition begins with 48 models split into 12 groups. Every group has its own personalities, rivalries and visual identity. Matchups are designed like poster clashes: two models, two nations, one choice.
            </p>
            <p>
              Fans can vote directly on the site, follow the rankings, and discover the models through Instagram and TikTok content. The goal is not just to show images, but to create a living competition where each vote moves the story forward.
            </p>
            <p className="font-semibold text-white">
              It is fictional entertainment, but the experience is built like a real digital event: cinematic visuals, social momentum, live ranking, and a final champion chosen by the audience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
