import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo_dark from "../../assets/Logo_dark.svg";
import logo_light from "../../assets/Logo_light.svg";
import logo_dark_mobile from "../../assets/Logo_dark_mobile.svg";
import { useTheme } from "../../context/ThemeProvider";

export const Logo = ({ error, isUserRoute }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 윈도우 너비 변경 시 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // 윈도우 너비를 상태로 업데이트
    };

    window.addEventListener("resize", handleResize); // 윈도우 리사이즈 이벤트 리스너 등록
    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  // 로고 클릭 시 홈페이지 이동
  const handleClick = () => {
    navigate(`/`);
  };

  // 로고 이미지 선택 로직
  const logoSrc = (() => {
    if (windowWidth <= 1024) {
      return logo_dark_mobile;
    }
    if (theme === "dark") {
      return isUserRoute && !error ? logo_light : logo_dark;
    }
    return logo_dark;
  })();

  return (
    <StyledContainer onClick={handleClick} isUserRoute={isUserRoute}>
      <img src={logoSrc} alt="Logo" />
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
    height: 57px;
  }
`;
