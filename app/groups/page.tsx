import { NationCard } from "@/components/cards";
import { SectionTitle } from "@/components/ui";
import { groups } from "@/lib/data";

export default function GroupsPage() {
  return <main className="mx-auto max-w-7xl px-4 py-16"> <SectionTitle title="Groups" subtitle="12 groups. 4 nations each." /> <div className="space-y-10">{groups.map((g)=><section key={g.group}><h3 className="mb-4 text-2xl font-black">Group {g.group}</h3><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{g.teams.map((n)=><NationCard key={n.country} nation={n} />)}</div></section>)}</div></main>;
}
