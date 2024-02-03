import React, { useState } from 'react';
import styled from 'styled-components';

export const AbilityInformation = ({ AbilityInfo }) => {
  const [selectedPreset, setSelectedPreset] = useState(1);

  const handlePresetChange = (presetNumber) => {
    setSelectedPreset(presetNumber);
  };

  const currentPreset = AbilityInfo[`ability_preset_${selectedPreset}`];

  return (
    <Container>
      <p>ABILITY</p>
      <PresetWrap>
        <div>{currentPreset.ability_preset_grade}</div>
        <p>{currentPreset.ability_info[0].ability_grade}: {currentPreset.ability_info[0].ability_value}</p>
        <p>{currentPreset.ability_info[1].ability_grade}: {currentPreset.ability_info[1].ability_value}</p>
        <p>{currentPreset.ability_info[2].ability_grade}: {currentPreset.ability_info[2].ability_value}</p>
      </PresetWrap>
      <div>명성치: {AbilityInfo.remain_fame}</div>
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
    </Container>
  );
};

const Container = styled.div`
  display: block;
  width: 400px;
  background-color: #cdbdbd;
  position: absolute;
  left: 500px;
`;

const PresetWrap = styled.div`
  padding: 20px 0px;
  line-height: 20px;
  :first-child{
    margin-bottom: 10px;
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

export default AbilityInformation;
