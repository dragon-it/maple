import React from 'react';
import styled from 'styled-components';

const FooterText = "Font by MapleStory, Data by NEXON Open API";

export const Footer = () => {
  return (
    <Container>
      <div>{FooterText}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: rgb(200, 200,200);
  font-family: maple-light;
  white-space: pre-wrap;
  line-height: 20px;
`;
