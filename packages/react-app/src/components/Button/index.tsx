import { useWallet } from "contexts/WalletContext";
import toast from "react-hot-toast";
import styled from "styled-components";

import buttonIcon from "./images/buttonIcon.svg";

const Container = styled.button`
  align-items: center;
  background-color: #e2e8f0;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #2d3748;
  cursor: pointer;
  display: flex;
  font-weight: 600;
  gap: 9px;
  padding: 10px 24px;
`;

type ButtonProps = {
  hideIcon?: boolean;
  onChange: () => void;
  text: string;
};

export default function Button({
  hideIcon,
  onChange,
  text,
}: ButtonProps): JSX.Element {
  const { isConnected } = useWallet();

  const handleChange = () => {
    if (isConnected) {
      onChange();
    } else {
      toast.error("Wallet not conneced.", { position: "top-left" });
    }
  };

  return (
    <Container onClick={() => handleChange()}>
      {!hideIcon && <img alt="Atom" src={buttonIcon} />}
      <div>{text}</div>
    </Container>
  );
}
