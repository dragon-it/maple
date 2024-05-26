import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import whiteBGI from '../../assets/Henesys.webp';
import darkBGI from '../../assets/Kerning-City.webp';
import { useTheme } from '../../context/ThemeProvider';


export const BackgroundImage = () => {
  const { theme } = useTheme(); 
  const [imageSrc, setImageSrc] = useState(theme === 'dark' ? darkBGI : whiteBGI);

  useEffect(() => {
    // 테마가 변경될 때마다 이미지 소스를 업데이트합니다.
    setImageSrc(theme === 'dark' ? darkBGI : whiteBGI);
  }, [theme]); // 테마 모드가 변경될 때마다 이 effect가 실행됩니다.

  return (
    <Container>
      <img src={imageSrc} alt="Background" width="1920" height="1080" />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  
  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: auto;
    min-height: 105vh;
  }
`;
