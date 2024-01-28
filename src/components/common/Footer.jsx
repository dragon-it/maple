import React from 'react';
import styled from 'styled-components';

const FooterText = "이 페이지에는 메이플스토리가 제공한 메이플스토리 서체가 적용되어 있습니다.\nData by NEXON Open API";

export const Footer = () => {
  return (
    <Container>
      {FooterText}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  line-height: 20px;
`;
