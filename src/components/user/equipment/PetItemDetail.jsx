import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import iconBackground from "../../../assets/pages/user/equipment/optionIcon/Item.ItemIcon.base.png";
import { ContainerCss } from "../../common/searchCharacter/ContainerBox";

export const PetItemDetail = ({ item, onClose }) => {
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
  const hasDescription = item?.description || item?.equipment?.item_description;

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
        <ItemName>
          {item?.nickname && item?.name
            ? `${item?.nickname}(${item?.name})`
            : item?.name
            ? item?.name
            : item?.autoSkillName || item?.equipment?.item_name}
          {item?.equipment?.scroll_upgrade &&
            ` (+${item?.equipment?.scroll_upgrade})`}
        </ItemName>
        {/* 타입 */}
        {item.type && <ItemType $Type={item.type}>{item.type}</ItemType>}

        {/* 마법의 시간 */}
        {item.expire && (
          <ItemExpire>마법의 시간: {formatExpire(item.expire)}까지</ItemExpire>
        )}
      </ItemNameWrap>

      {/* 아이콘 */}
      <IconWrap $hasDescription={hasDescription}>
        <IconImage>
          <img
            src={
              item?.icon || item?.equipment?.item_icon || item?.autoSkillIcon
            }
            alt={`${item?.name || item?.equipment?.item_name}`}
          />
        </IconImage>

        {/* 펫 설명 */}
        {item.description && (
          <ItemDescriptionWrap>{item?.description}</ItemDescriptionWrap>
        )}

        {/* 아이템 설명 */}
        {item.equipment && item.equipment.item_description && (
          <ItemDescriptionWrap>
            {item.equipment.item_description}
          </ItemDescriptionWrap>
        )}
      </IconWrap>

      <ItemOptionWrap>
        {/* 스킬 */}
        {Array.isArray(item?.skill)
          ? item?.skill.map((skill, index) => <div key={index}>{skill}</div>)
          : null}

        {/* 아이템 옵션 */}
        {Array.isArray(item.equipment?.item_option)
          ? item.equipment.item_option.map(
              ({ option_type, option_value }, index) => (
                <p key={index}>
                  {option_type} : {option_value}
                </p>
              )
            )
          : null}

        {/* 업그레이드 가능 횟수 */}
        {item.equipment && item.equipment.scroll_upgradable !== undefined && (
          <Upgradable>
            업그레이드 가능 횟수 : {item.equipment.scroll_upgradable}
          </Upgradable>
        )}
      </ItemOptionWrap>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 270px;
  ${ContainerCss};
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

const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  gap: 10px;
  border-bottom: 1px dashed rgb(55, 56, 58);
  ${({ hasDescription }) =>
    !hasDescription &&
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

const ItemExpire = styled.div`
  font-size: 13px;
`;

const ItemType = styled.div`
  ${({ $Type }) => {
    switch ($Type) {
      case "루나 쁘띠":
      case "루나 스윗":
        return `color: rgb(160,133,186);`;
      case "루나 드림":
        return `color: rgb(0,205,255);`;
      case "원더 블랙":
        return `color: rgb(235,189,5);`;
      default:
        return "";
    }
  }}
`;

const ItemOptionWrap = styled.div`
  padding: 5px 0;
  line-height: 15px;
  font-size: 12px;
  color: rgb(255, 153, 0);
`;

const ItemDescriptionWrap = styled.div`
  font-size: 12px;
  white-space: pre-wrap;
`;

const Upgradable = styled.p`
  color: rgb(255, 255, 255);
`;
