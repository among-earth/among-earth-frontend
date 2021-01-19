import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: ${({theme})=> theme.green}};

  .root {
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
