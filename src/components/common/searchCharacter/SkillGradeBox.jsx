import React, { useState } from "react";
import { ContainerBox } from "./ContainerBox";
import styled from "styled-components";

export const SkillGradeBox = ({
  grade,
  data,
  clicked,
  setClicked,
  selectedItem,
  setSelectedItem,
}) => {
  const [isCloseClick, setIsCloseClick] = useState(false);
  if (!data || !data.character_skill || data.character_skill.length === 0)
    return null;

  const isHoverDisabled = () =>
    typeof window !== "undefined" && window.innerWidth <= 768;

  const SKILL_HEADER_MAP = {
    6: "HEXA 매트릭스",
    5: "V 매트릭스",
    hyperpassive: "하이퍼 패시브",
    hyperactive: "하이퍼 액티브",
  };
  const header = SKILL_HEADER_MAP[grade] ?? `${grade}차 스킬`;

  const handleCloseClick = () => {
    setClicked(false);
    setSelectedItem(null);
    setIsCloseClick(true);
  };

  const handleItemClick = (item) => {
    setClicked(!clicked);
  };

  const handleItemHover = (item) => {
    if (isHoverDisabled()) {
      return;
    }
    if (!clicked) {
      setSelectedItem(item);
    }
  };

  const handleMouseLeave = () => {
    // 마우스가 Container를 벗어나면 선택된 스킬 초기화
    const isWideScreen = window.innerWidth <= 768;

    if (!isWideScreen) {
      setSelectedItem(null);
    }
  };

  return (
    <ContainerBox>
      <SkillHeader>{header}</SkillHeader>
      <SkillGrid role="list" onMouseLeave={handleMouseLeave}>
        {data.character_skill.map((item) => (
          <SkillItem
            role="listitem"
            key={item.skill_name}
            onClick={() => handleItemClick(item)}
            onMouseOver={() => handleItemHover(item)}
          >
            <SkillIcon
              src={item.skill_icon}
              alt={`${item.skill_name} 아이콘`}
            />
            <SkillNameLevelWrap>
              <SkillName>{item.skill_name}</SkillName>
              <SkillLevel>Lv.{item.skill_level}</SkillLevel>
            </SkillNameLevelWrap>
          </SkillItem>
        ))}
      </SkillGrid>
    </ContainerBox>
  );
};

const SkillHeader = styled.h2`
  font-size: 16px;
  color: rgb(220, 252, 2);
  margin-bottom: 3px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const SkillGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2px;
  width: 100%;
`;

const SkillItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  cursor: pointer;
  padding: 2px;
  border-radius: 8px;
  transition: transform 0.1s ease, background-color 0.1s ease;

  &:hover {
    background-color: rgb(91, 91, 91);
    img {
      transform: scale(1.1);
    }
  }
`;

const SkillIcon = styled.img`
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
`;

const SkillNameLevelWrap = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

const SkillName = styled.span``;

const SkillLevel = styled.span`
  opacity: 0.85;
  font-size: 13px;
`;
