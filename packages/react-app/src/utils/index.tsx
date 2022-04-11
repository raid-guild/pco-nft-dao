import { utils } from "ethers";

export const truncateAddress = (address: string): string => {
  const account = utils.getAddress(address);
  const len = account.length;
  return `0x${account.substr(2, 4)}...${account.substr(len - 4, len - 1)}`;
};
