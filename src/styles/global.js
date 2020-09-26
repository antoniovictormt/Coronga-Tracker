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

  body,
  input,
  button,
  textarea {
    font: 500 1.6rem Sans-serif;
    color: var(--color-text-base);
  } 

  button{
    outline: 0;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1100px) {
    :root {
      font-size: 62.5%;
    }
  }
`
export default GlobalStyles;