import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import HenesysBGM from "../../assets/slidingPuzzle/backgroundMusic/Henesys.mp3";
import LithHarborBGM from "../../assets/slidingPuzzle/backgroundMusic/LithHarbor.mp3";
import TitleBGM from "../../assets/slidingPuzzle/backgroundMusic/Title.mp3";
import VolumeIcon from "../../assets/slidingPuzzle/icons/Speaker.svg";
import MuteIcon from "../../assets/slidingPuzzle/icons/Mute.svg";
import StartIcon from "../../assets/slidingPuzzle/icons/Start.svg";
import StopIcon from "../../assets/slidingPuzzle/icons/Stop.svg";
import colors from "../common/color/colors";

export const SlidingPuzzleMusicPlayer = () => {
  const [bgm, setBgm] = useState(TitleBGM);
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
    const newBgm = event.target.value;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = newBgm;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }

    setBgm(newBgm);
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
    <Container>
      <ControlContainer>
        <label>
          <span>배경 음악</span>
          <ControlContainer>
            <CustomSelect value={bgm} onChange={handleBgmChange}>
              <option value={TitleBGM}>로그인</option>
              <option value={HenesysBGM}>헤네시스</option>
              <option value={LithHarborBGM}>리스항구</option>
            </CustomSelect>
            <PlayBtn
              onClick={togglePlayPause}
              src={isPlaying ? StopIcon : StartIcon}
              alt="play/pause"
            />
          </ControlContainer>
        </label>
      </ControlContainer>

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
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: block;
  background-color: ${colors.deepBlue.deepBlue4};
  border: 1px solid ${colors.deepBlue.deepBlue11};
  border-radius: 5px;
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.main.white3};
  label {
    display: flex;
    flex-direction: column;
  }
`;

const CustomAudioPlayer = styled.div`
  margin: auto;
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 80%;
  }

  button {
    background-color: ${colors.main.white2};
    border: none;
    padding: 10px 10px;

    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  label {
    display: flex;
  }

  input[type="range"] {
    width: 100%;
    margin-top: 5px;
    cursor: pointer;
  }
`;

const PlayBtn = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const VolumeIconStyled = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const CustomSelect = styled.select`
  padding: 6px 10px;
  border-radius: 5px;
  height: 30px;
  background-color: ${colors.main.white2};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${colors.commonInfo.normalBtn.btnHover};
  }
`;
