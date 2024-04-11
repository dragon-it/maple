import React from 'react'
import { UnionInfo } from './union/UnionInfo'
import { UnionRaider } from './union/UnionRaider'
import styled from 'styled-components'
import { UnionArtifact } from './union/UnionArtifact'

export const Union = ({ result }) => {
  return (
    <Container>
      <UnionInfo Data={result.getUnion}/>
      <UnionArtifact Data={result.getUnionArtiFact}/>
      <UnionRaider Data={result.getUnionRaider}/>
    </Container>
  )
}

const Container = styled.div`

`