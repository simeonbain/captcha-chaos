import { useState } from "react";

export enum Screen {
  Start,
  TickTheBox,
  Traditional
}

const nextScreenFromCurrentScreen = (currentScreen: Screen) => {
  switch (currentScreen) {
    case Screen.Start:
      return Screen.TickTheBox;
    case Screen.TickTheBox:
      return Screen.Traditional;
    case Screen.Traditional:
      return Screen.Start;
  }
};

export const useScreen = (): [Screen, () => void] => {
  const [screen, setScreen] = useState(Screen.Start);
  return [screen, () => setScreen(nextScreenFromCurrentScreen(screen))];
};
