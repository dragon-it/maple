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
  bottom: 0;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  font-family: maple-light;
  white-space: pre-wrap;
  line-height: 20px;
`;
