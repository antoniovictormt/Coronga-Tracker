import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 60%;

    --color-background: #f0f0f7;

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--color-background);
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body,
  input,
  button,
  textarea {
    font: 500 1.6rem Poppins;
    color: var(--color-text-base);
  } 

  button{
    outline: 0;
  }

  @media (min-width: 1100px) {
    :root {
      font-size: 62.5%;
    }
  }
`

export default GlobalStyles;