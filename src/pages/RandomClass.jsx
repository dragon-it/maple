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

  // 최적화: 20ms 간격으로 상태를 업데이트하지만 DOM에 직접 인라인 스타일을 주어 성능 최적화
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

    // 1초 후 룰렛 멈추기
    setTimeout(() => {
      setIsRolling(false);
      const newResults = Array.from({ length: count }).map(() => getRandomCharacter());
      setResults(newResults);
      
      setHistory((prev) => {
        const newHistory = [...prev];
        newResults.forEach(char => {
          const existing = newHistory.find(h => h.name === char.name);
          if (existing) {
            existing.count += 1;
          } else {
            newHistory.push({ name: char.name, count: 1 });
          }
        });
        // 많이 뽑힌 순으로 정렬
        newHistory.sort((a, b) => b.count - a.count);
        return newHistory;
      });
    }, 1000);
  };

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
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
          <CardsGrid>
            {isRolling ? (
              // 롤링 애니메이션 (styled-components 클래스 재생성을 막기 위해 CSS 변수와 인라인 스타일 사용)
              Array.from({ length: rollMode }).map((_, i) => {
                const charIndex = (currentCharacterIndex + i * 7) % characters.length;
                const char = characters[charIndex];
                return (
                  <CardItem key={i}>
                    <ClassImage
                      style={{ '--bg-image': `url(${char.image})` }}
                      $hasImage={true}
                      $isRolling={true}
                      alt="Character"
                    />
                    <ClassName>{char.name}</ClassName>
                  </CardItem>
                );
              })
            ) : results.length > 0 ? (
              // 결과 표시
              results.map((char, i) => (
                <CardItem key={i}>
                  <ClassImage
                    style={{ '--bg-image': `url(${char.image})` }}
                    $hasImage={true}
                    $isRolling={false}
                    alt="Selected Character"
                  />
                  <ClassName>
                    {char.name} <span>당첨!</span>
                  </ClassName>
                </CardItem>
              ))
            ) : (
              // 초기 화면
              Array.from({ length: rollMode }).map((_, i) => (
                <CardItem key={i}>
                  <ClassImage
                    style={{ '--bg-image': `url(${card_Backgrnd})` }}
                    $hasImage={false}
                    $isRolling={false}
                    alt="Background"
                  />
                  {/* 빈 공간 차지용 숨김 처리 텍스트 */}
                  <ClassName style={{ visibility: "hidden" }}>
                    - <span>당첨!</span>
                  </ClassName>
                </CardItem>
              ))
            )}
          </CardsGrid>

          <BtnGroup>
            <StartBtn onClick={() => handleStartRoulette(1)} disabled={isRolling}>
              1회 뽑기
            </StartBtn>
            <StartBtn onClick={() => handleStartRoulette(5)} disabled={isRolling}>
              5회 뽑기
            </StartBtn>
          </BtnGroup>
        </ContentsWrap>

        {/* 애드온(기록) 영역 - 2줄(그리드) 형식 & 위에서부터 쌓이도록 변경 */}
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
          </HistoryWrap>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  font-family: maple-light;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
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
  padding: 10px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
  position: relative;
  z-index: 2;
`;

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px 0;
  max-width: 1060px; /* 5 cards * 200px + gaps */
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const HistoryWrap = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: 12px;
  
  display: flex;
  flex-direction: column;
  width: 250px;
  max-height: 400px;
  border-radius: 5px;
  border: 1px solid rgb(30, 38, 47);
  outline: 2px solid rgb(56, 87, 106);
  background-color: rgb(43, 53, 62);
  padding: 5px;
  box-shadow: 0 4px 8px rgb(0, 0, 0);
  z-index: 1;

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
`;

const HistoryTitle = styled.div`
  text-align: center;
  color: rgb(3, 3, 3);
  background: radial-gradient(
    circle,
    rgba(227, 186, 252, 1) 18%,
    rgba(180, 234, 246, 1) 89%
  );
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
  padding-right: 2px;
  
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
  font-size: 20px;
  border-radius: 5px;
  text-align: center;
  padding: 2px 0;

  span {
    color: rgb(221, 62, 62);
    font-weight: bold;
  }
`;

const ClassImage = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  border-radius: 5%;
  overflow: hidden;

  /* Transparent border makes room for the gradient background beneath */
  border: ${(props) => (props.$hasImage ? "4px solid transparent" : "none")};
  
  /* Multiple backgrounds: first is the character image covering the padding-box, 
     second is the animated linear-gradient covering the border-box */
  background-image: 
    var(--bg-image)${(props) => props.$hasImage ? ", linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)" : ""};
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  background-size: cover, 200% 100%;
  background-position: center, 0% 0%;

  animation: ${(props) => (props.$hasImage ? "rainbow-gradient-border 2s linear infinite" : "none")};

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
      background-position: center, 0% 0%;
    }
    100% {
      background-position: center, 200% 0%;
    }
  }
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  margin-top: 5px;
`;

const StartBtn = styled.div`
  flex: 1;
  min-width: 120px;
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