import { Toaster } from "react-hot-toast";
import Game from "views/Game";

function App(): JSX.Element {
  return (
    <>
      <Toaster position="top-left" />
      <Game />
    </>
  );
}

export default App;
