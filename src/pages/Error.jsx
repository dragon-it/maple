import React from "react";
import error_image from "../assets/error_image.png";
import styled from "styled-components";
import { Search } from "../components/main/Search";
import { NpcChatBox } from "../components/common/npcChat/NpcChatBox";

export const Error = ({ errorMessage, error }) => {
  return (
    <ErrorPageWrap>
      <SearchWrap>
        <Search error={error} />
      </SearchWrap>
      <ErrorImg>
        <NpcChatBox text={errorMessage}></NpcChatBox>
        <img src={error_image} alt="error_image" width="207" height="258" />
      </ErrorImg>
    </ErrorPageWrap>
  );
};

const ErrorPageWrap = styled.div`
  position: relative;
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
  font-family: Maple-light;
  font-size: 16px;
  @media screen and (max-width: 1024px) {
    font-size: 13px;
  }
`;

const ErrorImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 207px;

  @media screen and (max-width: 1024px) {
    img {
      max-width: 160px;
      height: auto;
    }
  }

  @media screen and (max-width: 576px) {
    img {
      max-width: 130px;
    }
  }
`;

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100px;
  color: black;
  @media screen and (max-width: 1024px) {
    top: 0;
  }
`;
