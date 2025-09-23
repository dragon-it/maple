import React, { useState } from "react";
import styled from "styled-components";
import { ContainerBox } from "../../common/searchCharacter/ContainerBox";
import { SkillDetail } from "./SkillDetail";

export const SkillGrade6 = ({
  Data,
  clicked,
  setClicked,
  selectedItem,
  setSelectedItem,
}) => {
  const [isCloseClick, setIsCloseClick] = useState(false);

  const handleCloseClick = () => {
    setClicked(false);
    setSelectedItem(null);
    setIsCloseClick(true);
  };

  const handleItemClick = (item) => {
    setClicked(!clicked);
  };

  const handleItemHover = (item) => {
    if (!clicked) {
      setSelectedItem(item);
    }
  };

  const handleMouseLeave = () => {
    // 마우스가 Container를 벗어나면 선택된 스킬 초기화
    setSelectedItem(null);
    setClicked(false);
  };

  return (
    <ContainerBox>
      {Data.character_skill && Data.character_skill.length > 0 ? (
        <>
          <SkillHeader>HEXA 매트릭스</SkillHeader>
          <SkillWrap onMouseLeave={handleMouseLeave}>
            {Data.character_skill.map((item, index) => (
              <SkillSimpleWrap
                key={item.skill_name}
                onClick={() => handleItemClick(item)}
                onMouseOver={() => handleItemHover(item)}
              >
                <SkillIcon src={item.skill_icon} alt={`icon-${index}`} />
                <SkillNameLevelWrap>
                  <SkillName>{item.skill_name}</SkillName>
                  <SkillLevel>Lv.{item.skill_level}</SkillLevel>
                </SkillNameLevelWrap>
              </SkillSimpleWrap>
            ))}
          </SkillWrap>
          {/* SkillDetail 컴포넌트는 조건부로 렌더링 */}
          {selectedItem && (
            <SkillDetail
              item={selectedItem}
              clicked={clicked}
              closeClick={isCloseClick}
              onClose={handleCloseClick}
            />
          )}
        </>
      ) : (
        <>
          <SkillHeader>HEXA SKILL</SkillHeader>
          <SkillNoDataText>데이터가 없습니다.</SkillNoDataText>
        </>
      )}
    </ContainerBox>
  );
};

const SkillHeader = styled.h2`
  font-size: 15px;
  color: rgb(220, 252, 2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const SkillWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  width: 970px;
  color: white;
  :hover {
    background-color: rgb(91, 91, 91);
    img {
      transform: scale(1.2);
    }
  }

  @media screen and (max-width: 1024px) {
    width: auto;
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkillIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SkillSimpleWrap = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  gap: 5px;
  cursor: pointer;
`;

const SkillNameLevelWrap = styled.span`
  display: flex;
  flex-direction: column;
`;

const SkillName = styled.span``;

const SkillLevel = styled.span`
  @media screen and (max-width: 576px) {
    font-size: 10px;
  }
`;

const SkillNoDataText = styled.p``;
