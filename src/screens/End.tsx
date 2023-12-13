import { FunctionComponent } from "react";
import styled from "styled-components";
import downloadIcon from "../assets/icons/downloadIcon.png";
import Confetti from "react-confetti";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  transition: "po";
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
  animation-delay: 3s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DownloadButton = styled.button`
  display: flex;
  gap: 0.5em;
  align-items: center;

  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
  animation-delay: 3s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  img {
    width: 1.3em;
    height: 1.3em;
  }
`;

interface EndProps {
  goToNextScreen: () => void;
}

export const End: FunctionComponent<EndProps> = ({ goToNextScreen }) => {
  return (
    <Container>
      <Confetti recycle={false} initialVelocityY={20} />
      <Title>Clearly you're human 🎉 Here's the data...</Title>
      <DownloadButton onClick={goToNextScreen}>
        <span>Download</span>
        <img src={downloadIcon}></img>
      </DownloadButton>
    </Container>
  );
};
