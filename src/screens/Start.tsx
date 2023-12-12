import { FunctionComponent } from "react";
import styled from "styled-components";
import protectedByRecaptcha from "../assets/protectedByRecaptcha.svg";
import captchaIcon from "/captchaIcon.svg";
import forwardButtonIcon from "../assets/icons/forwardButtonIcon.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Title = styled.h1`
  font-weight: 800;
`;

const CaptchaBanner = styled.div`
  position: relative;
  width: 256px;
  height: 60px;
`;

const CaptchaBannerBackground = styled.img`
  position: absolute;
  top: -5px;
  right: -5px;
`;

const CaptchaBannerIcon = styled.img`
  position: absolute;
  left: 13px;
  top: 8px;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation: spin infinite 8s linear;
`;

const ValuableDataButton = styled.button`
  display: flex;
  gap: 0.5em;
  align-items: center;

  img {
    width: 1.3em;
    height: 1.3em;
  }
`;

interface StartProps {
  goToNextScreen: () => void;
}

export const Start: FunctionComponent<StartProps> = ({ goToNextScreen }) => {
  return (
    <Container>
      <Title>CAPTCHA Chaos</Title>
      <ValuableDataButton className={"valuable-data-button"} onClick={goToNextScreen}>
        <span>Access the valuable data</span>
        <img src={forwardButtonIcon}></img>
      </ValuableDataButton>
      <CaptchaBanner>
        <CaptchaBannerBackground src={protectedByRecaptcha}></CaptchaBannerBackground>
        <CaptchaBannerIcon src={captchaIcon} />
      </CaptchaBanner>
    </Container>
  );
};
