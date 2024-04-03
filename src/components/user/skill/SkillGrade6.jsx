import React from 'react'
import styled from 'styled-components'

export const SkillGrade6 = ({ Data }) => {

  return (
    <Container>
      <SkillWrap>
        6차 스킬: 
      {Data.character_skill.map((item, index) => (
        <SkillIcon>
          <img src={item.skill_icon} alt={`icon-${index}`} />
        </SkillIcon>
      ))}
      </SkillWrap>
    </Container>
  )
}

const Container = styled.div`
  
`

const SkillWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

const SkillIcon = styled.div`
  
`