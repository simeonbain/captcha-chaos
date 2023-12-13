import "./App.css";
import { Start } from "./screens/Start";
import { Screen, useScreen } from "./hooks/useScreen";
import { TickTheBox } from "./screens/TickTheBox";
import { Traditional } from "./screens/Traditional";
import { Wally } from "./screens/Wally";
import { TicTacToe } from "./screens/TicTacToe";

function App() {
  const [screen, goToNextScreen] = useScreen();

  return (
    <>
      {screen === Screen.Start && <Start goToNextScreen={goToNextScreen} />}
      {screen === Screen.TickTheBox && <TickTheBox goToNextScreen={goToNextScreen} />}
      {screen === Screen.Traditional && <Traditional goToNextScreen={goToNextScreen} />}
      {screen === Screen.Wally && <Wally goToNextScreen={goToNextScreen} />}
      {screen === Screen.TicTacToe && <TicTacToe goToNextScreen={goToNextScreen} />}
    </>
  );
}

export default App;
