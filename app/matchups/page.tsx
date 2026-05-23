import { MatchCard } from "@/components/cards";
import { SectionTitle } from "@/components/ui";
import { nations } from "@/lib/data";

export default function MatchupsPage() {
  const pairs = Array.from({ length: Math.floor(nations.length / 2) }, (_, i) => [
    nations[i * 2],
    nations[i * 2 + 1]
  ] as const);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle
        title="Matchups"
        subtitle="24 poster-style clashes covering every group from A to L. Every model appears once."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {pairs.map(([home, away]) => (
          <MatchCard key={`${home.country}-${away.country}`} home={home} away={away} />
        ))}
      </div>
    </main>
  );
}
