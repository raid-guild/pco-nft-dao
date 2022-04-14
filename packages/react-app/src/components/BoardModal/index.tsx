import Button from "components/Button";
import plotImage from "images/boardBackground.svg";
import close from "images/close.svg";
import { capitalize } from "lodash";
import styled from "styled-components";
import { Plot, PlotStatus } from "views/Game/types";

type BoardModalProps = {
  onClose: () => void;
  onSectionInteraction: () => void;
  open: boolean;
  sectionData: Plot;
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
  height: 300px;
  left: 40px;
  padding: 16px;
  position: absolute;
  top: 40px;
  width: 500px;
  zindex: 100;
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
  onSectionInteraction,
  open,
  sectionData,
}: BoardModalProps): JSX.Element {
  const xCrop = (1 / 24) * (23 - (sectionData.id % 24)) * 100;
  const yCrop = (1 / 24) * (23 - Math.floor(sectionData.id / 24)) * 100;
  console.log("XCROP: ", xCrop);
  console.log("YCROP: ", yCrop);
  if (!open) return <></>;
  return (
    <ModalBody>
      <Close alt="Close" onClick={() => onClose()} src={close} />
      <Content>
        <div>
          <Text>Section ID: {sectionData.id}</Text>
          <Text>Status: {capitalize(sectionData.status)}</Text>
          <PlotImage alt="Plot" src={plotImage} xCrop={xCrop} yCrop={yCrop} />
        </div>
      </Content>
      <ActionContainer>
        {sectionData.status === PlotStatus.Undiscovered && (
          <Button onChange={onSectionInteraction} text="Discover" />
        )}
      </ActionContainer>
    </ModalBody>
  );
}
