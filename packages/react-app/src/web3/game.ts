import { BigNumber, Contract, providers, utils } from "ethers";
import { HARBERGER_CONTRACT } from "utils/constants";

export const discover = async (
  provider: providers.Web3Provider,
  to: string,
  plotId: number,
  amount: BigNumber,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface([
    "function discover(address _to, uint256 _plotId, uint256 _amount) public",
  ]);

  const game = new Contract(HARBERGER_CONTRACT, abi, provider.getSigner());
  return game.discover(to, plotId, amount);
};
