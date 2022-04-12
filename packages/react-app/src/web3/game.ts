import { BigNumber, constants, Contract, providers, utils } from "ethers";
import { HARBERGER_CONTRACT, WEENUS_CONTRACT } from "utils/constants";

import { allowance, approve } from "./erc20";

export const discover = async (
  provider: providers.Web3Provider,
  to: string,
  plotId: number,
  amount: BigNumber,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface([
    "function discover(address _to, uint256 _plotId, uint256 _amount) public",
  ]);
  const harberAllowance = await allowance(
    provider,
    WEENUS_CONTRACT,
    to,
    HARBERGER_CONTRACT,
  );
  if (!+harberAllowance) {
    const tx = await approve(
      provider,
      HARBERGER_CONTRACT,
      WEENUS_CONTRACT,
      constants.MaxUint256,
    );
    await tx.wait();
  }
  const game = new Contract(HARBERGER_CONTRACT, abi, provider.getSigner());
  return game.discover(to, plotId, amount);
};
