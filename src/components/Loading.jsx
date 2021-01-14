import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import theme from './styles/theme';

import Header from './Header';
import Footer from './Footer';

function Loading() {
  const size = '5%';

  return (
    <Wrapper>
      <Header />
      <h1>Loading...</h1>
      <ReactLoading type='balls' color={theme.orangeYellow} width={size} height={size} />
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-family: 'Limelight', cursive;
    color: ${({theme}) => theme.orangeYellow};
    margin-bottom: 30px;
    font-size: 30px;
  }
`;

export default Loading;
