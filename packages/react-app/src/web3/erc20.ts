import { BigNumber, Contract, providers, utils } from "ethers";

export const allowance = async (
  ethersProvider: providers.Web3Provider,
  contractAddress: string,
  accountAddress: string,
  spenderAddress: string,
): Promise<string> => {
  const abi = new utils.Interface([
    "function allowance(address, address) view returns (uint256)",
  ]);
  const tokenContract = new Contract(contractAddress, abi, ethersProvider);

  try {
    const allowance = await tokenContract.allowance(
      accountAddress,
      spenderAddress,
    );
    return allowance.toString();
  } catch (e) {
    return "0";
  }
};

export const approve = async (
  provider: providers.Web3Provider,
  spender: string,
  tokenContract: string,
  amount: BigNumber,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface([
    "function approve(address spender, uint256 amount) public returns(bool)",
  ]);

  const game = new Contract(tokenContract, abi, provider.getSigner());
  return game.approve(spender, amount);
};
