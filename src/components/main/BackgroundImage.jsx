import React, { useState } from 'react';
import styled from 'styled-components';

export const BackgroundImage = () => {
  const [imageSrc, setImageSrc] = useState('./assets/Henesys3.png');

  const handleClick = () => {
    // 클릭할 때마다 이미지 변경
    setImageSrc((prevImageSrc) => 
      prevImageSrc === './assets/Henesys3.png'
        ? './assets/Kerning City.png'
        : './assets/Henesys3.png'
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
  z-index: 9;
  img {
    object-fit: cover;
    opacity: 0.9;
    width: 100%;
    height: 95vh;
    left: 0;
  }
`;
