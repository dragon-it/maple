import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { NpcChatBox } from "../common/npcChat/NpcChatBox";
import { formatPowerStat } from "../common/powerStat/PowerStat";
import npc_Chat_Box from "../../assets/npc/npc_Chat_Box.png";

const StyledLine = styled.p`
  margin: 2px 0;
  color: rgb(0, 0, 0);
  @media screen and (max-width: 519px) {
    margin: 0;
    font-size: 2.3vw;
  }
`;

const LineTypingEffect = ({ lines, speed = 5, onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < lines.length) {
      if (charIndex < lines[lineIndex].length) {
        const timeoutId = setTimeout(() => {
          setDisplayedLines((prev) => {
            const currentLine = prev[lineIndex] || "";
            return [
              ...prev.slice(0, lineIndex),
              currentLine + lines[lineIndex][charIndex],
            ];
          });
          setCharIndex(charIndex + 1);
        }, speed);

        return () => clearTimeout(timeoutId);
      } else {
        setCharIndex(0);
        setLineIndex(lineIndex + 1);
      }
    }
  }, [lineIndex, charIndex, lines, speed]);

  return (
    <div>
      {displayedLines.map((line, i) => (
        <StyledLine key={i}>{line}</StyledLine>
      ))}
    </div>
  );
};

export const FindRenderingBox = ({ result }) => {
  const {
    character_name,
    character_class,
    character_guild_name,
    character_image,
    character_level,
    world_name,
  } = result?.getCombinedData?.getBasicInformation || {};

  const { stat_value: powerValue } = result?.getCombinedData?.getCharacterStat
    ?.final_stat?.[42] || { stat_value: 0 };

  const characterInfoLines = [
    `닉네임: ${character_name || "이름 없음"}`,
    `레벨: ${character_level || "레벨 정보 없음"}`,
    `직업: ${character_class || "직업 없음"}`,
    `월드: ${world_name || "월드 정보 없음"}`,
    `길드: ${character_guild_name || "길드 없음"}`,
    `전투력: ${formatPowerStat(powerValue) || "전투력 없음"}`,
  ];
  return (
    <Container>
      <MainCharacterWrap>
        <NpcBox src={npc_Chat_Box} alt="대화박스" />
        <CharacterInfo>
          <NpcWrap>
            <Image src={character_image} alt="캐릭터 이미지" />
            <NickName>{character_name}</NickName>
          </NpcWrap>
          <NpcText>
            <LineTypingEffect lines={characterInfoLines} speed={5} />
          </NpcText>
        </CharacterInfo>
      </MainCharacterWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainCharacterWrap = styled.div`
  width: fit-content;
  position: relative;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Image = styled.img`
  width: 90%;
  object-fit: cover;
  z-index: 10;
  transform: scaleX(-1);
  position: relative;
  top: 7px;
`;

const NpcBox = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  height: auto;

  @media screen and (max-width: 519px) {
    width: 95%;
  }
`;

const CharacterInfo = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 13px 13px 36px 17px;
  z-index: 10;
  width: 100%;
  min-height: 50px;
  flex-shrink: 1;

  @media screen and (max-width: 519px) {
  }
`;

const NickName = styled.div`
  position: relative;
  width: 80%;
  background: linear-gradient(
    180deg,
    rgba(150, 149, 143, 1) 0%,
    rgba(136, 136, 136, 1) 49%,
    rgba(108, 106, 106, 1) 100%
  );
  color: rgb(247, 247, 247);
  border: 1px solid rgb(82, 79, 87);
  border-radius: 7px;
  text-align: center;
  font-size: 1em;

  &::after {
    content: "";
    display: inline-block;
    background: rgb(230, 230, 230);
    box-shadow: 0 0 0 3px rgb(230, 230, 230), 0 0 0 4px #494949;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    z-index: -1;
  }

  @media screen and (max-width: 519px) {
    font-size: 2.3vw;
  }
`;

const NpcWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 23%;
  flex-grow: 1;
`;

const NpcText = styled.div`
  width: 70%;
  overflow-wrap: break-word;
  white-space: normal;
  margin-left: 10px;

  @media screen and (max-width: 519px) {
    white-space: nowrap;
    font-size: 2.6vw;
  }
`;
