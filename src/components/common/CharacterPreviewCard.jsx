import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
    <Container>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 16px;
  border: 1px solid rgb(80, 92, 101);
  outline: 1px solid rgb(42, 49, 58);
  border-radius: 5px;
  background: linear-gradient(
    180deg,
    rgba(72, 81, 91, 0.96),
    rgba(42, 49, 58, 0.96)
  );
`;

const Avatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
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
