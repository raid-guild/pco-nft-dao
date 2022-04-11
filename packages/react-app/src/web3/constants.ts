import { NetworkConfig } from "contexts/WalletContext";

const { REACT_APP_RINKEBY_RPC: RINKEBY_RPC } = process.env;

export const EXPLORERS: { [key: string]: string } = {
  "4": "https://rinkeby.etherscan.io/",
};

export const RPCS: { [key: string]: string } = {
  "4": RINKEBY_RPC ?? "",
};

export const NETWORKS: NetworkConfig = {
  "4": {
    chainId: "4",
    name: "Rinkeby",
    symbol: "ETH",
    explorer: EXPLORERS["4"],
    rpc: RPCS["4"],
  },
};
