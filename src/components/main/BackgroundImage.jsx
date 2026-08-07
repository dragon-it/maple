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

const ALL_BACKGROUND_IMAGES = [
  mainLightBGI,
  mainDarkBGI,
  mainAprilLightBGI,
  mainAprilDarkBGI,
  findMainLightBGI,
  findMainDarkBGI,
  findMainAprilLightBGI,
  findMainAprilDarkBGI,
  searchGuildDarkBGI,
  searchGuildLightBGI,
  searchGuildAprilDarkBGI,
  searchGuildAprilLightBGI,
  randomClassDarkBGI,
  randomClassLightBGI,
  randomClassAprilDarkBGI,
  randomClassAprilLightBGI,
  expSimulatorDarkBGI,
  expSimulatorLightBGI,
  expSimulatorAprilDarkBGI,
  expSimulatorAprilLightBGI,
  slidingPuzzleLightBGI,
  slidingPuzzleDarkBGI,
  slidingPuzzleAprilLightBGI,
  slidingPuzzleAprilDarkBGI,
  checkListLightBGI,
  checkListDarkBGI,
  checkListAprilLightBGI,
  checkListAprilDarkBGI,
];

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

  // 모든 배경 이미지 사전 로딩 (브라우저 캐시에 저장하여 페이지 전환 시 딜레이 제거)
  useEffect(() => {
    ALL_BACKGROUND_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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
      <img src={imageSrc} alt="" width="1920" height="1080" decoding="sync" />
      <LinearOverlay />
      <RadialOverlay />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const LinearOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(15, 23, 42, 0.2) 0%,
    rgba(15, 23, 42, 0.08) 50%,
    rgba(15, 23, 42, 0.45) 100%
  );
  pointer-events: none;
`;

const RadialOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.04) 55%,
    rgba(0, 0, 0, 0.25) 100%
  );
  pointer-events: none;
`;
