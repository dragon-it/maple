import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    max-width: 100vw;
    line-height: 1.25;
    margin: 0 auto;
    font-family:
      "Noto Sans KR",
      '맑은 고딕', 
      'Malgun Gothic',
      sans-serif,
      '돋움',
      Dotum,
      "Noto Sans",
      "Montserrat",
      "Helvetica Neue",
      "NanumSquare";
    word-break: keep-all;
    word-wrap: break-word;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;


/* 스크롤바 전체 영역 */
    ::-webkit-scrollbar {
      width: 10px;
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

  * {
  -webkit-tap-highlight-color: transparent; /* 터치 시 하이라이트 효과 제거 */
}

/* 크롬, 사파리, 오페라에서 화살표 없애기 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


:root {
  --global-font-stack: "Noto Sans KR", "Apple SD Gothic Neo", system-ui, -apple-system, 
                        "Segoe UI",'맑은 고딕','Malgun Gothic',Roboto, "Helvetica Neue", Arial, sans-serif;
}
html, body {
  font-family: var(--global-font-stack);
}
`;
