import React, { useState } from "react";
import styled from "styled-components";
import nobleSkills from "./SkillData";
import rightArrow from "../../../assets/pages/user/guild/guildSkill/Right_arrow.svg";
import { GuildSkillDetail } from "./GuildSkillDetail";

export const GuildSkill = ({ result }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [clicked, setClicked] = useState(false);

  const isHoverDisabled = () =>
    typeof window !== "undefined" && window.innerWidth <= 768;

  const handleClick = (item) => {
    if (selectedItem === item) {
      setClicked(!clicked);
    } else {
      setSelectedItem(item);
      setClicked(true);
    }
  };

  const handleItemHover = (item) => {
    if (isHoverDisabled()) {
      return;
    }
    if (!clicked) setSelectedItem(item);
  };

  const handleDetailClick = () => {
    setSelectedItem(null);
    setClicked(false);
  };

  const handleMouseLeave = () => {
    // 마우스가 Container를 벗어나면 선택된 스킬 초기화
    const isWideScreen = window.innerWidth <= 768;

    if (!isWideScreen) {
      setSelectedItem(null);
    }
  };

  const sortedGuildSkills = result.guildBasicInformation.guild_skill.sort(
    (a, b) =>
      nobleSkills.skillOrder.findIndex((skill) => skill.name === a.skill_name) -
      nobleSkills.skillOrder.findIndex((skill) => skill.name === b.skill_name)
  );

  const skillNameToItemMap = sortedGuildSkills.reduce((acc, item) => {
    acc[item.skill_name] = item;
    return acc;
  }, {});

  return (
    <Container onMouseOut={handleMouseLeave}>
      {result.guildBasicInformation.guild_skill &&
      result.guildBasicInformation.guild_skill.length > 0 ? (
        <>
          {/* 길드 일반 스킬 */}
          <Table>
            {nobleSkills.skillGrid[0].map((level, colIndex) => (
              <TableColumn key={colIndex}>
                {nobleSkills.skillGrid.map((row, rowIndex) => {
                  const skillName = row[colIndex];
                  const item = skillNameToItemMap[skillName];
                  const skillInfo =
                    item &&
                    nobleSkills.skillOrder.find(
                      (skill) => skill.name === skillName
                    );
                  return (
                    <TableCell key={rowIndex}>
                      {rowIndex === 0 ? (
                        <Level>{skillName}</Level>
                      ) : skillName === "→" ? (
                        <RightArrow src={rightArrow} alt={rightArrow} />
                      ) : item ? (
                        <BasicSkillWrap
                          onClick={() => handleClick(item)}
                          onMouseOver={() => handleItemHover(item)}
                        >
                          <SkillIcon>
                            <img src={item.skill_icon} alt={skillName} />
                          </SkillIcon>
                          <SkillName>{skillInfo.name}</SkillName>
                          <SkillLevel
                            $isMaxLevel={
                              item.skill_level === skillInfo.maxLevel
                            }
                          >
                            {item.skill_level}/{skillInfo.maxLevel}
                          </SkillLevel>
                        </BasicSkillWrap>
                      ) : null}
                    </TableCell>
                  );
                })}
              </TableColumn>
            ))}
          </Table>
          {/* 길드 노블레스 스킬 */}
          <NoblesseSkillWrap>
            <SkillHeader>노블레스 길드 스킬</SkillHeader>
            <SkillContainer>
              {result.guildBasicInformation &&
                result.guildBasicInformation.guild_noblesse_skill.map(
                  (item, index) => (
                    <SkillWrap
                      key={index}
                      onClick={() => handleClick(item)}
                      onMouseOver={() => handleItemHover(item)}
                    >
                      <SkillIcon>
                        <img src={item.skill_icon} alt={item.skill_name} />
                      </SkillIcon>
                      <SkillName>
                        {nobleSkills.nobleSkillNameMapping[item.skill_name]}
                      </SkillName>
                      <SkillLevel $isMaxLevel={item.skill_level === 15}>
                        {item.skill_level}/15
                      </SkillLevel>
                    </SkillWrap>
                  )
                )}
            </SkillContainer>
          </NoblesseSkillWrap>
          <GuildSkillDetail
            item={selectedItem}
            clicked={clicked}
            onClose={handleDetailClick}
          />
        </>
      ) : (
        <>
          <SkillNoDataText>데이터가 없습니다.</SkillNoDataText>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  color: white;
`;

const SkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const BasicSkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  text-align: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const NoblesseSkillWrap = styled.div``;

const SkillContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: rgb(57, 57, 57);
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
`;

const Table = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  background-color: rgb(57, 57, 57);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;

  @media screen and (max-width: 1024px) {
    justify-content: space-around;
  }
`;

const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 0px 10px;

  &:first-child {
    height: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  @media screen and (max-width: 1024px) {
    justify-content: flex-start;
    height: 50px;
    padding: 0px 1px;
    &:first-child {
      margin: 5px 0;
      border-radius: 5px;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
`;
const Level = styled.div``;

const RightArrow = styled.img`
  width: 50px;
  height: 40px;
`;

const SkillName = styled.span`
  font-size: 11px;
  width: 100%;
  text-align: center;
  overflow-wrap: break-word;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const SkillIcon = styled.div`
  width: 32px;
  height: 32px;
`;

const SkillLevel = styled.span`
  color: ${({ $isMaxLevel }) => ($isMaxLevel ? "rgb(237,208,103)" : "white")};
  font-size: 13px;
`;

const SkillHeader = styled.span`
  margin-bottom: 5px;
  font-size: 18px;
  color: rgb(200, 175, 137);
  font-family: maple-light;
`;

const SkillNoDataText = styled.span`
  font-family: maple-light;
`;
