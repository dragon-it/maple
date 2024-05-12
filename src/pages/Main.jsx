import React from 'react'
import { Search } from '../components/main/Search'
import styled from 'styled-components'
import { Footer } from '../components/common/Footer'
import { Favorite } from '../components/user/favorite/Favorite'

export const Main = () => {
  return (
    <Container>
      <SearchWrap>
        <Search />
        <FavoriteWrap>
          <Favorite/>
        </FavoriteWrap>
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  width: 100%;
  height: 100px;
  z-index: 9999;
`


const FooterWrap = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  width: 100%;
  @media screen and (max-width:768px){
    display: block;
  }
`

const FavoriteWrap = styled.div`
  position: absolute;
  top: 100px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.53);
  border-radius: 5px;
  @media screen and (max-width:768px){
    top: 130px;
  }
`