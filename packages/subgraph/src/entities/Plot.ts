import { Plot } from '../types/schema';

export function ensurePlot(id: string): Plot {
  let plot = Plot.load(id);
  if (plot) {
    return plot;
  }

  plot = new Plot(id);
  return plot;
}
