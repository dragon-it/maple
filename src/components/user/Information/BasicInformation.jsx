import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicInfoBackground from "./BasicInfoBackground";
import { useTheme } from "../../../context/ThemeProvider";
import favorite_true from "../../../assets/icons/favoriteIcon/favorite_Star_True.svg";
import favorite_false from "../../../assets/icons/favoriteIcon/favorite_Star_False.svg";
import TanjiroImage from "../../../assets/npc/tanjiro.png";
import WorldIcons from "../../common/worldIcon/WorldIcons";
import colors from "../../common/color/colors";

export const BasicInformation = ({ BasicInfo }) => {
  const { theme } = useTheme();

  const [backgroundImage, setBackgroundImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (BasicInfoBackground[theme]) {
      const themeBackgrounds = BasicInfoBackground[theme];
      const randomIndex = Math.floor(Math.random() * themeBackgrounds.length);
      setBackgroundImage(themeBackgrounds[randomIndex]);
    }
  }, [theme]);

  useEffect(() => {
    const favoriteCharacters = JSON.parse(
      localStorage.getItem("favoriteCharacters") || "[]"
    );

    const characterName = BasicInfo.getBasicInformation.character_name;
    if (favoriteCharacters.includes(characterName)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [BasicInfo.getBasicInformation.character_name]);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    const characterName = BasicInfo.getBasicInformation.character_name;
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

  const worldName = BasicInfo.getBasicInformation.world_name;
  const worldIcon = WorldIcons[worldName];

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
          <Job>{BasicInfo.getBasicInformation.character_class}</Job>
          <ItemWrap>
            <Contents>
              <Title>유니온</Title>
              <Value>{BasicInfo.getUnion.union_level}</Value>
            </Contents>
            <Contents>
              <Title>무릉도장</Title>
              <Value>{BasicInfo.getDojang.dojang_best_floor}층</Value>
            </Contents>
            <Contents>
              <Title>인기도</Title>
              <Value>{BasicInfo.getCharacterPopularity.popularity}</Value>
            </Contents>
          </ItemWrap>
        </JobGroup>
        <CharacterInfoGroup>
          <Level>Lv. {BasicInfo.getBasicInformation.character_level}</Level>
          <CharacterImg>
            <img
              src={
                BasicInfo.getBasicInformation.character_class ===
                "카마도 탄지로"
                  ? TanjiroImage
                  : BasicInfo.getBasicInformation.character_image
              }
              alt="character_image"
            />
          </CharacterImg>
          <CharacterName>
            {BasicInfo.getBasicInformation.character_name}
          </CharacterName>
          <Experience>
            경험치 {BasicInfo.getBasicInformation.character_exp_rate}%
          </Experience>
        </CharacterInfoGroup>
        <GuildWorldGroup>
          <ItemWrap>
            <Contents>
              <Title>월드</Title>
              <Value>
                {BasicInfo.getBasicInformation.world_name}
                {worldIcon && (
                  <WorldIconImg src={worldIcon} alt={`${worldName} 아이콘`} />
                )}
              </Value>
            </Contents>
            <Contents>
              <Title>길드</Title>
              <Value>
                {BasicInfo.getBasicInformation.character_guild_name
                  ? BasicInfo.getBasicInformation.character_guild_name
                  : "-"}
              </Value>
            </Contents>
          </ItemWrap>
        </GuildWorldGroup>
        <FavoriteIcon onClick={handleFavoriteClick}>
          <img
            src={isFavorite ? favorite_true : favorite_false}
            alt="Favorite Icon"
          />
        </FavoriteIcon>
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
  font-family: maple-light;
`;

const CharacterBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
  border: 1px solid rgb(36, 36, 36);
  border-radius: 5px;
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
  text-align: center;
  background-color: rgba(202, 204, 206, 0.9);
  padding: 3px;
  margin: 0 10px;
  border-radius: 0 0 10px 10px;
  text-shadow: ${colors.commonInfo.textShadow};
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
  display: flex;
  justify-content: center;
  transform: scaleX(-1);
  width: 110px;
  margin: 2px 0;
  image-rendering: pixelated;

  @media screen and (max-width: 576px) {
    width: 90px;
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
  text-shadow: ${colors.commonInfo.textShadow};
  margin-bottom: 1px;
`;

const Experience = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(170, 204, 0);
  text-shadow: ${colors.commonInfo.textShadow};
  font-size: 11px;
  padding: 1px;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Job = styled.div`
  background-color: rgba(202, 204, 206, 0.8);
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 110px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 576px) {
    width: 90px;
  }
`;

const Contents = styled.div`
  background-color: rgba(202, 204, 206, 0.8);
  width: 110px;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 576px) {
    width: 90px;
  }

  @media screen and (max-width: 200px) {
    width: 70px;
    padding: 3px;
  }
`;

const Value = styled.div`
  display: flex;
  color: black;

  img {
    image-rendering: pixelated;
  }
`;

const Title = styled.div`
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
