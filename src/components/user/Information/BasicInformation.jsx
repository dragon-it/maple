import React from 'react'
import styled from 'styled-components'


export const BasicInformation = ({ BasicInfo }) => {
  console.log(BasicInfo)
  return (
    <Container>
      <JobGroup>
        <Job>직업: {BasicInfo.getBasicInformation.character_class}</Job>
        <Dojang>무릉도장: {BasicInfo.getDojang.dojang_best_floor}층</Dojang>
        <Popularity>인기도: {BasicInfo.getCharacterPopularity.popularity}</Popularity>
      </JobGroup>
      <CharacterInfoGroup>
        <Level>레벨: {BasicInfo.getBasicInformation.character_level}</Level>
        <CharacterImg><img src={BasicInfo.getBasicInformation.character_image} alt={BasicInfo.character_name} /></CharacterImg>
        <CharacterName>{BasicInfo.getBasicInformation.character_name}</CharacterName>
        <Experience>경험치: {BasicInfo.getBasicInformation.character_exp_rate}%</Experience>
      </CharacterInfoGroup>
      <GuildWorldGroup>
        <Guild>길드: {BasicInfo.getBasicInformation.character_guild_name}</Guild>
        <World>월드: {BasicInfo.getBasicInformation.world_name}</World>
      </GuildWorldGroup>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 7px;
  padding: 10px;
  color: white;
`
const JobGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const CharacterInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`

const GuildWorldGroup = styled.div`
    display: flex;
  flex-direction: column;
`

const Level = styled.div`
  
`

const CharacterImg = styled.div`
  transform: scaleX(-1);
`

const CharacterName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  border-radius: 10px;
  background-color: rgb(60,194,216);
  margin-bottom: 5px;
`

const Experience = styled.div`
  background-color: rgb(206,194,216);
  border-radius: 10px;
`

const Job = styled.div`
    background-color: rgb(206,194,216);
    border-radius: 10px;
`

const Dojang = styled.div`
  background-color: rgb(206,194,216);
  border-radius: 10px;
`

const Popularity = styled.div`
    background-color: rgb(206,194,216);
    border-radius: 10px;
`

const Guild = styled.div`
    background-color: rgb(206,194,216);
    border-radius: 10px;
`

const World = styled.div`
    background-color: rgb(206,194,216);
    border-radius: 10px;
`
