import React, { useState } from 'react';
import styled from 'styled-components';

export const HyperStatInformation = ({ HyperStatInfo }) => {
  const [detailedStats, setDetailedStats] = useState(Array(17).fill(false));
  const [selectedPreset, setSelectedPreset] = useState(1);

  const handlePresetChange = (presetNumber) => {
    setSelectedPreset(presetNumber);
  };

  const currentPresetKey = `hyper_stat_preset_${selectedPreset}`;
  const currentPreset = HyperStatInfo[currentPresetKey] || [];

  const handleMouseEnter = (index) => {
    setDetailedStats((prev) => {
      const updatedStats = [...prev];
      updatedStats[index] = true;
      return updatedStats;
    });
  };

  const handleMouseLeave = (index) => {
    setDetailedStats((prev) => {
      const updatedStats = [...prev];
      updatedStats[index] = false;
      return updatedStats;
    });
  };

  return (
    <Container>
      {currentPreset.map((stat, index) => (
        <StatInfo
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <p>
            {stat.stat_type} Lv.{stat.stat_level}
          </p>
          {stat.stat_increase !== null && detailedStats[index] && (
            <p>{stat.stat_increase}</p>
          )}
        </StatInfo>
      ))}
      <ButtonContainer>
        {[1, 2, 3].map((presetNumber) => (
          <PresetButton
            key={presetNumber}
            onClick={() => handlePresetChange(presetNumber)}
            isSelected={selectedPreset === presetNumber}>
            {presetNumber}
          </PresetButton>
        ))}
      </ButtonContainer>
      <div>POINT: {HyperStatInfo[`${currentPresetKey}_remain_point`]}</div>
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  position: absolute;
  right: 400px;
  top: 20px;
  background-color: #decdcd;
`;

const StatInfo = styled.div`
  margin-bottom: 10px;
  cursor: pointer;

  p:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const PresetButton = styled.button`
  margin-right: 10px;
  background-color: ${(props) => (props.isSelected ? '#fff' : '#ddd')};
  border: 1px solid #888;
  padding: 5px 10px;
  cursor: pointer;
`;

export default HyperStatInformation;
