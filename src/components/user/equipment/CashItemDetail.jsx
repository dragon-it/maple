import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import iconBackground from "../../../assets/optionIcon/Item.ItemIcon.base.png";

export const CashItemDetail = ({ item, onClose }) => {
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
      const offset = 3; // 마우스와 디테일 사이 간격

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

  const isWideScreen = window.innerWidth > 1024;

  if (!item) {
    // 아이템 정보가 없는 경우를 처리
    return null;
  }

  // 날짜 함수
  const formatExpire = (expireString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(
      new Date(expireString)
    );
  };

  // 아이템 설명이 있는지 확인
  const hasDescription = item && item.cash_item_description;

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
      <ItemNameWrap>
        {/* 아이템 이름 */}
        <ItemName>{item.cash_item_name}</ItemName>
        <ItemLabel $Label={item.cash_item_label}>
          {item.cash_item_label}
        </ItemLabel>

        {/* 마법의 시간 */}
        {item.date_option_expire && (
          <ItemExpire>
            옵션 유효 기간: {formatExpire(item.date_option_expire)}까지
          </ItemExpire>
        )}
      </ItemNameWrap>
      <IconWrap $hasDescription={hasDescription}>
        <IconImage>
          <img src={item.cash_item_icon} alt="cash_item" />
        </IconImage>

        {/* 아이템 설명 */}
        <ItemDescriptionWrap $Value={item && item.cash_item_description}>
          <p> {item.cash_item_description} </p>
        </ItemDescriptionWrap>
      </IconWrap>
      <ItemOptionWrap>
        <p>장비 분류 : {item && item.cash_item_equipment_part}</p>

        {/* 아이템 옵션 */}
        <ItemOption>
          {Array.isArray(item.cash_item_option)
            ? item.cash_item_option.map(
                ({ option_type, option_value }, index) => (
                  <p key={index}>
                    {option_type} : {option_value}
                  </p>
                )
              )
            : null}
        </ItemOption>
      </ItemOptionWrap>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 270px;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  color: white;
  padding: 0px 10px 5px;
  padding-bottom: 3px;
  height: fit-content;
  font-family: "돋움";
  white-space: pre-line;
  z-index: 9999;

  @media screen and (max-width: 1024px) {
    position: relative;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    transform: translate(0%, -60%);
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
    border-radius: 5px;
  }
`;

const ItemNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px dashed rgb(89, 85, 82);
  font-size: 15px;
  padding: 10px 0;
  text-align: center;
`;

const ItemName = styled.h2`
  font-size: 15px;
`;

const ItemLabel = styled.p`
  ${({ $Label }) =>
    $Label === "블랙라벨" &&
    `
    color: rgb(255,204,0);
  `}
  ${({ $Label }) =>
    $Label === "레드라벨" &&
    `
    color: rgb(255,0,89);
  `}
  ${({ $Label }) =>
    $Label === "마스터라벨" &&
    `
    color: rgb(108,168,192);
  `}
  ${({ $Label }) =>
    $Label === "스페셜라벨" &&
    `
    color: rgb(188,186,187);
  `}
`;

const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  gap: 10px;
  border-bottom: 1px dashed rgb(55, 56, 58);
  ${({ $hasDescription }) =>
    !$hasDescription &&
    css`
      justify-content: center;
    `}
`;

const IconImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 5px;
  background-image: url(${iconBackground});
  background-size: 50px 50px;
  background-position: center;
  object-fit: contain;

  img {
    width: 45px;
    height: 90%;
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

const ItemOptionWrap = styled.div`
  padding: 5px 0;
  line-height: 15px;
  font-size: 12px;
`;

const ItemDescriptionWrap = styled.div`
  font-size: 12px;
`;

const ItemExpire = styled.p`
  font-size: 13px;
`;

const ItemOption = styled.p`
  color: rgb(255, 153, 0);
  font-size: 12px;
`;
