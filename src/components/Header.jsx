import React from 'react';
import styled from 'styled-components';

import { FaGlobeAsia } from 'react-icons/fa';

const Header = () => {
  return (
    <Container>
      <MenuWrapper>
        <span>MAIN</span>
        <span>TRAVELS</span>
      </MenuWrapper>
      <TitleWrapper>
        <span>AMONG</span>
        <span>EARTH</span>
      </TitleWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 20px;
  font-family: 'Limelight', cursive;
  color: ${({theme}) => theme.orangeYellow};
  letter-spacing: 1px;
`;

const TitleWrapper = styled.div`
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin: 0 auto;
  width: 100%;

  hr {
    display: block;
    width: 140px;
    border-width: 1px;
    border: 1px solid ${({theme}) => theme.orangeYellow}
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 18px;
    letter-spacing: 2;
    cursor: pointer;
  }

  span:first-child {
    margin: 30px;
  }
`;

export default Header;
