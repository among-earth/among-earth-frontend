import { keyframes } from 'styled-components';

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

const textSpin = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export {
  wooble,
  textSpin,
};
