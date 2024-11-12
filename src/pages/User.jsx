import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search } from "../components/main/Search";
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

export const User = () => {
  const { theme } = useTheme();
  const { characterName } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [guildLoading, setGuildLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      setLoading(true);
      setError(null);
      setActiveTab(1);
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

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      {loading ? (
        <LoadingWrap>
          <img
            src={theme === "dark" ? loadingImg_dark : loadingImg_light}
            alt="로딩 중..."
          />
        </LoadingWrap>
      ) : error ? (
        <ErrorWrap>
          <Error
            error={error}
            errorMessage="존재하지 않는 캐릭터 명이거나 오랫동안 접속하지 않은 캐릭터입니다."
          />
        </ErrorWrap>
      ) : (
        <Container>
          <HeaderWrap>
            <Tabs>
              <Tab onClick={() => handleTabClick(1)} active={activeTab === 1}>
                캐릭터 정보
              </Tab>
              <Tab onClick={() => handleTabClick(2)} active={activeTab === 2}>
                캐릭터 장비
              </Tab>
              <Tab onClick={() => handleTabClick(3)} active={activeTab === 3}>
                스킬
              </Tab>
              <Tab onClick={() => handleTabClick(4)} active={activeTab === 4}>
                유니온
              </Tab>
              <Tab onClick={() => handleTabClick(5)} active={activeTab === 5}>
                길드
              </Tab>
            </Tabs>
            <SearchWrap>
              <Search />
            </SearchWrap>
          </HeaderWrap>

          {/* 캐릭터 정보 */}
          {activeTab === 1 && <Information result={result} />}
          {activeTab === 2 && <Equipment result={result} />}
          {activeTab === 3 && <Skill result={result} />}
          {activeTab === 4 && <Union result={result} />}
          {/* 길드 정보 */}
          {activeTab === 5 &&
            (guildLoading ? (
              <GuildLoading>
                <img
                  src={theme === "dark" ? loadingImg_dark : loadingImg_light}
                  alt="로딩 중..."
                />
              </GuildLoading>
            ) : (
              <Guild result={result} />
            ))}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: auto;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bgColor};
  z-index: 99;
  margin-top: 10px;

  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    width: 90%;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 10px;
`;

const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    position: absolute;
    top: -87px;
    left: 0;
    width: 100%;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 576px) {
  }
`;

const Tabs = styled.div`
  display: flex;
  padding: 10px 0;
  white-space: nowrap;
  font-family: maple-light;
`;

const Tab = styled.div`
  cursor: pointer;
  padding: 10px 8px;
  margin: 0 5px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  background-color: ${({ theme, active }) =>
    active ? theme.tabActiveColor : "transparent"};
  color: ${({ theme, active }) =>
    active ? theme.tabActiveTextColor : theme.tabColor};

  &:hover {
    background-color: ${({ theme, active }) =>
      active ? "transparents" : theme.tabHoverColor};
  }

  @media screen and (max-width: 576px) {
    font-size: 13px;
  }
`;

const LoadingWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 999;

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

const GuildLoading = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
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
