import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import HennessysBGM from "../../assets/slidingPuzzle/Hennessys.mp3";
import LithHarbor from "../../assets/slidingPuzzle/LithHarbor.mp3";

export const SlidingPuzzleMusicPlayer = () => {
  const [bgm, setBgm] = useState(HennessysBGM);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleCanPlayThrough = () => {
        if (isPlaying) {
          audioElement.play().catch((error) => {
            console.error("Failed to play audio:", error);
          });
        }
      };
      audioElement.addEventListener("canplaythrough", handleCanPlayThrough);
      audioElement.load();

      return () => {
        audioElement.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      };
    }
  }, [bgm, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleBgmChange = (event) => {
    setBgm(event.target.value);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <>
      <label>
        배경 음악 선택:
        <select value={bgm} onChange={handleBgmChange}>
          <option value={HennessysBGM}>Hennessys</option>
          <option value={LithHarbor}>Lith Harbor</option>
        </select>
      </label>
      <CustomAudioPlayer>
        <audio ref={audioRef} loop>
          <source src={bgm} type="audio/mpeg" />
        </audio>
        <button onClick={togglePlayPause}>
          {isPlaying ? "일시 정지" : "재생"}
        </button>
        <label>
          볼륨:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </label>
      </CustomAudioPlayer>
    </>
  );
};

const CustomAudioPlayer = styled.div`
  margin-top: 10px;
  button {
    background-color: #ffaa33;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff8800;
    }
  }
  label {
    display: block;
    margin-top: 10px;
    font-size: 16px;
  }
  input[type="range"] {
    width: 100%;
    margin-top: 5px;
  }
`;
