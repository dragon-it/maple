import React from 'react'
import styled from 'styled-components'

export const BasicInformation = ({ BasicInfo }) => {
  return (
    <Container>
      <div><img src={BasicInfo.character_image} alt={BasicInfo.character_name} /></div>
      <div>캐릭터 이름: {BasicInfo.character_name}</div>
      <div>직업: {BasicInfo.character_class}</div>
      <div>레벨: {BasicInfo.character_level}</div>
      <div>길드: {BasicInfo.character_guild_name}</div>
      <div>차수: {BasicInfo.character_class_level}차</div>
      <div>경험치 비율: {BasicInfo.character_exp_rate}%</div>
      <div>월드: {BasicInfo.world_name}</div>
    </Container>
  );
};


const Container = styled.div`
  

`