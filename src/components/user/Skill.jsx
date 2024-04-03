import React from 'react'
import styled from 'styled-components'
import { SkillLinks } from './skill/SkillLinks'
import { SkillGrade5 } from './skill/SkillGrade5'
import { SkillGrade6 } from './skill/SkillGrade6'
import { HexaStat } from './skill/HexaStat'

export const Skill = ({ result }) => {


  return (
    <Container>
      <SkillLinks Data={result.getLinkSkill}/>
      <SkillGrade5 Data={result.getSkill.grade5}/>
      <SkillGrade6 Data={result.getSkill.grade6}/>
      <HexaStat Data={result.getHexaMatrixStat}/>
    </Container>
  )
}

const Container = styled.div`
  
`