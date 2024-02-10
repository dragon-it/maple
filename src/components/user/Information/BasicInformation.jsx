import React from 'react'
import styled from 'styled-components'

export const BasicInformation = ({ BasicInfo }) => {
  console.log(BasicInfo)
  return (
    <Container>
      <div><img src={BasicInfo.getBasicInformation.character_image} alt={BasicInfo.character_name} /></div>
      <div>캐릭터 이름: {BasicInfo.getBasicInformation.character_name}</div>
      <div>직업: {BasicInfo.getBasicInformation.character_class}</div>
      <div>레벨: {BasicInfo.getBasicInformation.character_level}</div>
      <div>길드: {BasicInfo.getBasicInformation.character_guild_name}</div>
      <div>차수: {BasicInfo.getBasicInformation.character_class_level}차</div>
      <div>경험치 비율: {BasicInfo.getBasicInformation.character_exp_rate}%</div>
      <div>월드: {BasicInfo.getBasicInformation.world_name}</div>
      <div>인기도: {BasicInfo.getCharacterPopularity.popularity}</div>
    </Container>
  );
};


const Container = styled.div`
  

`