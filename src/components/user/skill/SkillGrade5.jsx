import React from 'react'
import styled from 'styled-components'

export const SkillGrade5 = ({ Data, setSelectedItem, clicked, onClick }) => {

  console.log(clicked)
    const handleItemClick = (item) => {
      setSelectedItem(item);
      onClick(!clicked);
    };
  
    const handleItemHover = (item) => {
      if (!clicked) { // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
        setSelectedItem(item);
      }
    };


  return (
    <Container>
      <SkillWrap>
        5차 스킬: 
        {Data.character_skill.map((item, index) => (
          <SkillIcon>
            <img 
            src={item.skill_icon} 
            alt={`icon-${index}`} 
            onClick={() => handleItemClick(item)} // 클릭 시 handleItemClick 함수 호출
            onMouseOver={() => handleItemHover(item)} // 마우스 오버 시 handleItemHover 함수 호출
            />
          </SkillIcon>
        ))}
      </SkillWrap>
    </Container>
  )
}

const Container = styled.div`
  background-color: #645c5c;
  width: 500px;
`

const SkillWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
`

const SkillIcon = styled.div`

  cursor: pointer;
  :hover{
    scale: 1.3;
  }
`