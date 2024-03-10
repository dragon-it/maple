import React, { useState } from 'react';
import styled from 'styled-components';

export const HyperStatInformation = ({ HyperStatInfo }) => {

  const [selectedPreset, setSelectedPreset] = useState(1);

  const handlePresetChange = (presetNumber) => {
    setSelectedPreset(presetNumber);
  };

  const currentPresetKey = `hyper_stat_preset_${selectedPreset}`;
  const currentPreset = HyperStatInfo[currentPresetKey] || [];
  const filteredStats = currentPreset.filter((stat) => stat.stat_level !== 0);

  return (
    <Container>
      <HyperHeader>HYPER STAT</HyperHeader>
      <HyperBody>
        <StatWrap>
          {filteredStats.map((stat, index) => (
            <StatInfo
              key={index}>
              <StatContainer>
                <div>{stat.stat_increase}</div>
                <Level>Lv.{stat.stat_level}</Level>
              </StatContainer>
            </StatInfo>
          ))}
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
    </Container>
  );
};


const Container = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  font-size: 13px;
  border-radius: 10px;
  border: 1px solid rgb(80,92,101);
  outline: 1px solid rgb(42,49,58);
  border-radius: 5px;
  background-color: rgba(59,66,75, 0.9);
`;

const HyperHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220,252,2);
  margin: 7px 0;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`
const HyperBody = styled.div`
  border-radius: 5px;
`

const StatWrap = styled.div`
  margin-bottom: 10px;
  background-color: rgb(134,148,160);
  border-radius: 5px;
  color: white;
  padding: 7px;
`

const StatInfo = styled.div`
  padding: 5px 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
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
