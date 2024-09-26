import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { NpcChatBox } from "../common/npcChat/NpcChatBox";
import { PowerStat } from "../common/powerStat/PowerStat";
import npc_Chat_Box from "../../assets/npc/npc_Chat_Box.png";

const StyledLine = styled.p`
  font-size: 15px; 
  margin: 5px 0; 
  color: rgb(0,0,0);
`;

const LineStyle1 = styled(StyledLine)`



`;

const LineStyle2 = styled(StyledLine)`


`;

const LineStyle3 = styled(StyledLine)`


`;

const LineStyle4 = styled(StyledLine)`


`;

const LineStyle5 = styled(StyledLine)`


`;

const lineStyles = [LineStyle1, LineStyle2, LineStyle3, LineStyle4, LineStyle5];

const LineTypingEffect = ({ lines, speed = 1000 }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < lines.length) {
      if (charIndex < lines[lineIndex].length) {
        const timeoutId = setTimeout(() => {
          setDisplayedLines((prev) => {
            const currentLine = displayedLines[lineIndex] || "";
            return [
              ...prev.slice(0, lineIndex),
              currentLine + lines[lineIndex][charIndex],
              ...prev.slice(lineIndex + 1),
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
  }, [lineIndex, charIndex, lines, speed, displayedLines]);

  return (
    <div>
      {displayedLines.map((line, i) => {
        const LineComponent = lineStyles[i]; // 각 줄에 맞는 스타일 컴포넌트 선택
        return <LineComponent key={i}>{line}</LineComponent>;
      })}
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

  ];

  return (
    <Container>
      {/* <NpcChatBox
        text={"검색한 캐릭터의 가장 높은 유니온 랭킹을 알려주겠담!"}
      /> */}
      <MainCharacterWrap>
        <NpcBox src={npc_Chat_Box} alt="대화박스" />
        <CharacterInfo>
          <NpcWrap>
            <Image src={character_image} alt="캐릭터 이미지" />
            <NickName>{character_name}</NickName>
          </NpcWrap>
          <LineTypingEffect lines={characterInfoLines} speed={50} />
          <PowerStat powerValue={powerValue} />
        </CharacterInfo>
      </MainCharacterWrap>
    </Container>
  );
};


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MainCharacterWrap = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  z-index: 10;
  transform: scaleX(-1);
  position: relative;
  top: 7px;
`;

const NpcBox = styled.img`
  position: relative; 
  z-index: 1;
  width: fit-content;
  height: auto;
  
`;

const CharacterInfo = styled.div`
  display: flex;
  gap: 40px;
  position: absolute;
  flex-direction: row;
  z-index: 10; 
  max-width: 519px;
  max-height: 202px;
  transform: translateX(-3%) translateY(20%);
`;

const NickName = styled.div`
  position: relative;
  background: linear-gradient(180deg, rgba(150,149,143,1) 0%, rgba(136,136,136,1) 49%, rgba(108,106,106,1) 100%);
  color: rgb(247, 247, 247);
  border: 1px solid rgb(82, 79, 87);
  border-radius: 7px;
  text-align: center;

  &::after {
    content: '';
    display: inline-block;
    background: rgb(230, 230, 230);
    padding: 2px;
    border: 1px solid #494949;
    position: absolute;
    bottom: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    z-index: -1;
  }
`

const NpcWrap = styled.div`
  

`