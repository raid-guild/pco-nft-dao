import styled, { CSSProperties, keyframes } from "styled-components";

type SpinnerProps = {
  color?: string;
  height?: number;
  style?: CSSProperties;
  width?: number;
};

const spinAnimation = keyframes`
    from { 
        transform: rotate(0deg);
    }
    to { 
        transform: rotate(360deg);
    }
`;

const SpinnerContainer = styled.div<SpinnerProps>`
  display: inline-block;
  height: ${({ height }) => (height ? `${height}px` : "20px")};
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : "20px")};
  & > div {
    height: ${({ height }) => (height ? `${height}px` : "20px")};
    width: ${({ width }) => (width ? `${width}px` : "20px")};
  }
`;

const SpinnerInner = styled.div<SpinnerProps>`
  animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border: 1px solid ${({ color }) => color ?? "#FF3864"};
  border-color: ${({ color }) => color ?? "#FF3864"} transparent transparent
    transparent;
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  margin: 2px;
  position: absolute;
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

export default function Spinner({
  color,
  height,
  style,
  width,
}: SpinnerProps): JSX.Element {
  return (
    <SpinnerContainer
      color={color}
      height={height}
      style={{ ...style }}
      width={width}
    >
      <SpinnerInner />
      <SpinnerInner />
      <SpinnerInner />
      <SpinnerInner />
    </SpinnerContainer>
  );
}
