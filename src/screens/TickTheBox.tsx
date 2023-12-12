import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import captchaPrivacyTermsLogo from "../assets/captchaPrivacyTermsLogo.svg";
import loadingIcon from "../assets/icons/loadingIcon.svg";
import successIcon from "../assets/icons/successIcon.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Captcha = styled.div`
  border-radius: 2px;
  border: 1px solid #d6d6d6;
  background: #fafafa;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  width: 302px;
  height: 74px;
  padding-inline: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckBoxAndText = styled.div`
  display: flex;
  margin-left: 0.25rem;
  gap: 0.625rem;
  align-items: center;
`;

const CheckBox = styled.button`
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  border: 2px solid #c1c1c1;
  background: #fff;
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

enum CaptchaState {
  Initial,
  Loading,
  Complete
}

interface TickTheBoxProps {
  goToNextScreen: () => void;
}

export const TickTheBox: FunctionComponent<TickTheBoxProps> = ({ goToNextScreen }) => {
  const [captchaState, setCaptchaState] = useState<CaptchaState>(CaptchaState.Initial);

  const handleClick = () => {
    setCaptchaState(CaptchaState.Loading);
    setTimeout(() => {
      setCaptchaState(CaptchaState.Complete);
      setTimeout(goToNextScreen, 1200);
    }, 1700);
  };

  return (
    <Container>
      <Captcha>
        <CheckBoxAndText>
          {captchaState === CaptchaState.Initial && <CheckBox onClick={handleClick} />}
          {captchaState === CaptchaState.Loading && <LoadingSpinner src={loadingIcon} />}
          {captchaState === CaptchaState.Complete && <Tick src={successIcon} />}
          <p>I'm not a robot</p>
        </CheckBoxAndText>
        <img src={captchaPrivacyTermsLogo} />
      </Captcha>
    </Container>
  );
};
