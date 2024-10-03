import React from "react";
import error_image from "../assets/error_image.png";
import error_image_fish from "../assets/npc/npc_fish_error.png";
import styled from "styled-components";
import { Search } from "../components/main/Search";
import { NpcChatBox } from "../components/common/npcChat/NpcChatBox";

export const Error = ({ errorMessage, error }) => {
  const currentPath = window.location.pathname;
  const isCapturePage = currentPath.includes("/character-capture");

  return (
    <ErrorPageWrap>
      <SearchWrap>
        <Search error={error} />
      </SearchWrap>
      <ErrorImg>
        <NpcChatBox text={errorMessage}></NpcChatBox>
        <img
          src={isCapturePage ? error_image_fish : error_image}
          alt="error_image"
        />
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

const ErrorImg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 207px;

  img {
    width: 100%;
  }

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
  width: 100%;
  min-height: 80px;
  color: black;
`;
