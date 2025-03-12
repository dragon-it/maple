import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WinImage from "../../assets/slidingPuzzle/Minigame.win.png";
import WinSound from "../../assets/slidingPuzzle/Win.mp3";
import TimerIcon from "../../assets/slidingPuzzle/icons/Clock.svg";
import { SlidingPuzzleMusicPlayer } from "./SlidingPuzzleMusicPlayer";
import colors from "../common/color/colors";
import PuzzleImages from "./SlidingPuzzleImages";

const generateBoard = (size) => {
  let numbers = Array.from({ length: size * size }, (_, i) => i);
  do {
    numbers = shuffle(numbers);
  } while (!isSolvable(numbers, size));
  return chunkArray(numbers, size);
};

const shuffle = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const chunkArray = (array, size) => {
  return Array.from({ length: size }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

const isSolvable = (tiles, size) => {
  let invCount = 0;
  const flatTiles = tiles.filter((tile) => tile !== 0);

  for (let i = 0; i < flatTiles.length; i++) {
    for (let j = i + 1; j < flatTiles.length; j++) {
      if (flatTiles[i] > flatTiles[j]) invCount++;
    }
  }

  const emptyRow = Math.floor(tiles.indexOf(0) / size);
  if (size % 2 === 1) {
    return invCount % 2 === 0;
  } else {
    return (invCount + emptyRow) % 2 === 1;
  }
};

export const SlidingPuzzleLogic = () => {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(() => generateBoard(size));
  const [won, setWon] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [level, setLevel] = useState("normal");
  const [artwork, setArtwork] = useState("artwork1");

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  const handleClick = (row, col) => {
    if (won) return;

    const newBoard = [...board.map((row) => [...row])];
    const [emptyRow, emptyCol] = findEmptyTile(newBoard);

    if (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    ) {
      [newBoard[row][col], newBoard[emptyRow][emptyCol]] = [
        newBoard[emptyRow][emptyCol],
        newBoard[row][col],
      ];
      setBoard(newBoard);
      checkWin(newBoard);
    }
  };

  const findEmptyTile = (board) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === 0) return [i, j];
      }
    }
    return [-1, -1];
  };

  const checkWin = (board) => {
    const flattened = board.flat();
    for (let i = 0; i < flattened.length - 1; i++) {
      if (flattened[i] !== i + 1) return;
    }
    setWon(true);
    new Audio(WinSound).play();
    setStartTime(null); // 타이머 멈추기

    // 0번 타일을 9번 타일로 변경 (size가 4일 경우 조정)
    const newBoard = board.map(
      (row) => row.map((tile) => (tile === 0 ? size * size : tile)) // 3x3이면 9, 4x4면 16
    );
    setBoard(newBoard);
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
    setBoard(generateBoard(newSize));
    setWon(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const handleRestart = () => {
    setBoard(generateBoard(size));
    setWon(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
  };

  const handleArtworkChange = (event) => {
    setArtwork(event.target.value);
  };

  const imageMap = PuzzleImages[artwork]?.src;

  return (
    <PuzzleContainer>
      <HeaderText>SLIDING PUZZLE</HeaderText>
      <OptionWrap>
        <label>
          <span>퍼즐 크기</span>
          <CustomSelect value={size} onChange={handleSizeChange}>
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
          </CustomSelect>
        </label>
        <label>
          <span>아트웍 선택</span>
          <CustomSelect value={artwork} onChange={handleArtworkChange}>
            {Object.entries(PuzzleImages).map(([id, { label }]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </CustomSelect>
        </label>
      </OptionWrap>
      <SlidingPuzzleMusicPlayer />
      <LevelWrap>
        <Normal onClick={() => handleLevelChange("normal")} level={level}>
          NORMAL
          {level === "normal" && <LevelIndicator>◀</LevelIndicator>}
        </Normal>
        <Hard onClick={() => handleLevelChange("hard")} level={level}>
          HARD
          {level === "hard" && <LevelIndicator>◀</LevelIndicator>}
        </Hard>
      </LevelWrap>
      <TimerResetWrap>
        <Timer>
          <img src={TimerIcon} alt="timer-icon" />
          {elapsedTime}초
        </Timer>
        <Reset onClick={handleRestart}>다시하기</Reset>
      </TimerResetWrap>
      <Board size={size} won={won}>
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              className={tile === 0 ? "empty" : ""} // won 상태에서는 empty 클래스 무시
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                backgroundImage:
                  tile !== 0 || won ? `url(${imageMap})` : "none", // won일 때 0도 이미지 표시
                backgroundSize: `${size * 100}% ${size * 100}%`, // 3x3이면 300%, 4x4면 400%
                backgroundPosition:
                  tile !== 0 || won
                    ? `${-((tile - 1) % size) * 100}% ${
                        -Math.floor((tile - 1) / size) * 100
                      }%`
                    : "none", // 타일 위치 계산 (won일 때 tile이 9로 바뀜)
              }}
              won={won}
              tile={tile}
              size={size}
              level={level}
              imageMap={imageMap}
            >
              {tile !== 0 && !won && level !== "hard" && tile}{" "}
              {/* won일 때는 번호 숨김 */}
            </Tile>
          ))
        )}

        {won && <WinImageWrap src={WinImage} alt="Win" />}
      </Board>
    </PuzzleContainer>
  );
};

const PuzzleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: ${colors.commonInfo.wrapBackground};
  border: 1px solid ${colors.commonInfo.wrapBorder};
  border-radius: 8px;
  outline: 1px solid ${colors.commonInfo.wrapOutline};
  padding: 7px;
  transition: 0.2s;
  gap: 5px;
`;

const HeaderText = styled.h1`
  color: ${colors.commonInfo.wrapHeaderText};
  text-shadow: ${colors.commonInfo.textShadow};
  text-align: left;
  font-size: 16px;
`;

const OptionWrap = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 5px;
  color: ${colors.main.white3};
  background-color: ${colors.deepBlue.deepBlue4};
  border: 1px solid ${colors.deepBlue.deepBlue11};
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  font-weight: bold;

  label {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
`;

const CustomSelect = styled.select`
  padding: 6px 10px;
  border-radius: 5px;
  background-color: ${colors.main.white2};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${colors.commonInfo.normalBtn.btnHover};
  }
`;

const Reset = styled.button`
  background: ${colors.commonInfo.normalBtn.btnBackground};
  color: ${colors.commonInfo.normalBtn.btnText};
  font-weight: bold;
  font-size: 15px;
  text-shadow: ${colors.commonInfo.normalBtn.btnTextShadow};
  padding: 5px 15px;
  outline: ${colors.commonInfo.normalBtn.btnOutline};
  border: ${colors.commonInfo.normalBtn.btnBorder};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.15);
  }
`;

const LevelWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin: 5px 0;
`;

const Normal = styled.button`
  position: relative;
  width: 90%;
  background: ${colors.commonInfo.normalBtn.btnBackground};
  color: ${colors.commonInfo.normalBtn.btnText};
  font-size: 17px;
  text-shadow: ${colors.commonInfo.normalBtn.btnTextShadow};
  padding: 5px 15px;
  outline: ${colors.commonInfo.normalBtn.btnOutline};
  border: ${colors.commonInfo.normalBtn.btnBorder};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.15);
  }

  ${({ level }) =>
    level === "normal" &&
    `filter: brightness(1.35); 
    border: ${colors.commonInfo.normalBtn.btnActiveborder};
    outline: ${colors.commonInfo.normalBtn.btnActiveOutline};
    text-shadow: ${colors.commonInfo.normalBtn.btnACtiveTextShadow};
    `}
`;

const Hard = styled.button`
  position: relative;
  width: 90%;
  font-size: 17px;
  background: ${colors.commonInfo.hardBtn.btnBackground};
  color: ${colors.commonInfo.hardBtn.btnText};
  text-shadow: ${colors.commonInfo.hardBtn.btnTextShadow};
  padding: 5px 15px;
  outline: ${colors.commonInfo.hardBtn.btnOutline};
  border: ${colors.commonInfo.hardBtn.btnBorder};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.15);
  }

  ${({ level }) =>
    level === "hard" &&
    `filter: brightness(1.35); 
    border: ${colors.commonInfo.hardBtn.btnActiveborder};
    outline: ${colors.commonInfo.hardBtn.btnActiveOutline};
    text-shadow: ${colors.commonInfo.hardBtn.btnACtiveTextShadow};
    `}
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: ${({ size }) => `repeat(${size}, 1fr)`};
  grid-template-rows: ${({ size }) => `repeat(${size}, 1fr)`};
  gap: 3px;
  background-color: ${colors.commonInfo.contentBackground};
  padding: 5px;
  border-radius: 5px;
  margin: 0px auto;
  width: min(95vw, 95vh);
  height: min(95vw, 95vh);
  max-width: 550px;
  max-height: 550px;

  ${({ won }) => won && `gap: 0px;`}
`;

const Tile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.9vw;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  color: ${colors.main.dark0};
  text-shadow: 1px 1px 2px ${colors.main.white0},
    -1px -1px 2px ${colors.main.white0}, 1px -1px 2px ${colors.main.white0},
    -1px 1px 2px ${colors.main.white0};

  &:hover {
    background: ${colors.main.white6};
  }

  &.empty {
    background: transparent;
    cursor: default;
  }

  ${({ won }) =>
    won &&
    `
    border-radius: 0px; 
  `}
`;
const Timer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  border-radius: 5px;
  color: ${colors.main.dark0};
  padding: 5px;
  background: ${colors.commonInfo.contentBackground};

  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;

const TimerResetWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3px 0;
`;

const WinImageWrap = styled.img`
  position: absolute;
  max-width: 40%;
`;

const LevelIndicator = styled.span`
  position: absolute;
  left: 100%;
  margin-left: 5px;
  font-size: 17px;
  color: ${colors.commonInfo.normalBtn.btnText};
  line-height: 1;
`;
