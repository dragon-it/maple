import React, { useState, useEffect } from "react";
import card_Backgrnd from "../assets/pages/randomClass/classillust/characterCard.slotBackgrnd.png";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import characters from "../components/randomClass/RandomClassImage";

export const RandomClass = () => {
  const [results, setResults] = useState([]);
  const [rollMode, setRollMode] = useState(1);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState([]);

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
          (prevIndex) => (prevIndex + 1) % characters.length,
        );
      }, 20);
    }
    return () => clearInterval(interval);
  }, [isRolling]);

  const handleStartRoulette = (count) => {
    if (isRolling) return;
    setRollMode(count);
    setIsRolling(true);
    setResults([]);

    setTimeout(() => {
      setIsRolling(false);
      const newResults = Array.from({ length: count }).map(() =>
        getRandomCharacter(),
      );
      setResults(newResults);

      setHistory((prev) => {
        const newHistory = [...prev];
        newResults.forEach((char) => {
          const existing = newHistory.find((h) => h.name === char.name);
          if (existing) {
            existing.count += 1;
          } else {
            newHistory.push({ name: char.name, count: 1 });
          }
        });
        newHistory.sort((a, b) => b.count - a.count);
        return newHistory;
      });
    }, 1000);
  };

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const PreloadImages = () => (
    <div style={{ display: "none" }}>
      {characters.map((character, index) => (
        <img key={index} src={character.image} alt="" />
      ))}
    </div>
  );

  return (
    <Container>
      <PreloadImages />
      <Helmet>
        <title>랜덤 직업 뽑기 - 메짱</title>
        <meta
          name="description"
          content="메이플스토리 직업 랜덤 뽑기 기능입니다."
        />
      </Helmet>
      <Wrapper>
        <ContentsWrap>
          <Title>랜덤 직업 뽑기</Title>
          <CardsGrid $rollMode={rollMode}>
            {isRolling
              ? Array.from({ length: rollMode }).map((_, i) => {
                  const charIndex =
                    (currentCharacterIndex + i * 7) % characters.length;
                  const char = characters[charIndex];
                  return (
                    <CardItem key={i}>
                      <ClassImage
                        style={{ "--bg-image": `url(${char.image})` }}
                        $hasImage={true}
                        $isRolling={true}
                        alt="Character"
                      />
                      <ClassName>{char.name}</ClassName>
                    </CardItem>
                  );
                })
              : results.length > 0
                ? results.map((char, i) => (
                    <CardItem key={i}>
                      <ClassImage
                        style={{ "--bg-image": `url(${char.image})` }}
                        $hasImage={true}
                        $isRolling={false}
                        alt="Selected Character"
                      />
                      <ClassName>
                        {char.name} <span>당첨!</span>
                      </ClassName>
                    </CardItem>
                  ))
                : Array.from({ length: rollMode }).map((_, i) => (
                    <CardItem key={i}>
                      <ClassImage
                        style={{ "--bg-image": `url(${card_Backgrnd})` }}
                        $hasImage={false}
                        $isRolling={false}
                        alt="Background"
                      />
                      <ClassName style={{ display: "none" }}>
                        - <span>당첨!</span>
                      </ClassName>
                    </CardItem>
                  ))}
          </CardsGrid>

          <BtnGroup>
            <StartBtn
              onClick={() => handleStartRoulette(1)}
              disabled={isRolling}
            >
              1회 뽑기
            </StartBtn>
            <StartBtn
              onClick={() => handleStartRoulette(5)}
              disabled={isRolling}
            >
              5회 뽑기
            </StartBtn>
          </BtnGroup>
        </ContentsWrap>

        {history.length > 0 && (
          <HistoryWrap>
            <HistoryTitle>기록</HistoryTitle>
            <HistoryList>
              {history.map((item, index) => (
                <HistoryItem key={index}>
                  <span className="name">{item.name}</span>
                  <span className="count">{item.count}회</span>
                </HistoryItem>
              ))}
            </HistoryList>
            <ResetBtn onClick={handleClearHistory}>초기화</ResetBtn>
          </HistoryWrap>
        )}
      </Wrapper>
    </Container>
  );
};

// --- 스타일 컴포넌트 ---

const Container = styled.div`
  width: 90%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  font-family: maple-light;
  padding: 15px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 1600px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;
const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
  gap: 5px;
  border-radius: 5px;
  border: 1px solid rgb(30, 38, 47);
  outline: 2px solid rgb(56, 87, 106);
  background-color: rgb(43, 53, 62);
  padding: 10px;
  box-sizing: border-box;
`;

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 570px) {
    gap: 6px;
  }
`;

const CardItem = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 200px;

  @media (max-width: 570px) {
    width: calc((100vw - 80px) / 2);
    max-width: 200px;
  }
`;

const HistoryWrap = styled.div`
  position: absolute;
  left: 100%;
  bottom: 0;
  margin-left: 7px;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 300px;
  border-radius: 5px;
  border: 1px solid rgb(30, 38, 47);
  outline: 2px solid rgb(56, 87, 106);
  background-color: rgb(43, 53, 62);
  padding: 8px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
  z-index: 1;
  box-sizing: border-box;
  animation: slideIn 0.3s ease-out forwards;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 1600px) {
    position: static;
    margin-left: 0;
    width: 100%;
    max-width: 1060px;
    height: auto;
    max-height: 320px;
    animation: fadeIn 0.3s ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HistoryTitle = styled.div`
  text-align: center;
  color: rgb(220, 252, 2);
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.35);
  border-radius: 5px;
  font-size: 16px;
  padding: 2px 0;
  margin-bottom: 5px;
`;

const HistoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: start;
  gap: 5px;
  overflow-y: auto;
  flex: 1;
  margin-bottom: 6px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(86, 117, 136);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: rgb(30, 38, 47);
    border-radius: 3px;
  }
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(238, 238, 238);
  color: rgb(0, 0, 0);
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 3px;

  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .count {
    font-weight: bold;
    color: #d32f2f;
    min-width: 25px;
    text-align: right;
  }
`;

const ResetBtn = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 4px;
  background-color: #d32f2f;
  color: white;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition:
    background 0.2s,
    transform 0.1s;

  &:hover {
    background-color: #b71c1c;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const Title = styled.p`
  text-align: center;
  color: rgb(3, 3, 3);
  background: radial-gradient(
    circle,
    rgba(227, 186, 252, 1) 18%,
    rgba(180, 234, 246, 1) 89%
  );
  border-radius: 5px;
  font-size: 18px;
  padding: 4px 0;
`;

const ClassName = styled.p`
  width: 100%;
  background: rgb(238, 238, 238);
  color: rgb(0, 0, 0);
  font-size: 18px;
  border-radius: 5px;
  text-align: center;
  padding: 2px 0;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    color: rgb(221, 62, 62);
    font-weight: bold;
  }

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const ClassImage = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  border-radius: 5%;
  overflow: hidden;
  border: ${(props) => (props.$hasImage ? "4px solid transparent" : "none")};
  box-sizing: border-box;

  background-image: var(--bg-image)
    ${(props) =>
      props.$hasImage
        ? ", linear-gradient(to right, #ff0000, #ff7f00, #ffff00,  #ff0000)"
        : ""};
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  background-size:
    cover,
    200% 100%;
  background-position:
    center,
    0% 0%;

  animation: ${(props) =>
    props.$hasImage && !props.$isRolling
      ? "rainbow-gradient-border 2s linear infinite"
      : "none"};

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
      rgb(255 255 255 / 30%) 59%,
      rgb(255 255 255 / 0%) 66%
    );
    animation: ${(props) =>
      props.$isRolling ? "none" : "holo-move 1.5s infinite linear"};
    opacity: ${(props) => (props.$isRolling ? 0 : 1)};
    pointer-events: none;
  }

  @keyframes holo-move {
    0% {
      transform: translateX(-60%);
    }
    100% {
      transform: translateX(50%);
    }
  }

  @keyframes rainbow-gradient-border {
    0% {
      background-position:
        center,
        0% 0%;
    }
    100% {
      background-position:
        center,
        200% 0%;
    }
  }

  @media (max-width: 1080px) {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  margin-top: 3px;
`;

const StartBtn = styled.div`
  flex: 1;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 18px;
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
