import React from 'react';
import styled from 'styled-components';

const FooterText = "Data by NEXON Open API, Font by MapleStory";

export const Footer = () => {
  return (
    <Container>
      <div>{FooterText}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  font-family: maple-bold;
  z-index: 9999999999999;

  @media screen and (max-width:767px) {
    margin-top: 77px;
    position: relative;
  }

  @media screen and (max-width:576px) {

}
`;
