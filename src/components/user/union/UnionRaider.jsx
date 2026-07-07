import React, { useMemo } from "react";
import styled from "styled-components";
import colors from "../../common/color/colors";
import {
  getSafePresetNo,
  findSelectedPreset,
  buildStatRows,
} from "./unionRaiderUtils";

export const UnionRaider = ({ Data, selectedPresetNo, setSelectedPresetNo }) => {
  const presets = Data?.union_state_stat_preset;

  // 파편화되어 있던 useMemo들을 하나로 병합
  const statRows = useMemo(() => {
    const selectedPreset = findSelectedPreset(presets, selectedPresetNo);
    const selectedUnionStateStat = Array.isArray(selectedPreset?.union_state_stat)
      ? selectedPreset.union_state_stat
      : [];

    return buildStatRows(selectedUnionStateStat);
  }, [presets, selectedPresetNo]);

  // 현재 프리셋에서 이미 사용한 포인트 총합
  const usedPoint = statRows.reduce((total, stat) => total + stat.point, 0);

  // API의 union_max_point는 최대 포인트이므로 숫자로 변환해서 사용
  const maxPoint = Number(Data?.union_max_point ?? 0);

  // 남은 포인트는 최대 포인트에서 사용 포인트를 뺀 값이고, 음수는 0으로 고정
  const remainingPoint = Math.max(maxPoint - usedPoint, 0);

  // 버튼은 API에 내려온 프리셋만 보여주기 위해 배열 여부를 확인
  const presetButtons = Array.isArray(presets) ? presets : [];

  return (
    <Container>
      {/* 최대 포인트와 남은 포인트를 "남은 포인트 / 최대 포인트" 형태로 보여줌*/}
      <Header>
        <PointText>
          POINT{" "}
          <PointValue>
            {remainingPoint} / {maxPoint}
          </PointValue>
        </PointText>

        {/* 프리셋 버튼은 union_state_stat_preset 배열의 preset_no를 기준 */}
        <PresetWrap>
          <PresetLabel>PRESETS</PresetLabel>
          {presetButtons.map((preset) => {
            // 버튼마다 사용할 프리셋 번호를 숫자로 변환
            const presetNo = Number(preset.preset_no);
            // 현재 선택된 프리셋인지 여부를 aria-pressed로도 표현
            const isSelected = selectedPresetNo === presetNo;
            // API 기준으로 현재 적용중인 프리셋인지 확인
            const isApplied = presetNo === getSafePresetNo(Data?.use_preset_no);

            return (
              <PresetButton
                aria-label={`${presetNo}번 프리셋${isApplied ? " 적용중" : ""}`}
                aria-pressed={isSelected}
                key={presetNo}
                onClick={() => setSelectedPresetNo(presetNo)}
                type="button"
                $isApplied={isApplied}
                $isSelected={isSelected}
              >
                {presetNo}
              </PresetButton>
            );
          })}
        </PresetWrap>
      </Header>



      {/* 16개 스텟은 하나도 찍히지 않은 항목도 항상 출력 */}
      <StatSection>
        <StatGrid>
          {statRows.map((stat) => (
            <StatCard key={stat.key} $hasPoint={stat.point > 0}>
              <StatPoint>
                {stat.point} / {stat.maxPoint}
              </StatPoint>
              <StatLabel $isOuter={stat.maxPoint === 40}>{stat.label}</StatLabel>
              <StatValue>{stat.displayValue}</StatValue>
            </StatCard>
          ))}
        </StatGrid>
      </StatSection>
    </Container>
  );
};
const Container = styled.section`
  width: min(940px, 100%);
  padding: 12px;
  color: ${colors.main.white0};
  background: radial-gradient(circle at 50% 242%, #3d87a9 38%, #23292E 64%);
  border: 1px solid rgb(200, 169, 129);
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;

  @media screen and (max-width: 576px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const PointText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
  color: rgb(215, 228, 234);
  font-size: 15px;
  font-weight: 700;
`;

const PointValue = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 94px;
  height: 28px;
  padding: 0 14px;
  color: ${colors.main.white0};
  background: rgba(43, 50, 59, 1);
  border: 1px solid rgb(58, 82, 96);
  border-radius: 999px;

`;

const PresetWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PresetLabel = styled.span`
  margin-right: 4px;
  color: rgb(215, 228, 234);
  font-size: 12px;
  font-weight: 700;
`;

const PresetButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  color: ${(props) =>
    props.$isSelected ? colors.main.white0 : "rgb(181, 197, 205)"};
  font-weight: 700;
  line-height: 1;
  background: ${(props) =>
    props.$isSelected
      ? "linear-gradient(180deg, rgb(142, 200, 68), rgb(81, 141, 35))"
      : "linear-gradient(180deg, rgb(66, 82, 92), rgb(39, 52, 61))"};
  border: 1px solid
    ${(props) => (props.$isApplied ? "rgb(232, 245, 126)" : "rgb(76, 99, 111)")};
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.$isSelected ? "0 0 0 1px rgba(255, 255, 255, 0.45)" : "none"};

  &:hover {
    filter: brightness(1.12);
  }
`;


const StatSection = styled.section``;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 9px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.article`
  min-height: 86px;
  padding: 6px 6px 8px;
  text-align: center;
  background: radial-gradient(circle at 50% 327%, #3d87a9 49%, rgb(46, 55, 64) 82%), linear-gradient(180deg, #252B31 0%, rgb(28, 52, 66) 100%);
  border: 1px solid
    ${(props) => (props.$hasPoint ? "rgb(210, 169, 108)" : "#405562")};
  outline: 1px solid rgb(36, 43, 51);
  border-radius: 12px;
  box-shadow: 0 3px 0 rgb(37, 49, 57);
`;

const StatPoint = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  height: 20px;
  margin-bottom: 6px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 700;
  background: rgb(42, 50, 59);

  border-bottom: 1px solid rgb(77, 101, 117);
  border-radius: 999px;

`;

const StatLabel = styled.strong`
  display: block;
  min-height: 20px;
  color: ${(props) => (props.$isOuter ? "rgb(235, 210, 171)" : "rgb(215, 228, 234)")};
  font-size: 14px;
  font-weight: 700;
`;

const StatValue = styled.div`
  margin-top: 4px;
  color: ${colors.main.white0};
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.35);
`;
