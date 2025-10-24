import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { SkillLinks } from "./skill/SkillLinks";
import { HexaStat } from "./skill/HexaStat";
import { SkillGradeBox } from "../common/searchCharacter/SkillGradeBox";

export const Skill = ({ result }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const skills = result?.getCombinedData?.getSkill ?? {};
  // 렌더 순서 고정
  const SKILL_GRADES_BEFORE_LINK = useMemo(() => ["6", "5"], []);
  const SKILL_GRADES_AFTER_LINK = useMemo(
    () => ["hyperactive", "hyperpassive", "4", "3", "2", "1", "0"],
    []
  );

  return (
    <Container>
      <SkillWrap>
        {/* HEXA 스탯 */}
        {result?.getCombinedData?.getHexaMatrixStat && (
          <HexaStat Data={result.getCombinedData.getHexaMatrixStat} />
        )}

        {/* HEXA 매트릭스, 하이퍼 스킬 */}
        {SKILL_GRADES_BEFORE_LINK.map((gradeKey) => (
          <SkillGradeBox
            key={gradeKey}
            grade={gradeKey}
            data={skills[gradeKey]}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}

        {/* 전직 스킬 */}
        {SKILL_GRADES_AFTER_LINK.map((gradeKey) => (
          <SkillGradeBox
            key={gradeKey}
            grade={gradeKey}
            data={skills[gradeKey]}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ))}

        {/* 링크 스킬 */}
        {result?.getCombinedData?.getLinkSkill && (
          <SkillLinks
            Data={result.getCombinedData.getLinkSkill}
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
