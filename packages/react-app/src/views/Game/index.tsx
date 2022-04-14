import { useQuery } from "@apollo/client";
import BirdLogo from "assets/images/pico_logo.png";
import BoardModal from "components/BoardModal";
import Button from "components/Button";
import Spinner from "components/Spinner";
import StatDisplay from "components/StatDisplay";
import { useWallet } from "contexts/WalletContext";
import { Plots } from "graphql/queries";
import background from "images/boardBackground.svg";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { truncateAddress } from "utils";

import { plotColor } from "./helpers";
import { Plot, PlotStatus } from "./types";

const DUMMY_STATS = [
  { label: "Land Purchased", value: "540 of 900" },
  { label: "Average Price per NFT", value: "21.45 DAI" },
  { label: "Taxes Collected", value: "7823 DAI" },
  { label: "DAO Shares Issued", value: "500" },
  { label: "Loot Issued", value: "4000" },
  { label: "Total Owners", value: "28" },
  { label: "Tax Rate", value: "3%" },
];

type PlotProps = {
  color: string;
  discovered: boolean;
  owner: boolean;
  selected: boolean;
};

const Address = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 16px;
  text-align: center;
`;

const BoardOverlay = styled.div`
  align-items: center;
  background-color: #000000;
  display: flex;
  height: 100%;
  justify-content: center;
  opacity: 0.8;
  width: 100%;
`;

const BoardTextContainer = styled.div`
  align-items: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  font-size: 30px;
  gap: 24px;
  margin-top: -200px;
`;

const BoardRow = styled.div`
  display: flex;
`;

const BoardSection = styled.div<PlotProps>`
  background-color: ${({ color }) => color};
  border: 1px solid ${({ owner }) => (owner ? "#FFF94F" : "transparent")};
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
  width: 960px;
`;

const GameContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 996px;
  padding: 5px;
  border: 2px solid #ff3864;
  &:before,
  &:after {
    content: "•";
    position: absolute;
    width: 14px;
    height: 14px;
    font-size: 14px;
    color: #b78846;
    border: 2px solid #ff3864;
    line-height: 12px;
    top: 5px;
    text-align: center;
  }
  &:before {
    left: 5px;
  }
  &:after {
    right: 5px;
  }
`;

// const GameContainerInner = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 2px solid #ff3864;
//   padding: 16px;
//   &:before,
//   &:after {
//     content: "•";
//     position: absolute;
//     width: 14px;
//     height: 14px;
//     font-size: 14px;
//     color: #b78846;
//     border: 2px solid #ff3864;
//     line-height: 12px;
//     bottom: -2px;
//     text-align: center;
//   }
//   &:before {
//     left: -2px;
//   }
//   &:after {
//     right: -2px;
//   }
// `;

type StatBarProps = {
  isNavbarVisable: boolean;
};

const StatBar = styled.div<StatBarProps>`
  background: #b9b9b9;
  width: 260px;
  height: 100vh;
  display: flex;
  position: fixed;
  flex-direction: column;
  top: 0;
  right: ${props => (props.isNavbarVisable ? "0" : "-100%")};
  padding: 0;
  flex-shrink: 0;
  gap: 14px;
  padding: 2.5rem 24px;
  transition: 850ms;
  zindex: 100;
`;

const Pico = styled.div`
  padding-top: 20px;
  align-self: center;
`;

export default function Game(): JSX.Element {
  const { address, connectWallet, disconnect, isConnected, isConnecting } =
    useWallet();
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [isNavbarVisable, setIsNavbarVisable] = useState<boolean>(true);

  const { data: plotData, error, loading: loadingPlots } = useQuery(Plots);

  const plotId = (row: number, col: number): number => {
    return row * 24 + col;
  };

  const plots = useMemo(() => {
    if (!plotData) return [];
    const plotMap = Object.fromEntries(
      plotData.plots.map((plot: Plot) => [
        plot.id,
        { owner: plot.owner, staked: plot.staked, status: plot.status },
      ]),
    );
    return new Array(24).fill(0).map((_, row) =>
      new Array(24).fill(0).map((_, col) => {
        const id = plotId(row, col);
        const plot = plotMap[id];
        return {
          id,
          owner: plot?.owner,
          staked: plot?.staked ?? 0,
          status: plot?.status.toLowerCase() ?? PlotStatus.Undiscovered,
        };
      }),
    );
  }, [plotData]);

  return (
    <GameContainer>
      <GameBoard>
        {error && (
          <BoardOverlay>
            <BoardTextContainer>Error fetching game state.</BoardTextContainer>
          </BoardOverlay>
        )}
        {loadingPlots ? (
          <BoardOverlay>
            <BoardTextContainer>
              <>Fetching game state...</>
              <Spinner color="#ffffff" height={50} width={50} />
            </BoardTextContainer>
          </BoardOverlay>
        ) : (
          <>
            {plots.map((row, rowIndex) => (
              <BoardRow key={rowIndex}>
                {row.map(plot => (
                  <BoardSection
                    color={plotColor(plot.status as PlotStatus)}
                    discovered={plot.status !== PlotStatus.Undiscovered}
                    key={plot.id}
                    onClick={() => setSelectedPlot(plot)}
                    owner={address ? address === plot.owner : false}
                    selected={plot.id === selectedPlot?.id}
                  />
                ))}
              </BoardRow>
            ))}
          </>
        )}
        <BoardModal
          onClose={() => setSelectedPlot(null)}
          open={!!selectedPlot}
          plot={selectedPlot ?? ({} as Plot)}
        />
      </GameBoard>
      <StatBar isNavbarVisable={isNavbarVisable}>
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
        <Pico>
          <img src={BirdLogo} alt="" />
        </Pico>
      </StatBar>
    </GameContainer>
  );
}
