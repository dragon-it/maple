import React, { useState } from 'react'
import { UnionInfo } from './union/UnionInfo'
import styled from 'styled-components'
import { UnionArtifact } from './union/UnionArtifact'

export const Union = ({ result }) => {
  const [showUnionRaider, setShowUnionRaider] = useState(false);

  return (
    <Container>
      <InfoWrap>
        <UnionArtifact 
          Data={{ 
            unionArtiFact: result.getUnionArtiFact, 
            unionRaider: result.getUnionRaider 
          }}
          showUnionRaider={showUnionRaider}
          setShowUnionRaider={setShowUnionRaider}
        />
        <UnionInfo 
          Data={{ 
            unionArtiFact: result.getUnionArtiFact, 
            union: result.getUnion,
            unionRaider: result.getUnionRaider 
          }}
          showUnionRaider={showUnionRaider}
        />
      </InfoWrap>
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