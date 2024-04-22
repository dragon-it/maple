import React from 'react'
import styled from 'styled-components'

export const UnionOccupiedStat = ({Data}) => {
  return (
    <Container>
    <UnionRaiderStat> 
      <Header>공격대원 효과</Header>
      {Data.union_raider_stat.map((item, index) => (
        <UnionOccupiedItem key={index}>
          <p>{item} </p> 
        </UnionOccupiedItem>
      ))}
      </UnionRaiderStat>
    </Container>
  )
}

const Container = styled.div`
  width: 200px;
  background-color: rgb(51, 51, 51);
  border-radius: 5px;
  border: 1px solid rgb(34,34,34);
  outline: 1px solid rgb(102,102,102);
  padding: 3px;
  font-size: 13px;

  @media screen and (max-width:767px) {
    width: 100%;
  }
`

const Header = styled.div`
  font-size: 15px;
  margin-bottom: 3px;
  text-align: center;
`


const UnionRaiderStat = styled.div`
  position: relative;
`

const UnionOccupiedItem = styled.div`
  color: rgb(179, 179, 179);
  :hover{
    background-color: rgb(209, 209, 209);
    color: rgb(78, 77, 77);
  }
`