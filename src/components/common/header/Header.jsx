import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <>
      <PcHeaderContainer>
        <HeaderLogo alt="" />
        메짱 로고
      </PcHeaderContainer>
    </>
  );
};

const PcHeaderContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 40px;
  background: rgb(38, 38, 38);

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const HeaderLogo = styled.img``;
