import React from 'react'
import styled from 'styled-components'

export const SkillLinks = ({ Data }) => {
  console.log(Data)


  return (
    <Container>
      <LinkSkillWrap>
      링크 스킬: 
        {Data.character_link_skill.map((item, index) => (
          <ItemIcon>
            <img src={item.skill_icon} alt={`icon-${index}`} />
          </ItemIcon>
        ))} 
      </LinkSkillWrap>
    </Container>
  )
}

const Container = styled.div`
  
`

const LinkSkillWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

const ItemIcon = styled.div`

`