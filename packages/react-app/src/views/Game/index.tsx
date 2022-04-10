import StatDisplay from "components/StatDisplay";
import styled from "styled-components";

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

const BoardSection = styled.div`
background: 
  height: 24px;
  width: 24px;
`;

const GameBoard = styled.div`
  height: 960px;
  width: 960px;
`;

const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  return (
    <GameContainer>
      <GameBoard></GameBoard>
      <StatBar>
        {DUMMY_STATS.map(stat => (
          <StatDisplay key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </StatBar>
    </GameContainer>
  );
}
