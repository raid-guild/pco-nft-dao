export type Plot = {
  id: number;
  owner?: string;
  staked: number;
  status: PlotStatus;
};

export enum PlotStatus {
  Forclosed = "forclosed",
  Owned = "owned",
  Undiscovered = "undiscovered",
}
