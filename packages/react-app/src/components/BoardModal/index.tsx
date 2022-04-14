import Button from "components/Button";
import close from "images/close.svg";
import { capitalize } from "lodash";
import styled from "styled-components";
import { Plot, PlotStatus } from "views/Game/types";

// type ModalBodyProps = {};

type BoardModalProps = {
  onClose: () => void;
  onSectionInteraction: () => void;
  open: boolean;
  sectionData: Plot;
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
  if (!open) return <></>;
  return (
    <ModalBody>
      <Close alt="Close" onClick={() => onClose()} src={close} />
      <Content>
        <div>
          <Text>Section ID: {sectionData.id}</Text>
          <Text>Status: {capitalize(sectionData.status)}</Text>
        </div>
      </Content>
      <ActionContainer>
        {sectionData.status === PlotStatus.Undiscoverd && (
          <Button onChange={onSectionInteraction} text="Discover" />
        )}
      </ActionContainer>
    </ModalBody>
  );
}
