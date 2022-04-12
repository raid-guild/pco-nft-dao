import { useQuery } from "@apollo/client";
import BoardModal from "components/BoardModal";
import Button from "components/Button";
import Spinner from "components/Spinner";
import StatDisplay from "components/StatDisplay";
import { useWallet } from "contexts/WalletContext";
import { Plots } from "graphql/queries";
import background from "images/boardBackground.svg";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { toBigNumber, truncateAddress } from "utils";
import { DISCOVER_FEE } from "utils/constants";
import { discover } from "web3/game";

import { gridSectionColor } from "./helpers";
import { Plot, PlotStatus } from "./types";

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
  const {
    address,
    connectWallet,
    disconnect,
    isConnected,
    isConnecting,
    provider,
  } = useWallet();
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const { data: plotData, error, loading: loadingPlots } = useQuery(Plots);

  const handlePlotInteraction = async () => {
    if (!address || !provider || !selectedPlot) return;
    switch (selectedPlot.status) {
      default: {
        const discoverToast = toast.loading(
          `Discovering plot ${selectedPlot.id}`,
        );
        try {
          const tx = await discover(
            provider,
            address,
            Number(selectedPlot.id),
            toBigNumber(DISCOVER_FEE, 18),
          );
          await tx.wait();
          toast.success(`Discovered plot ${selectedPlot.id}`, {
            id: discoverToast,
          });
        } catch (err) {
          toast.error(`Error discovering plot ${selectedPlot.id}`, {
            id: discoverToast,
          });
        }
      }
    }
  };

  const plotId = (row: number, col: number): number => {
    return row * 24 + col;
  };

  const plots = useMemo(() => {
    if (!plotData) return [];
    const plotMap = Object.fromEntries(
      plotData.plots.map((plot: Plot) => [plot.id, { status: plot.status }]),
    );
    return new Array(24).fill(0).map((_, row) =>
      new Array(24).fill(0).map((_, col) => {
        const id = plotId(row, col);
        const plot = plotMap[id];
        return {
          id,
          // If plot is not in map then it has not been discovered
          status: plot?.status.toLowerCase() ?? PlotStatus.Undiscoverd,
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
                    color={gridSectionColor(plot.status as PlotStatus)}
                    key={plot.id}
                    onClick={() => setSelectedPlot(plot)}
                    selected={plot.id === selectedPlot?.id}
                  />
                ))}
              </BoardRow>
            ))}
          </>
        )}
        <BoardModal
          onClose={() => setSelectedPlot(null)}
          onSectionInteraction={() => handlePlotInteraction()}
          open={!!selectedPlot}
          sectionData={selectedPlot ?? ({} as Plot)}
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
