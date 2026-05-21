import { ModelProfileCard } from "@/components/cards";
import { SectionTitle } from "@/components/ui";
import { nations } from "@/lib/data";

export default function ModelsPage() {
  return <main className="mx-auto max-w-7xl px-4 py-16"><SectionTitle title="Models" subtitle="Meet the 48 queens of the AI Model World Cup." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{nations.map((n)=><ModelProfileCard key={n.country} nation={n} />)}</div></main>;
}
