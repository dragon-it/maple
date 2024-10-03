import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatPowerStat } from "../common/powerStat/PowerStat";
import npc_Chat_Box from "../../assets/npc/npc_Chat_Box.png";
import html2canvas from "html2canvas";

const StyledLine = styled.p`
  margin: 2px 0;
  color: rgb(0, 0, 0);
  @media screen and (max-width: 519px) {
    margin: 0;
    font-size: 2.3vw;
  }
`;

const LineTypingEffect = ({ lines, speed = 5 }) => {
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

export const CaptureRenderingBox = ({ result }) => {
  console.log(result);
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
    `전투력: ${formatPowerStat(powerValue) || "전투력 없음"}`,
    `직업: ${character_class || "직업 없음"}`,
    `월드: ${world_name || "월드 정보 없음"}`,
    character_guild_name ? `길드: ${character_guild_name}` : "",
  ];

  const [imageSrc, setImageSrc] = useState(character_image || "");

  const fetchImageFromProxy = async (imageUrl) => {
    try {
      const response = await fetch(
        `/api/image-proxy?imageUrl=${encodeURIComponent(imageUrl)}`
      );
      if (!response.ok) {
        throw new Error("프록시 요청 실패");
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("프록시를 통한 이미지 로드 오류:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      if (character_image) {
        try {
          const proxyImageUrl = await fetchImageFromProxy(character_image);
          setImageSrc(proxyImageUrl);
        } catch (error) {
          console.error("이미지 로드 오류:", error);
        }
      }
    };
    loadImage();
  }, [character_image]);

  const saveAsImage = async () => {
    const element = document.getElementById("character-wrap");

    const width = 519;
    const height = 202;

    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: null,
      Width: width, // 고정된 캔버스 폭
      Height: height, // 고정된 캔버스 높이
      scale: 1.4, // 스케일 설정 (크기 조정)
    });

    const link = document.createElement("a");
    link.download = "캐릭터NPC.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Container>
      <MainCharacterWrap id="character-wrap" crossOrigin="anonymous">
        <NpcBox src={npc_Chat_Box} alt="대화박스" />
        <CharacterInfo>
          <NpcWrap>
            <Image src={imageSrc} alt="캐릭터 이미지" />
            <NickName>{character_name}</NickName>
          </NpcWrap>
          <NpcText>
            <LineTypingEffect lines={characterInfoLines} speed={5} />
          </NpcText>
        </CharacterInfo>
      </MainCharacterWrap>
      <SaveButton onClick={saveAsImage}>이미지로 저장</SaveButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: none;
`;

const MainCharacterWrap = styled.div`
  width: fit-content;
  position: relative;
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
  top: 9px;
  z-index: -1;
`;

const NpcBox = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  height: auto;
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
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(150, 149, 143, 1) 0%,
    rgba(136, 136, 136, 1) 49%,
    rgba(108, 106, 106, 1) 100%
  );
  color: rgb(247, 247, 247);
  border: 2px solid rgb(82, 79, 87);
  border-radius: 7px;
  text-align: center;
  font-size: 1em;
  border: 2px solid rgba(230, 230, 230, 0.6);
  white-space: nowrap;

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

const SaveButton = styled.button`
  margin-top: 10px;
  padding: 8px 18px;
  background: linear-gradient(
    180deg,
    rgba(255, 221, 85, 1) 20%,
    rgba(221, 136, 17, 1) 100%
  );
  color: white;
  text-shadow: 1px 1px #3a3a3a7f;
  border: 2px solid rgb(213, 125, 13);
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;

  &:hover {
    background: linear-gradient(
      180deg,
      #ffe684 20%,
      rgba(221, 136, 17, 1) 100%
    );
  }
`;
