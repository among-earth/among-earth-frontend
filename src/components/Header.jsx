import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { ROUTES } from '../constants';

function Header() {
  return (
    <Container>
      <MenuWrapper>
        <Link className='button' to={ROUTES.LANDING}>HOME</Link>
        <Link className='button' to={ROUTES.TRAVELS}>TRAVELS</Link>
      </MenuWrapper>
      <TitleWrapper>
        <span>AMONG</span>
        <span>EARTH</span>
      </TitleWrapper>
    </Container>
  );
}

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
  z-index: 999;
`;

const TitleWrapper = styled.div`
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin: 0 auto;
  width: 100%;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button {
    color: ${({theme}) => theme.orangeYellow};
    font-size: 18px;
    letter-spacing: 2;
    cursor: pointer;
    border: none;
    background: none;
    font-family: 'Limelight', cursive;
    font-size: 22px;
    z-index: 999;
    outline: none;
    margin: 30px;
    text-decoration: none;
  }
`;

export default Header;
