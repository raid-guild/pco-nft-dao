import BoardModal from "components/BoardModal";
import Button from "components/Button";
import StatDisplay from "components/StatDisplay";
import { useWallet } from "contexts/WalletContext";
import background from "images/boardBackground.svg";
import { useState } from "react";
import styled from "styled-components";
import { truncateAddress } from "utils";

import { gridSectionColor } from "./helpers";
import { BoardSection as BoardSectionType, SectionStatus } from "./types";

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

type GameSectionProps = {
  color: string;
  selected: boolean;
};

const Address = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 16px;
  text-align: center;
`;

const BoardRow = styled.div`
  display: flex;
`;

const BoardSection = styled.div<GameSectionProps>`
  background-color: ${({ color }) => color};
  cursor: pointer;
  height: 40px;
  opacity: ${({ selected }) => (selected ? 0 : 0.6)};
  transition: opacity 0.3s;
  width: 40px;
  &:hover {
    opacity: 0;
  }
`;

const GameBoard = styled.div`
  background-image: url(${background});
  height: 960px;
  position: relative;
  width: 960px;
`;

const GameContainer = styled.div`
  display: flex;
`;

const StatBar = styled.div`
  background: #b9b9b9;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 10px;
  padding-inline: 24px;
  width: 360px;
`;

export default function Game(): JSX.Element {
  const { address, connectWallet, disconnect, isConnected, isConnecting } =
    useWallet();
  const [selectedSection, setSelectedSection] =
    useState<BoardSectionType | null>(null);

  const handleSectionInteraction = async () => {
    if (!selectedSection) return;
    switch (selectedSection.status) {
      default:
        // Discover
        console.log("DISCOVER");
        break;
    }
  };

  const handleSectionSelect = (pos: number) => {
    setSelectedSection({ id: pos, status: SectionStatus.Undiscoverd });
  };

  return (
    <GameContainer>
      <GameBoard>
        {new Array(24).fill(0).map((_, rowIndex) => (
          <BoardRow key={rowIndex}>
            {new Array(24).fill(0).map((_, colIndex) => {
              return (
                <BoardSection
                  // TODO: Get section status from subgraph
                  color={gridSectionColor("undiscovered" as SectionStatus)}
                  key={colIndex}
                  onClick={() => handleSectionSelect(rowIndex * 24 + colIndex)}
                  selected={rowIndex * 24 + colIndex === selectedSection?.id}
                />
              );
            })}
          </BoardRow>
        ))}
        <BoardModal
          onClose={() => setSelectedSection(null)}
          onSectionInteraction={() => handleSectionInteraction()}
          open={!!selectedSection}
          sectionData={selectedSection ?? ({} as BoardSectionType)}
        />
      </GameBoard>
      <StatBar>
        {DUMMY_STATS.map(stat => (
          <StatDisplay key={stat.label} label={stat.label} value={stat.value} />
        ))}
        <Button
          loginButton
          onChange={() =>
            isConnected
              ? disconnect()
              : isConnecting
              ? () => null
              : connectWallet()
          }
          style={{ margin: "24px auto 0 auto", width: "fit-content" }}
          text={
            isConnected ? "Log Out" : isConnecting ? "Logging in..." : "Log In"
          }
        />
        {address && <Address>Address: {truncateAddress(address)}</Address>}
      </StatBar>
    </GameContainer>
  );
}
