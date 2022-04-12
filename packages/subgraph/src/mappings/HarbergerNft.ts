import { ensurePlot } from "../entities/Plot";
import { DiscoverFee } from "../types/HarbergerNft/HarbergerNft";

export function handlePlotDiscovered(event: DiscoverFee): void {
    let plot = ensurePlot(event.params.plotId.toString());
    plot.status = 'FORCLOSED'
    plot.save();
}
