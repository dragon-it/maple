import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const HyperStatInformation = ({ HyperStatInfo, onHeightChange  }) => {
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
    <Container ref={containerRef} showAllStat={showAllStat}>
      <HyperHeader>HYPER STAT</HyperHeader>
      <HyperBody>
        <StatWrap>
          {showAllStat 
          ?
          <>
          {filteredStats.map((stat, index) => (
            <StatInfo
              key={index}>
              <StatContainer>
                <div>{stat.stat_type}</div>
                <div>Lv.{stat.stat_level}</div>
              </StatContainer>
            </StatInfo>
          ))}
          </>
          :
          <>
            {filteredStats.map((stat, index) => (
            <StatInfo
              key={index}>
              <StatContainer>
                <div>{stat.stat_increase}</div>
                <Level>Lv.{stat.stat_level}</Level>
              </StatContainer>
            </StatInfo>
            ))}
          </>
          }
        </StatWrap>
        <ButtonContainer>
          <PresetWrap>
            <PresetHeader>PRESET</PresetHeader>
            {[1, 2, 3].map((presetNumber) => (
              <PresetButton
                key={presetNumber}
                onClick={() => handlePresetChange(presetNumber)}
                isSelected={selectedPreset === presetNumber}
              >
                {presetNumber}
              </PresetButton>
            ))}
          </PresetWrap>
          <RemainPoint><div>POINT :</div> {HyperStatInfo[`${currentPresetKey}_remain_point`]}</RemainPoint>
        </ButtonContainer>
      </HyperBody>
      <ShowAllStatBtn onClick={toggleShowAllStat} showAllStat={showAllStat}>
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
  border: 1px solid rgb(80,92,101);
  outline: 1px solid rgb(42,49,58);
  border-radius: 5px;
  background-color: rgba(59,66,75, 0.9);
  img{
    width: 20px;
    height: 20px;
  }
`;

const ShowAllStatBtn = styled.div`
  color: white;
  box-sizing: border-box;
  font-family: maple-light;
  cursor: pointer;
  margin-bottom:  ${(props) => (props.showAllStat ? "5px": "0px")};
  p{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 10px;
    border-radius: 5px;
  }
  :hover{
    background-color: rgba(134,148,160, 0.5);
  }
`

const HyperHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220,252,2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`
const HyperBody = styled.div`
  border-radius: 5px;
  margin-bottom: 6px;
`

const StatWrap = styled.div`
  margin-bottom: 10px;
  background-color: rgb(134,148,160);
  border-radius: 5px;
  color: white;
  padding: 7px;
`

const StatInfo = styled.div`
  padding: 2px 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  :hover{
    background-color: rgba(59,66,75, 0.9);
  }
`;

const Level = styled.div`
  width: 30px;
  display: flex;
  justify-content: flex-start;
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    height: 25px;
    padding: 0 3px;
    background-color: #aaa9a9;
    border-radius: 5px;
    font-family: maple-light;
`;

const PresetWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 2px;
`

const PresetButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  ${(props) =>
    props.isSelected? `filter: brightness(0.5);`: ''}
`;

const PresetHeader = styled.div`
  font-size: 13px;
  text-shadow: none;
  color: rgb(0,0,0);
`

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


const RemainPoint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 50%;
  height: 20px;
  padding: 0 3px;
  font-size: 12px;
  border-radius: 5px;
  background-color: rgba(59,66,75, 0.9);
  color: white;
`
export default HyperStatInformation;
