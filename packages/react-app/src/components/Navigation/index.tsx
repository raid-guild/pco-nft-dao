import React from "react";
import styled from "styled-components";

import { ReactComponent as RaidGuildLogo } from "../../images/rg-logo.svg";
import RaidLogo from "../../assets/images/raidguild__logo.png";

const Header = styled.header`
  height: 5rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
`;

const Logo = styled.img`
  fill: #ff3864;
  height: 2rem;
  object-fit: cover;
`;

const Navigation: React.FC = () => {
  return (
    <Header>
      <a
        href="https://app.daohaus.club/dao/0x4/0x30C4734A367EdF13e7e1E6BEE734325174d562b5"
        target="_blank"
        rel="noreferrer"
      >
        <Logo src={RaidLogo} alt="" />
      </a>

      <h1>X</h1>
    </Header>
  );
};

export default Navigation;
