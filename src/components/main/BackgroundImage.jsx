import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import whiteBGI_mobile from '../../assets/Henesys-mobile.webp';
import darkBGI_mobile from '../../assets/Kerning-City-mobile.webp';
import whiteBGI from '../../assets/Henesys.webp';
import darkBGI from '../../assets/Kerning-City.webp';
import { useTheme } from '../../context/ThemeProvider';

export const BackgroundImage = () => {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getImageSrc = (width, theme) => {
    if (width <= 1024) { 
      return theme === 'dark' ? darkBGI_mobile : whiteBGI_mobile;
    } else { 
      return theme === 'dark' ? darkBGI : whiteBGI;
    }
  };

  const [imageSrc, setImageSrc] = useState(getImageSrc(windowWidth, theme));

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setImageSrc(getImageSrc(windowWidth, theme));
  }, [theme, windowWidth]);

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
    width: 100vw;
    height: auto;
    min-height: 100vh;
  }
`;
