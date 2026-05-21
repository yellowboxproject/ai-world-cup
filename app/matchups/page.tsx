import { MatchCard } from "@/components/cards";
import { SectionTitle } from "@/components/ui";
import { nations } from "@/lib/data";

export default function MatchupsPage() {
  const pairs = Array.from({ length: 12 }, (_, i) => [nations[i * 2], nations[i * 2 + 1]] as const);
  return <main className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="Matchups" subtitle="Poster-style clashes, live vote energy, and countdown placeholders." /><div className="grid gap-6 lg:grid-cols-2">{pairs.map(([h,a])=><MatchCard key={h.country+a.country} home={h} away={a} />)}</div></main>;
}
