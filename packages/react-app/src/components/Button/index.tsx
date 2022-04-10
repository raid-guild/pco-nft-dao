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
  onChange: () => void;
  text: string;
};

export default function Button({ onChange, text }: ButtonProps): JSX.Element {
  return (
    <Container onClick={onChange}>
      <img alt="Atom" src={buttonIcon} />
      <div>{text}</div>
    </Container>
  );
}
