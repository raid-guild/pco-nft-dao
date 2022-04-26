import Button from "components/Button";
import StatDisplay from "components/StatDisplay";
import { useWallet } from "contexts/WalletContext";
import close from "images/close.svg";
import plotImage from "images/picomap.jpg";
import { capitalize } from "lodash";
import { useEffect, useMemo, useState } from "react";
// mport { useEffect } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { toBigNumber, truncateAddress } from "utils";
import { DISCOVER_FEE } from "utils/constants";
import { Plot, PlotStatus } from "views/Game/types";
import {
  deposit,
  discover,
  getPlot,
  getTokenURI,
  setPrice,
  unstake,
} from "web3/game";

type BoardModalProps = {
  onClose: () => void;
  open: boolean;
  plot: Plot;
};

type ImageProps = {
  height: number;
  width: number;
  xShift: number;
  yShift: number;
};

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 32px;
`;

const Content = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  padding-inline: 16px;
`;

const Close = styled.img`
  cursor: pointer;
  display: block;
  height: 24px;
  margin-left: auto;
  user-select: none;
  width: 24px;
`;

const Image = styled.img<ImageProps>`
  height: ${({ height }: { height: number }) => `${height}px`};
  left: ${({ xShift }: { xShift: number }) => `${xShift}px`};
  position: relative;
  top: ${({ yShift }: { yShift: number }) => `${yShift}px`};
  width: ${({ width }: { width: number }) => `${width}px`};
`;

const ImageContainer = styled.div`
  height: 150px;
  overflow: hidden;
  width: 150px;
`;

const ModalBody = styled.div`
  background-color: #c4c4c4;
  border-radius: 8px;
  box-shadow: 10px 10px 14px 3px rgba(255, 255, 255, 0.5);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
  height: 300px;
  left: 40px;
  padding: 16px;
  position: absolute;
  top: 40px;
  width: 500px;
  zindex: 100;

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// const PlotImage = styled.img<PlotImageProps>`
//   // clip-path: ${({ xCrop, yCrop }) =>
//     `inset(${xCrop}% ${xCrop}% ${yCrop}% 0)`};
//   height: 150px;
//   margin-top: 12px;
//   width: 150px;
// `;

const Text = styled.div`
  color: rgba(45, 55, 72, 1);
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  margin-bottom: 8px;
`;

export default function BoardModal({
  onClose,
  open,
  plot,
}: BoardModalProps): JSX.Element {
  const { address, provider } = useWallet();
  const [, setTile] = useState<string>("");
  // const [plotdata, setPlotData] = useState<PlotData>({});

  // const buyPlot = async () => {
  //   const buyToast = toast.loading(`Buying plot ${plot.id}`);
  //   if (!address || !provider) return;
  //   // TODO: Feed from contract
  //   const price = DISCOVER_FEE * 900 * 4;
  //   try {
  //     const tx = await buy(
  //       provider,
  //       address,
  //       Number(plot.id),
  //       toBigNumber(price, 18),
  //     );
  //     await tx.wait();
  //     toast.success(`Buying plot ${plot.id}`, {
  //       id: buyToast,
  //     });
  //   } catch (err) {
  //     toast.error(`Error buying plot ${plot.id}`, {
  //       id: buyToast,
  //     });
  //   }
  // };

  const imageEdit = useMemo(() => {
    // Amount to scale image based on set width
    if (plot.id === undefined)
      return { height: 0, width: 0, xShift: 0, yShift: 0 };
    const plotWidth = 40;
    const imageScale = 150 / plotWidth;
    const height = 960 * imageScale;
    const width = 960 * imageScale;
    const xShift = (plot.id % 24) * imageScale * plotWidth * -1;
    const yShift = Math.floor(plot.id / 24) * imageScale * plotWidth * -1;
    return { height, width, xShift, yShift };
  }, [plot]);

  const depositInPlot = async () => {
    const depositToast = toast.loading(`Depositing in plot ${plot.id}`);
    if (!address || !provider) return;
    // TODO: Add user input
    const depositAmount = DISCOVER_FEE * 900;
    const periods = depositAmount / 3;
    try {
      const tx = await deposit(
        provider,
        address,
        periods,
        Number(plot.id),
        toBigNumber(depositAmount, 18),
      );
      await tx.wait();
      toast.success(`Depositing in plot ${plot.id}`, {
        id: depositToast,
      });
    } catch (err) {
      toast.error(`Error depositing plot ${plot.id}`, {
        id: depositToast,
      });
    }
  };

  const discoverPlot = async () => {
    const discoverToast = toast.loading(`Discovering plot ${plot.id}`);
    if (!address || !provider) return;
    try {
      const tx = await discover(
        provider,
        address,
        Number(plot.id),
        toBigNumber(DISCOVER_FEE, 18),
      );
      await tx.wait();
      toast.success(`Discovered plot ${plot.id}`, {
        id: discoverToast,
      });
    } catch (err) {
      toast.error(`Error discovering plot ${plot.id}`, {
        id: discoverToast,
      });
    }
  };

  const setPlotPrice = async () => {
    const unstakeToast = toast.loading(`Setting price for plot ${plot.id}`);
    if (!address || !provider) return;
    try {
      // TODO: Add user input
      const price = DISCOVER_FEE * 900 * 4;
      const tx = await setPrice(provider, plot.id, toBigNumber(price, 18));
      await tx.wait();
      toast.success(`Set price for plot ${plot.id}`, {
        id: unstakeToast,
      });
    } catch (err) {
      toast.error("Error setting price", {
        id: unstakeToast,
      });
    }
  };

  const unstakePlot = async () => {
    const unstakeToast = toast.loading(`Unstaking plot ${plot.id}`);
    if (!address || !provider) return;
    try {
      const tx = await unstake(provider, plot.id);
      await tx.wait();
      toast.success(`Unstaking plot ${plot.id}`, {
        id: unstakeToast,
      });
    } catch (err) {
      toast.error(`Error unstaking plot ${plot.id}`, {
        id: unstakeToast,
      });
    }
  };

  // TODO: add type for any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const plotInteractions: { [key in PlotStatus]: any[] } = {
    forclosed: [{ action: depositInPlot, text: "Deposit" }],
    owned: [
      { action: depositInPlot, text: "Deposit" },
      { action: unstakePlot, text: "Unstake" },
      { action: setPlotPrice, text: "Set Price" },
    ],
    undiscovered: [{ action: discoverPlot, text: "Discover" }],
  };

  useEffect(() => {
    if (!open) return;
    (async () => {
      if (!provider) return;

      try {
        const plotData = await getPlot(provider, plot.id);
        const uriData = await getTokenURI(provider, plot.id);
        const jsonString = atob(uriData.toString().split(";base64,")[1]);
        const parseJson = JSON.parse(jsonString);
        console.log("plotData", plotData);
        console.log("image", parseJson.image);

        setTile(parseJson.image);
      } catch (err) {
        console.log(err);

        setTile("");
      }
    })();
  }, [open, plot, provider]);

  if (!open) return <></>;
  return (
    <ModalBody>
      <Close alt="Close" onClick={() => onClose()} src={close} />
      <Content>
        <div>
          <Text>Section ID: {plot.id}</Text>
          <Text>Status: {capitalize(plot.status)}</Text>
          <ImageContainer>
            <Image
              alt="Map Section"
              height={imageEdit.height}
              src={plotImage}
              width={imageEdit.width}
              xShift={imageEdit.xShift}
              yShift={imageEdit.yShift}
            />
          </ImageContainer>
          {/* <PlotImage
            alt="Plot"
            src={tile || plotImage}
            xCrop={xCrop}
            yCrop={yCrop}
          /> */}
        </div>
        {plot.status !== PlotStatus.Undiscovered && (
          <div>
            <StatDisplay
              label="Owner"
              value={plot.owner ? truncateAddress(plot.owner) : ""}
            />
            <StatDisplay label="Staked" value={plot.staked.toString()} />
          </div>
        )}
      </Content>
      <ActionContainer>
        {(plot.status === PlotStatus.Undiscovered || plot.owner === address) &&
          plotInteractions[plot.status].map(({ action, text }) => (
            <Button key={text} onChange={action} text={text} />
          ))}
      </ActionContainer>
    </ModalBody>
  );
}
