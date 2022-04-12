export type Plot = {
  id: number;
  status: PlotStatus;
};

export enum PlotStatus {
  Forclosed = "forclosed",
  Owned = "owned",
  Undiscoverd = "undiscovered",
}
