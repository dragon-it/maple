import React from 'react'
import { UnionInfo } from './union/UnionInfo'
import { UnionRaider } from './union/UnionRaider'
import styled from 'styled-components'
import { UnionArtifact } from './union/UnionArtifact'

export const Union = ({ result }) => {
  return (
    <Container>
      <InfoWrap>
        <UnionArtifact Data={result.getUnionArtiFact}/>
        <UnionInfo Data={{ unionArtiFact: result.getUnionArtiFact, union: result.getUnion }}/>
      </InfoWrap>
      <UnionRaider Data={result.getUnionRaider}/>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
  padding-top: 5px;
`

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`