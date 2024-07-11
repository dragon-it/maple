import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicInfoBackground from "./BasicInfoBackground";
import { useTheme } from "../../../context/ThemeProvider";
import favorite_true from "../../../assets/favoriteIcon/favorite_Star_True.svg";
import favorite_false from "../../../assets/favoriteIcon/favorite_Star_False.svg";

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

  return (
    <Container>
      <CharacterHeader>CHARACTER INFO</CharacterHeader>
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
              src={BasicInfo.getBasicInformation.character_image}
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
              <Value>{BasicInfo.getBasicInformation.world_name}</Value>
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
  border-radius: 7px;
  color: white;
  padding: 7px;
  width: 100%;
  font-size: 12px;
  border: 1px solid rgb(80, 92, 101);
  outline: 1px solid rgb(42, 49, 58);
  border-radius: 5px;
  background-color: rgba(59, 66, 75, 0.9);
`;

const CharacterHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  margin-bottom: 7px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const CharacterBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
  border: 1px solid rgb(36 36 36);
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
  background-color: rgb(154, 163, 172);
  padding: 3px;
  margin: 0 10px;
  border-radius: 0 0 10px 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  border-left: 1px solid rgba(0, 0, 0, 0.3);
`;

const CharacterImg = styled.div`
  display: flex;
  justify-content: center;
  transform: scaleX(-1);
  width: 110px;
  margin: 2px 0;
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  font-size: 13px;
  padding: 4px;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Job = styled.div`
  background-color: rgb(154, 163, 172);
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
  background-color: rgb(202, 204, 206);
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
`;

const Value = styled.div`
  color: black;
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
