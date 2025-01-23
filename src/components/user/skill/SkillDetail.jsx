import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

export const SkillDetail = ({ item, clicked, onClose }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [detailPosition, setDetailPosition] = useState({ top: 0, left: 0 });
  const detailRef = useRef(null); // 스킬 디테일의 크기를 추적

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

      setDetailPosition({ top, left });
    }
  }, [mousePosition]);

  // item이 없을 경우 처리
  if (!item) {
    return null; // 또는 간단한 메시지 표시
  }

  return (
    <Container
      ref={detailRef}
      onClick={onClose}
      style={{ top: detailPosition.top, left: detailPosition.left }}
    >
      <div style={{ position: "relative" }}>{clicked && <PinImage />}</div>
      <SkillNameWrap>
        <h2>
          <SkillName>{item.skill_name}</SkillName>
        </h2>
      </SkillNameWrap>
      <IconWrap>
        <IconImage>
          <img src={item.skill_icon} alt="icon" />
        </IconImage>
        <SkillDescriptionWrap>
          <p>{item.skill_description}</p>
        </SkillDescriptionWrap>
      </IconWrap>
      <SkillEffect>
        <p>{item.skill_effect}</p>
      </SkillEffect>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  line-height: 16px;
  color: white;
  padding: 0px 10px 10px 10px;
  width: 350px;
  max-height: 600px;
  overflow-y: auto;
  font-family: "돋움";
  z-index: 1000;

  @media screen and (max-width: 380px) {
    width: 292px;
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
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 1;
    pointer-events: none; /* 마우스 이벤트 무시 */
  }
`;

const SkillNameWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0px 5px 0px;

  h2 {
    font-size: 16px;
    text-align: center;
  }
`;

const SkillName = styled.div``;

const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  gap: 10px;
  border-bottom: 1px dashed rgb(55, 56, 58);
`;

const IconImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  padding: 1px;

  img {
    height: 100%;
    object-fit: contain;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 45px;
    background: linear-gradient(
      130deg,
      rgba(255, 255, 255, 0.6) 44%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 1;
    pointer-events: none;
    border-radius: 5px;
  }
`;

const PinImage = styled.div`
  position: absolute;
  top: -5px;
  left: -10px;
  width: 11px;
  height: 10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
  transform: rotate(45deg);
`;

const SkillDescriptionWrap = styled.p`
  width: 100%;
  height: 100%;
  font-size: 12px;
  white-space: pre-wrap;
`;

const SkillEffect = styled.p`
  font-size: 12px;
  white-space: pre-wrap;
  margin-top: 10px;
`;
