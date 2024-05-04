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
  padding: 10px;
  padding-top: 5px;
  font-family: maple-light;

  @media screen and (max-width:767px) {
    width: 100%;
  }

`

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  height: 100%;

  @media screen and (max-width:767px) {
    flex-direction: column-reverse;
  }

  @media screen and (max-width:576px) {

}
`