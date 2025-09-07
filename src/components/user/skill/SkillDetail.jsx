import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { SkillDetailContainerCss } from "../../common/searchCharacter/ContainerBox";

export const SkillDetail = ({ item, onClose }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [detailPosition, setDetailPosition] = useState(null);
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
    if (detailRef.current && mousePosition.x !== 0 && mousePosition.y !== 0) {
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

  // item이 없을 경우 처리
  if (!item) {
    return null;
  }

  return (
    <Container
      ref={detailRef}
      onClick={onClose}
      style={
        isWideScreen
          ? detailPosition
            ? { top: detailPosition.top, left: detailPosition.left }
            : { display: "none" }
          : { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
      }
    >
      <div style={{ position: "relative" }}></div>
      <SkillNameWrap>
        <SkillName>{item.skill_name}</SkillName>
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
  ${SkillDetailContainerCss};
  line-height: 16px;
  color: white;
  padding: 0px 10px 10px 10px;
  width: 350px;
  max-height: 600px;
  overflow-y: auto;
  font-family: "돋움";
  z-index: 1000;

  @media screen and (max-width: 380px) {
    max-width: 292px;
  }

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
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 1;
    pointer-events: none;
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

const SkillName = styled.h2``;

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

const SkillDescriptionWrap = styled.span`
  width: 100%;
  height: 100%;
  white-space: pre-wrap;
`;

const SkillEffect = styled.div`
  padding-top: 10px;
`;
