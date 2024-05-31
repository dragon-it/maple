import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    max-width: 100vw;
    line-height: 1.2;
    margin: 0 auto;
    font-family:
      sans-serif,
      maple-light,
      "Noto Sans",
      "Noto Sans CJK KR",
      "Montserrat",
      "Helvetica Neue",
      "NanumSquare",
      maple-bold;
    word-break: keep-all;
    word-wrap: break-word;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
`;