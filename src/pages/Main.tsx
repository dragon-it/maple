import React from 'react'
import { Search } from '../components/main/Search'
import styled from 'styled-components'

export const Main = () => {
  return (
    <SearchWrap>
      <Search></Search>
    </SearchWrap>
  )
}


const SearchWrap = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: red;
`