import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import mainLightBGI from "../../assets/backgruondImg/mainSearch/main_search_BGI_light.webp";
import mainDarkBGI from "../../assets/backgruondImg/mainSearch/main_search_BGI_dark.webp";
import mainAprilLightBGI from "../../assets/backgruondImg/mainSearch/main_april_light.webp";
import mainAprilDarkBGI from "../../assets/backgruondImg/mainSearch/main_april_dark.webp";
import findMainLightBGI from "../../assets/backgruondImg/characterCapture/character_capture_light2.webp";
import findMainDarkBGI from "../../assets/backgruondImg/characterCapture/character_capture_dark.webp";
import findMainAprilLightBGI from "../../assets/backgruondImg/characterCapture/character_capture_april_light.webp";
import findMainAprilDarkBGI from "../../assets/backgruondImg/characterCapture/character_capture_april_dark.webp";
import searchGuildDarkBGI from "../../assets/backgruondImg/searchGuild/search_guild_BGI_dark.webp";
import searchGuildLightBGI from "../../assets/backgruondImg/searchGuild/search_guild_BGI_light.webp";
import searchGuildAprilDarkBGI from "../../assets/backgruondImg/searchGuild/search_guild_april_dark.webp";
import searchGuildAprilLightBGI from "../../assets/backgruondImg/searchGuild/search_guild_april_light.webp";
import randomClassDarkBGI from "../../assets/backgruondImg/randomClass/random_class_BGI_dark.webp";
import randomClassLightBGI from "../../assets/backgruondImg/randomClass/random_class_BGI_light.webp";
import randomClassAprilDarkBGI from "../../assets/backgruondImg/randomClass/random_class_april_dark.webp";
import randomClassAprilLightBGI from "../../assets/backgruondImg/randomClass/random_class_april_light.webp";
import expSimulatorDarkBGI from "../../assets/backgruondImg/expSimulator/exp_simulator_BGI_dark.webp";
import expSimulatorLightBGI from "../../assets/backgruondImg/expSimulator/exp_simulator_BGI_light.webp";
import expSimulatorAprilDarkBGI from "../../assets/backgruondImg/expSimulator/exp_simulator_april_dark.webp";
import expSimulatorAprilLightBGI from "../../assets/backgruondImg/expSimulator/exp_simulator_april_light.webp";
import slidingPuzzleLightBGI from "../../assets/backgruondImg/slidingPuzzle/sliding_puzzle_BGI_light.webp";
import slidingPuzzleDarkBGI from "../../assets/backgruondImg/slidingPuzzle/sliding_puzzle_BGI_dark.webp";
import slidingPuzzleAprilLightBGI from "../../assets/backgruondImg/slidingPuzzle/sliding_puzzle_april_light.jpg";
import slidingPuzzleAprilDarkBGI from "../../assets/backgruondImg/slidingPuzzle/sliding_puzzle_april_dark.webp";
import checkListLightBGI from "../../assets/backgruondImg/checkList/checklist_BGI_light.webp";
import checkListDarkBGI from "../../assets/backgruondImg/checkList/checklist_BGI_dark.webp";
import checkListAprilLightBGI from "../../assets/backgruondImg/checkList/checkList_april_light.webp";
import checkListAprilDarkBGI from "../../assets/backgruondImg/checkList/checkList_april_dark.webp";
import { useTheme } from "../../context/ThemeProvider";

const isAprilFoolsDay = () => {
  const today = new Date();
  return today.getMonth() === 3 && today.getDate() === 1;
};

export const BackgroundImage = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState(
    getBackgroundImage(theme, location.pathname),
  );

  // 경로와 테마에 따른 백그라운드 이미지를 반환하는 함수
  function getBackgroundImage(theme, pathname) {
    const useAprilBackground = isAprilFoolsDay();

    if (pathname.startsWith("/character-capture")) {
      return theme === "dark"
        ? useAprilBackground
          ? findMainAprilDarkBGI
          : findMainDarkBGI
        : useAprilBackground
          ? findMainAprilLightBGI
          : findMainLightBGI;
    } else if (pathname.startsWith("/guild-search")) {
      return theme === "dark"
        ? useAprilBackground
          ? searchGuildAprilDarkBGI
          : searchGuildDarkBGI
        : useAprilBackground
          ? searchGuildAprilLightBGI
          : searchGuildLightBGI;
    } else if (pathname.startsWith("/random-class")) {
      return theme === "dark"
        ? useAprilBackground
          ? randomClassAprilDarkBGI
          : randomClassDarkBGI
        : useAprilBackground
          ? randomClassAprilLightBGI
          : randomClassLightBGI;
    } else if (pathname.startsWith("/exp-simulator")) {
      return theme === "dark"
        ? useAprilBackground
          ? expSimulatorAprilDarkBGI
          : expSimulatorDarkBGI
        : useAprilBackground
          ? expSimulatorAprilLightBGI
          : expSimulatorLightBGI;
    } else if (pathname.startsWith("/sliding-puzzle")) {
      return theme === "dark"
        ? useAprilBackground
          ? slidingPuzzleAprilDarkBGI
          : slidingPuzzleDarkBGI
        : useAprilBackground
          ? slidingPuzzleAprilLightBGI
          : slidingPuzzleLightBGI;
    } else if (pathname.startsWith("/checklist")) {
      return theme === "dark"
        ? useAprilBackground
          ? checkListAprilDarkBGI
          : checkListDarkBGI
        : useAprilBackground
          ? checkListAprilLightBGI
          : checkListLightBGI;
    } else {
      return theme === "dark"
        ? useAprilBackground
          ? mainAprilDarkBGI
          : mainDarkBGI
        : useAprilBackground
          ? mainAprilLightBGI
          : mainLightBGI;
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
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0;
    object-fit: cover;
    padding: 0;
    position: absolute;
    width: 100%;
    display: block;
    min-height: 100vh;
    height: 100%;
    outline: 1px solid rgba(0, 0, 0, 0);
  }
`;
