import React, { useState, useEffect } from "react";
import class1 from "../assets/classillust/char1.webp";
import class2 from "../assets/classillust/char2.webp";
import class3 from "../assets/classillust/char3.webp";
import class4 from "../assets/classillust/char4.webp";
import class5 from "../assets/classillust/char5.webp";
import class6 from "../assets/classillust/char6.webp";
import class7 from "../assets/classillust/char7.webp";
import class8 from "../assets/classillust/char8.webp";
import class9 from "../assets/classillust/char9.webp";
import class10 from "../assets/classillust/char10.webp";
import class11 from "../assets/classillust/char11.webp";
import class12 from "../assets/classillust/char12.webp";
import class13 from "../assets/classillust/char13.webp";
import class14 from "../assets/classillust/char14.webp";
import class15 from "../assets/classillust/char15.webp";
import class16 from "../assets/classillust/char16.webp";
import class17 from "../assets/classillust/char17.webp";
import class18 from "../assets/classillust/char18.webp";
import class19 from "../assets/classillust/char19.webp";
import class20 from "../assets/classillust/char20.webp";
import class21 from "../assets/classillust/char21.webp";
import class22 from "../assets/classillust/char22.webp";
import class23 from "../assets/classillust/char23.webp";
import class24 from "../assets/classillust/char24.webp";
import class25 from "../assets/classillust/char25.webp";
import class26 from "../assets/classillust/char26.webp";
import class27 from "../assets/classillust/char27.webp";
import class28 from "../assets/classillust/char28.webp";
import class29 from "../assets/classillust/char29.webp";
import class30 from "../assets/classillust/char30.webp";
import class31 from "../assets/classillust/char31.webp";
import class32 from "../assets/classillust/char32.webp";
import class33 from "../assets/classillust/char33.webp";
import class34 from "../assets/classillust/char34.webp";
import class35 from "../assets/classillust/char35.webp";
import class36 from "../assets/classillust/char36.webp";
import class37 from "../assets/classillust/char37.webp";
import class38 from "../assets/classillust/char38.webp";
import class39 from "../assets/classillust/char39.webp";
import class40 from "../assets/classillust/char40.webp";
import class41 from "../assets/classillust/char41.webp";
import class42 from "../assets/classillust/char42.webp";
import class43 from "../assets/classillust/char43.webp";
import class44 from "../assets/classillust/char44.webp";
import class45 from "../assets/classillust/char45.webp";
import class46 from "../assets/classillust/char46.webp";
import card_Backgrnd from "../assets/classillust/characterCard.slotBackgrnd.webp";

import styled from "styled-components";

const characters = [
  { id: 1, name: "히어로", image: class1 },
  { id: 2, name: "팔라딘", image: class2 },
  { id: 3, name: "다크나이트", image: class3 },
  { id: 4, name: "소울마스터", image: class4 },
  { id: 5, name: "미하일", image: class5 },
  { id: 6, name: "블래스터", image: class6 },
  { id: 7, name: "데몬 슬레이어", image: class7 },
  { id: 8, name: "데몬 어벤져", image: class8 },
  { id: 9, name: "아란", image: class9 },
  { id: 10, name: "카이저", image: class10 },
  { id: 11, name: "아델", image: class11 },
  { id: 12, name: "제로", image: class12 },
  { id: 13, name: "아크메이지(불,독)", image: class13 },
  { id: 14, name: "아크메이지(썬,콜)", image: class14 },
  { id: 15, name: "비숍", image: class15 },
  { id: 16, name: "플레임위자드", image: class16 },
  { id: 17, name: "배틀메이지", image: class17 },
  { id: 18, name: "에반", image: class18 },
  { id: 19, name: "루미너스", image: class19 },
  { id: 20, name: "일리움", image: class20 },
  { id: 21, name: "라라", image: class21 },
  { id: 22, name: "키네시스", image: class22 },
  { id: 23, name: "보우마스터", image: class23 },
  { id: 24, name: "신궁", image: class24 },
  { id: 25, name: "패스파인더", image: class25 },
  { id: 26, name: "윈드브레이커", image: class26 },
  { id: 27, name: "와일드헌터", image: class27 },
  { id: 28, name: "메르세데스", image: class28 },
  { id: 29, name: "카인", image: class29 },
  { id: 30, name: "나이트로드", image: class30 },
  { id: 31, name: "섀도어", image: class31 },
  { id: 32, name: "듀얼블레이드", image: class32 },
  { id: 33, name: "나이트워커", image: class33 },
  { id: 34, name: "제논", image: class34 },
  { id: 35, name: "팬텀", image: class35 },
  { id: 36, name: "카데나", image: class36 },
  { id: 37, name: "칼리", image: class37 },
  { id: 38, name: "호영", image: class38 },
  { id: 39, name: "바이퍼", image: class39 },
  { id: 40, name: "캡틴", image: class40 },
  { id: 41, name: "캐논슈터", image: class41 },
  { id: 42, name: "스트라이커", image: class42 },
  { id: 43, name: "메카닉", image: class43 },
  { id: 44, name: "은월", image: class44 },
  { id: 45, name: "엔젤릭버스터", image: class45 },
  { id: 46, name: "아크", image: class46 },
];

export const RandomClass = () => {
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    let interval;
    if (isRolling) {
      interval = setInterval(() => {
        setCurrentCharacterIndex(
          (prevIndex) => (prevIndex + 1) % characters.length
        );
      }, 10);
    } else if (!isRolling && selectedCharacter) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRolling, selectedCharacter]);

  const handleStartRoulette = () => {
    if (isRolling) return;
    setIsRolling(true);
    setSelectedCharacter(null);

    // 일정 시간 후 룰렛 멈추기
    setTimeout(() => {
      setIsRolling(false);
      const randomCharacter = getRandomCharacter();
      setSelectedCharacter(randomCharacter); // 랜덤 캐릭터 선택
    }, 1500); // 1초 후에 멈춤
  };

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  return (
    <Container>
      <ContentsWrap>
        <Title>랜덤 직업 뽑기</Title>
        <>
          {isRolling ? (
            // 애니메이션 중일 때는 순환하는 캐릭터를 보여줌
            <>
              <ClassImage
                image={characters[currentCharacterIndex].image}
                alt="Character"
              />
              <ClassName>{characters[currentCharacterIndex].name}</ClassName>
            </>
          ) : (
            // 뽑기가 끝나면 선택된 캐릭터를 보여줌
            <>
              <ClassImage
                image={selectedCharacter ? selectedCharacter.image : null} // 선택된 캐릭터가 없으면 기본 배경만 표시
                alt={selectedCharacter ? "Selected Character" : "Background"}
              />
              {selectedCharacter && (
                <ClassName>
                  {selectedCharacter.name} <span>당첨!</span>
                </ClassName>
              )}
            </>
          )}
        </>
        <StartBtn onClick={handleStartRoulette} disabled={isRolling}>
          뽑기
        </StartBtn>
      </ContentsWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  font-family: maple-light;
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: auto;
  gap: 5px;
  border-radius: 5px;
  border: 1px solid rgb(30, 38, 47);
  outline: 2px solid rgb(56, 87, 106);
  background-color: rgb(43, 53, 62);
  padding: 5px 15px 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
`;

const Title = styled.p`
  text-align: center;
  color: rgb(3, 3, 3);
  background: rgb(227, 186, 252);
  background: radial-gradient(
    circle,
    rgba(227, 186, 252, 1) 18%,
    rgba(180, 234, 246, 1) 89%
  );

  border-radius: 5px;
  font-size: 18px;
`;

const ClassName = styled.p`
  background: rgb(238, 238, 238);
  color: rgb(0, 0, 0);
  font-size: 20px;
  border-radius: 5px;
  text-align: center;

  span {
    color: rgb(221, 62, 62);
    font-weight: bold;
  }
`;

const ClassImage = styled.div`
  width: 200px;
  height: 300px;
  background-image: url(${card_Backgrnd});
  background-size: cover;
  background-position: center;
  border-radius: 5%;
  border: ${(props) => (props.image ? "3px solid rgb(145, 145, 145)" : "none")};

  ${(props) =>
    props.image &&
    `
    background-image: url(${props.image});
    background-size: cover;
    background-position: center;
  `}
`;

const StartBtn = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 20px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: rgb(252, 252, 252);
  text-shadow: 1px 1px 0px rgb(189, 109, 5);
  background: linear-gradient(
    180deg,
    rgba(255, 196, 22, 1) 44%,
    rgba(246, 164, 1, 1) 100%
  );
  border-top: 1px solid rgb(255, 229, 36);
  outline: 1px solid rgb(190, 102, 16);
  box-shadow: 0px 2px 0px rgb(190, 102, 16);

  filter: ${(props) => (props.disabled ? "brightness(0.6)" : "brightness(1)")};

  &:hover {
    filter: ${(props) =>
      props.disabled ? "brightness(0.6)" : "brightness(1.1)"};
  }
`;
