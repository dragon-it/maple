import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Star, X } from "lucide-react";

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
  const removeFavorite = (e, characterName) => {
    e.stopPropagation();
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
      <FavoriteTitleGroup>
        <Star size={14} color="#facc15" fill="#facc15" />
        <span>즐겨찾기</span>
      </FavoriteTitleGroup>

      <ChipListContainer>
        {favoriteCharacters.length > 0 ? (
          favoriteCharacters.map((characterName) => (
            <FavoriteChip
              key={characterName}
              onClick={() => navigateToCharacter(characterName)}
            >
              <NameText>{characterName}</NameText>
              <DeleteIconBtn
                type="button"
                onClick={(e) => removeFavorite(e, characterName)}
                title="즐겨찾기 삭제"
              >
                <X size={12} />
              </DeleteIconBtn>
            </FavoriteChip>
          ))
        ) : (
          <EmptyChip>
            <span>즐겨찾기한 캐릭터가 없습니다</span>
          </EmptyChip>
        )}
      </ChipListContainer>
    </FavoriteWrap>
  );
};

const FavoriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 688px;
  margin: 16px auto 10px auto;
  padding: 0 16px;
  box-sizing: border-box;
`;

const FavoriteTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
`;

const ChipListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

const FavoriteChip = styled.button`
  display: inline-flex;
  align-items: flex-end;
  gap: 6px;
  padding: 6px 6px 6px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(15, 23, 42, 0.65);
  color: #f8fafc;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(30, 41, 65, 0.85);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const NameText = styled.span`
  line-height: 1;
`;

const DeleteIconBtn = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.15s ease;
  margin-left: 2px;

  &:hover {
    background: rgba(239, 68, 68, 0.85);
    color: #ffffff;
  }
`;

const EmptyChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.65);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  font-weight: 500;
`;
