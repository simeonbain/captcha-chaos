import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import wally from "../assets/wally.webp";
import loadingIconLight from "../assets/icons/loadingIconLight.svg";
import successIconLight from "../assets/icons/successIconLight.svg";
import captchaPrivacyTermsLogo from "../assets/captchaPrivacyTermsLogo.svg";

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

const WallyContainer = styled.div`
  position: relative;
  cursor: crosshair;
`;

const WallyImage = styled.img`
  pointer-events: none;
  max-width: 1000px;
  display: block;
`;

const WallyMarker = styled.div<{ $x: number; $y: number }>`
  width: 50px;
  height: 50px;
  border: 5px dashed hotpink;
  box-sizing: border-box;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: ${({ $y }) => $y - 25}px;
  left: ${({ $x }) => $x - 25}px;
`;

const Prompt = styled.div`
  color: #fff;
  background-color: #468ee5;
  padding: 24px 108px 69px 22px;
  text-align: left;
  border-bottom: 2px solid #d6d6d6;
`;

const SubmitSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-top: 2px solid #d6d6d6;
`;

const SubmitButton = styled.button`
  color: #fff;
  font-size: 14px;
  background-color: #468ee5;
  border-radius: 0;
  height: 2.5em;
`;

const LoadingSpinner = styled.img`
  width: 14px;
  height: 14px;

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
  width: 14px;
  height: 14px;
`;

enum CaptchaState {
  Initial,
  Incorrect,
  Loading,
  Complete
}

interface WallyProps {
  goToNextScreen: () => void;
}

export const Wally: FunctionComponent<WallyProps> = ({ goToNextScreen }) => {
  const [captchaState, setCaptchaState] = useState<CaptchaState>(CaptchaState.Initial);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const imageContainer = document.getElementById("wallyContainer");
    if (!imageContainer) return;
    const x = event.clientX - imageContainer.getBoundingClientRect().left;
    const y = event.clientY - imageContainer.getBoundingClientRect().top;

    setPosition({ x, y });
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCaptchaState(CaptchaState.Loading);
    setTimeout(() => {
      if (!position) {
        setCaptchaState(CaptchaState.Incorrect);
        return;
      }
      const { x, y } = position;
      if (x < 775 || x > 835 || y < 25 || y > 100) {
        setCaptchaState(CaptchaState.Incorrect);
        return;
      }

      setCaptchaState(CaptchaState.Complete);
      setTimeout(goToNextScreen, 1000);
    }, 1000);
  };

  return (
    <Container>
      <Captcha>
        <Prompt>Find Wally in the image below.</Prompt>
        <WallyContainer id={"wallyContainer"} onClick={handleClick}>
          <WallyImage src={wally}></WallyImage>
          {position && <WallyMarker $x={position.x} $y={position.y} />}
        </WallyContainer>
        <SubmitSection>
          <img src={captchaPrivacyTermsLogo} />
          <SubmitButton onClick={handleSubmit}>
            {(captchaState === CaptchaState.Initial || captchaState === CaptchaState.Incorrect) && <span>Submit</span>}
            {captchaState === CaptchaState.Loading && <LoadingSpinner src={loadingIconLight} />}
            {captchaState === CaptchaState.Complete && <Tick src={successIconLight} />}
          </SubmitButton>
        </SubmitSection>
      </Captcha>
    </Container>
  );
};
