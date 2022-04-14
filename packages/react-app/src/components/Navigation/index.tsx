import React from "react";
import styled from "styled-components";
import { ReactComponent as Feather } from "../../assets/icons/feather_scribe.svg";
import { ReactComponent as FireLamp } from "../../assets/icons/fire_lamp.svg";

import RaidLogo from "../../assets/images/raidguild__logo.png";

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
        href="https://app.daohaus.club/dao/0x4/0x30C4734A367EdF13e7e1E6BEE734325174d562b5"
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
