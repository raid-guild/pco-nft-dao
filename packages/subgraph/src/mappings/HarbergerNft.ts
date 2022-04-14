import { ensurePlot } from "../entities/Plot";
import { AddStake, DiscoverFee } from "../types/HarbergerNft/HarbergerNft";

export function handleDeposit(event: AddStake): void {

}

export function handlePlotDiscovered(event: DiscoverFee): void {
    let plot = ensurePlot(event.params.plotId.toString());
    plot.owner = event.params.paidTo;
    plot.status = 'FORCLOSED'
    plot.save();
}
