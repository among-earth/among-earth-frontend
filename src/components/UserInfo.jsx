import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Footer from './Footer';
import Error from './Error';
import { ROUTES, MESSAGES } from '../constants';
import { wooble } from './styles/keyframes';

function UserInfo({ onLogin }) {
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = ev => {
    const { value } = ev.target;

    setInputValue(value);
  };

  const submitUserNickname = ev => {
    ev.preventDefault();

    if(inputValue.length < 2) {
      setError(true);
      setInputValue('');
      return;
    }

    onLogin(inputValue);
    history.push(ROUTES.DIRECTIONS);
  };

  return (
    <Container>
      <Wrapper>
        <span>당신의 닉네임을 입력해주세요.</span>
        <form onSubmit={submitUserNickname}>
          <input
            onChange={handleInputChange}
            type='text'
            name='nickname'
            value={inputValue}
            placeholder='Nickname'
            autoComplete='off'
          />
          <input type='submit' value='OK!'/>
        </form>
        {error &&
          <Error>{MESSAGES.NICKNAME_LENGTH}</Error>
        }
      </Wrapper>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.green};
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

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
