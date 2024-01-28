import React from 'react'
import styled from 'styled-components'

export const BackgroundImage = () => {
  return (
    <Container>
      <img src="./assets/Henesys3.png" alt="Henesys" />
    </Container>
  )
}

const Container = styled.div`
  img{

  object-fit: cover;
  opacity: 0.9;
  width: 100%;
  height: 95vh;
  z-index: -1;
  left: 0;
}
`
