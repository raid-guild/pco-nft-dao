import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import RaidLogo from "../../assets/images/raidguild__logo.png";
import { AiOutlineMenu } from "react-icons/ai";

const Header = styled.header`
  height: 5rem;
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
`;

const Logo = styled.img`
  height: 2.5rem;
  object-fit: cover;
`;

const Menu = styled.div`
  cursor: pointer;
  color: red;
  display: block;
  margin-left: auto;
  user-select: none;
`;

type Props = {
  isNavbarVisable: boolean;
  setIsNavbarVisable: Dispatch<SetStateAction<boolean>>;
};

const Navigation: React.FC<Props> = props => {
  return (
    <Header>
      <a
        href="https://app.daohaus.club/dao/0x4/0x60fa6ff012ed0f05ec0196cfc114bb4ea8b22bea/members"
        target="_blank"
        rel="noreferrer"
      >
        <Logo src={RaidLogo} alt="" />
      </a>
      <Menu onClick={() => props.setIsNavbarVisable(true)}>
        <AiOutlineMenu size={32} />
      </Menu>
    </Header>
  );
};

export default Navigation;
