import React from "react";
import styled from "styled-components";
import colors from "../../../common/color/colors";

export const UnionArtifactEffect = ({ Data, activeTab }) => {
  return (
    <Container>
      {activeTab === "raider" && (
        <>
          <Header>공격대 점령 효과</Header>
          <EffectContainer>
            {Data.unionRaider.union_occupied_stat.map((stat, index) => (
              <InfoWrap key={index}>
                <Name>{stat}</Name>
              </InfoWrap>
            ))}
          </EffectContainer>
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
  padding: 5px;
  height: 100%;
  color: white;
`;

const Header = styled.p`
  color: ${colors.union.unionChampion.levelColor};
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
