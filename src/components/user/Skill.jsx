import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { SkillLinks } from "./skill/SkillLinks";
import { HexaStat } from "./skill/HexaStat";
import { SkillGradeBox } from "../common/searchCharacter/SkillGradeBox";

export const Skill = ({ result }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [clicked, setClicked] = useState(false);

  const skills = result?.getCombinedData?.getSkill ?? {};
  // 렌더 순서 고정
  const SKILL_GRADES = useMemo(
    () => [
      "0",
      "1",
      "1.5",
      "2",
      "2.5",
      "3",
      "4",
      "hyperpassive",
      "hyperactive",
      "5",
      "6",
    ],
    []
  );

  return (
    <Container>
      <SkillWrap>
        {/* HEXA 스탯 */}
        {result?.getCombinedData?.getHexaMatrixStat && (
          <HexaStat Data={result.getCombinedData.getHexaMatrixStat} />
        )}

        {/* 스킬 박스 전부 순회 */}
        {SKILL_GRADES.map((gradeKey) => (
          <SkillGradeBox
            key={gradeKey}
            grade={gradeKey}
            data={skills[gradeKey]}
            clicked={clicked}
            setClicked={setClicked}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}

        {/* 링크 스킬 */}
        {result?.getCombinedData?.getLinkSkill && (
          <SkillLinks
            Data={result.getCombinedData.getLinkSkill}
            clicked={clicked}
            setClicked={setClicked}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
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
