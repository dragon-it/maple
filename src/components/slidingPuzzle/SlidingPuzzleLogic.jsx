import React, { useState, useEffect } from "react";
import styled from "styled-components";
import puzzleImage1 from "../../assets/slidingPuzzle/3/1.jpg";
import puzzleImage2 from "../../assets/slidingPuzzle/3/2.jpg";
import puzzleImage3 from "../../assets/slidingPuzzle/3/3.jpg";
import puzzleImage4 from "../../assets/slidingPuzzle/3/4.jpg";
import puzzleImage5 from "../../assets/slidingPuzzle/3/5.jpg";
import puzzleImage6 from "../../assets/slidingPuzzle/3/6.jpg";
import puzzleImage7 from "../../assets/slidingPuzzle/3/7.jpg";
import puzzleImage8 from "../../assets/slidingPuzzle/3/8.jpg";
import puzzleImage9 from "../../assets/slidingPuzzle/3/9.jpg";
import WinImage from "../../assets/slidingPuzzle/Minigame.win.png";
import WinSound from "../../assets/slidingPuzzle/Win.mp3";
import { SlidingPuzzleMusicPlayer } from "./SlidingPuzzleMusicPlayer";
import colors from "../common/color/colors";

const imageMap = {
  1: puzzleImage1,
  2: puzzleImage2,
  3: puzzleImage3,
  4: puzzleImage4,
  5: puzzleImage5,
  6: puzzleImage6,
  7: puzzleImage7,
  8: puzzleImage8,
  9: puzzleImage9,
};

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
  console.log(level);

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

    // 0번 타일을 9번 타일로 변경
    const newBoard = board.map((row) =>
      row.map((tile) => (tile === 0 ? 9 : tile))
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

  return (
    <PuzzleContainer>
      <HeaderText>SLIDING PUZZLE</HeaderText>
      <label>
        퍼즐 크기 :
        <select value={size} onChange={handleSizeChange}>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
        </select>
      </label>
      <SlidingPuzzleMusicPlayer />
      <LevelWrap>
        <Normal onClick={() => handleLevelChange("normal")} level={level}>
          NORMAL
        </Normal>
        <Hard onClick={() => handleLevelChange("hard")} level={level}>
          HARD
        </Hard>
      </LevelWrap>
      <Timer>시간 : {elapsedTime}초</Timer>
      <Reset onClick={handleRestart}>다시하기</Reset>
      <Board size={size} won={won}>
        {board.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              className={tile === 0 ? "empty" : ""}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                backgroundImage: tile !== 0 ? `url(${imageMap[tile]})` : "none",
                backgroundSize: "cover",
              }}
              won={won}
              tile={tile}
              size={size}
              level={level}
            >
              {tile !== 0 && !won && level !== "hard" && tile}
            </Tile>
          ))
        )}

        {won && <WinImageWrap src={WinImage} alt="Win" />}
      </Board>
    </PuzzleContainer>
  );
};

const PuzzleContainer = styled.div`
  text-align: center;
  background-color: ${colors.commonInfo.wrapBackground};
  border: 1px solid ${colors.commonInfo.wrapBorder};
  border-radius: 8px;
  outline: 1px solid ${colors.commonInfo.wrapOutline};
  padding: 7px;
  transition: 0.2s;
`;

const HeaderText = styled.h1`
  color: ${colors.commonInfo.wrapHeaderText};
  text-shadow: ${colors.commonInfo.textShadow};
  text-align: left;
  font-size: 16px;
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
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.15) 3;
  }
`;

const LevelWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Normal = styled.button`
  font-size: 15px;
  ${(level) =>
    level === "normal" &&
    `background: ${colors.main.dark0}; color: ${colors.main.white0};`}
`;

const Hard = styled.button`
  font-size: 15px;
  ${({ level }) =>
    level === "hard" &&
    `background: ${colors.main.dark0}; color: ${colors.main.white0};`}
`;

const Board = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  grid-template-rows: repeat(${(props) => props.size}, 1fr);
  gap: 3px;
  background-color: ${colors.commonInfo.contentBackground};
  padding: 5px;
  border-radius: 5px;

  ${({ won }) => won && `gap: 0px;`}
  width: min(90vw, 90vh);
  height: min(90vw, 90vh);
  max-width: 550px;
  max-height: 550px;
`;

const Tile = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
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

  ${(won) =>
    won &&
    `
    color: transparent;
    background-image: url(${(tile) => imageMap[tile]});
    background-size: cover;
    border-radius: 0px;
    cursor: none;
  `}
`;

const Timer = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const WinImageWrap = styled.img`
  position: absolute;
  max-width: 40%;
`;
