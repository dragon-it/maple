import React from 'react';
import styled from 'styled-components';

export const UnionArtifactEffect = ({Data}) => {
  console.log(Data)
  return (
    <Container>
      <Header>아티팩트 효과</Header>
      {Data.union_artifact_effect.map((artifact, index) => (
        <InfoWrap key={index}>
          <Level>Lv. 
            {artifact.level}
          </Level>
          <Name>{artifact.name}</Name>
        </InfoWrap>
      ))}
    </Container>
  )
}


const Container = styled.div`
  border-radius: 5px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  font-family: maple-light;
  background-color: rgb(48,54,63);
  border-radius: 5px;
  border: 1px solid rgb(69,89,100);
  outline: 1px solid rgb(56,70,81);
  padding: 5px;
`

const Header = styled.div`
  color: white;
`

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgb(48,54,63);
  border-radius: 5px;
  border: 1px solid rgb(136, 184, 212);
  outline: 1px solid rgb(56,70,81);
  color: white;
  gap: 10px;
  padding: 5px;
`

const Level = styled.div`
  
  width: 40px;
`

const Name = styled.div`
  color: rgb(171, 187, 187);

`