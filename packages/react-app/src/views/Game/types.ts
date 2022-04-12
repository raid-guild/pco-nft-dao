export type Plot = {
  id: number;
  status: PlotStatus;
};

export enum PlotStatus {
  Forclosure = "forclosure",
  Owned = "owned",
  Undiscoverd = "undiscovered",
}
