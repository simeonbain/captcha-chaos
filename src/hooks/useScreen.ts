import { useState } from "react";

export enum Screen {
  Start,
  TickTheBox,
  Traditional,
  Wally,
  TicTacToe,
  GeoGuesser
}

const nextScreenFromCurrentScreen = (currentScreen: Screen) => {
  switch (currentScreen) {
    case Screen.Start:
      return Screen.TickTheBox;
    case Screen.TickTheBox:
      return Screen.Traditional;
    case Screen.Traditional:
      return Screen.TicTacToe;
    case Screen.TicTacToe:
      return Screen.Wally;
    case Screen.Wally:
      return Screen.GeoGuesser;
    case Screen.GeoGuesser:
      return Screen.Start;
  }
};

export const useScreen = (): [Screen, () => void] => {
  const [screen, setScreen] = useState(Screen.GeoGuesser);
  return [screen, () => setScreen(nextScreenFromCurrentScreen(screen))];
};
