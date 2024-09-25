import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { NpcChatBox } from "../common/npcChat/NpcChatBox";
import { PowerStat } from "../common/powerStat/PowerStat";
import npc_Chat_Box from "../../assets/npc/npc_Chat_Box.png";

const StyledLine = styled.p`
  font-size: 16px; /* 기본 글꼴 크기 */
  margin: 5px 0; /* 위아래 여백 */
`;

const LineStyle1 = styled(StyledLine)`
  color: #333;
  background-color: #f0f8ff;
  padding: 5px;
  border-radius: 5px;
`;

const LineStyle2 = styled(StyledLine)`
  color: #fff;
  background-color: #4caf50;
  padding: 5px;
  border-radius: 5px;
`;

const LineStyle3 = styled(StyledLine)`
  color: #000;
  background-color: #ff9800;
  padding: 5px;
  border-radius: 5px;
`;

const LineStyle4 = styled(StyledLine)`
  color: #000;
  background-color: #2196f3;
  padding: 5px;
  border-radius: 5px;
`;

const LineStyle5 = styled(StyledLine)`
  color: #fff;
  background-color: #9c27b0;
  padding: 5px;
  border-radius: 5px;
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
    `직업: ${character_class || "직업 없음"}`,
    `길드: ${character_guild_name || "길드 없음"}`,
    `레벨: ${character_level || "레벨 정보 없음"}`,
    `월드: ${world_name || "월드 정보 없음"}`,
  ];

  return (
    <Container>
      {/* <NpcChatBox
        text={"검색한 캐릭터의 가장 높은 유니온 랭킹을 알려주겠담!"}
      /> */}
      <MainCharacterWrap>
        <NpcBox src={npc_Chat_Box} alt="대화박스" />
        <CharacterInfo>
          <Image src={character_image} alt="캐릭터 이미지" />
          <LineTypingEffect lines={characterInfoLines} speed={50} />
          <PowerStat powerValue={powerValue} />
        </CharacterInfo>
      </MainCharacterWrap>
    </Container>
  );
};

// 스타일 정의
const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MainCharacterWrap = styled.div`
  background-color: aliceblue;
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
  border-radius: 50%;
  margin-bottom: 10px;
  z-index: 10;
`;

const NpcBox = styled.img`
  position: relative; /* 이미지 자체는 위치 설정 가능 */
  z-index: 1;
  width: fit-content;
  height: auto;
`;

const CharacterInfo = styled.div`
  position: absolute; /* NpcBox 안에서 캐릭터 정보 위치 조정 */
  top: 20%; /* 필요에 따라 조정 */
  left: 10%; /* 필요에 따라 조정 */
  z-index: 10; /* 이미지 위에 표시되도록 */
`;
