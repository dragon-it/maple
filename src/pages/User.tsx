import React from 'react'
import styled from 'styled-components'
import { Information } from '../components/user/Information'



export const User = () => {
  return (
    <Container>
      <Information></Information>
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  align-items: center;
  position: absolute;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
  padding: 0px 50px;
  height: 700px;
  width: 1500px;
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 99;
`