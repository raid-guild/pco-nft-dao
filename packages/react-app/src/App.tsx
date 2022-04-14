import { Toaster } from "react-hot-toast";
import Game from "views/Game";

import Layout from "./components/Layout";

function App(): JSX.Element {
  return (
    <Layout>
      <Toaster position="top-left" />
      <Game />
    </Layout>
  );
}

export default App;
