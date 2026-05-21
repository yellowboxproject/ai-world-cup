import { RankingTable } from "@/components/cards";
import { SectionTitle } from "@/components/ui";
import { groups } from "@/lib/data";

export default function RankingPage() {
  return <main className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="Rankings" subtitle="Wins, losses, votes, and points by group." /><div className="space-y-8">{groups.map((g)=><section key={g.group}><h3 className="mb-3 text-2xl font-black">Group {g.group}</h3><RankingTable data={g.teams} /></section>)}</div></main>;
}
