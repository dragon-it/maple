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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 100%;
`;

const FooterTextDiv = styled.div`
  font-family: 'maple-light', Arial, sans-serif;
  white-space: pre-line; 
`;
