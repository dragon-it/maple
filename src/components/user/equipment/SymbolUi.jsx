import React, { useState, useCallback, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import arcBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arc_EquipBackgrnd.png";
import autBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/aut_EquipBackgrnd.png";
import grandBack from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandaut_EquipBackgrnd.png";
import arcSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arc_EquipSymbol.png";
import arcSymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/arc_EquipSymbolDisabled.png";
import autSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/aut_EquipSymbol.png";
import autSymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/aut_EquipSymbolDisabled.png";
import grandSymbol from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandaut_EquipSymbol.png";
import grandSymbolDisabled from "../../../assets/pages/user/equipment/equipmentUi/symbolUi/grandaut_EquipSymbolDisabled.png";
import colors from "../../common/color/colors";
import symbolDataJs from "./SymbolData";
import { InfoPopup } from "./SymbolPopup";

export const SymbolUi = ({ symbolData }) => {
  const [hoveredKey, setHoveredKey] = useState(null);
  const [clickedKey, setClickedKey] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const isHoverEnabled = useCallback(() => {
    if (typeof window === "undefined") {
      return true;
    }
    return window.innerWidth > 768;
  }, []);

  const openByHover = useCallback(
    (key) => {
      if (!isHoverEnabled()) {
        return;
      }
      setHoveredKey(key);
    },
    [isHoverEnabled]
  );

  const closeHover = useCallback(() => {
    if (!isHoverEnabled()) {
      return;
    }
    setHoveredKey(null);
  }, [isHoverEnabled]);

  const toggleClick = useCallback((key) => {
    setClickedKey((prev) => (prev === key ? null : key));
  }, []);

  const isOpen = useCallback(
    (key) => {
      // PC hover 우선, 모바일 클릭 토글
      return hoveredKey === key || clickedKey === key;
    },
    [hoveredKey, clickedKey]
  );

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const pick = (arr, idx) => (arr && arr[idx] ? arr[idx] : null);
  const list = symbolData?.symbol || [];
  const arcane = list.filter((s) => s.symbol_name.includes("아케인"));
  const authentic = list.filter(
    (s) => s.symbol_name.includes("어센틱") && !s.symbol_name.includes("그란")
  );
  const grand = list.filter((s) => s.symbol_name.includes("그란"));

  const getTotalForce = (symbols) =>
    symbols.reduce((acc, item) => acc + parseInt(item.symbol_force, 10), 0);

  const totalArcaneForce = getTotalForce(arcane);
  const totalAuthenticForce = getTotalForce(authentic);
  const totalGrandAuthenticForce = getTotalForce(grand);

  const getStatObject = (symbols) => {
    const statsObj = {};
    symbols.forEach((item) => {
      const stats = [
        { value: item.symbol_hp, name: "HP" },
        { value: item.symbol_str, name: "STR" },
        { value: item.symbol_dex, name: "DEX" },
        { value: item.symbol_luk, name: "LUK" },
        { value: item.symbol_int, name: "INT" },
        { value: item.symbol_exp_rate, name: "EXP" },
        { value: item.symbol_meso_rate, name: "MESO" },
        { value: item.symbol_drop_rate, name: "DROP" },
      ];
      stats.forEach((stat) => {
        const statValue = parseInt(stat.value, 10) || 0;
        if (statValue > 0) {
          statsObj[stat.name] = (statsObj[stat.name] || 0) + statValue;
        }
      });
    });
    return statsObj;
  };
  const formatNumber = (num) => num?.toLocaleString("ko-KR");

  const arcStatsObject = getStatObject(arcane);
  const autStatsObject = getStatObject(authentic);
  const grandStatsObject = getStatObject(grand);
  const getIcon = (arr, idx) => arr[idx]?.symbol_icon || null;

  const TextArray = {
    display: "flex",
    justifyContent: "space-between",
    width: "90px",
  };

  const TextArrayDisabled = {
    display: "flex",
    justifyContent: "space-between",
    width: "70px",
    marginTop: "30px",
  };

  const getGrowthPct = (s) => {
    const g = parseInt(s?.symbol_growth_count, 10) || 0;
    const r = parseInt(s?.symbol_require_growth_count, 10) || 0;
    if (r <= 0) return 0;
    const pct = Math.round((g / r) * 100);
    return Math.max(0, Math.min(100, pct));
  };

  const REQUIRE_MAP = {
    ...symbolDataJs.arcaneSymbolsRequire,
    ...symbolDataJs.authenticSymbolsRequire,
  };

  const getMaxLevel = (name) => {
    const arr = REQUIRE_MAP[name] || [];
    return arr.length;
  };

  const simulateUpgrades = (symbol) => {
    if (!symbol?.symbol_name) return null;
    const name = symbol.symbol_name;
    const arr = REQUIRE_MAP[name] || [];
    if (arr.length === 0) return null;

    const level = Number(symbol.symbol_level) || 0;
    const growth = Number(symbol.symbol_growth_count) || 0;
    const maxLevel = getMaxLevel(name);
    const nextNeed = level >= maxLevel ? 0 : arr[level - 1];

    let remain = growth;
    let curr = level;
    let ups = 0;

    while (curr < maxLevel && remain >= arr[curr - 1]) {
      remain -= arr[curr - 1];
      curr += 1;
      ups += 1;
    }

    const toMaxTotal = arr.slice(level - 1).reduce((a, b) => a + b, 0);
    const needToMax = toMaxTotal - growth;

    return {
      name,
      level,
      growth,
      nextNeed,
      ups,
      needToMax,
    };
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + 3) % 3);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % 3);
  };

  const handleDragStart = (clientX) => {
    if (!isMobile) return;
    setIsDragging(true);
    setDragStartX(clientX);
    setDragDelta(0);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    setDragDelta(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    const threshold = 50;
    if (dragDelta > threshold) {
      goToPrev();
    } else if (dragDelta < -threshold) {
      goToNext();
    }
    setIsDragging(false);
    setDragDelta(0);
  };

  const renderArcaneSection = () => (
    <Section $bg={arcBack}>
      {arcane.length <= 0 && (
        <ConditionText>
          <p style={{ fontSize: "13px" }}>{`<개방 조건>`}</p>
          <span style={{ color: "rgb(197, 236, 0)" }}>[Lv.200] </span>또 하나의
          힘, 아케인포스
        </ConditionText>
      )}
      <StatBox>
        <ForceText>
          <div style={arcane.length <= 0 ? TextArrayDisabled : TextArray}>
            <span>ARC</span>
            <span>+{totalArcaneForce}</span>
          </div>
        </ForceText>
        <StatText>
          {Object.entries(arcStatsObject).map(([key, value]) => (
            <div key={key} style={TextArray}>
              <span>{key}</span>
              <span>+{key === "HP" ? formatNumber(value) : value}</span>
            </div>
          ))}
        </StatText>
      </StatBox>
      <ArcGrid>
        {Array.from({ length: 6 }).map((_, idx) => {
          const icon = getIcon(arcane, idx);
          const key = `ARC-${idx}`;
          const symbol = pick(arcane, idx);
          const popupData = symbol ? simulateUpgrades(symbol) : null;

          return (
            <Slot
              key={idx}
              onMouseEnter={() => symbol && openByHover(key)}
              onMouseLeave={closeHover}
              onClick={() => symbol && toggleClick(key)}
            >
              <ARCSlotImg
                src={icon ? arcSymbol : arcSymbolDisabled}
                alt="slot"
              />
              <SymbolWrap>
                {icon && <SymbolImg src={icon} alt="symbol" />}
              </SymbolWrap>
              <ARCSymbolInfo>
                {arcane[idx]?.symbol_level && (
                  <p>Lv.{arcane[idx].symbol_level}</p>
                )}
                {arcane[idx] ? (
                  arcane[idx].symbol_level === 20 ? (
                    <MaxLevel>
                      <span>MAX</span>
                    </MaxLevel>
                  ) : (
                    <ArcGaugeWrap>
                      <GaugeFill $pct={getGrowthPct(arcane[idx])} />
                    </ArcGaugeWrap>
                  )
                ) : null}
              </ARCSymbolInfo>

              {isOpen(key) && popupData && (
                <InfoPopup data={popupData} compact />
              )}
            </Slot>
          );
        })}
      </ArcGrid>
    </Section>
  );

  const renderAuthenticSection = () => (
    <Section $bg={autBack}>
      {authentic.length <= 0 && (
        <ConditionText>
          <p style={{ fontSize: "13px" }}>{`<개방 조건>`}</p>
          <span style={{ color: "rgb(197, 236, 0)" }}>[Lv.260] </span>또 하나의
          힘, 어센틱포스
        </ConditionText>
      )}

      <StatBox>
        <ForceText>
          <div style={authentic.length <= 0 ? TextArrayDisabled : TextArray}>
            <span>AUT</span>
            <span>+{totalAuthenticForce}</span>
          </div>
        </ForceText>
        <StatText>
          {Object.entries(autStatsObject).map(([key, value]) => (
            <div key={key} style={TextArray}>
              <span>{key}</span>
              <span>+{key === "HP" ? formatNumber(value) : value}</span>
            </div>
          ))}
        </StatText>
      </StatBox>

      <AutGrid>
        {Array.from({ length: 6 }).map((_, idx) => {
          const icon = getIcon(authentic, idx);
          const key = `AUT-${idx}`;
          const symbol = pick(authentic, idx);
          const popupData = symbol ? simulateUpgrades(symbol) : null;

          return (
            <Slot
              key={idx}
              onMouseEnter={() => symbol && openByHover(key)}
              onMouseLeave={closeHover}
              onClick={() => symbol && toggleClick(key)}
            >
              <AUTSlotImg
                src={icon ? autSymbol : autSymbolDisabled}
                alt="slot"
              />
              <AUTSymbolWrap>
                {icon && <SymbolImg src={icon} alt="symbol" />}
              </AUTSymbolWrap>
              <AUTSymbolInfo>
                {authentic[idx]?.symbol_level && (
                  <p>Lv.{authentic[idx].symbol_level}</p>
                )}
                {authentic[idx] ? (
                  authentic[idx].symbol_level === 11 ? (
                    <MaxLevel>
                      <span>MAX</span>
                    </MaxLevel>
                  ) : (
                    <AutGaugeWrap>
                      <GaugeFill $pct={getGrowthPct(authentic[idx])} />
                    </AutGaugeWrap>
                  )
                ) : null}
              </AUTSymbolInfo>

              {isOpen(key) && popupData && (
                <InfoPopup data={popupData} compact />
              )}
            </Slot>
          );
        })}
      </AutGrid>
    </Section>
  );

  const renderGrandSection = () => (
    <Section $bg={grandBack}>
      {grand.length <= 0 && (
        <ConditionText>
          <p style={{ fontSize: "13px" }}>{`<개방 조건>`}</p>
          <span style={{ color: "rgb(197, 236, 0)" }}>[Lv.290] </span>
          [탈라하트] 새로운 움직임
        </ConditionText>
      )}

      <StatBox>
        <ForceText>
          <div style={grand.length <= 0 ? TextArrayDisabled : TextArray}>
            <span>AUT</span>
            <span>+{totalGrandAuthenticForce}</span>
          </div>
        </ForceText>

        <StatText>
          {Object.entries(grandStatsObject).map(([key, value]) => (
            <div key={key} style={TextArray}>
              <span>{key}</span>
              <span>+{key === "AUT" ? `${value}` : `${value}%`}</span>
            </div>
          ))}
        </StatText>
      </StatBox>

      <GrandGrid>
        {Array.from({ length: 3 }).map((_, idx) => {
          const icon = getIcon(grand, idx);
          const key = `GRAND-${idx}`;
          const symbol = pick(grand, idx);
          const popupData = symbol ? simulateUpgrades(symbol) : null;

          return (
            <Slot
              key={idx}
              onMouseEnter={() => symbol && openByHover(key)}
              onMouseLeave={closeHover}
              onClick={() => symbol && toggleClick(key)}
            >
              <GrandSlotImg
                src={icon ? grandSymbol : grandSymbolDisabled}
                alt="slot"
              />
              <GrandSymbolWrap>
                {icon && <SymbolImg src={icon} alt="symbol" />}
              </GrandSymbolWrap>
              <GrandSymbolInfo>
                {grand[idx]?.symbol_level && (
                  <p>Lv.{grand[idx].symbol_level}</p>
                )}
                {grand[idx] ? (
                  grand[idx].symbol_level === 11 ? (
                    <MaxLevel>
                      <span>MAX</span>
                    </MaxLevel>
                  ) : (
                    <GrandGaugeWrap>
                      <GaugeFill $pct={getGrowthPct(grand[idx])} />
                    </GrandGaugeWrap>
                  )
                ) : null}
              </GrandSymbolInfo>

              {isOpen(key) && popupData && (
                <InfoPopup data={popupData} compact />
              )}
            </Slot>
          );
        })}
      </GrandGrid>
    </Section>
  );

  const sections = [
    renderArcaneSection(),
    renderAuthenticSection(),
    renderGrandSection(),
  ];

  const sliderWidth = sliderRef.current?.offsetWidth || 1;
  const dragProgress =
    isMobile && isDragging ? clamp(dragDelta / sliderWidth, -1, 1) : 0;

  const getSlideStyle = (idx) => {
    if (!isMobile) return {};
    const len = sections.length;
    const rel = (((idx - currentIndex) % len) + len) % len; // 0: current, 1: next, 2: prev
    const base =
      rel === 0
        ? { offset: 0, scale: 1, z: 3, opacity: 1 }
        : rel === 1
        ? { offset: 60, scale: 0.82, z: 2, opacity: 0.85 }
        : { offset: -60, scale: 0.82, z: 2, opacity: 0.85 };

    let { offset, scale, z, opacity } = base;

    if (dragProgress < 0) {
      if (rel === 0) {
        offset += dragProgress * 60;
        scale = 1 - 0.12 * -dragProgress;
        opacity = 1 - 0.12 * -dragProgress;
      } else if (rel === 1) {
        offset += dragProgress * 60;
        scale = base.scale + (1 - base.scale) * -dragProgress;
        opacity = base.opacity + (1 - base.opacity) * -dragProgress;
        z = 4;
      }
    } else if (dragProgress > 0) {
      if (rel === 0) {
        offset += dragProgress * 60;
        scale = 1 - 0.12 * dragProgress;
        opacity = 1 - 0.12 * dragProgress;
      } else if (rel === 2) {
        offset += dragProgress * 60;
        scale = base.scale + (1 - base.scale) * dragProgress;
        opacity = base.opacity + (1 - base.opacity) * dragProgress;
        z = 4;
      }
    }

    return {
      transform: `translateX(calc(-50% + ${offset}%)) scale(${scale})`,
      zIndex: z,
      opacity,
    };
  };

  return (
    <Wrap>
      <SliderContainer
        ref={sliderRef}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <Slides $isMobile={isMobile}>
          {sections.map((section, idx) => (
            <Slide
              key={idx}
              $isMobile={isMobile}
              $isDragging={isDragging}
              style={getSlideStyle(idx)}
            >
              {section}
            </Slide>
          ))}
        </Slides>
        {isMobile && (
          <>
            <SliderButton onClick={goToPrev} $pos="left">
              ‹
            </SliderButton>
            <SliderButton onClick={goToNext} $pos="right">
              ›
            </SliderButton>
          </>
        )}
      </SliderContainer>
    </Wrap>
  );
};

const baseGridStyle = css`
  position: absolute;
  left: 20px;
  right: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 6px;
`;

const baseSymbolWrapStyle = css`
  position: absolute;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const baseSymbolInfo = css`
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  text-shadow: 0 0 2px ${colors.main.dark0};
`;

const SymbolWrap = styled.div`
  ${baseSymbolWrapStyle};
  top: 6px;
  left: 8px;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.main.white0};
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  padding: 0 6px;
`;

const Slides = styled.div`
  display: flex;
  gap: 5px;
  touch-action: pan-y;

  ${(props) =>
    props.$isMobile &&
    `
      position: relative;
      height: 328px;
      display: block;
      gap: 0;
    `}
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  flex: 0 0 auto;

  ${(props) =>
    props.$isMobile
      ? `
    position: absolute;
    top: 0;
    left: 50%;
    padding: 8px 0;
    transition: ${
      props.$isDragging ? "none" : "transform 0.25s ease, opacity 0.25s ease"
    };
  `
      : `
    width: auto;
  `}
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.$pos === "left" ? "left: 8px;" : "right: 8px;")}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const Section = styled.div`
  position: relative;
  width: 208px;
  height: 308px;
  background-image: url(${(props) => props.$bg});
  background-repeat: no-repeat;
  background-size: contain;
  user-select: none;
`;

const StatBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 25px;
  left: 0;
  width: 100%;
  min-height: 70px;
  font-weight: bold;
  line-height: 1.1;
`;

const Slot = styled.div`
  position: relative;
  justify-content: center;
  display: flex;

  &:hover {
    cursor: pointer;
  }
`;

const ForceText = styled.div`
  text-shadow: 1px 1px 2px ${colors.main.dark2};
`;

const StatText = styled.div`
  text-align: center;
  white-space: pre-line;
  text-shadow: 1px 1px 2px ${colors.main.dark2};
`;

const MaxLevel = styled.div`
  text-shadow: 0 0 3px ${colors.main.dark0};
  font-size: 15px;
  padding: 0px 2px;
  font-weight: bold;
  backdrop-filter: blur(10px);
  line-height: 0.8;
  margin-top: 2px;
`;

const SymbolImg = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  object-fit: contain;
  display: block;
  image-rendering: pixelated;
`;

const ConditionText = styled.div`
  position: relative;
  color: ${colors.main.white0};
  text-shadow: 0 0 2px ${colors.main.dark0};
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  white-space: pre;
  top: 24px;
  text-align: center;
  z-index: 2;
`;

const ArcGrid = styled.div`
  position: absolute;
  bottom: 15px;
  left: 18px;
  right: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4px;
  row-gap: 2px;
`;

const ARCSlotImg = styled.img`
  width: 52px;
`;

const ARCSymbolInfo = styled.div`
  ${baseSymbolInfo};
  text-shadow: 0 0 2px ${colors.characterInfo.symbolColor.arcaneMaxStatShadow};
  top: 55px;
`;

const AUTSlotImg = styled.img`
  width: 49px;
`;
const AutGrid = styled.div`
  ${baseGridStyle};
  bottom: 12px;
  row-gap: 3px;
`;

const AUTSymbolWrap = styled.div`
  ${baseSymbolWrapStyle};
  top: 9px;
  left: 5px;
`;

const AUTSymbolInfo = styled.div`
  ${baseSymbolInfo};
  top: 54px;
`;

const GrandSymbolWrap = styled.div`
  ${baseSymbolWrapStyle};
  width: 42px;
  height: 42px;
  top: 9px;
  left: 5px;
`;

const GrandSlotImg = styled.img`
  width: 52px;
`;

const GrandGrid = styled.div`
  ${baseGridStyle};
  bottom: 35px;
`;

const GrandSymbolInfo = styled.div`
  ${baseSymbolInfo};
  top: 55px;
`;

const CommonGaugeWrap = css`
  width: 32px;
  height: 6px;
  border-radius: 999px;
  border: 1px solid ${colors.main.dark0Alpha10};
  margin-top: 5px;
  overflow: hidden;
  backdrop-filter: blur(6px);
  margin-left: 2px;
`;

const ArcGaugeWrap = styled.div`
  ${CommonGaugeWrap}
`;

const GaugeFill = styled.div`
  height: 100%;
  width: ${(p) => `${p.$pct}%`};
  background: ${colors.main.white0};
`;

const AutGaugeWrap = styled.div`
  ${CommonGaugeWrap}
  margin-left: 0px;
`;

const GrandGaugeWrap = styled.div`
  ${CommonGaugeWrap}
  width: 32px;
  margin-top: 6px;
  margin-left: 0px;
`;

export default SymbolUi;
