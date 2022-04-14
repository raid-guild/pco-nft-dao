import { ReactComponent as FireLamp } from "assets/icons/fire_lamp.svg";
import RaidLogo from "assets/images/raidguild__logo.png";
import React from "react";
import styled from "styled-components";

const Header = styled.header`
  height: 5rem;
  padding: 1rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
`;

const Logo = styled.img`
  height: 2.5rem;
  object-fit: cover;
`;

const Navigation: React.FC = () => {
  return (
    <Header>
      <a
        href="https://app.daohaus.club/dao/0x4/0xA9fC78DC011BF8BeF3909fBaC59dE735F673f15b"
        target="_blank"
        rel="noreferrer"
      >
        <Logo src={RaidLogo} alt="" />
      </a>
      <FireLamp
        height={60}
        onClick={() => {
          console.log("Click");
        }}
      />
    </Header>
  );
};

export default Navigation;
