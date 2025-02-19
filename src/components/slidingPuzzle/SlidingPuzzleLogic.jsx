import React, { useState, useEffect } from "react";
import styled from "styled-components";
import puzzleImage1 from "../../assets/slidingPuzzle/2/1.jpg";
import puzzleImage2 from "../../assets/slidingPuzzle/2/2.jpg";
import puzzleImage3 from "../../assets/slidingPuzzle/2/3.jpg";
import puzzleImage4 from "../../assets/slidingPuzzle/2/4.jpg";
import puzzleImage5 from "../../assets/slidingPuzzle/2/5.jpg";
import puzzleImage6 from "../../assets/slidingPuzzle/2/6.jpg";
import puzzleImage7 from "../../assets/slidingPuzzle/2/7.jpg";
import puzzleImage8 from "../../assets/slidingPuzzle/2/8.jpg";
import puzzleImage9 from "../../assets/slidingPuzzle/2/9.jpg";
import WinImage from "../../assets/slidingPuzzle/Minigame.win.png";
import WinSound from "../../assets/slidingPuzzle/Win.mp3";
import { SlidingPuzzleMusicPlayer } from "./SlidingPuzzleMusicPlayer";

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

  return (
    <PuzzleContainer>
      <h2>Sliding Puzzle</h2>
      <label>
        퍼즐 크기 선택:
        <select value={size} onChange={handleSizeChange}>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
        </select>
      </label>
      <button onClick={handleRestart}>다시하기</button>
      <Timer>시간: {elapsedTime}초</Timer>
      <SlidingPuzzleMusicPlayer />
      {won && (
        <>
          <img src={WinImage} alt="Win" />
        </>
      )}
      <Board size={size}>
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
            >
              {tile !== 0 && !won && tile}
            </Tile>
          ))
        )}
      </Board>
    </PuzzleContainer>
  );
};

const PuzzleContainer = styled.div`
  text-align: center;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 80px);
  grid-template-rows: repeat(${(props) => props.size}, 80px);
  gap: 40px; /* gap을 40으로 변경 */
  margin: 20px auto;
  width: max-content;
`;

const Tile = styled.div`
  color: #000000;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
  user-select: none;

  &:hover {
    background: #6e6e6e;
  }

  &.empty {
    background: transparent;
    cursor: default;
  }

  ${(props) =>
    props.won &&
    `
    color: transparent;
    background-image: url(${(props) => imageMap[props.tile]});
    background-size: cover;
  `}
`;

const Timer = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;
