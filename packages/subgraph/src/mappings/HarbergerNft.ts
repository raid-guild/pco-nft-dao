import { BigInt } from '@graphprotocol/graph-ts';
import { ensurePlot } from '../entities/Plot';
import { AddStake, Buy, DiscoverFee } from '../types/HarbergerNft/HarbergerNft';

export function handleBuy(event: Buy): void {
    let plot = ensurePlot(event.params.plotId.toString());
    plot.lastDeposit = event.params.period;
    plot.staked = BigInt.fromI32(0)
    plot.status = 'FORCLOSED';
    plot.save();
}

export function handleDeposit(event: AddStake): void {
    let plot = ensurePlot(event.params.plotId.toString());
    plot.lastDeposit = event.params.period;
    plot.staked = plot.staked.plus(event.params.amount);
    plot.status = 'OWNED';
    plot.save();
}

export function handleDiscover(event: DiscoverFee): void {
    let plot = ensurePlot(event.params.plotId.toString());
    plot.owner = event.params.paidTo;
    plot.staked = BigInt.fromI32(0)
    plot.status = 'FORCLOSED';
    plot.save();
}

export function handleUnstake(event: DiscoverFee): void {
    let plot = ensurePlot(event.params.plotId.toString());
    plot.owner = event.params.paidTo;
    plot.staked = BigInt.fromI32(0)
    plot.status = 'FORCLOSED';
    plot.save();
}
