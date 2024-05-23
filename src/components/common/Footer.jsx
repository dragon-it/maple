import React from 'react';
import styled from 'styled-components';

const FooterText = "Data by NEXON Open API, Font by MapleStory";
const AllRightsReservedText = "© 2024. 메짱. All rights reserved.";
const ContactText = "Contact by sideoff0217@naver.com";

export const Footer = () => {
  return (
    <Container>
      <FooterTextDiv>{FooterText}</FooterTextDiv>
      <FooterTextDiv>{AllRightsReservedText}</FooterTextDiv>
      <FooterTextDiv>{ContactText}</FooterTextDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 100%;
`;

const FooterTextDiv = styled.div`
  font-family: 'maple-light', Arial, sans-serif;
`;
