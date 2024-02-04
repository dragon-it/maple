import React, { useState } from 'react';
import styled from 'styled-components';

export const HyperStatInformation = ({ HyperStatInfo }) => {
  const [detailedStats, setDetailedStats] = useState(Array(17).fill(false));
  const [selectedPreset, setSelectedPreset] = useState(1);
  const [showAllStats, setShowAllStats] = useState(false);

  const handlePresetChange = (presetNumber) => {
    setSelectedPreset(presetNumber);
  };

  const toggleShowAllStats = () => {
    setShowAllStats(!showAllStats);
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

  const filteredStats = showAllStats
    ? currentPreset
    : currentPreset.filter((stat) => stat.stat_level !== 0);

  return (
    <Container>
      {filteredStats.map((stat, index) => (
        <StatInfo
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}>
          <StatContainer>
            <div>{stat.stat_type}</div>
            <div>Lv.{stat.stat_level}</div>
          </StatContainer>
          {stat.stat_increase !== null && detailedStats[index] && (
            <div>{stat.stat_increase}</div>
          )}
        </StatInfo>
      ))}
      <ButtonContainer>
        {[1, 2, 3].map((presetNumber) => (
          <PresetButton
            key={presetNumber}
            onClick={() => handlePresetChange(presetNumber)}
            isSelected={selectedPreset === presetNumber}
          >
            {presetNumber}
          </PresetButton>
        ))}
        <ShowAllButton onClick={toggleShowAllStats}>
          {showAllStats ? '간략하게 보기' : '자세히 보기'}
        </ShowAllButton>
      </ButtonContainer>
      <div>POINT: {HyperStatInfo[`${currentPresetKey}_remain_point`]}</div>
    </Container>
  );
};

const Container = styled.div`
  padding: 14px;
  width: 300px;
  background-color: #decdcd;
`;

const StatInfo = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  transition: background-color 1s ease; 
  &:hover {
    background-color: #a87777;
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

const ShowAllButton = styled.button`
  background-color: #ddd;
  border: 1px solid #888;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default HyperStatInformation;
