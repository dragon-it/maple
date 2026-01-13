import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Information from "../components/user/Information";
import { Equipment } from "../components/user/Equipment";
import { Skill } from "../components/user/Skill";
import { useParams } from "react-router-dom";
import UserApi from "../api/userApi";
import loadingImg_light from "../assets/loading/loading_light.gif";
import loadingImg_dark from "../assets/loading/loading_dark.gif";
import { Error } from "./Error";
import { Union } from "../components/user/Union";
import { Guild } from "../components/user/Guild";
import { useTheme } from "../context/ThemeProvider";
import { Helmet } from "react-helmet-async";
import { formatPowerStat } from "../components/common/powerStat/PowerStat";
import WorldIcons from "../components/common/worldIcon/WorldIcons";
import arrowIcon from "../assets/icons/etc/arrow_icon.svg";

export const User = () => {
  const { theme } = useTheme();
  const { characterName } = useParams();
  const [isSubHeaderCollapsed, setIsSubHeaderCollapsed] = useState(false);
  const [isCompactHeader, setIsCompactHeader] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guildLoading, setGuildLoading] = useState(true);
  const [error, setError] = useState(null);
  const basicInfo = result?.getCombinedData?.getBasicInformation || {};
  const statInfo = result?.getCombinedData?.getCharacterStat || {};
  const combatStat = statInfo?.final_stat?.[42];
  const combatValue = combatStat?.stat_value;
  const characterNameText = basicInfo.character_name || characterName || "-";
  const characterLevel = basicInfo.character_level;
  const characterImage = basicInfo.character_image;
  const powerText =
    combatValue === null || combatValue === undefined
      ? "-"
      : formatPowerStat(Number(combatValue));
  const nameInitial =
    typeof characterNameText === "string" && characterNameText.length > 0
      ? characterNameText.slice(0, 1)
      : "?";
  const worldName = basicInfo.world_name;
  const worldIcon = worldName ? WorldIcons[worldName] : null;
  const liberation = basicInfo.liberation_quest_clear;
  const liberationLabelMap = {
    0: "제네시스 무기 미해방",
    1: "제네시스 무기 해방",
    2: "데스티니 무기 1차 해방",
    3: "데스티니 무기 2차 해방",
  };
  const liberationLabel = liberationLabelMap[liberation] ?? "-";

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      setLoading(true);
      setError(null);
      setActiveTab(1);
      setResult(null);
      setGuildLoading(true);
      await UserApi(
        characterName,
        setResult,
        setLoading,
        setError,
        setGuildLoading
      );
      setLoading(false);
    };

    fetchDataAndUpdateState();
  }, [characterName]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const compact = window.innerWidth <= 1024;
      setIsCompactHeader(compact);
      if (!compact) {
        setIsSubHeaderCollapsed(false);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const value = window.innerWidth <= 576 ? "65px" : "0px";
      document.documentElement.style.setProperty("--footer-safe-area", value);
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--footer-safe-area");
    };
  }, []);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      <Helmet>
        <title>{`${characterName} - 캐릭터 검색`}</title>
        <meta
          name="description"
          content="캐릭터 정보를 확인하는 페이지입니다."
        />
      </Helmet>
      {error ? (
        <ErrorWrap>
          <Error
            error={error}
            errorMessage="존재하지 않는 캐릭터 명이거나 오랫동안 접속하지 않은 캐릭터입니다."
          />
        </ErrorWrap>
      ) : (
        <UserLayout>
          <SubHeader>
            <SummaryRow $collapsed={isSubHeaderCollapsed}>
              <Avatar>
                {characterImage ? (
                  <img src={characterImage} alt="캐릭터 이미지" />
                ) : (
                  <AvatarFallback>{nameInitial}</AvatarFallback>
                )}
              </Avatar>
              <SummaryText>
                <SummaryName>{characterNameText}</SummaryName>
                <SummaryMeta>
                  {characterLevel ? `Lv.${characterLevel}` : "Lv.-"}
                </SummaryMeta>
              </SummaryText>
              <SummaryMetrics>
                <SummaryPower>
                  <PowerValue>{powerText}</PowerValue>
                </SummaryPower>
                <SummaryWorld>
                  {worldIcon && (
                    <WorldIconImg src={worldIcon} alt={`${worldName} 아이콘`} />
                  )}
                  <WorldName>{worldName ?? "-"}</WorldName>
                </SummaryWorld>
                <SummaryLiberation>{liberationLabel}</SummaryLiberation>
              </SummaryMetrics>
            </SummaryRow>
            {isCompactHeader && (
              <SubHeaderToggle
                type="button"
                onClick={() => setIsSubHeaderCollapsed((prev) => !prev)}
                aria-expanded={!isSubHeaderCollapsed}
              >
                <ToggleIcon
                  src={arrowIcon}
                  alt="서브 헤더 토글"
                  $collapsed={isSubHeaderCollapsed}
                />
              </SubHeaderToggle>
            )}
            <TabRow>
              <TabButton
                type="button"
                onClick={() => handleTabClick(1)}
                $activeTab={activeTab === 1}
              >
                <TabIcon $activeTab={activeTab === 1}>I</TabIcon>
                캐릭터 정보
              </TabButton>
              <TabButton
                type="button"
                onClick={() => handleTabClick(2)}
                $activeTab={activeTab === 2}
              >
                <TabIcon $activeTab={activeTab === 2}>EQ</TabIcon>
                장비
              </TabButton>
              <TabButton
                type="button"
                onClick={() => handleTabClick(3)}
                $activeTab={activeTab === 3}
              >
                <TabIcon $activeTab={activeTab === 3}>SK</TabIcon>
                스킬
              </TabButton>
              <TabButton
                type="button"
                onClick={() => handleTabClick(4)}
                $activeTab={activeTab === 4}
              >
                <TabIcon $activeTab={activeTab === 4}>UN</TabIcon>
                유니온
              </TabButton>
              <TabButton
                type="button"
                onClick={() => handleTabClick(5)}
                $activeTab={activeTab === 5}
              >
                <TabIcon $activeTab={activeTab === 5}>GD</TabIcon>
                길드
              </TabButton>
            </TabRow>
          </SubHeader>

          <ContentWrap>
            <Container $activeTab={activeTab}>
              {activeTab === 1 && (
                <Information result={result} loading={loading} />
              )}
              {activeTab === 2 && <Equipment result={result} />}
              {activeTab === 3 && <Skill result={result} />}
              {activeTab === 4 && <Union result={result} />}
              {activeTab === 5 &&
                (guildLoading ? (
                  <GuildLoading>
                    <img
                      src={
                        theme === "dark" ? loadingImg_dark : loadingImg_light
                      }
                      alt="로딩 중..."
                    />
                  </GuildLoading>
                ) : (
                  <Guild result={result} />
                ))}
            </Container>
          </ContentWrap>
          <MobileTabBar>
            <MobileTabs>
              <MobileTabButton
                type="button"
                onClick={() => handleTabClick(1)}
                $activeTab={activeTab === 1}
              >
                <TabIcon $activeTab={activeTab === 1}>I</TabIcon>
                캐릭터 정보
              </MobileTabButton>
              <MobileTabButton
                type="button"
                onClick={() => handleTabClick(2)}
                $activeTab={activeTab === 2}
              >
                <TabIcon $activeTab={activeTab === 2}>EQ</TabIcon>
                장비
              </MobileTabButton>
              <MobileTabButton
                type="button"
                onClick={() => handleTabClick(3)}
                $activeTab={activeTab === 3}
              >
                <TabIcon $activeTab={activeTab === 3}>SK</TabIcon>
                스킬
              </MobileTabButton>
              <MobileTabButton
                type="button"
                onClick={() => handleTabClick(4)}
                $activeTab={activeTab === 4}
              >
                <TabIcon $activeTab={activeTab === 4}>UN</TabIcon>
                유니온
              </MobileTabButton>
              <MobileTabButton
                type="button"
                onClick={() => handleTabClick(5)}
                $activeTab={activeTab === 5}
              >
                <TabIcon $activeTab={activeTab === 5}>GD</TabIcon>
                길드
              </MobileTabButton>
            </MobileTabs>
          </MobileTabBar>
        </UserLayout>
      )}
    </>
  );
};

const UserLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SubHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 900;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 3px 12px;
  width: min(100%, 920px);
  border-radius: 0px 0px 12px 12px;
  border-top: none;
  background: rgba(15, 20, 26, 0.6);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(12px);
`;

const SummaryRow = styled.div`
  display: ${({ $collapsed }) => ($collapsed ? "none" : "flex")};
  align-items: center;
  gap: 7px;

  @media screen and (max-width: 576px) {
    justify-content: center;
  }
`;

const SubHeaderToggle = styled.button`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }
`;

const ToggleIcon = styled.img`
  width: 14px;
  height: 14px;
  transform: ${({ $collapsed }) =>
    $collapsed ? "rotate(90deg)" : "rotate(-90deg)"};
  transition: transform 0.2s ease;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 45px;
    height: 45px;
    object-fit: none;
    image-rendering: pixelated;
    transform: translate(-6%, -10%) scaleX(-1);
  }
`;

const AvatarFallback = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
`;

const SummaryText = styled.div`
  display: flex;
  align-items: baseline;
  gap: 3px;
  color: #eef6ff;
`;

const SummaryName = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const SummaryMeta = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

const SummaryMetrics = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media screen and (max-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    gap: 4px;
  }
`;

const SummaryPower = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const PowerValue = styled.span`
  font-size: 12px;
  color: #fffbdf;
  font-weight: 600;
`;

const SummaryWorld = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const WorldIconImg = styled.img`
  width: 14px;
  height: 14px;
`;

const WorldName = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
`;

const SummaryLiberation = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  padding: 4px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const TabRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1 1 0;
  justify-content: space-between;

  @media screen and (max-width: 576px) {
    display: none;
  }
`;

const TabButton = styled.button`
  cursor: pointer;
  flex: 1 1 0;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid
    ${({ $activeTab }) =>
      $activeTab ? "rgba(255, 255, 255, 0.35)" : "transparent"};
  background-color: ${({ theme, $activeTab }) =>
    $activeTab ? theme.tabActiveColor : "rgba(255, 255, 255, 0.08)"};
  color: ${({ theme, $activeTab }) =>
    $activeTab ? theme.tabActiveTextColor : "rgba(255, 255, 255, 0.8)"};
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: ${({ theme, $activeTab }) =>
      $activeTab ? theme.tabActiveColor : theme.tabHoverColor};
  }
`;

const TabIcon = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  color: ${({ $activeTab }) =>
    $activeTab ? "rgba(20, 24, 30, 0.9)" : "rgba(255, 255, 255, 0.85)"};
  background: ${({ $activeTab }) =>
    $activeTab ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.18)"};
  border: 1px solid rgba(255, 255, 255, 0.35);
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 576px) {
    padding-bottom: 76px;
  }
`;

const MobileTabBar = styled.div`
  display: none;

  @media screen and (max-width: 576px) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 130;
    display: flex;
    justify-content: center;
    padding: 1px 10px 12px;
    background: rgba(15, 20, 26, 0.7);
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 -6px 16px rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(10px);
    border-top: none;
  }
`;

const MobileTabs = styled.div`
  width: min(100%, 520px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
`;

const MobileTabButton = styled.button`
  cursor: pointer;
  padding: 6px 4px;
  border-radius: 0px 0px 12px 12px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: 1px solid
    ${({ $activeTab }) =>
      $activeTab ? "rgba(255, 255, 255, 0.35)" : "transparent"};
  background-color: ${({ theme, $activeTab }) =>
    $activeTab ? theme.tabActiveColor : "rgba(255, 255, 255, 0.08)"};
  color: ${({ theme, $activeTab }) =>
    $activeTab ? theme.tabActiveTextColor : "rgba(255, 255, 255, 0.8)"};
  transition: background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
`;

const Container = styled.div`
  position: relative;
  width: ${({ $activeTab }) =>
    $activeTab === 3 ? "940px" : $activeTab === 5 ? "940px" : "fit-content"};
  height: fit-content;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  margin: 10px 0px;
  font-family: "맑은 고딕", var(--global-font-stack);

  @media screen and (max-width: 1024px) {
    min-width: ${({ $activeTab }) => ($activeTab === 5 ? "75%" : "0")};
    width: ${({ $activeTab }) => ($activeTab === 3 ? "95%" : "fit-content")};
  }

  @media screen and (max-width: 576px) {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  border: 1px solid rgba(158, 206, 230, 0.32);
  outline: 1px solid rgba(54, 96, 124, 0.5);
  padding: 7px;
  background: transparent;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(7px);
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
  }
`;

const GuildLoading = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  margin-bottom: 10px;

  img {
    width: 100px;
  }

  @media screen and (max-width: 1024px) {
    img {
      width: 160px;
    }
  }

  @media screen and (max-width: 576px) {
    img {
      width: 130px;
    }
  }
`;

const ErrorWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
