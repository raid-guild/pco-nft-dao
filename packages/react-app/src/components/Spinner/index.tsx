import styled, { keyframes } from "styled-components";

type SpinnerProps = {
  height?: number;
  width?: number;
};

const spinAnimation = keyframes`
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
`;

const spinnerContainer = styled.div<SpinnerProps>`
  display: inline-block;
  height: ${({ height }) => (height ? `${height}px` : "20px")};
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : "20px")};
`;

const spinnerInner = styled.div<SpinnerProps>`
animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite,
border: 1px solid #778FAD;
border-color: #778FAD transparent transparent transparent;
border-radius: 50%;
box-sizing: border-box;
display: block,
height: ${({ height }) => (height ? `${height}px` : "20px")};
margin: 2px;
position: absolute;
width: ${({ width }) => (width ? `${width}px` : "20px")};
&:nth-child(1) {
animation-delay: -0.45s;
}
&:nth-child(2) {
animation-delay: -0.3s;
}
&:nth-child(3) {
    animation-delay: -0.15s;
}
`;

export default function Spinner(): JSX.Element {
  return <div></div>;
}
