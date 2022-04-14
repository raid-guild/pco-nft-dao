import React from "react";
import styled from "styled-components";

import Navigation from "../Navigation";

const Main = styled.main`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
`;

const Layout: React.FC = props => {
  return (
    <React.Fragment>
      <Navigation />
      <Main>{props.children}</Main>
    </React.Fragment>
  );
};

export default Layout;
