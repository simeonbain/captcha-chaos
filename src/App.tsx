import "./App.css";
import { Start } from "./screens/Start";
import { Screen, useScreen } from "./hooks/useScreen";
import { TickTheBox } from "./screens/TickTheBox";
import { Traditional } from "./screens/Traditional";
import { Wally } from "./screens/Wally";
import { TicTacToe } from "./screens/TicTacToe";
import { GeoGuesser } from "./screens/GeoGuesser";
import { End } from "./screens/End";

function App() {
  const [screen, goToNextScreen] = useScreen();

  return (
    <>
      {screen === Screen.Start && <Start goToNextScreen={goToNextScreen} />}
      {screen === Screen.TickTheBox && <TickTheBox goToNextScreen={goToNextScreen} />}
      {screen === Screen.Traditional && <Traditional goToNextScreen={goToNextScreen} />}
      {screen === Screen.TicTacToe && <TicTacToe goToNextScreen={goToNextScreen} />}
      {screen === Screen.Wally && <Wally goToNextScreen={goToNextScreen} />}
      {screen === Screen.GeoGuesser && <GeoGuesser goToNextScreen={goToNextScreen} />}
      {screen === Screen.End && <End goToNextScreen={goToNextScreen} />}
    </>
  );
}

export default App;
