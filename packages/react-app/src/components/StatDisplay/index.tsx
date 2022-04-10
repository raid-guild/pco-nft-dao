import styled from "styled-components";

const Label = styled.div`
  color: rgba(45, 55, 72, 1);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 8px;
`;

const Container = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.36);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding: 6px 12px;
`;

type StatDisplayProps = {
  label: string;
  value: string;
};

export default function StatDisplay({
  label,
  value,
}: StatDisplayProps): JSX.Element {
  return (
    <div>
      <Label>{label}</Label>
      <Container>{value}</Container>
    </div>
  );
}
