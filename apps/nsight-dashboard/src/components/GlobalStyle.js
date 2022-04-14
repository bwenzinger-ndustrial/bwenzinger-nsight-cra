import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  ${normalize}

  html,
  body,
  #main {
    height: 100%;
  }

  body {
    font-family: 'Roboto', 'Arial', sans-serif;
    font-size: 16px;
  }

  #main {
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
