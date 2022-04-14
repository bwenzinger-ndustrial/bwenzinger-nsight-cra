import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700');

  ${normalize}
  
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  html,
  body,
  #main {
    height: 100%;
  }

  html {
    font-family: 'Roboto', 'Arial', sans-serif;
    font-size: 14px;
  }
`;
