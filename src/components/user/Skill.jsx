import React, { useState } from "react";
import styled from "styled-components";
import { SkillLinks } from "./skill/SkillLinks";
import { SkillGrade5 } from "./skill/SkillGrade5";
import { SkillGrade6 } from "./skill/SkillGrade6";
import { HexaStat } from "./skill/HexaStat";
import { SkillDetail } from "./skill/SkillDetail";

export const Skill = ({ result }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [isCloseClick, setIsCloseClick] = useState(false);

  const handleCloseClick = () => {
    setClicked(false);
    setSelectedItem(null);
    setIsCloseClick(true); // 필요에 따라 이 상태를 업데이트
    // setIsCloseClick(false)를 어딘가에서 호출해줘야 할 수도 있습니다.
  };

  const handleItemHover = (item) => {
    if (!clicked) {
      // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
      setSelectedItem(item);
    }
  };

  return (
    <Container>
      <SkillWrap>
        <HexaStat Data={result.getHexaMatrixStat} />
        <SkillGrade6
          Data={result.getSkill.grade6}
          setSelectedItem={setSelectedItem}
          onClick={setClicked}
          clicked={clicked}
          onMouseOver={handleItemHover}
        />
        <SkillGrade5
          Data={result.getSkill.grade5}
          setSelectedItem={setSelectedItem}
          onClick={setClicked}
          clicked={clicked}
          onMouseOver={handleItemHover}
        />
        <SkillLinks
          Data={result.getLinkSkill}
          setSelectedItem={setSelectedItem}
          onClick={setClicked}
          clicked={clicked}
          onMouseOver={handleItemHover}
        />
      </SkillWrap>
      <SkillDetail
        item={selectedItem}
        clicked={clicked}
        closeClick={isCloseClick}
        onClose={handleCloseClick}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
  padding-top: 5px;
`;

const SkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
`;
