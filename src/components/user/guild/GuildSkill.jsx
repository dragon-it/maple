import React from "react";
import styled from "styled-components";
import nobleSkillNameMapping from "./SkillData";
import nobleSkills from "./SkillData";

export const GuildSkill = ({ result }) => {
  console.log(result.guildBasicInformation.guild_noblesse_skill);
  console.log(result.guildBasicInformation.guild_skill);

  const sortedGuildSkills = result.guildBasicInformation.guild_skill.sort(
    (a, b) =>
      nobleSkills.skillOrder.indexOf(a.skill_name) -
      nobleSkills.skillOrder.indexOf(b.skill_name)
  );

  return (
    <Container>
      {/* 길드 일반 스킬 */}
      <Table>
        {nobleSkills.skillGrid[0].map((level, colIndex) => (
          <TableColumn key={colIndex}>
            {nobleSkills.skillGrid.map((row, rowIndex) => (
              <TableCell key={rowIndex}>
                {rowIndex === 0 ? (
                  <Level>{row[colIndex]}</Level>
                ) : row[colIndex] === "→" ? (
                  "→"
                ) : (
                  sortedGuildSkills
                    .filter((skill) => skill.skill_name === row[colIndex])
                    .map((guildSkill, index) => (
                      <BasicSkillWrap key={index}>
                        <SkillIcon>
                          <img
                            src={guildSkill.skill_icon}
                            alt={guildSkill.skill_name}
                          />
                        </SkillIcon>
                        <SkillLevel>{guildSkill.skill_level}</SkillLevel>
                      </BasicSkillWrap>
                    ))
                )}
              </TableCell>
            ))}
          </TableColumn>
        ))}
      </Table>
      {/* 길드 노블레스 스킬 */}
      <NoblesseSkillWrap>
        <SkillHeader>노블레스 길드 스킬</SkillHeader>
        <SkillContainer>
          {result.guildBasicInformation &&
            result.guildBasicInformation.guild_noblesse_skill.map(
              (noblesseSkill, index) => (
                <SkillWrap key={index}>
                  <SkillIcon>
                    <img
                      src={noblesseSkill.skill_icon}
                      alt={noblesseSkill.skill_name}
                    />
                  </SkillIcon>
                  <SkillName>
                    {nobleSkillNameMapping[noblesseSkill.skill_name]}
                  </SkillName>
                  <SkillLevel isMaxLevel={noblesseSkill.skill_level === 15}>
                    {noblesseSkill.skill_level}/15
                  </SkillLevel>
                </SkillWrap>
              )
            )}
        </SkillContainer>
      </NoblesseSkillWrap>
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
`;

const BasicSkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NoblesseSkillWrap = styled.div``;

const SkillContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const Table = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;
`;

const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TableCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 90px;
  height: 70px;
  &:first-child {
    height: 20px;
  }
`;
const Level = styled.div``;

// 공통 스타일 컴포넌트
const SkillName = styled.div``;

const SkillIcon = styled.div`
  width: 32px;
  height: 32px;
`;

const SkillLevel = styled.div`
  color: ${({ isMaxLevel }) => (isMaxLevel ? "rgb(237,208,103)" : "white")};
  font-size: 13px;
`;

const SkillHeader = styled.div`
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 700;
  color: rgb(200, 175, 137);
`;
