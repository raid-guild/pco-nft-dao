import Button from "components/Button";
import StatDisplay from "components/StatDisplay";
import React from "react";
import styled from "styled-components";
import { truncateAddress } from "utils";

const DUMMY_STATS = [
  { label: "Land Purchased", value: "540 of 900" },
  { label: "Average Price per NFT", value: "21.45 DAI" },
  { label: "Taxes Collected", value: "7823 DAI" },
  { label: "Taxes Owing", value: "560 DAI" },
  { label: "DAO Shares Issued", value: "500" },
  { label: "Loot Issued", value: "4000" },
  { label: "Total Owners", value: "28" },
  { label: "Tax Rate", value: "3%" },
];

const StatBar = styled.div`
  background: #b9b9b9;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 10px;
  padding-inline: 24px;
  width: 360px;
`;

const Address = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 16px;
  text-align: center;
`;

type Props = {
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  address: string | null | undefined;
  isConnected: boolean;
  isConnecting: boolean;
};

const SideBar: React.FC<Props> = props => {
  return (
    <StatBar>
      {DUMMY_STATS.map(stat => (
        <StatDisplay key={stat.label} label={stat.label} value={stat.value} />
      ))}
      <Button
        loginButton
        onChange={() =>
          props.isConnected
            ? props.disconnect()
            : props.isConnecting
            ? () => null
            : props.connectWallet()
        }
        style={{ margin: "24px auto 0 auto", width: "fit-content" }}
        text={
          props.isConnected
            ? "Log Out"
            : props.isConnecting
            ? "Logging in..."
            : "Log In"
        }
      />
      {props.address && (
        <Address>Address: {truncateAddress(props.address)}</Address>
      )}
    </StatBar>
  );
};

export default SideBar;
