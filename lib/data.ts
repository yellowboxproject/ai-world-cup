import { Nation } from "@/lib/types";

const makeNation = (
  country: string,
  flag: string,
  modelName: string,
  group: string,
  number: number,
  image: string
): Nation => ({
  country,
  flag,
  modelName,
  group,
  number,
  votes: 0,
  status: "Playing Soon",
  image
});

export const nations: Nation[] = [
  // Group A
  makeNation("Mexico", "🇲🇽", "Sofia", "A", 1, "/models/sofia-mexico.webp"),
  makeNation("South Africa", "🇿🇦", "Melokuhle", "A", 2, "/models/melokuhle-south-africa.webp"),
  makeNation("South Korea", "🇰🇷", "Ha-Yoon", "A", 3, "/models/ha-yoon-south-korea.webp"),
  makeNation("Czech Republic", "🇨🇿", "Eliska", "A", 4, "/models/eliska-czech-republic.webp"),

  // Group B
  makeNation("Canada", "🇨🇦", "Emma", "B", 5, "/models/emma-canada.webp"),
  makeNation("Bosnia & Herzegovina", "🇧🇦", "Sara", "B", 6, "/models/sara-bosnia-and-herzegovina.webp"),
  makeNation("Qatar", "🇶🇦", "Noora", "B", 7, "/models/noora-qatar.webp"),
  makeNation("Switzerland", "🇨🇭", "Elena", "B", 8, "/models/elena-switzerland.webp"),

  // Group C
  makeNation("Brazil", "🇧🇷", "Isadora", "C", 9, "/models/isadora-brazil.webp"),
  makeNation("Morocco", "🇲🇦", "Ines", "C", 10, "/models/ines-morocco.webp"),
  makeNation("Haiti", "🇭🇹", "Marie", "C", 11, "/models/marie-haiti.webp"),
  makeNation("Scotland", "🏴", "Freya", "C", 12, "/models/freya-scotland.webp"),

  // Group D
  makeNation("USA", "🇺🇸", "Cassie", "D", 13, "/models/cassie-usa.webp"),
  makeNation("Paraguay", "🇵🇾", "Micaela", "D", 14, "/models/micaela-paraguay.webp"),
  makeNation("Australia", "🇦🇺", "Charlotte", "D", 15, "/models/charlotte-australia.webp"),
  makeNation("Türkiye", "🇹🇷", "Elif", "D", 16, "/models/elif-turkiye.webp"),

  // Group E
  makeNation("Germany", "🇩🇪", "Andrea", "E", 17, "/models/andrea-germany.webp"),
  makeNation("Curaçao", "🇨🇼", "Kiara", "E", 18, "/models/kiara-curacao.webp"),
  makeNation("Côte d'Ivoire", "🇨🇮", "Awa", "E", 19, "/models/awa-cote-d-ivoire.webp"),
  makeNation("Ecuador", "🇪🇨", "Danna", "E", 20, "/models/danna-ecuador.webp"),

  // Group F
  makeNation("Netherlands", "🇳🇱", "Anouk", "F", 21, "/models/anouk-netherlands.webp"),
  makeNation("Japan", "🇯🇵", "Aiko", "F", 22, "/models/aiko-japan.webp"),
  makeNation("Sweden", "🇸🇪", "Annika", "F", 23, "/models/annika-sweden.webp"),
  makeNation("Tunisia", "🇹🇳", "Nour", "F", 24, "/models/nour-tunisia.webp"),

  // Group G
  makeNation("Belgium", "🇧🇪", "Lina", "G", 25, "/models/lina-belgium.webp"),
  makeNation("Egypt", "🇪🇬", "Kenza", "G", 26, "/models/kenza-egypt.webp"),
  makeNation("Iran", "🇮🇷", "Zahra", "G", 27, "/models/zahra-iran.webp"),
  makeNation("New Zealand", "🇳🇿", "Amelia", "G", 28, "/models/amelia-new-zealand.webp"),

  // Group H
  makeNation("Spain", "🇪🇸", "Alba", "H", 29, "/models/alba-spain.webp"),
  makeNation("Cabo Verde", "🇨🇻", "Joana", "H", 30, "/models/joana-cabo-verde.webp"),
  makeNation("Saudi Arabia", "🇸🇦", "Malika", "H", 31, "/models/malika-saudi-arabia.webp"),
  makeNation("Uruguay", "🇺🇾", "Martina", "H", 32, "/models/martina-uruguay.webp"),

  // Group I
  makeNation("France", "🇫🇷", "Jeanne", "I", 33, "/models/jeanne-france.webp"),
  makeNation("Senegal", "🇸🇳", "Fatou", "I", 34, "/models/fatou-senegal.webp"),
  makeNation("Iraq", "🇮🇶", "Zainab", "I", 35, "/models/zainab-iraq.webp"),
  makeNation("Norway", "🇳🇴", "Lene", "I", 36, "/models/lene-norway.webp"),

  // Group J
  makeNation("Argentina", "🇦🇷", "Blanca", "J", 37, "/models/blanca-argentina.webp"),
  makeNation("Algeria", "🇩🇿", "Safia", "J", 38, "/models/safia-algeria.webp"),
  makeNation("Austria", "🇦🇹", "Hanna", "J", 39, "/models/hanna-austria.webp"),
  makeNation("Jordan", "🇯🇴", "Latifa", "J", 40, "/models/latifa-jordan.webp"),

  // Group K
  makeNation("Portugal", "🇵🇹", "Gina", "K", 41, "/models/gina-portugal.webp"),
  makeNation("DR Congo", "🇨🇩", "Bijou", "K", 42, "/models/bijou-dr-congo.webp"),
  makeNation("Uzbekistan", "🇺🇿", "Madina", "K", 43, "/models/madina-uzbekistan.webp"),
  makeNation("Colombia", "🇨🇴", "Salomé", "K", 44, "/models/salome-colombia.webp"),

  // Group L
  makeNation("England", "🏴", "Ellie", "L", 45, "/models/ellie-england.webp"),
  makeNation("Croatia", "🇭🇷", "Marija", "L", 46, "/models/marija-croatia.webp"),
  makeNation("Ghana", "🇬🇭", "Ewe", "L", 47, "/models/ewe-ghana.webp"),
  makeNation("Panama", "🇵🇦", "Anarosa", "L", 48, "/models/anarosa-panama.webp")
];

export const groups = Array.from({ length: 12 }, (_, i) => String.fromCharCode(65 + i)).map((group) => ({
  group,
  teams: nations.filter((nation) => nation.group === group)
}));

export const featuredMatch = {
  stage: "Opening Match",
  home: nations[0],
  away: nations[1],
  homeVotePct: 0,
  awayVotePct: 0,
  countdown: "02D : 11H : 43M"
};
