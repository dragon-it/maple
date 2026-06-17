import React, { useEffect, useState } from "react";
import styled from "styled-components";
import favorite_false from "../../assets/icons/favoriteIcon/favorite_Star_False.svg";
import favorite_true from "../../assets/icons/favoriteIcon/favorite_Star_True.svg";

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

export const CharacterPreviewCard = ({
  characterName,
  characterImage,
  characterLevel,
  blur = false,
  active = false,
  favorite = false,
  onClick,
  onFavoriteClick,
}) => {
  const name = hasValue(characterName) ? characterName : "-";
  const level = hasValue(characterLevel) ? characterLevel : "-";
  const hasCharacterImage =
    hasValue(characterImage) &&
    characterImage !== "-" &&
    characterImage !== "null";
  const nameInitial = name !== "-" ? String(name).slice(0, 1) : "?";

  const imageRevealed = useReveal(hasCharacterImage && !blur);
  const nameRevealed = useReveal(hasValue(characterName) && !blur);
  const levelRevealed = useReveal(hasValue(characterLevel) && !blur);

  return (
    <Container
      $active={active}
      $clickable={Boolean(onClick)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onClick) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      {onFavoriteClick && (
        <FavoriteButton
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onFavoriteClick();
          }}
          aria-label={favorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        >
          <img
            src={favorite ? favorite_true : favorite_false}
            alt=""
            aria-hidden="true"
          />
        </FavoriteButton>
      )}
      <Avatar>
        {hasCharacterImage ? (
          <AvatarImage
            src={characterImage}
            alt={`${name} 이미지`}
            $revealed={imageRevealed}
          />
        ) : (
          <AvatarFallback>{nameInitial}</AvatarFallback>
        )}
      </Avatar>
      <Name $revealed={nameRevealed}>{name}</Name>
      <Level $revealed={levelRevealed}>Lv.{level}</Level>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 112px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(255, 255, 255, 0.95)" : "rgb(80, 92, 101)"};
  outline: 1px solid rgb(42, 49, 58);
  border-radius: 5px;
  background: linear-gradient(
    180deg,
    rgba(72, 81, 91, 0.96),
    rgba(42, 49, 58, 0.96)
  );
  box-shadow: ${({ $active }) =>
    $active ? "0 0 0 1px rgba(255, 255, 255, 0.72)" : "none"};
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
`;

const FavoriteButton = styled.button`
  position: absolute;
  z-index: 20;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  padding: 4px;
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.32);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
    display: block;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const Avatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 104px;
  height: 104px;
  object-fit: none;
  image-rendering: pixelated;
  transform: translate(-6%, -10%) scaleX(-1);
  filter: ${({ $revealed }) => ($revealed ? "blur(0)" : "blur(10px)")};
  transition: filter 0.45s ease;
`;

const AvatarFallback = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
`;

const Name = styled.div`
  max-width: 100%;
  font-size: 18px;
  font-weight: 700;
  color: white;
  filter: ${({ $revealed }) => ($revealed ? "blur(0)" : "blur(12px)")};
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0.6)};
  transition:
    filter 0.45s ease,
    opacity 0.45s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Level = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  filter: ${({ $revealed }) => ($revealed ? "blur(0)" : "blur(12px)")};
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0.6)};
  transition:
    filter 0.45s ease,
    opacity 0.45s ease;
`;
