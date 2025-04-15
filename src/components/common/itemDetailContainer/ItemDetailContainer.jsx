import colors from "../color/colors";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

export const ItemDetailContainer = ({ text, onClose }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [detailPosition, setDetailPosition] = useState({ top: 0, left: 0 });
  const detailRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (detailRef.current) {
      const detailRect = detailRef.current.getBoundingClientRect();
      const detailHeight = detailRect.height; // 실제 높이
      const detailWidth = detailRect.width; // 실제 너비
      const offset = 10; // 마우스와 디테일 사이 간격

      let top = mousePosition.y + offset;
      let left = mousePosition.x + offset;

      // 화면 경계를 초과할 경우 반전 처리
      if (top + detailHeight > window.innerHeight) {
        top = mousePosition.y - detailHeight - offset;
      }

      if (left + detailWidth > window.innerWidth) {
        left = mousePosition.x - detailWidth - offset;
      }
      top = Math.max(0, top);
      left = Math.max(0, left);

      setDetailPosition({ top, left });
    }
  }, [mousePosition]);

  const isWideScreen = window.innerWidth > 768;

  return (
    <Container
      ref={detailRef}
      onClick={onClose}
      style={
        isWideScreen
          ? { top: detailPosition.top, left: detailPosition.left }
          : {}
      }
    >
      {text}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  background-color: ${colors.main.dark0};
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  line-height: 16px;
  color: ${colors.main.white0};
  padding: 10px 20px;
  width: 350px;
  font-family: "돋움";
  overflow-y: auto;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: linear-gradient(
      139deg,
      ${colors.main.white0Alpha90} 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 1;
    pointer-events: none;
  }

  h3 {
    text-align: center;
    margin-bottom: 5px;
  }
`;
