import React from 'react';
import styled from 'styled-components';
import FooterText from './FooterText';


export const Footer = () => {
  return (
    <Container>
      <FooterTextSpan>{FooterText}</FooterTextSpan>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 70px;
  font-family: maple-light;
`;

const FooterTextSpan = styled.span`
  white-space: pre-line; 
  
`;
