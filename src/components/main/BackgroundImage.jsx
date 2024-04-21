import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import whiteBGI from '../../assets/Henesys3.png';
import darkBGI from '../../assets/Kerning City.jpg';
import { useTheme } from '../../context/ThemeProvider';


export const BackgroundImage = () => {
  const { theme } = useTheme(); // 현재 테마 상태를 가져옵니다.
  const [imageSrc, setImageSrc] = useState(theme === 'dark' ? darkBGI : whiteBGI);
  console.log(theme)
  
  useEffect(() => {
    // 테마가 변경될 때마다 이미지 소스를 업데이트합니다.
    setImageSrc(theme === 'dark' ? darkBGI : whiteBGI);
  }, [theme]); // 테마 모드가 변경될 때마다 이 effect가 실행됩니다.

  return (
    <Container>
      <img src={imageSrc} alt="Background"/>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: -1;
  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100vh;
    left: 0;
  }
`;
