import React, { useState } from 'react'
import styled from 'styled-components'
import { SkillLinks } from './skill/SkillLinks'
import { SkillGrade5 } from './skill/SkillGrade5'
import { SkillGrade6 } from './skill/SkillGrade6'
import { HexaStat } from './skill/HexaStat'
import { SkillDetail } from './skill/SkillDetail'

export const Skill = ({ result }) => {

  const [selectedItem, setSelectedItem] = useState(null);
  // 클릭 설정
  const [clicked, setClicked] = useState(false);
  console.log(clicked)



  const handleItemHover = (item) => {
    if (!clicked) { // 클릭하지 않았을 때만 onMouseOver 이벤트가 작동
      setSelectedItem(item);
    }
  };

  console.log(selectedItem)
  return (
    <Container>
      <SkillWrap>
        <SkillLinks 
        Data={result.getLinkSkill}
        setSelectedItem={setSelectedItem} 
        onClick={setClicked}
        clicked={clicked}
        onMouseOver={handleItemHover} 
        />
        <SkillGrade5 
        Data={result.getSkill.grade5}
        setSelectedItem={setSelectedItem} 
        onClick={setClicked} 
        clicked={clicked}
        onMouseOver={handleItemHover}
        />
        <SkillGrade6 
        Data={result.getSkill.grade6}        
        setSelectedItem={setSelectedItem} 
        onClick={setClicked} 
        clicked={clicked}
        onMouseOver={handleItemHover} 
        />
        <HexaStat Data={result.getHexaMatrixStat}/>
      </SkillWrap>
      <SkillDetail item={selectedItem} clicked={clicked}/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const SkillWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`