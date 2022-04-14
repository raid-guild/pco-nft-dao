import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Game from "views/Game";

import Layout from "./components/Layout";

function App(): JSX.Element {
  const [isNavbarVisable, setIsNavbarVisable] = useState<boolean>(true);

  return (
    <Layout
      isNavbarVisable={isNavbarVisable}
      setIsNavbarVisable={setIsNavbarVisable}
    >
      <Toaster position="top-left" />
      <Game
        isNavbarVisable={isNavbarVisable}
        setIsNavbarVisable={setIsNavbarVisable}
      />
    </Layout>
  );
}

export default App;
