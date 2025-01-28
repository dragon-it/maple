import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const HyperStatInformation = ({ HyperStatInfo, onHeightChange }) => {
  const [selectedPreset, setSelectedPreset] = useState(1);
  const [showAllStat, setShowAllStat] = useState(true);
  const containerRef = useRef(null); // 컨테이너의 참조를 저장하기 위한 ref

  const handlePresetChange = (presetNumber) => {
    setSelectedPreset(presetNumber);
  };

  const toggleShowAllStat = () => {
    setShowAllStat(!showAllStat);
  };

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight; // 컨테이너의 높이 확인
      onHeightChange(height); // 부모 컴포넌트에 높이 전달
    }
  }, [onHeightChange, showAllStat]);

  const currentPresetKey = `hyper_stat_preset_${selectedPreset}`;
  const currentPreset = HyperStatInfo[currentPresetKey] || [];

  const filteredStats = showAllStat
    ? currentPreset
    : currentPreset.filter((stat) => stat.stat_level !== 0);

  return (
    <Container ref={containerRef} $showAllStat={showAllStat}>
      <HyperHeader>HYPER STAT</HyperHeader>
      <HyperBody>
        <StatWrap>
          {showAllStat ? (
            <>
              {filteredStats.map((stat, index) => (
                <StatInfo key={index}>
                  <StatContainer>
                    <span>{stat.stat_type}</span>
                    <Level>
                      <span>Lv.</span>
                      <span>{stat.stat_level}</span>
                    </Level>
                  </StatContainer>
                </StatInfo>
              ))}
            </>
          ) : (
            <>
              {filteredStats.map((stat, index) => (
                <StatInfo key={index}>
                  <StatContainer>
                    <span>{stat.stat_increase}</span>
                    <Level>
                      <span>Lv.</span>
                      <span>{stat.stat_level}</span>
                    </Level>
                  </StatContainer>
                </StatInfo>
              ))}
            </>
          )}
        </StatWrap>
        <ButtonContainer>
          <PresetWrap>
            <PresetHeader>PRESET</PresetHeader>
            {[1, 2, 3].map((presetNumber) => (
              <PresetButton
                key={presetNumber}
                onClick={() => handlePresetChange(presetNumber)}
                $isSelected={selectedPreset === presetNumber}
              >
                {presetNumber}
              </PresetButton>
            ))}
          </PresetWrap>
          <RemainPoint>
            <span>
              POINT {HyperStatInfo[`${currentPresetKey}_remain_point`]}
            </span>
          </RemainPoint>
        </ButtonContainer>
      </HyperBody>
      <ShowAllStatBtn onClick={toggleShowAllStat} $showAllStat={showAllStat}>
        {showAllStat ? <p>간략하게 보기</p> : <p>자세히보기</p>}
      </ShowAllStatBtn>
    </Container>
  );
};

const Container = styled.div`
  padding: 5px;
  display: flex;
  height: auto;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  font-size: 13px;
  border: 1px solid rgb(80, 92, 101);
  outline: 1px solid rgb(42, 49, 58);
  border-radius: 5px;
  background-color: rgba(59, 66, 75, 0.9);
`;

const ShowAllStatBtn = styled.div`
  color: rgb(247, 247, 247);
  box-sizing: border-box;
  font-family: maple-light;
  cursor: pointer;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    border-radius: 5px;
  }
  :hover {
    background-color: rgba(134, 148, 160, 0.5);
  }
`;

const HyperHeader = styled.h2`
  font-size: 15px;
  color: rgb(220, 252, 2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const HyperBody = styled.div`
  border-radius: 5px;
  margin-bottom: 6px;
`;

const StatWrap = styled.ul`
  margin-bottom: 10px;
  background-color: rgb(134, 148, 160);
  border-radius: 5px;
  color: white;
  padding: 7px;
`;

const StatInfo = styled.li`
  padding: 2px 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  :hover {
    background-color: rgba(59, 66, 75, 0.9);
  }
`;

const Level = styled.span`
  display: flex;

  :first-child {
    color: rgb(197, 220, 242);
  }

  :nth-child(2) {
    width: 20px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25px;
  padding: 0 3px;
  background-color: rgb(180, 180, 180);
  border-radius: 5px;
`;

const PresetWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 2px;
`;

const PresetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  width: 20px;
  height: 20px;
  color: ${(props) => (props.$isSelected ? "#FFFFFF" : "#e4e4e4")};
  background: ${(props) => (props.$isSelected ? "#444F59" : "#828F9A")};
  border: 1px solid ${(props) => (props.$isSelected ? "#d8e1e6" : "#454D57")};
  &:hover {
    filter: brightness(1.2);
  }
`;

const PresetHeader = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-shadow: none;
  color: rgb(39, 39, 39);
`;

const StatContainer = styled.p`
  display: flex;
  justify-content: space-between;
`;

const RemainPoint = styled.span`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 10px;
  width: 50%;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  border-radius: 10px;
  background-color: rgba(59, 66, 75, 0.9);
  border-top: 2px solid rgb(38, 43, 49);
  border-left: 1px solid rgb(62, 73, 81);
  border-right: 1px solid rgb(62, 73, 81);
  box-shadow: 0px 1px 0px rgb(133, 145, 145);
  color: white;
`;

export default HyperStatInformation;
