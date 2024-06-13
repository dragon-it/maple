import React from "react";
import styled from "styled-components";
import unionRaiderUi from "../../../assets/union/unionRaiderUi.png";

export const UnionRaider = ({ Data }) => {
  const width = 22;
  const height = 20;
  const colors = ["#4ba5c9"];

  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);

  // 인덱스에 따라 유니온 레이더 위치를 설정하는 로직을 배열
  const positions = [
    { default: { left: 68, top: 43 }, mobile: { left: 45, top: 22 } }, // 11시에서 12시 사이
    { default: { left: 140, top: 43 }, mobile: { left: 100, top: 22 } }, // 12시에서 1시 사이
    { default: { left: 180, top: 83 }, mobile: { left: 140, top: 60 } }, // 1시에서 3시 사이
    { default: { left: 180, top: 140 }, mobile: { left: 140, top: 105 } }, // 3시에서 5시 사이
    { default: { left: 140, top: 183 }, mobile: { left: 100, top: 140 } }, // 5시에서 6시 사이
    { default: { left: 58, top: 183 }, mobile: { left: 40, top: 140 } }, // 6시에서 7시 사이
    { default: { left: 10, top: 140 }, mobile: { left: 9, top: 105 } }, // 7시에서 9시 사이
    { default: { left: 10, top: 83 }, mobile: { left: 9, top: 60 } }, // 9시에서 11시 사이
  ];

  return (
    <Container width={width * 20}>
      <img src={unionRaiderUi} alt="ui" />
      {Array.from({ length: height * width }).map((_, index) => {
        const x = index % width;
        const y = Math.floor(index / width);

        const actualX = x - centerX;
        const actualY = centerY - y;

        let color = "transparent";
        Data.union_block.forEach((block, blockIndex) => {
          block.block_position.forEach((pos) => {
            if (pos.x === actualX && pos.y === actualY) {
              color = colors[blockIndex % colors.length];
            }
          });
        });

        return <Cell key={index} color={color} />;
      })}
      <RaiderExternalStat>
        <StatItem style={{ top: "11%", left: "25%" }}>상태이상내성</StatItem>
        <StatItem style={{ top: "11%", right: "30%" }}>획득경험치</StatItem>
        <StatItem style={{ top: "30%", right: "3%" }}>크리티컬 확률</StatItem>
        <StatItem style={{ bottom: "31%", right: "5%" }}>보스데미지</StatItem>
        <StatItem style={{ bottom: "10%", right: "32%" }}>일반데미지</StatItem>
        <StatItem style={{ bottom: "10%", left: "24%" }}>버프지속시간</StatItem>
        <StatItem style={{ bottom: "31%", left: "5%" }}>방어율무시</StatItem>
        <StatItem style={{ top: "30%", left: "1%" }}>크리티컬 데미지</StatItem>
      </RaiderExternalStat>
      <RaiderInnerStatWrap>
        {Data.union_inner_stat.map((stat, index) => (
          <UnionRaiderPosition key={index} position={positions[index]}>
            {stat.stat_field_effect.replace("유니온 ", "")}
          </UnionRaiderPosition>
        ))}
      </RaiderInnerStatWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: ${(props) => `${props.width}px`};
  height: fit-content;
  background-color: #574d4d;
  img {
    position: absolute;
    opacity: 0.7;
    width: 440px;
    height: 400px;
  }

  @media screen and (max-width: 576px) {
    width: 330px;
    img {
      width: 330px;
      height: 300px;
    }
  }
`;

const Cell = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  opacity: 0.65;

  @media screen and (max-width: 576px) {
    width: 15px;
    height: 15px;
  }
`;

const RaiderInnerStatWrap = styled.div`
  position: absolute;
  width: 238px;
  height: 238px;
  z-index: 999;
  left: 23%;
  top: 20%;
  white-space: nowrap;
`;

const RaiderExternalStat = styled.div`
  font-size: 13px;
`;

const UnionRaiderPosition = styled.div`
  position: absolute;
  left: ${(props) => `${props.position.default.left}px`};
  top: ${(props) => `${props.position.default.top}px`};

  @media screen and (max-width: 576px) {
    left: ${(props) => `${props.position.mobile.left}px`};
    top: ${(props) => `${props.position.mobile.top}px`};
    font-size: 10px;
  }
`;

const StatItem = styled.div`
  position: absolute;
`;
