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
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 100%;
  font-family: maple-light;
`;
