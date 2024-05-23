import React from 'react';
import styled from 'styled-components';
import FooterText from './FooterText';


export const Footer = () => {
  return (
    <Container>
      <FooterTextDiv>{FooterText}</FooterTextDiv>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 100%;
  font-family: maple-light, Arial, sans-serif;
`;

const FooterTextDiv = styled.div`
  white-space: pre-line; 
`;
