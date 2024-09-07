import React from "react";
import styled from "styled-components";

import { Menu } from "../menu/Menu";

export const Header = () => {
  return (
    <>
      <PcHeaderContainer>
        <HeaderLogo alt="" />
        메짱 로고
      </PcHeaderContainer>

      <Menu />
    </>
  );
};

const PcHeaderContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 40px;
  background-color: #000000;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const HeaderLogo = styled.img``;
