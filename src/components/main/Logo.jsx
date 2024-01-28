import React from 'react'
import styled from 'styled-components'

export const Logo = () => {
  return (
    <Container>
      <img src="./assets/Logo.png" alt="Logo" />
      <LogoText>메짱</LogoText>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  img{  
  width: 50px;
  height: 50px;
  opacity: 1;
}
`

const LogoText = styled.div`
  font-family: maple-light;
  font-size: 30px;
  
`