import { NetworkConfig } from "contexts/WalletContext";

const { REACT_APP_RINKEBY_RPC: RINKEBY_RPC } = process.env;

export const EXPLORERS: { [key: string]: string } = {
  "0x4": "https://rinkeby.etherscan.io/",
};

export const RPCS: { [key: string]: string } = {
  "0x4": RINKEBY_RPC ?? "",
};

export const NETWORKS: NetworkConfig = {
  "0x4": {
    chainId: "4",
    name: "Rinkeby",
    symbol: "ETH",
    explorer: EXPLORERS["0x4"],
    rpc: RPCS["0x4"],
  },
};
