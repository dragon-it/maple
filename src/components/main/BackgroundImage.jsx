import React, { useEffect, useState } from "react";
import styled from "styled-components";
import whiteBGI from "../../assets/Henesys.webp";
import darkBGI from "../../assets/Kerning-City.webp";
import { useTheme } from "../../context/ThemeProvider";

export const BackgroundImage = () => {
  const { theme } = useTheme();
  const [imageSrc, setImageSrc] = useState(
    theme === "dark" ? darkBGI : whiteBGI
  );

  useEffect(() => {
    setImageSrc(theme === "dark" ? darkBGI : whiteBGI);
  }, [theme]);

  return (
    <Container>
      <img src={imageSrc} alt="Background" width="1920" height="1080" />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;

  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: auto;
    min-height: 100vh;
  }
`;
