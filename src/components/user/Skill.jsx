import React, { useState } from "react";
import styled from "styled-components";
import { SkillLinks } from "./skill/SkillLinks";
import { SkillGrade5 } from "./skill/SkillGrade5";
import { SkillGrade6 } from "./skill/SkillGrade6";
import { HexaStat } from "./skill/HexaStat";

export const Skill = ({ result }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleMouseLeave = () => {
    // 마우스가 Container를 벗어나면 선택된 스킬 초기화
    setSelectedItem(null);
    setClicked(false);
  };

  return (
    <Container onMouseLeave={handleMouseLeave}>
      <SkillWrap>
        <HexaStat Data={result.getCombinedData.getHexaMatrixStat} />
        <SkillGrade6
          Data={result.getCombinedData.getSkill.grade6}
          clicked={clicked}
          setClicked={setClicked}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <SkillGrade5
          Data={result.getCombinedData.getSkill.grade5}
          clicked={clicked}
          setClicked={setClicked}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <SkillLinks
          Data={result.getCombinedData.getLinkSkill}
          clicked={clicked}
          setClicked={setClicked}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </SkillWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 5px;

  img {
    image-rendering: pixelated;
  }
`;

const SkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;
