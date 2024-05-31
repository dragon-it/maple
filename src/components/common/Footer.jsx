import React from 'react';
import styled from 'styled-components';
import FooterText from './FooterText';

export const Footer = () => {
  return (
    <>
      <FooterTextSpan>
        <FooterText />
      </FooterTextSpan>
    </>
  );
};

const FooterTextSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 70px;
  font-family: maple-light;
  z-index: 9999;
`;
