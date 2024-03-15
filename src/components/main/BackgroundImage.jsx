import React, { useState } from 'react';
import styled from 'styled-components';
import whiteBGI from '../../assets/Henesys3.png';
import darkBGI from '../../assets/Kerning City.jpg';


export const BackgroundImage = () => {
  const [imageSrc, setImageSrc] = useState(whiteBGI);

  const handleClick = () => {
    // 클릭할 때마다 이미지 변경
    setImageSrc((prevImageSrc) => 
      prevImageSrc === whiteBGI
        ? darkBGI
        : whiteBGI
    );
  };

  return (
    <Container>
      <img src={imageSrc} alt="Background" onClick={handleClick}/>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: -1;
  img {
    object-fit: cover;
    width: 100%;
    height: 95vh;
    left: 0;
  }
`;
