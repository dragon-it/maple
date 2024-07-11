import React from "react";
import styled from "styled-components";
import nobleSkillNameMapping from "./SkillMapping";
import nobleSkills from "./SkillMapping";

export const GuildSkill = ({ result }) => {
  console.log(result.guildBasicInformation.guild_noblesse_skill);
  console.log(result.guildBasicInformation.guild_skill);

  const sortedGuildSkills = result.guildBasicInformation.guild_skill.sort(
    (a, b) =>
      nobleSkills.skillOrder.indexOf(a.skill_name) -
      nobleSkills.skillOrder.indexOf(b.skill_name)
  );

  const skillGrid = [
    ["LV.1", "LV.5", "LV.10", "LV.15", "LV.20", "LV.25"],
    ["잔돈이 눈에 띄네", "", "장사꾼", "", "", ""],
    [
      "함께라서 덜 아파",
      "",
      "길드 정기 지원Ⅱ",
      "",
      "길드 정기 지원Ⅲ",
      "아케인포스가 함께하기를",
    ],
    [
      "",
      "길드의 매운 맛Ⅰ",
      "",
      "길드의 매운 맛Ⅲ",
      "",
      "샤레니안의 악마 라이딩",
    ],
    [
      "길드의 노하우",
      "내 안에 별 있다",
      "졸개들은 물렀거라",
      "일어나라 용사여",
      "팔방미인",
      "",
    ],
    ["", "너에게 갈게", "", "나에게 오라", "죽음이 두렵지 않은", ""],
  ];

  return (
    <Container>
      {/* 길드 일반 스킬 */}
      <Table>
        {skillGrid[0].map((level, colIndex) => (
          <TableColumn key={colIndex}>
            {skillGrid.map((row, rowIndex) => (
              <TableCell key={rowIndex}>
                {rowIndex === 0 ? (
                  <Level>{row[colIndex]}</Level>
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
      노블레스 스킬
      <SkillWrap>
        {result.guildBasicInformation &&
          result.guildBasicInformation.guild_noblesse_skill.map(
            (noblesseSkill, index) => (
              <NoblesseSkillWrap key={index}>
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
              </NoblesseSkillWrap>
            )
          )}
      </SkillWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  font-family: maple-light;
  color: white;
`;
const SkillWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const BasicSkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NoblesseSkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
`;

const SkillName = styled.div``;

const SkillIcon = styled.div``;

const SkillLevel = styled.div`
  color: ${({ isMaxLevel }) => (isMaxLevel ? "rgb(237,208,103)" : "white")};
  font-size: 13px;
`;
const Table = styled.div`
  display: flex;
  width: 100%;
`;

const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
`;

const TableCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid white;
  width: 70px;
  height: 70px;
`;
const Level = styled.div``;
