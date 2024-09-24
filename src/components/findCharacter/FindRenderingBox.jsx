import React from "react";
import styled from "styled-components";

import { useTheme } from "../../context/ThemeProvider";

export const FindRenderingBox = ({ result }) => {
  console.log(result);
  const { theme } = useTheme();
  return (
    <Container>
      <MainCharacterWrap>asdasd</MainCharacterWrap>
      {/* <UiImg
        src={theme === "dark" ? character_ui_dark : character_ui_light}
        alt="chracter-ui"
      ></UiImg> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const UiImg = styled.img`
  position: relative;
  height: 100vh;
`;

const MainCharacterWrap = styled.div``;
