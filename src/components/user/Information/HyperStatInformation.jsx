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
      <div>Hyper Stat</div>
      <StatWrap>
        {filteredStats.map((stat, index) => (
          <StatInfo
            key={index}>
            <StatContainer>
              <div>{stat.stat_increase}</div>
              <div>Lv.{stat.stat_level}</div>
            </StatContainer>
          </StatInfo>
        ))}
      </StatWrap>
      <div>POINT: {HyperStatInfo[`${currentPresetKey}_remain_point`]}</div>
      <ButtonContainer>
      <div>프리셋</div>
        {[1, 2, 3].map((presetNumber) => (
          <PresetButton
            key={presetNumber}
            onClick={() => handlePresetChange(presetNumber)}
            isSelected={selectedPreset === presetNumber}
          >
            {presetNumber}
          </PresetButton>
        ))}
      </ButtonContainer>
    </Container>
  );
};


const Container = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  background-color: #ffffff;
  font-size: 12px;
  border-radius: 10px;
  height: 300px;
`;

const StatWrap = styled.div`
  margin-bottom: 10px;
`

const StatInfo = styled.div`
  padding: 5px 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    width: 150px;
    height: 25px;
    padding: 0 5px;
    background-color: #aaa9a9;
    border-radius: 5px;
`;

const PresetButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  ${(props) =>
    props.isSelected? `filter: brightness(0.5);`: ''}
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default HyperStatInformation;
