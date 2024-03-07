import React from 'react'
import styled from 'styled-components'


export const BasicInformation = ({ BasicInfo }) => {
  return (
    <Container>
      <CharacterHeader>CHARACTER INFO</CharacterHeader>
      <CharacterBody>
        <JobGroup>
          <Job>{BasicInfo.getBasicInformation.character_class}</Job>
          <ItemWrap>
            <Dojang>
              <Title>무릉도장</Title>
              <Value>{BasicInfo.getDojang.dojang_best_floor}층</Value>
            </Dojang>
            <Popularity>
              <Title>인기도</Title>
              <Value>{BasicInfo.getCharacterPopularity.popularity}</Value>
            </Popularity>
          </ItemWrap>
        </JobGroup>
        <CharacterInfoGroup>
          <Level>Lv. {BasicInfo.getBasicInformation.character_level}</Level>
          <CharacterImg><img src={BasicInfo.getBasicInformation.character_image} alt={BasicInfo.character_name} /></CharacterImg>
          <CharacterName>{BasicInfo.getBasicInformation.character_name}</CharacterName>
          <Experience>경험치 {BasicInfo.getBasicInformation.character_exp_rate}%</Experience>
        </CharacterInfoGroup>
        <GuildWorldGroup>
          <ItemWrap>
            <World>
              <Title>월드</Title>
              <Value>{BasicInfo.getBasicInformation.world_name}</Value>
            </World>
            <Guild>
              <Title>길드</Title>
              <Value>{BasicInfo.getBasicInformation.character_guild_name}</Value>
            </Guild>
          </ItemWrap>
        </GuildWorldGroup>
      </CharacterBody>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  color: white;
  padding: 7px;
  font-size: 14px;
  border: 1px solid rgb(80,92,101);
  outline: 1px solid rgb(42,49,58);
  border-radius: 5px;
  background-color: rgba(59,66,75, 0.9);
`
const CharacterHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220,252,2);
  margin-bottom: 7px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`

const CharacterBody = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 5px;
`

const JobGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 130px;
  padding: 5px 0;
`

const CharacterInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  padding-bottom: 5px;
`

const GuildWorldGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 130px;
  padding: 5px 0;
`

const Level = styled.div`
  text-align: center;
  background-color: rgb(154,163,172);
  padding: 3px;
  margin: 0 10px;
  border-radius: 0 0 10px 10px; 
`;


const CharacterImg = styled.div`
  display: flex;
  justify-content: center;
  transform: scaleX(-1);
  width: 110px;
  margin: 2px 0;
`

const CharacterName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  border-radius: 7px;
  background-color: rgb(60,194,216);
  margin-bottom: 1px;
`

const Experience = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(170,204,0);
  font-size: 12px;
  padding: 5px;
  border-radius: 7px;

`

const Job = styled.div`
  background-color: rgb(154,163,172);
  border-radius: 7px;
  width: 110px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Dojang = styled.div`
  background-color: rgb(202,204,206);
  width: 110px;
  border-radius: 7px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Popularity = styled.div`
  background-color: rgb(202,204,206);
  width: 110px;
  border-radius: 7px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Guild = styled.div`
  background-color: rgb(202,204,206);
  width: 110px;
  border-radius: 7px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const World = styled.div`
  background-color: rgb(202,204,206);
  width: 110px;
  border-radius: 7px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Value = styled.div`
  color: black;
`

const Title = styled.div`
  
`

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`