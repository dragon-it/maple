import React from 'react';
import styled from 'styled-components';

const FooterText = "Data by NEXON Open API, Font by MapleStory";
const AllRightsReservedText = "© 2024. 메짱. All rights reserved."
const ContactText = "Contact by sideoff0217@naver.com"

export const Footer = () => {
  return (
    <Container>
      <div>{FooterText}</div>
      <div>{AllRightsReservedText}</div>
      <div>{ContactText}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 8px;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  font-family: maple-light;
  z-index: 999;

  @media screen and (max-width:767px) {
    margin-top: 77px;
    position: relative;
  }

`;
