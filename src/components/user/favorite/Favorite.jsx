import React, { useState, useEffect } from "react";
import favorite_true from "../../../assets/favoriteIcon/favorite_Star_True.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Favorite = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteCharacters") || "[]"
    );
    setFavoriteCharacters(storedFavorites);
  }, []);

  // 즐겨찾기 삭제 함수
  const removeFavorite = (characterName) => {
    const updatedFavorites = favoriteCharacters.filter(
      (name) => name !== characterName
    );
    localStorage.setItem(
      "favoriteCharacters",
      JSON.stringify(updatedFavorites)
    );
    setFavoriteCharacters(updatedFavorites);
  };

  // 캐릭터 이름 클릭 시 이동 함수
  const navigateToCharacter = (characterName) => {
    navigate(`/user/${characterName}`);
  };

  return (
    <FavoriteWrap>
      <FavoriteHeader>즐겨찾기</FavoriteHeader>
      <>
        {favoriteCharacters.length > 0 ? (
          favoriteCharacters.map((characterName) => (
            <CharacterNameListItem
              key={characterName}
              onClick={() => navigateToCharacter(characterName)}
            >
              {characterName}
              <img
                src={favorite_true}
                alt="Favorite"
                style={{ width: "20px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(characterName);
                }}
              />
            </CharacterNameListItem>
          ))
        ) : (
          <NoFavoriteText>즐겨찾기한 캐릭터가 없습니다.</NoFavoriteText>
        )}
      </>
    </FavoriteWrap>
  );
};

const FavoriteWrap = styled.div`
  width: 200px;
  padding: 10px 5px;
  color: rgb(255, 255, 255);
  max-height: 500px;
  font-family: maple-light;
`;

const FavoriteHeader = styled.span`
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 10px;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }
`;

const CharacterNameListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5px;
  padding: 0px 5px;

  &:hover {
    background-color: rgba(162, 162, 162, 0.25);
  }
`;

const NoFavoriteText = styled.div`
  display: flex;
  justify-content: center;
`;
