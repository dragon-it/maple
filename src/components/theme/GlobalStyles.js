import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    max-width: 100vw;
    line-height: 1.25;
    margin: 0 auto;
    word-break: keep-all;
    word-wrap: break-word;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    /* 스크롤바 전체 영역 */
    ::-webkit-scrollbar {
      width: 10px;
      border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgb(187, 187, 187);
      border: 3px solid rgb(100, 100, 100);
      border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: rgb(160, 160, 165);
      cursor: pointer;
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
    --global-font-stack:  "Noto Sans KR", "Apple SD Gothic Neo", system-ui, -apple-system, 
                          "Segoe UI", '맑은 고딕', 'Malgun Gothic', Roboto, "Helvetica Neue", Arial, sans-serif;

    --radius: 0.875rem;
    --background: oklch(0.12 0.03 264);
    --foreground: oklch(0.96 0.01 240);
    --card: oklch(0.18 0.04 264 / 0.72);
    --card-foreground: oklch(0.96 0.01 240);
    --popover: oklch(0.16 0.04 264 / 0.85);
    --popover-foreground: oklch(0.96 0.01 240);
    --primary: oklch(0.72 0.16 285);
    --primary-foreground: oklch(0.12 0.03 264);
    --secondary: oklch(0.22 0.05 260 / 0.65);
    --secondary-foreground: oklch(0.96 0.01 240);
    --muted: oklch(0.24 0.04 260 / 0.55);
    --muted-foreground: oklch(0.72 0.04 250);
    --accent: oklch(0.62 0.18 160);
    --accent-foreground: oklch(0.12 0.03 264);
    --destructive: oklch(0.58 0.22 25);
    --destructive-foreground: oklch(0.98 0.01 240);
    --border: rgba(255, 255, 255, 0.12);
    --input: rgba(255, 255, 255, 0.14);
    --ring: oklch(0.72 0.16 285 / 0.6);

    --glass: oklch(0.15 0.03 264 / 0.62);
    --glass-border: rgba(255, 255, 255, 0.12);
    --glass-hover: rgba(255, 255, 255, 0.08);
    --glow: rgba(168, 85, 247, 0.35);
    --glow-soft: rgba(34, 197, 94, 0.25);
  }
  
  html, body {
    font-family: var(--global-font-stack);
  }
`;

