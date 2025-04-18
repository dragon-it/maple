import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo_Text from "../../assets/logos/Logo_Text.svg";

export const Logo = () => {
  const navigate = useNavigate();

  // 로고 클릭 시 홈페이지 이동
  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <StyledContainer onClick={handleClick}>
      <img src={logo_Text} alt="Logo" />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;

  img {
    width: 62px;
  }
`;
