import React from "react";
import styled from "styled-components";
import { ContainerBox } from "../../common/searchCharacter/ContainerBox";

export const SkillGrade6 = ({ Data, setSelectedItem, clicked, onClick }) => {
  const handleItemClick = (item) => {
    setSelectedItem(item);
    onClick(!clicked);
  };

  const handleItemHover = (item) => {
    if (!clicked) {
      setSelectedItem(item);
    }
  };

  const handleMouseLeave = () => {
    if (!clicked) {
      setSelectedItem(null);
    }
  };

  return (
    <ContainerBox onMouseOut={handleMouseLeave}>
      {Data.character_skill && Data.character_skill.length > 0 ? (
        <>
          <SkillHeader>HEXA 매트릭스</SkillHeader>
          <SkillWrap>
            {Data.character_skill.map((item, index) => (
              <SkillSimpleWrap
                key={index}
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

  @media screen and (max-width: 767px) {
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

const SkillNoDataText = styled.div`
  font-family: maple-light;
`;
