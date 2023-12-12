import "./App.css";
import { Start } from "./screens/Start";
import { Screen, useScreen } from "./hooks/useScreen";
import { TickTheBox } from "./screens/TickTheBox";

function App() {
  const [screen, goToNextScreen] = useScreen();

  return (
    <>
      {screen === Screen.Start && <Start goToNextScreen={goToNextScreen} />}
      {screen === Screen.TickTheBox && <TickTheBox goToNextScreen={goToNextScreen} />}
    </>
  );
}

export default App;
