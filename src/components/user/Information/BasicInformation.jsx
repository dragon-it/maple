import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicInfoBackground from "./BasicInfoBackground";
import { useTheme } from "../../../context/ThemeProvider";
import favorite_true from "../../../assets/icons/favoriteIcon/favorite_Star_True.svg";
import favorite_false from "../../../assets/icons/favoriteIcon/favorite_Star_False.svg";
import TanjiroImage from "../../../assets/npc/tanjiro.png";
import WorldIcons from "../../common/worldIcon/WorldIcons";
import colors from "../../common/color/colors";

const hasValue = (value) =>
  value !== undefined && value !== null && value !== "";

const useReveal = (ready) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (ready) {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }
    setRevealed(false);
  }, [ready]);

  return revealed;
};

export const BasicInformation = ({ BasicInfo, blur = false }) => {
  const { theme } = useTheme();

  const [backgroundImage, setBackgroundImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const isBlurred = blur;
  const basicInformation = BasicInfo?.getBasicInformation || {};
  const unionInfo = BasicInfo?.getUnion || {};
  const dojangInfo = BasicInfo?.getDojang || {};
  const popularityInfo = BasicInfo?.getCharacterPopularity || {};

  const characterName = basicInformation.character_name;
  const characterClass = basicInformation.character_class;
  const characterLevel = basicInformation.character_level;
  const characterImage = basicInformation.character_image;
  const expRate = basicInformation.character_exp_rate;
  const worldName = basicInformation.world_name;
  const guildName = basicInformation.character_guild_name;

  const unionLevel = unionInfo.union_level;
  const dojangFloor = dojangInfo.dojang_best_floor;
  const popularity = popularityInfo.popularity;

  const isTanjiro = characterClass === "카마도 탄지로";
  const imageSrc = isTanjiro ? TanjiroImage : characterImage;

  const jobReady = hasValue(characterClass);
  const unionReady = hasValue(unionLevel);
  const dojangReady = hasValue(dojangFloor);
  const popularityReady = hasValue(popularity);
  const levelReady = hasValue(characterLevel);
  const imageReady = hasValue(characterImage) || isTanjiro;
  const nameReady = hasValue(characterName);
  const expReady = hasValue(expRate);
  const worldReady = hasValue(worldName);
  const guildReady = hasValue(guildName);

  const jobRevealed = useReveal(jobReady && !isBlurred);
  const unionRevealed = useReveal(unionReady && !isBlurred);
  const dojangRevealed = useReveal(dojangReady && !isBlurred);
  const popularityRevealed = useReveal(popularityReady && !isBlurred);
  const levelRevealed = useReveal(levelReady && !isBlurred);
  const imageRevealed = useReveal(imageReady && !isBlurred);
  const nameRevealed = useReveal(nameReady && !isBlurred);
  const expRevealed = useReveal(expReady && !isBlurred);
  const worldRevealed = useReveal(worldReady && !isBlurred);
  const guildRevealed = useReveal(guildReady && !isBlurred);

  useEffect(() => {
    if (BasicInfoBackground[theme]) {
      const themeBackgrounds = BasicInfoBackground[theme];
      const randomIndex = Math.floor(Math.random() * themeBackgrounds.length);
      setBackgroundImage(themeBackgrounds[randomIndex]);
    }
  }, [theme]);

  useEffect(() => {
    if (isBlurred || !characterName) {
      setIsFavorite(false);
      return;
    }
    const favoriteCharacters = JSON.parse(
      localStorage.getItem("favoriteCharacters") || "[]"
    );

    if (favoriteCharacters.includes(characterName)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [characterName, isBlurred]);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    if (isBlurred || !characterName) {
      return;
    }
    const favoriteCharacters = JSON.parse(
      localStorage.getItem("favoriteCharacters") || "[]"
    );

    if (isFavorite) {
      const updatedFavorites = favoriteCharacters.filter(
        (name) => name !== characterName
      );
      localStorage.setItem(
        "favoriteCharacters",
        JSON.stringify(updatedFavorites)
      );
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...favoriteCharacters, characterName];
      localStorage.setItem(
        "favoriteCharacters",
        JSON.stringify(updatedFavorites)
      );
      setIsFavorite(true);
    }
  };

  const handleImageClick = () => {
    if (BasicInfoBackground[theme]) {
      const themeBackgrounds = BasicInfoBackground[theme];
      const currentIndex = themeBackgrounds.indexOf(backgroundImage);
      const nextIndex = (currentIndex + 1) % themeBackgrounds.length;
      setBackgroundImage(themeBackgrounds[nextIndex]);
    }
  };

  const worldIcon = worldReady ? WorldIcons[worldName] : null;

  return (
    <Container>
      <HeaderWrap>
        <CharacterHeader>CHARACTER INFO</CharacterHeader>
        <UpdateTime>갱신 시간: 실시간</UpdateTime>
      </HeaderWrap>

      <CharacterBody
        id="CharacterBody"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        onClick={handleImageClick}
      >
        <JobGroup>
          <Job>
            <RevealText $revealed={jobRevealed}>
              {characterClass ?? "-"}
            </RevealText>
          </Job>
          <ItemWrap>
            <Contents>
              <Title>유니온</Title>
              <Value>
                <RevealText $revealed={unionRevealed}>
                  {unionLevel ?? "-"}
                </RevealText>
              </Value>
            </Contents>
            <Contents>
              <Title>무릉도장</Title>
              <Value>
                <RevealText $revealed={dojangRevealed}>
                  {dojangFloor ?? "0"}층
                </RevealText>
              </Value>
            </Contents>
            <Contents>
              <Title>인기도</Title>
              <Value>
                <RevealText $revealed={popularityRevealed}>
                  {popularity ?? "0"}
                </RevealText>
              </Value>
            </Contents>
          </ItemWrap>
        </JobGroup>
        <CharacterInfoGroup>
          <Level>
            <RevealText $revealed={levelRevealed}>
              Lv. {characterLevel ?? "-"}
            </RevealText>
          </Level>
          <CharacterImg $revealed={imageRevealed}>
            <img src={imageSrc} alt="character_image" />
          </CharacterImg>
          <CharacterName>
            <RevealText $revealed={nameRevealed}>
              {characterName ?? "-"}
            </RevealText>
          </CharacterName>
          <Experience>
            <RevealText $revealed={expRevealed}>{expRate ?? "0"}%</RevealText>
          </Experience>
        </CharacterInfoGroup>
        <GuildWorldGroup>
          <ItemWrap>
            <Contents>
              <Title>월드</Title>
              <Value>
                <RevealText $revealed={worldRevealed}>
                  {worldName ?? "-"}
                  {worldIcon && (
                    <WorldIconImg src={worldIcon} alt={`${worldName} 아이콘`} />
                  )}
                </RevealText>
              </Value>
            </Contents>
            <Contents>
              <Title>길드</Title>
              <Value>
                <RevealText $revealed={guildRevealed}>
                  {guildName ?? "-"}
                </RevealText>
              </Value>
            </Contents>
          </ItemWrap>
        </GuildWorldGroup>
        {nameReady && !isBlurred && (
          <FavoriteIcon onClick={handleFavoriteClick}>
            <img
              src={isFavorite ? favorite_true : favorite_false}
              alt="Favorite Icon"
            />
          </FavoriteIcon>
        )}
      </CharacterBody>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 7px;
  width: 100%;
  font-size: 12px;
  border: 1px solid rgb(80, 92, 101);
  outline: 1px solid rgb(42, 49, 58);
  border-radius: 5px;
  background-color: rgba(59, 66, 75, 0.9);

  @media screen and (max-width: 576px) {
    padding: 5px;
    font-size: 11px;
  }

  @media screen and (max-width: 200px) {
    padding: 3px;
    font-size: 10px;
  }
`;

const HeaderWrap = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CharacterHeader = styled.h2`
  font-size: 15px;
  color: rgb(220, 252, 2);
  margin-bottom: 3px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const UpdateTime = styled.div`
  display: flex;
  align-items: center;
`;

const CharacterBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
  border: 1px solid rgb(36, 36, 36);
  border-radius: 5px;
  text-shadow: ${colors.commonInfo.textShadow};
  background-size: cover;
  cursor: pointer;
`;

const JobGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 130px;
  padding: 5px 0;

  @media screen and (max-width: 576px) {
    width: 100px;
  }
`;

const CharacterInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  padding-bottom: 5px;

  @media screen and (max-width: 576px) {
    padding: 0px 10px 5px 10px;
  }
`;

const GuildWorldGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 130px;
  padding: 5px 0;

  @media screen and (max-width: 576px) {
    width: 100px;
  }
`;

const Level = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgb(149, 157, 166);
  padding: 3px;
  margin: 0 10px;
  border-radius: 0 0 10px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  border-left: 1px solid rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 576px) {
    padding: 2px;
    margin: 0 5px;
    font-size: 12px;
  }
`;
const CharacterImg = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  margin: 2px auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -53%) scaleX(-1);
    image-rendering: pixelated;
    object-fit: cover;
    filter: ${({ $revealed }) => ($revealed ? "blur(0)" : "blur(10px)")};
    transition: filter 0.45s ease;
  }
`;

const CharacterName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  border-radius: 7px;
  background-color: rgb(60, 194, 216);
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-bottom: 1px;
`;

const Experience = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(170, 204, 0);
  font-size: 12px;
  padding: 1px;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Job = styled.div`
  background-color: rgb(149, 157, 166);
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 130px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    width: 120px;
    padding: 5px 8px;
  }

  @media screen and (max-width: 576px) {
    width: 90px;
    padding: 3px 6px;
  }
`;

const Contents = styled.div`
  position: relative;
  width: 130px;
  border-radius: 20px;
  padding: 6px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  image-rendering: pixelated;

  background: rgba(107, 107, 107, 0.3);
  border: 1px solid rgba(59, 59, 59, 0.3);
  box-shadow: inset 0 0 3px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  color: white;
  font-weight: 500;

  @media screen and (max-width: 1024px) {
    width: 120px;
    padding: 5px 8px;
  }

  @media screen and (max-width: 576px) {
    width: 90px;
    padding: 3px 6px;
  }
`;

const Title = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
`;

const Value = styled.div`
  color: rgba(255, 255, 255, 1);
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const RevealText = styled.span`
  display: inline-flex;
  align-items: center;
  filter: ${({ $revealed }) => ($revealed ? "blur(0)" : "blur(12px)")};
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0.6)};
  transition: filter 0.45s ease, opacity 0.45s ease;
`;

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const FavoriteIcon = styled.div`
  position: absolute;
  height: fit-content;
  top: 0;
  right: 0;
`;

const WorldIconImg = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 3px;
`;
