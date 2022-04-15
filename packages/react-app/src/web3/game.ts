import { BigNumber, constants, Contract, providers, utils } from "ethers";
import { HARBERGER_CONTRACT, WEENUS_CONTRACT } from "utils/constants";

import { allowance, approve } from "./erc20";

const plotReturn = [
  "address",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
  "uint24",
];

const uriReturn = ["string"];

const checkHarberAllowance = async (
  provider: providers.Web3Provider,
  user: string,
) => {
  const harberAllowance = await allowance(
    provider,
    WEENUS_CONTRACT,
    user,
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
};

export const buy = async (
  provider: providers.Web3Provider,
  to: string,
  plotId: number,
  amount: BigNumber,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface([
    "function buy(address _to, uint256 _plotId, uint256 _amount) public",
  ]);
  await checkHarberAllowance(provider, to);
  const game = new Contract(HARBERGER_CONTRACT, abi, provider.getSigner());
  return game.buy(plotId, plotId, amount);
};

export const deposit = async (
  provider: providers.Web3Provider,
  address: string,
  periods: number,
  plotId: number,
  amount: BigNumber,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface([
    "function deposit(uint256 _plotId, uint256 _periods, uint256 _amount) public",
  ]);
  await checkHarberAllowance(provider, address);
  const game = new Contract(HARBERGER_CONTRACT, abi, provider.getSigner());
  return game.deposit(plotId, periods, amount);
};

export const discover = async (
  provider: providers.Web3Provider,
  to: string,
  plotId: number,
  amount: BigNumber,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface([
    "function discover(address _to, uint256 _plotId, uint256 _amount) public",
  ]);
  await checkHarberAllowance(provider, to);
  const game = new Contract(HARBERGER_CONTRACT, abi, provider.getSigner());
  return game.discover(to, plotId, amount);
};

export const getPlot = async (
  provider: providers.Web3Provider,
  plotId: number,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface([
    `function plots(uint256 _plotId) public view returns(${plotReturn.toString()})`,
  ]);
  const game = new Contract(HARBERGER_CONTRACT, abi, provider);
  return game.plots(plotId);
};

export const getTokenURI = async (
  provider: providers.Web3Provider,
  plotId: number,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface([
    `function tokenURI(uint256 _plotId) public view returns(${uriReturn.toString()})`,
  ]);
  const game = new Contract(HARBERGER_CONTRACT, abi, provider);
  return game.tokenURI(plotId);
};

export const setPrice = async (
  provider: providers.Web3Provider,
  plotId: number,
  price: BigNumber,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface([
    "function setPrice(uint256 _plotId, uint256 _price) public",
  ]);
  const game = new Contract(HARBERGER_CONTRACT, abi, provider.getSigner());
  return game.disc(plotId, price);
};

export const unstake = async (
  provider: providers.Web3Provider,
  plotId: number,
): Promise<providers.TransactionResponse> => {
  const abi = new utils.Interface(["function unstake(uint256 _plotId) public"]);
  const game = new Contract(HARBERGER_CONTRACT, abi, provider.getSigner());
  return game.unstake(plotId);
};
