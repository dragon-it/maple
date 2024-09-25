import React from "react";
import styled from "styled-components";
import FooterText from "./FooterText";

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
  position: relative;
  bottom: -58px;
  width: 100%;
  padding: 3px 0;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: maple-light;
  background: ${({ theme }) => theme.footerBgColor};
`;
