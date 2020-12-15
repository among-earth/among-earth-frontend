import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { useHistory } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const wooble = keyframes`
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-30deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const UserInfo = ({ onLogin }) => {
  const history = useHistory();
  const [input, setInput] = useState('');

  const handleInputChange = ev => {
    setInput(ev.target.value);
  };

  const submitUserNickname = ev => {
    ev.preventDefault();

    if(input.length < 2) {
      console.log('닉네임은 한 글자 이상 입력 해 주세요.');
      setInput('');
      return;
    }

    onLogin(input);
    history.push('/directions');
  };

  return (
    <Container>
      <Header />
      <Wrapper>
        <span>당신의 닉네임을 입력해주세요.</span>
        <form onSubmit={submitUserNickname}>
          <input
            onChange={handleInputChange}
            type='text'
            name='nickname'
            value={input}
            placeholder='Nickname'
            autoComplete='off'
          />
          <input wooble type='submit' value='OK'/>
        </form>
      </Wrapper>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.coralRed};
  position: relative;
`;


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    font-size: 16px;
    margin-bottom: 20px;
    color: ${({theme}) => theme.ivory};
  }

  input {
    all: unset;
  }

  input[type='text'] {
    width: 300px;
    background: #efe1d9;
    padding: 0 20px;
    height: 50px;
    border-radius: 6px;
    outline: none;
    transition: .24s cubic-bezier(.36,.33,0,1);
    position: relative;
    margin-right: 10px;

    &:focus {
    background: #f7efeb;
    }
  }

  input[type='submit'] {
    width: 60px;
    cursor: pointer;
    text-align: center;
    background-color: ${({theme}) => theme.orangeYellow};
    height: 50px;
    border-radius: 6px;
    color: ${({theme}) => theme.ivory};
    font-family: 'Limelight', cursive;

    &:hover {
      animation: ${wooble} 1s 1;
    }
  }
`;

export default UserInfo;

UserInfo.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
