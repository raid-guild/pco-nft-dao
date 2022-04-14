import Button from "components/Button";
import { useWallet } from "contexts/WalletContext";
import plotImage from "images/boardBackground.svg";
import close from "images/close.svg";
import { capitalize } from "lodash";
import toast from "react-hot-toast";
import styled from "styled-components";
import { toBigNumber } from "utils";
import { DISCOVER_FEE } from "utils/constants";
import { Plot, PlotStatus } from "views/Game/types";
import { discover } from "web3/game";

type BoardModalProps = {
  onClose: () => void;
  open: boolean;
  plot: Plot;
};

type PlotImageProps = {
  xCrop: number;
  yCrop: number;
};

const ActionContainer = styled.div`
  display: flex;
  gap: 81px;
  margin-top: 76px;
`;

const Content = styled.div`
  display: flex;
  height: 150px;
`;

const Close = styled.img`
  cursor: pointer;
  display: block;
  height: 24px;
  margin-left: auto;
  user-select: none;
  width: 24px;
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

const PlotImage = styled.img<PlotImageProps>`
  clip-path: ${({ xCrop, yCrop }) => `inset(${xCrop}% ${xCrop}% ${yCrop}% 0)`};
  margin-top: 24px;
`;

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
  const xCrop = (1 / 24) * (23 - (plot.id % 24)) * 100;
  const yCrop = (1 / 24) * (23 - Math.floor(plot.id / 24)) * 100;

  const handlePlotInteraction = async () => {
    if (!address || !provider) return;
    switch (plot.status) {
      default: {
        const discoverToast = toast.loading(`Discovering plot ${plot.id}`);
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
      }
    }
  };

  console.log("XCROP: ", xCrop);
  console.log("YCROP: ", yCrop);
  if (!open) return <></>;
  return (
    <ModalBody>
      <Close alt="Close" onClick={() => onClose()} src={close} />
      <Content>
        <div>
          <Text>Section ID: {plot.id}</Text>
          <Text>Status: {capitalize(plot.status)}</Text>
          <PlotImage alt="Plot" src={plotImage} xCrop={xCrop} yCrop={yCrop} />
        </div>
      </Content>
      <ActionContainer>
        {plot.status === PlotStatus.Undiscovered && (
          <Button onChange={handlePlotInteraction} text="Discover" />
        )}
      </ActionContainer>
    </ModalBody>
  );
}
