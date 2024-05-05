import React from 'react'
import { Search } from '../components/main/Search'
import styled from 'styled-components'
import { Footer } from '../components/common/Footer'

export const Main = () => {
  return (
    <Container>
      <SearchWrap>
        <Search />
      </SearchWrap>
      <FooterWrap>
        <Footer />
      </FooterWrap>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
`

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100px;
`


const FooterWrap = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  width: 100%;
  @media screen and (max-width:767px){
    display: block;
  }
`