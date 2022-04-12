import { BigNumber, Contract, providers, utils } from "ethers";

export const discover = async (
    provider: providers.Web3Provider,
    to: string,
    plotId: number,
    amount: BigNumber,
): Promise<providers.TransactionResponse> => {
    const abi = new utils.Interface([
        "function discover(address _to, uint256 _plotId, uint256 _amount) public",
    ]);
    // TODO: Remove hardcode
    const game = new Contract("0x3249eee788c1d4d339fba59746dea8d1a0906293", abi, provider.getSigner());
    return game.discover(to, plotId, amount);
};
