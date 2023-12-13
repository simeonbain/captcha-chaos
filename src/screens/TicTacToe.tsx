import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import loadingIcon from "../assets/icons/loadingIcon.svg";
import successIcon from "../assets/icons/successIcon.svg";
import captchaPrivacyTermsLogo from "../assets/captchaPrivacyTermsLogo.svg";
import { TicTacToeGame } from "../components/TicTacToeGame";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Captcha = styled.div`
  border-radius: 2px;
  border: 1px solid #d6d6d6;
  background: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const Prompt = styled.div`
  color: #fff;
  background-color: #468ee5;
  padding: 24px 108px 69px 22px;
  text-align: left;
  border-bottom: 2px solid #d6d6d6;
  margin-bottom: 2rem;
`;

const StatusSection = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-top: 2px solid #d6d6d6;
`;

const StatusIndicator = styled.div`
  margin-right: 0.5rem;
`;

const LoadingSpinner = styled.img`
  width: 24px;
  height: 24px;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: spin infinite 2s linear;
`;

const Tick = styled.img`
  width: 24px;
  height: 24px;
`;

const RetryButton = styled.button`
  color: #fff;
  font-size: 14px;
  background-color: #468ee5;
  border-radius: 0;
  height: 2.5em;
`;

enum CaptchaState {
  Initial,
  Incorrect,
  Loading,
  Complete
}

interface TicTacToeProps {
  goToNextScreen: () => void;
}

export const TicTacToe: FunctionComponent<TicTacToeProps> = ({ goToNextScreen }) => {
  const [captchaState, setCaptchaState] = useState<CaptchaState>(CaptchaState.Initial);
  const [shouldReset, setShouldReset] = useState<boolean>(false);

  const handleWin = () => {
    if (captchaState !== CaptchaState.Initial) return;
    setCaptchaState(CaptchaState.Loading);
    setTimeout(() => {
      setCaptchaState(CaptchaState.Complete);
      setTimeout(goToNextScreen, 1000);
    }, 1000);
  };

  const handleLoseOrDraw = () => {
    if (captchaState !== CaptchaState.Initial) return;
    setCaptchaState(CaptchaState.Loading);
    setTimeout(() => {
      setCaptchaState(CaptchaState.Incorrect);
    }, 1000);
  };

  return (
    <Container>
      <Captcha>
        <Prompt>Win this game of TicTacToe, you're X.</Prompt>
        <TicTacToeGame
          onWin={handleWin}
          onLose={handleLoseOrDraw}
          onDraw={handleLoseOrDraw}
          onReset={() => {
            setShouldReset(false);
            setCaptchaState(CaptchaState.Initial);
          }}
          shouldReset={shouldReset}
        />
        <StatusSection>
          <img src={captchaPrivacyTermsLogo} />
          <StatusIndicator>
            {captchaState === CaptchaState.Loading && <LoadingSpinner src={loadingIcon} />}
            {captchaState === CaptchaState.Complete && <Tick src={successIcon} />}
            {captchaState === CaptchaState.Incorrect && <RetryButton onClick={() => setShouldReset(true)}>Retry</RetryButton>}
          </StatusIndicator>
        </StatusSection>
      </Captcha>
    </Container>
  );
};
