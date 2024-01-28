import React from 'react'
import styled from 'styled-components'
import IconSearch from '../../icons/SearchIcon'
import { Logo } from './Logo'
import { BackgroundImage } from './BackgroundImage'


export const Search = () => {
  return (
    <Container>
      <InputContainer>
      <Logo />
        <input 
          type="text"
          placeholder='캐릭터 닉네임을 입력해주세요.'/>
        <button type='submit'>
          <IconSearch />
        </button>
      </InputContainer>
      <BackgroundImage />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const InputContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  width: 100%;
  height: 50px;
  z-index: 99;
  input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 40px;
    padding: 2px 10px;
    border: 2px solid rgba(255, 051, 000, 0.9);
    border-radius: 7px;
    outline: none;
    font-size: 16px;
  }
  button{
    width: 35px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-left: -50px;
    background: none;
    cursor: pointer;
  }
  svg {
    cursor: pointer;
    color: red;
  }
`