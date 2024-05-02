import React from 'react'
import { Search } from '../components/main/Search'
import styled from 'styled-components'

export const Main = () => {
  return (
    <Container>
      <SearchWrap>
        <Search />
      </SearchWrap>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100px;
  width: 100%;
`

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 80px;
  

`