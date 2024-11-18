import React, { useState, useEffect } from "react";
import card_Backgrnd from "../assets/classillust/characterCard.slotBackgrnd.png";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import characters from "../components/randomClass/RandomClassImage";

export const RandomClass = () => {
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    const preLoadImages = () => {
      characters.forEach((character) => {
        const img = new Image();
        img.src = character.image;
      });
    };
    preLoadImages();
  }, []);

  useEffect(() => {
    let interval;
    if (isRolling) {
      interval = setInterval(() => {
        setCurrentCharacterIndex(
          (prevIndex) => (prevIndex + 1) % characters.length
        );
      }, 20);
    }
    return () => clearInterval(interval);
  }, [isRolling]);

  const handleStartRoulette = () => {
    if (isRolling) return;
    setIsRolling(true);
    setSelectedCharacter(null);

    // 일정 시간 후 룰렛 멈추기
    setTimeout(() => {
      setIsRolling(false);
      setSelectedCharacter(getRandomCharacter()); // 랜덤 캐릭터 선택
    }, 1500); // 1초 후에 멈춤
  };

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  return (
    <Container>
      <Helmet>
        <title>랜덤 직업 뽑기 - 메짱</title>
        <meta
          name="description"
          content="MapleStory 직업 랜덤 뽑기 기능을 제공합니다."
        />
      </Helmet>
      <ContentsWrap>
        <Title>랜덤 직업 뽑기</Title>
        <>
          {isRolling ? (
            // 애니메이션 중일 때는 순환하는 캐릭터를 보여줌
            <>
              <ClassImage
                image={characters[currentCharacterIndex].image}
                isRolling={isRolling}
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
  position: relative;
  width: 200px;
  height: 300px;
  background-image: url(${card_Backgrnd});
  background-size: cover;
  background-position: center;
  border-radius: 5%;
  border: ${(props) => (props.image ? "3px solid rgb(145, 145, 145)" : "none")};
  overflow: hidden;
  ${(props) => props.image && `background-image: url(${props.image});`}

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 230%;
    height: 100%;
    background: linear-gradient(
      232deg,
      rgb(255 255 255 / 0%) 52%,
      rgb(255 255 255 / 80%) 59%,
      rgb(255 255 255 / 0%) 66%
    );
    animation: holo-move 1.5s infinite linear;
    opacity: ${(props) => (props.isRolling ? 0 : 1)};
  }

  @keyframes holo-move {
    0% {
      transform: translateX(-60%);
    }
    100% {
      transform: translateX(50%);
    }
  }
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
