import React from 'react'
import styled from 'styled-components'
import { Information } from '../components/user/Information'
import { Search } from '../components/main/Search'



export const User = () => {
  return (
    <>
      <SearchWrap>
        <Search/>
      </SearchWrap>
      <Container>
        <Information></Information>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
  padding: 0px 50px;
  height: 700px;
  width: 1500px;
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 99;
`

const SearchWrap = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100px;
  z-index: 9999;
`