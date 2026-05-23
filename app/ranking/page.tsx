import { RankingTable } from "@/components/cards";
import { SectionTitle } from "@/components/ui";
import { groups } from "@/lib/data";

export default function RankingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle
        title="Rankings"
        subtitle="Live fan votes from Supabase. Each group is ranked separately."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        {groups.map((g) => (
          <section key={g.group} className="rounded-3xl bg-black/20">
            <h3 className="mb-3 text-2xl font-black text-luxuryGold">Group {g.group}</h3>
            <RankingTable data={g.teams} />
          </section>
        ))}
      </div>
    </main>
  );
}
