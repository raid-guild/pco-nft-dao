import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Navigation from "../Navigation";

const Main = styled.main`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
`;

type Props = {
  isNavbarVisable: boolean;
  setIsNavbarVisable: Dispatch<SetStateAction<boolean>>;
};

const Layout: React.FC<Props> = props => {
  return (
    <React.Fragment>
      <Navigation
        isNavbarVisable={props.isNavbarVisable}
        setIsNavbarVisable={props.setIsNavbarVisable}
      />
      <Main>{props.children}</Main>
    </React.Fragment>
  );
};

export default Layout;
