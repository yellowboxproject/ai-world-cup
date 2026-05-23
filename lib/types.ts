export type Status = "Qualified" | "Playing Soon" | "Locked";

export type Nation = {
  country: string;
  flag: string;
  modelName: string;
  group: string;
  number: number;
  votes: number;
  status: Status;
  image?: string;
};
