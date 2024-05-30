import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    width: 100%;
    height: 100%;
    line-height: 1.2;
    margin: 0 auto;
    font-family:
      sans-serif,
      maple-light,
      "Montserrat",
      "Helvetica Neue",
      "NanumSquare",
      "Noto Sans",
      "Noto Sans CJK KR",
      maple-bold;
    word-break: keep-all;
    word-wrap: break-word;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
`;