import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-background: #f0f0f7;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font: 600 1.6rem Sans-serif;
    background: var(--color-background);
    color: var(--color-text-base);
  } 

  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .image {
    width: 370px;
    margin-top: 50px;
  }

  @media (max-width: 770px) {
    .container {
      margin: 5px 10%;
    }

    .image {
      width: 100%;
    }
  }
`
export default GlobalStyles;