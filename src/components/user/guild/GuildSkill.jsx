import React from "react";
import styled from "styled-components";
import nobleSkills from "./SkillData";
import rightArrow from "../../../assets/guild/guildSkill/Right_arrow.svg";

export const GuildSkill = ({ result }) => {
  console.log(result.guildBasicInformation.guild_noblesse_skill);
  console.log(result.guildBasicInformation.guild_skill);

  const sortedGuildSkills = result.guildBasicInformation.guild_skill.sort(
    (a, b) =>
      nobleSkills.skillOrder.findIndex((skill) => skill.name === a.skill_name) -
      nobleSkills.skillOrder.findIndex((skill) => skill.name === b.skill_name)
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
                  <RightArrow src={rightArrow} alt={rightArrow} />
                ) : (
                  sortedGuildSkills
                    .filter((skill) => skill.skill_name === row[colIndex])
                    .map((guildSkill, index) => {
                      const skillInfo = nobleSkills.skillOrder.find(
                        (skill) => skill.name === guildSkill.skill_name
                      );
                      return (
                        <BasicSkillWrap key={index}>
                          <SkillIcon>
                            <img
                              src={guildSkill.skill_icon}
                              alt={guildSkill.skill_name}
                            />
                          </SkillIcon>
                          <SkillName>{skillInfo.name}</SkillName>
                          <SkillLevel
                            isMaxLevel={
                              guildSkill.skill_level === skillInfo.maxLevel
                            }
                          >
                            {guildSkill.skill_level}/{skillInfo.maxLevel}
                          </SkillLevel>
                        </BasicSkillWrap>
                      );
                    })
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
                    {
                      nobleSkills.nobleSkillNameMapping[
                        noblesseSkill.skill_name
                      ]
                    }
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
  font-family: maple-light;
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
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const NoblesseSkillWrap = styled.div``;

const SkillContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: rgb(57, 57, 57);
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.575);
  border-radius: 5px;
`;
const Table = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;
  background-color: rgb(57, 57, 57);
  border: 1px solid rgba(255, 255, 255, 0.575);
  border-radius: 5px;
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
    margin-bottom: 10px;
  }
`;
const Level = styled.div``;

const RightArrow = styled.img`
  width: 50px;
  height: 40px;
`;

// 공통 스타일 컴포넌트
const SkillName = styled.div`
  font-size: 11px;
  width: 100%;
  text-align: center;
  overflow-wrap: break-word;
`;

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
  color: rgb(200, 175, 137);
`;
