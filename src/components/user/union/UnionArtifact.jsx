import React from 'react'
import styled from 'styled-components'

export const UnionArtifact = ({ Data }) => {
  const NameValue = Data.union_artifact_crystal.map(crystal => 
    crystal.name.replace('크리스탈 : ', '')
  );


  
  return (
    <Container>
      {Data.union_artifact_crystal.map((crystal, index) => (
        <InfoWrap key={index}>
                    <Name>
                    {NameValue[index]}Lv. {crystal.level}
          </Name>
          <Option>
            <p>{crystal.crystal_option_name_1}</p>
            <p>{crystal.crystal_option_name_2}</p>
            <p>{crystal.crystal_option_name_3}</p>
          </Option>

          <Level>

          </Level>
      </InfoWrap>
      ))}
    </Container>
  )
}


const Container = styled.div`
  border-radius: 5px;
  display: flex;
  gap: 5px;
  flex-direction: row;
  font-family: maple-light;
  background-color: rgb(48,54,63);
  border-radius: 5px;
  border: 1px solid rgb(69,89,100);
  outline: 1px solid rgb(56,70,81);
  padding: 5px;
  width: 620px;
  height: fit-content;
  flex-wrap: wrap;
`


const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(48,54,63);
  border-radius: 5px;
  border: 1px solid rgb(136, 184, 212);
  outline: 1px solid rgb(56,70,81);
  color: white;
  gap: 10px;
  padding: 5px;
  width: 30%;
  height: 150px;
`


const Option = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.div`
  
`

const Level = styled.div`
`