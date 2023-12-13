import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import loadingIconLight from "../assets/icons/loadingIconLight.svg";
import successIconLight from "../assets/icons/successIconLight.svg";
import { GoogleStreetView } from "../components/GoogleStreetView";

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
  width: 500px;
  text-align: left;
  margin-bottom: -100px;
  z-index: 1;
  border-bottom: 2px solid #d6d6d6;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-top: 2px solid #d6d6d6;
`;

const SubmitButton = styled.button`
  color: #fff;
  font-size: 14px;
  background-color: #468ee5;
  border-radius: 0;
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

interface GeoGuesserProps {
  goToNextScreen: () => void;
}

export const GeoGuesser: FunctionComponent<GeoGuesserProps> = ({ goToNextScreen }) => {
  const [captchaState, setCaptchaState] = useState<CaptchaState>(CaptchaState.Initial);
  const [inputValue, setInputValue] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setCaptchaState(CaptchaState.Loading);
    setTimeout(() => {
      if (inputValue.toLowerCase() !== "kenya") {
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
        <Prompt>Identify which country this is in.</Prompt>
        <GoogleStreetView latitude={-1.272794} longitude={36.814526} apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} />
        <Form onSubmit={handleSubmit}>
          <input type="text" value={inputValue} onChange={handleChange} placeholder="Enter the country"></input>
          <SubmitButton type="submit">
            {(captchaState === CaptchaState.Initial || captchaState === CaptchaState.Incorrect) && <span>Submit</span>}
            {captchaState === CaptchaState.Loading && <LoadingSpinner src={loadingIconLight} />}
            {captchaState === CaptchaState.Complete && <Tick src={successIconLight} />}
          </SubmitButton>
        </Form>
      </Captcha>
    </Container>
  );
};
