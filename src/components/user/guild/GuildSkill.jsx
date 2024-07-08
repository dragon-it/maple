import React from "react";
import styled from "styled-components";
import nobleSkillNameMapping from "./SkillMapping";

export const GuildSkill = ({ result }) => {
  console.log(result.guildBasicInformation.guild_noblesse_skill);
  console.log(result.guildBasicInformation.guild_skill);

  return (
    <Container>
      {/* 길드 일반 스킬 */}
      <SkillWrap>
        {result.guildBasicInformation &&
          result.guildBasicInformation.guild_skill.map((guildSkill, index) => (
            <BasicSkillWrap key={index}>
              <SkillIcon>
                <img src={guildSkill.skill_icon} alt="guildSkill" />
              </SkillIcon>
              <SkillName>{guildSkill.skill_name}</SkillName>
              <SkillLevel>{guildSkill.skill_level}</SkillLevel>
            </BasicSkillWrap>
          ))}
      </SkillWrap>
      {/* 길드 노블레스 스킬 */}
      <SkillWrap>
        {result.guildBasicInformation &&
          result.guildBasicInformation.guild_noblesse_skill.map(
            (noblesseSkill, index) => (
              <NoblesseSkillWrap key={index}>
                <SkillIcon>
                  <img src={noblesseSkill.skill_icon} alt="noblesseSkill" />
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
  margin-top: 50px;
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
