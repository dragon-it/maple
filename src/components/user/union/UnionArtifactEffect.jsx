import React from 'react';
import styled from 'styled-components';

export const UnionArtifactEffect = ({Data, showUnionRaider}) => {

  return (
    <Container>
      {showUnionRaider 
      ? 
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
      :      
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
      }
    </Container>
  )
}


const Container = styled.div`
  border-radius: 5px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  background-color: rgb(48,54,63);
  border-radius: 5px;
  border: 1px solid rgb(69,89,100);
  outline: 1px solid rgb(56,70,81);
  padding: 5px;
  height: 100%;
  color: white;
`

const Header = styled.div`

`

const EffectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 100%;
  :hover{
    background-color: rgb(151, 151, 151);
    color: rgb(19, 19, 19);
  }
`

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;  
  gap: 2px;
  background-color: rgb(48,54,63);
  border-radius: 5px;
  border: 1px solid rgb(136, 184, 212);
  outline: 1px solid rgb(56,70,81);
  height: 100%;
`

const Level = styled.div`
  width: 40px;
`

const Name = styled.div`


`