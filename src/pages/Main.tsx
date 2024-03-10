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
  width: 100%;
  height: 100px;
`

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  height: 80px;
`