import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import mainLightBGI from "../../assets/backgruondImg/mainSearch/main_search_BGI_light.webp";
import mainDarkBGI from "../../assets/backgruondImg/mainSearch/main_search_BGI_dark.webp";
import findMainLightBGI from "../../assets/backgruondImg/characterCapture/character_capture_light2.webp";
import findMainDarkBGI from "../../assets/backgruondImg/characterCapture/character_capture_dark.webp";
import searchGuildDarkBGI from "../../assets/backgruondImg/searchGuild/search_guild_BGI_dark.webp";
import searchGuildLightBGI from "../../assets/backgruondImg/searchGuild/search_guild_BGI_light.webp";
import randomClassDarkBGI from "../../assets/backgruondImg/randomClass/random_class_BGI_dark.webp";
import randomClassLightBGI from "../../assets/backgruondImg/randomClass/random_class_BGI_light.webp";
import expSimulatorDarkBGI from "../../assets/backgruondImg/expSimulator/exp_simulator_BGI_dark.webp";
import expSimulatorLightBGI from "../../assets/backgruondImg/expSimulator/exp_simulator_BGI_light.webp";
import { useTheme } from "../../context/ThemeProvider";

export const BackgroundImage = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState(
    getBackgroundImage(theme, location.pathname)
  );

  // 경로와 테마에 따른 백그라운드 이미지를 반환하는 함수
  function getBackgroundImage(theme, pathname) {
    if (pathname.startsWith("/character-capture")) {
      return theme === "dark" ? findMainDarkBGI : findMainLightBGI;
    } else if (pathname.startsWith("/guild-search")) {
      return theme === "dark" ? searchGuildDarkBGI : searchGuildLightBGI;
    } else if (pathname.startsWith("/random-class")) {
      return theme === "dark" ? randomClassDarkBGI : randomClassLightBGI;
    } else if (pathname.startsWith("/exp-simulator")) {
      return theme === "dark" ? expSimulatorDarkBGI : expSimulatorLightBGI;
    } else {
      return theme === "dark" ? mainDarkBGI : mainLightBGI;
    }
  }

  useEffect(() => {
    setImageSrc(getBackgroundImage(theme, location.pathname));
  }, [location.pathname, theme]);

  return (
    <Container>
      <img src={imageSrc} alt="Background" width="1920" height="1080" />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: fixed;
  z-index: -1;

  img {
    display: block;
    object-fit: cover;
    width: 100%;
    min-height: 100vh;
  }
`;
