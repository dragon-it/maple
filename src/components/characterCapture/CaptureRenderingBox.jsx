import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatPowerStat } from "../common/powerStat/PowerStat";
import npc_Chat_Box from "../../assets/npc/npc_Chat_Box.png";
import html2canvas from "html2canvas";
import { Helmet } from "react-helmet-async";
import TanjiroImage from "../../assets/npc/tanjiro.png";

const StyledLine = styled.div`
  display: flex;
  align-items: center;
  margin: 1px 0;
  color: rgb(0, 0, 0);
  gap: 5px;

  @media screen and (max-width: 519px) {
    gap: 2px;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  border-radius: 5px;
  background-color: rgb(197, 220, 242);
  padding: 2px 3px;

  @media screen and (max-width: 519px) {
    font-size: 3.1vw;
  }
`;

const Value = styled.span`
  display: flex;
  align-items: center;

  @media screen and (max-width: 519px) {
    font-size: 2vw;
    word-spacing: -1px;
  }
`;

const LineTypingEffect = ({ lines, speed = 5 }) => {
  // useState를 사용해서 현재 화면에 표시된 줄을 관리. 처음엔 빈 배열.
  const [displayedLines, setDisplayedLines] = useState([]);

  // 몇 번째 줄을 타이핑 중인지 관리하는 상태 변수. 처음엔 0부터 시작.
  const [lineIndex, setLineIndex] = useState(0);

  // 현재 타이핑 중인 줄에서 몇 번째 글자까지 출력했는지 관리하는 상태 변수.
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lines.length > 0 && lineIndex < lines.length) {
      if (
        charIndex <
        lines[lineIndex].label.length + lines[lineIndex].value.length
      ) {
        const timeoutId = setTimeout(() => {
          setDisplayedLines((prev) => {
            const currentLine = prev[lineIndex] || { label: "", value: "" };
            const isLabel = charIndex < lines[lineIndex].label.length;

            return [
              ...prev.slice(0, lineIndex),
              {
                label: isLabel
                  ? currentLine.label + lines[lineIndex].label[charIndex]
                  : lines[lineIndex].label,
                value: !isLabel
                  ? currentLine.value +
                    lines[lineIndex].value[
                      charIndex - lines[lineIndex].label.length
                    ]
                  : currentLine.value,
              },
            ];
          });

          setCharIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(timeoutId);
      } else {
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }
    }
  }, [lineIndex, charIndex, lines, speed]);

  return (
    <>
      {displayedLines.map((line, i) => (
        <StyledLine key={i}>
          <Label>{line.label}</Label>
          <Value>{line.value}</Value>
        </StyledLine>
      ))}
    </>
  );
};

export const CaptureRenderingBox = ({ result }) => {
  const {
    character_level,
    character_name,
    character_class,
    character_guild_name,
    character_image,
    world_name,
  } = result?.getCombinedData?.getBasicInformation || {};

  const { union_level } = result?.getCombinedData?.getUnion || {};
  const { popularity } = result?.getCombinedData?.getCharacterPopularity || {};

  const { stat_value: powerValue } = result?.getCombinedData?.getCharacterStat
    ?.final_stat?.[42] || { stat_value: 0 };

  const characterInfoLines = [
    { label: "닉네임", value: String(character_name ?? "-") },
    { label: "전투력", value: String(formatPowerStat(powerValue) ?? "-") },
    { label: "유니온", value: String(union_level ?? "-") },
    { label: "인기도", value: String(popularity ?? "-") },
  ];

  const characterInfoLinesSecond = [
    { label: "레벨", value: String(character_level ?? "-") },
    { label: "직업", value: String(character_class ?? "-") },
    { label: "월드", value: String(world_name ?? "-") },
    { label: "길드", value: String(character_guild_name ?? "-") },
  ];

  const [imageSrc, setImageSrc] = useState(character_image || "");

  const fetchImageFromProxy = async (imageUrl) => {
    try {
      const response = await fetch(
        `/api/image-proxy?imageUrl=${encodeURIComponent(imageUrl)}`
      );
      if (!response.ok) {
        throw new Error("요청 실패");
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("이미지 로드 오류:", error);
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

    const canvas = await html2canvas(element, {
      allowTaint: true, // 크로스 오리진 허용
      useCORS: true, // CORS서버 이미지 로드 허용
      backgroundColor: null, // 백그라운드 컬러 제외
      width: 519, // 캔버스 폭 고정
      height: 202, // 캔버스 높이 고정
      windowWidth: 1920, // 윈도우 폭 고정
      windowHeight: 911, // 윈도우 높이 고정
      scale: 1.35, // 스케일 설정 기본 1
    });

    const link = document.createElement("a");
    link.download = "캐릭터NPC.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <Container>
      <Helmet>
        <title>{`${character_name} - 캐릭터 캡처`}</title>
        <meta
          name="description"
          content="캐릭터를 이미지로 저장하는 기능입니다."
        />
      </Helmet>
      <MainCharacterWrap id="character-wrap" crossOrigin="anonymous">
        <NpcBox src={npc_Chat_Box} alt="대화박스" />
        <CharacterInfo>
          <NpcWrap>
            <Image
              src={
                character_class === "카마도 탄지로" ? TanjiroImage : imageSrc
              }
              alt="캐릭터 이미지"
            />
            <NickName>{character_name}</NickName>
          </NpcWrap>
          <NpcText>
            <LineColumn>
              <LineTypingEffect lines={characterInfoLines} speed={5} />
            </LineColumn>
            <LineColumn>
              <LineTypingEffect lines={characterInfoLinesSecond} speed={5} />
            </LineColumn>
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
  margin-top: 10px;
`;

const MainCharacterWrap = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  position: relative;
  top: 0px;
  z-index: -1;
  transform: translate(0%, -6%) scaleX(-1);
  image-rendering: pixelated;

  @media screen and (max-width: 519px) {
    transform: translate(-2%, -16%) scaleX(-1);
    height: 100px;
  }
`;

const NpcBox = styled.img`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const CharacterInfo = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-around;
  align-items: center;
  padding: 13px 13px 36px 17px;
`;

const NickName = styled.span`
  position: absolute;
  width: 100%;
  bottom: 0;
  max-height: 23px;
  background: linear-gradient(
    180deg,
    rgb(150, 149, 143) 0%,
    rgb(136, 136, 136) 49%,
    rgb(108, 106, 106) 100%
  );
  color: rgb(247, 247, 247);
  border: 2px solid rgb(82, 79, 87);
  border-radius: 7px;
  text-align: center;
  font-size: 1em;
  border: 2px solid rgba(230, 230, 230, 0.6);
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translate(0%, -430%);
  white-space: nowrap;

  @media screen and (max-width: 519px) {
    transform: translate(-5%, 30%);
    font-size: 2.3vw;
  }
`;

const NpcWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 23%;
`;

const NpcText = styled.div`
  display: flex;
  gap: 5px;
  width: 70%;
  overflow-wrap: break-word;
  white-space: normal;
  margin-left: 10px;
  white-space: nowrap;

  @media screen and (max-width: 519px) {
    white-space: pre-wrap;
  }
`;

const SaveButton = styled.button`
  margin-top: 10px;
  padding: 8px 18px;
  background: linear-gradient(
    180deg,
    rgb(255, 221, 85) 20%,
    rgb(221, 136, 17) 100%
  );
  color: white;
  text-shadow: 1px 1px rgba(58, 58, 58, 0.5);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
  border: 2px solid rgb(213, 125, 13);
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      180deg,
      rgb(255, 230, 132) 20%,
      rgb(221, 136, 17) 100%
    );
    transform: scale(1.02);
  }
  z-index: 999;
`;

const LineColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  @media screen and (max-width: 519px) {
    gap: 0px;
  }
`;
