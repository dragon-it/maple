import React from "react";
import styled from "styled-components";
import colors from "../../../common/color/colors";

export const UnionArtifactEffect = ({ Data, activeTab, selectedPresetNo }) => {
  const characterStats = Data?.unionRaider?.union_raider_stat
    ? [...Data.unionRaider.union_raider_stat].sort((a, b) =>
      a.localeCompare(b)
    )
    : [];

  const selectedPreset = Data?.unionRaider?.union_state_stat_preset?.find(
    (preset) => Number(preset.preset_no) === selectedPresetNo
  );

  const occupiedStats = Array.isArray(selectedPreset?.union_state_stat)
    ? selectedPreset.union_state_stat
    : [];

  return (
    <Container>
      {activeTab === "raider" && (
        <>
          <Header>유니온 효과</Header>
          <UnionEffectWrapper>
            <EffectBox>
              <BoxTitle>유니온 캐릭터 효과</BoxTitle>
              <ScrollArea>
                {characterStats.map((stat, index) => (
                  <StatItem key={index}>{stat}</StatItem>
                ))}
              </ScrollArea>
            </EffectBox>
            <EffectBox>
              <BoxTitle>유니온 스탯 효과</BoxTitle>
              <ScrollArea>
                {occupiedStats.map((stat, index) => (
                  <StatItem key={index}>{stat}</StatItem>
                ))}
              </ScrollArea>
            </EffectBox>
          </UnionEffectWrapper>
        </>
      )}

      {activeTab === "artifact" && (
        <>
          <Header>아티팩트 효과</Header>
          <EffectContainer>
            {Data.unionArtiFact.union_artifact_effect.map((artifact, index) => (
              <InfoWrap key={index}>
                <Level>Lv.{artifact.level}</Level>
                <Name>{artifact.name}</Name>
              </InfoWrap>
            ))}
          </EffectContainer>
        </>
      )}
      {activeTab === "champion" && (
        <>
          <Header>챔피언 휘장 효과</Header>
          <EffectContainer>
            {Data.unionChampion.champion_badge_total_info.map((stat, index) => (
              <InfoWrap key={index}>
                <Name>{stat.stat}</Name>
              </InfoWrap>
            ))}
          </EffectContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  background-color: rgb(48, 54, 63);
  border-radius: 5px;
  border: 1px solid rgb(69, 89, 100);
  outline: 1px solid rgb(56, 70, 81);
  padding: 8px;
  height: 100%;
  color: white;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.p`
  color: ${colors.union.unionChampion.levelColor};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const UnionEffectWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: row;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const EffectBox = styled.div`
  flex: 1;
  background: linear-gradient(
    180deg,
    rgba(38, 50, 60, 0.75) 0%,
    rgba(26, 34, 42, 0.85) 100%
  );
  border: 1.5px solid rgb(69, 89, 100);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 250px;
  box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.05),
    0 4px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const BoxTitle = styled.h4`
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  margin: 0 0 8px 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 5px;
`;

const ScrollArea = styled.ul`
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 4px;
  margin: 0;
  list-style: none;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(136, 184, 212, 0.3);
    border-radius: 3px;
    &:hover {
      background: rgba(136, 184, 212, 0.6);
    }
  }
`;

const StatItem = styled.li`
  font-size: 12px;
  color: #e2e8f0;
  padding: 1px 0;
  word-break: break-all;
  white-space: normal;
`;

const EffectContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;
  :hover {
    filter: brightness(1.4);
  }
`;

const InfoWrap = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid rgb(136, 184, 212);
  outline: 1px solid rgb(56, 70, 81);
  max-width: 300px;
  font-size: 12px;

  @media screen and (max-width: 1024px) {
    max-width: 100%;
  }
`;

const Level = styled.span`
  width: 35px;
  flex-shrink: 0;
`;

const Name = styled.span`
  overflow: hidden;
  white-space: wrap;
`;
