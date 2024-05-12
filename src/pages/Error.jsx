import React from 'react';
import error_image from '../assets/error_image.png';
import styled from 'styled-components';
import { Search } from '../components/main/Search';

export const Error = ({ errorMessage, error }) => {
  return (
    <ErrorPageWrap>
      <SearchWrap>
        <Search error={error}/>
      </SearchWrap>
      <ErrorImg><img src={error_image} alt="error_image" /></ErrorImg>
      <ErrorText>{errorMessage}</ErrorText>
    </ErrorPageWrap>
  );
};

const ErrorPageWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 30px;
  z-index: 1;
`;

const ErrorText = styled.div`
  font-family: maple-bold;
  font-size: 16px;
  @media screen and (max-width:1024px) {
    font-size: 13px;
  }
`;

const ErrorImg = styled.div`

  @media screen and (max-width:1024px) {
    img{
      width: 160px;
    }
  }

  @media screen and (max-width:576px) {
      img{
        width: 130px;
      }
  }
`

const SearchWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100px;
  @media screen and (max-width:1024px) {
    position: absolute;
    top: 0;
  }
`;
