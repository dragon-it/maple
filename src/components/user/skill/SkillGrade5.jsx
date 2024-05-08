import React from 'react'
import styled from 'styled-components'

export const SkillGrade5 = ({ Data, setSelectedItem, clicked, onClick }) => {

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
      {Data.character_skill && Data.character_skill.length > 0
      ?
      <>
        <SkillHeader>
        5차 스킬
        </SkillHeader>
        <SkillWrap>
          {Data.character_skill.map((item, index) => (
            <SkillSimpleWrap
            onClick={() => handleItemClick(item)} // 클릭 시 handleItemClick 함수 호출
            onMouseOver={() => handleItemHover(item)} // 마우스 오버 시 handleItemHover 함수 호출
            >
              <SkillIcon>
                <img 
                src={item.skill_icon} 
                alt={`icon-${index}`}
              />
              </SkillIcon>
              <SkillNameLevelWrap>
                <SkillName>{item.skill_name}</SkillName>
                <SkillLevel>Lv.{item.skill_level}</SkillLevel>
              </SkillNameLevelWrap>
            </SkillSimpleWrap>
          ))}
        </SkillWrap>
      </>
      :
      <>
        <SkillHeader>5차 스킬</SkillHeader>
        <SkillNoDataText>데이터가 없습니다.</SkillNoDataText>
      </>
}

    </Container>
  )
}

const Container = styled.div`
  background-color: #000000d3;
  width: 100%;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  color: white;
  padding: 7px;
`
const SkillHeader = styled.div`
    font-size: 15px;
  font-weight: 700;
  color: rgb(220,252,2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`
const SkillWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  width: 800px;
  cursor: pointer;
    color: white;
  :hover{
    background-color: #616161;
    img{
      scale: 1.2;
    }
  }

  //반응형
  @media screen and (max-width:767px) {
    grid-template-columns: repeat(3, 1fr);
    width: auto;
  }

  @media screen and (max-width:576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const SkillIcon = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  img{
    width: 32px;
    height: 32px;
  }


`

const SkillSimpleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  gap: 5px;

`

const SkillNameLevelWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const SkillName = styled.div`
`

const SkillLevel = styled.div`
  @media screen and (max-width:576px) {
  font-size: 10px;
  }
`

const SkillNoDataText = styled.div`

`