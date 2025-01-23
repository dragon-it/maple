import React from "react";
import styled, { css } from "styled-components";
import iconBackground from "../../../assets/optionIcon/Item.ItemIcon.base.png";

export const PetItemDetail = ({ item, clicked }) => {
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
    <Container>
      <div style={{ position: "relative" }}>{clicked && <PinImage />}</div>
      <ItemNameWrap>
        <ItemName>
          {item?.nickname && item?.name
            ? `${item?.nickname}(${item?.name})`
            : item?.name
            ? item?.name
            : item?.autoSkillName || item?.equipment?.item_name}
        </ItemName>
        {/* 타입 */}
        {item.type && <ItemType Type={item.type}>{item.type}</ItemType>}

        {/* 마법의 시간 */}
        {item.expire && (
          <ItemExpire>마법의 시간: {formatExpire(item.expire)}까지</ItemExpire>
        )}
      </ItemNameWrap>

      {/* 아이콘 */}
      <IconWrap hasDescription={hasDescription}>
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
  width: 290px;
  height: fit-content;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  color: white;
  padding: 0px 10px 5px;
  padding-bottom: 3px;
  font-family: "돋움";
  white-space: pre-line;
  font-size: 11px;

  @media screen and (max-width: 1024px) {
    width: 300px;
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
  ${({ Type }) => {
    switch (Type) {
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
