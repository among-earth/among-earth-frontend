import React from 'react';
import styled from 'styled-components';

import spinAirplane from '../assets/spinAirplane.png';
import bg from '../assets/bg.mp4';
import Button from './Button';
import { textSpin } from './styles/keyframes';
import { ROUTES } from '../constants';

function LandingPage() {
  return (
    <Container>
      <TitleContainer>
        <span>AMONG</span>
        <span>EARTH</span>
      </TitleContainer>
      <ButtonContainer>
        <img src={spinAirplane} alt='rotationButton' />
        <Button path={ROUTES.USER} isLanding={true} />
      </ButtonContainer>
      <video
        type='video/mp4'
        width='300px'
        alt='backgroundVideo'
        src={bg}
        autoPlay
        loop
        muted
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;

  video {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    object-fit: cover;
    opacity: 0.6;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 999;
  margin-bottom: 50px;

  span {
    font-family: 'Limelight', cursive;
    font-size: 240px;
    color: ${({theme}) => theme.lemonYellow};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  div {
    width: 160px;
  }

  img {
    width: 120px;
    position: relative;
    animation: ${textSpin} infinite 6s linear;
    transform-origin: center;
  }
`;

export default LandingPage;
