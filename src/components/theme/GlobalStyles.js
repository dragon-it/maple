import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    max-width: 100vw;
    line-height: 1.25;
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


/* 스크롤바 전체 영역 */
    ::-webkit-scrollbar {
      width: 10px;
      border: 2px solid rgb(84,84,84);
      border-radius: 12px 12px 12px 12px;
    }
    ::-webkit-scrollbar-thumb {
    background: rgb(187,187,187);
    border: 3px solid rgb(100,100,100);
    border-radius: 12px 12px 12px 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: rgb(160, 160, 165);
      cursor: pointer;
    }
    * {
      -webkit-tap-highlight-color: transparent; /* 터치 시 하이라이트 효과 제거 */
    }
  }
`;
