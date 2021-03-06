import { PlotStatus } from "./types";

export const plotColor = (status: PlotStatus): string => {
  switch (status) {
    case PlotStatus.Owned:
      return "transparent";
    case PlotStatus.Forclosed:
      return "#951008";
    default:
      return "#000000";
  }
};
