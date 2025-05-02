import React, { useState, useMemo } from "react";
import styled from "styled-components";
import unionRaiderUi from "../../../assets/pages/user/union/unionRaiderUi.png";
import colors from "../../common/color/colors";

export const UnionRaider = ({ Data }) => {
  // 프리셋 목록 상수화
  const PRESETS = [1, 2, 3, 4, 5].map((num) => `preset_${num}`);

  // 프리셋 비교 및 초기/현재 프리셋 설정
  const getPresetMatch = () => {
    if (!Data?.union_block || !Array.isArray(Data.union_block)) {
      return { initialPreset: "preset_1", currentPreset: null };
    }

    for (const presetId of PRESETS) {
      const num = presetId.split("_")[1];
      const preset = Data?.[`union_raider_preset_${num}`];

      if (
        preset?.union_block &&
        Array.isArray(preset.union_block) &&
        JSON.stringify(preset.union_block) === JSON.stringify(Data.union_block)
      ) {
        return { initialPreset: presetId, currentPreset: presetId };
      }
    }

    return { initialPreset: "preset_1", currentPreset: null };
  };

  const { initialPreset, currentPreset } = getPresetMatch();
  const [selectedPreset, setSelectedPreset] = useState(initialPreset);

  const width = 22;
  const height = 20;
  const colors = ["#4ba5c9"];

  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);

  const positions = [
    { default: { left: 68, top: 43 }, mobile: { left: 45, top: 22 } },
    { default: { left: 140, top: 43 }, mobile: { left: 100, top: 22 } },
    { default: { left: 180, top: 83 }, mobile: { left: 140, top: 60 } },
    { default: { left: 180, top: 140 }, mobile: { left: 140, top: 105 } },
    { default: { left: 140, top: 183 }, mobile: { left: 100, top: 140 } },
    { default: { left: 58, top: 183 }, mobile: { left: 40, top: 140 } },
    { default: { left: 10, top: 140 }, mobile: { left: 9, top: 105 } },
    { default: { left: 10, top: 83 }, mobile: { left: 9, top: 60 } },
  ];

  // unionBlock 메모이제이션
  const unionBlock = useMemo(() => {
    const defaultBlock = Array.isArray(Data?.union_block)
      ? Data.union_block
      : [];

    const presetNum = selectedPreset.split("_")[1];
    const preset = Data?.[`union_raider_preset_${presetNum}`];

    const block = Array.isArray(preset?.union_block)
      ? preset.union_block
      : defaultBlock;

    return block;
  }, [Data, selectedPreset]);

  return (
    <>
      <Container width={width * 20}>
        <img src={unionRaiderUi} alt="ui" />
        {Array.from({ length: height * width }).map((_, index) => {
          const x = index % width;
          const y = Math.floor(index / width);

          const actualX = x - centerX;
          const actualY = centerY - y;

          let color = "transparent";
          if (Array.isArray(unionBlock)) {
            unionBlock.forEach((block, blockIndex) => {
              if (Array.isArray(block?.block_position)) {
                block.block_position.forEach((pos) => {
                  if (pos?.x === actualX && pos?.y === actualY) {
                    color = colors[blockIndex % colors.length];
                  }
                });
              }
            });
          }

          return <Cell key={index} color={color} />;
        })}

        <RaiderExternalStat>
          <StatItem style={{ top: "11%", left: "25%" }}>상태이상내성</StatItem>
          <StatItem style={{ top: "11%", right: "30%" }}>획득경험치</StatItem>
          <StatItem style={{ top: "30%", right: "3%" }}>크리티컬 확률</StatItem>
          <StatItem style={{ bottom: "31%", right: "5%" }}>보스데미지</StatItem>
          <StatItem style={{ bottom: "10%", right: "32%" }}>
            일반데미지
          </StatItem>
          <StatItem style={{ bottom: "10%", left: "24%" }}>
            버프지속시간
          </StatItem>
          <StatItem style={{ bottom: "31%", left: "5%" }}>방어율무시</StatItem>
          <StatItem style={{ top: "30%", left: "1%" }}>
            크리티컬 데미지
          </StatItem>
        </RaiderExternalStat>
        <RaiderInnerStatWrap>
          {Array.isArray(Data?.union_inner_stat) &&
            Data.union_inner_stat.map((stat, index) => (
              <UnionRaiderPosition key={index} $position={positions[index]}>
                {stat.stat_field_effect.replace("유니온 ", "")}
              </UnionRaiderPosition>
            ))}
        </RaiderInnerStatWrap>
      </Container>
      <PresetBtnContainer>
        <BtnWrap>
          {PRESETS.map((presetId) => {
            const num = presetId.split("_")[1];
            const presetData = Data?.[`union_raider_preset_${num}`];

            return presetData ? (
              <PresetButton
                key={presetId}
                $isActive={selectedPreset === presetId}
                onClick={() => setSelectedPreset(presetId)}
              >
                {num}
              </PresetButton>
            ) : null;
          })}
        </BtnWrap>

        {currentPreset === selectedPreset && (
          <PresetApplyText>현재 적용중인 프리셋이에요!</PresetApplyText>
        )}
      </PresetBtnContainer>
    </>
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
`;

const RaiderExternalStat = styled.div`
  font-size: 13px;
`;

const UnionRaiderPosition = styled.div`
  position: absolute;
  left: ${(props) => `${props.$position.default.left}px`};
  top: ${(props) => `${props.$position.default.top}px`};

  @media screen and (max-width: 576px) {
    left: ${(props) => `${props.$position.mobile.left}px`};
    top: ${(props) => `${props.$position.mobile.top}px`};
    font-size: 10px;
  }
`;

const StatItem = styled.div`
  position: absolute;
`;

const PresetBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PresetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  color: ${(props) =>
    props.$isActive ? colors.main.white0 : colors.main.white2};
  background: ${(props) =>
    props.$isActive ? colors.deepBlue.deepBlue15 : colors.deepBlue.deepBlue8};
  border: 1px solid
    ${(props) =>
      props.$isActive ? colors.main.white1 : colors.deepBlue.deepBlue9};
  &:hover {
    filter: brightness(1.15);
  }
`;

const BtnWrap = styled.div`
  display: flex;
  gap: 7px;
  padding: 10px 5px;
`;

const PresetApplyText = styled.p`
  font-family: maple-light;
  padding-bottom: 5px;
`;
