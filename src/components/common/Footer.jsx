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
  text-align: center;
  height: 70px;
`;

const FooterTextDiv = styled.div`
  white-space: pre-line; 
`;
