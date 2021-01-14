import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { wooble } from './styles/keyframes';

function Button({ children, path, isLanding }) {
  const history = useHistory();

  const moveToPath = path => {
    history.push(path);
  };

  return (
    isLanding
     ? <LandingButton type='button' onClick={() => moveToPath(path)}>GO!</LandingButton>
     : <StyledButton type='button' onClick={() => moveToPath(path)}>{children}</StyledButton>
  );
}

const LandingButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  position: absolute;

  &:hover {
    transform: scale(1.2);
    transition-duration: 0.4s;
  }
`;

const StyledButton = styled.button`
  width: 60px;
  cursor: pointer;
  text-align: center;
  background-color: ${({theme}) => theme.orangeYellow};
  height: 50px;
  border-radius: 6px;
  color: ${({theme}) => theme.ivory};
  font-family: 'Limelight', cursive;
  border: none;
  outline: none;

  &:hover {
    animation: ${wooble} 1s 1;
  }
`;

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  path: PropTypes.string.isRequired,
  isLanding: PropTypes.bool.isRequired,
};
