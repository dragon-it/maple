import React from 'react';
import error_image from '../assets/error_image.png';
import styled from 'styled-components';
import { Search } from '../components/main/Search';

export const Error = ({ errorMessage }) => {
  return (
    <ErrorPageWrap>
      <SearchWrap>
        <Search />
      </SearchWrap>
      <img src={error_image} alt="error_image" />
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
`;

const ErrorText = styled.div`
  font-family: maple-light;
  font-size: 16px;
`;

const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;

  @media screen and (max-width:767px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;
