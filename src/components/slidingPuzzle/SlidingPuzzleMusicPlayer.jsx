import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import HennessysBGM from "../../assets/slidingPuzzle/backgroundMusic/Hennessys.mp3";
import LithHarborBGM from "../../assets/slidingPuzzle/backgroundMusic/LithHarbor.mp3";
import VolumeIcon from "../../assets/slidingPuzzle/Speaker.svg";
import MuteIcon from "../../assets/slidingPuzzle/Mute.svg";
import colors from "../common/color/colors";

export const SlidingPuzzleMusicPlayer = () => {
  const [bgm, setBgm] = useState(HennessysBGM);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

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
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    setPrevVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <label>
        배경 음악
        <CustomSelect value={bgm} onChange={handleBgmChange}>
          <option value={HennessysBGM}>헤네시스</option>
          <option value={LithHarborBGM}>리스항구</option>
        </CustomSelect>
        <button onClick={togglePlayPause}>{isPlaying ? "❚❚" : "▶"}</button>
      </label>
      <CustomAudioPlayer>
        <audio ref={audioRef} loop>
          <source src={bgm} type="audio/mpeg" />
        </audio>
        <label>
          <VolumeIconStyled
            src={isMuted ? MuteIcon : VolumeIcon}
            alt="volume icon"
            onClick={toggleMute}
          />
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
    background-color: #ffffff;
    border: none;
    padding: 10px 10px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff8800;
    }
  }

  label {
    display: flex;
    margin-top: 10px;
    font-size: 16px;
  }
  input[type="range"] {
    width: 100%;
    margin-top: 5px;
    cursor: pointer;
  }
`;

const VolumeIconStyled = styled.img`
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-right: 5px;
  cursor: pointer;
`;

const CustomSelect = styled.select`
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  background-color: ${colors.main.white2};
  border: 1px solid ${colors.commonInfo.normalBtn.btnBorder};
  cursor: pointer;

  &:hover {
    background-color: ${colors.characterInfo.characterStatColor
      .combatPowerBorder};
  }
`;
