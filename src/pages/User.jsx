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
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>{`${characterName} - 캐릭터 검색`}</title>
        <meta
          name="description"
          content="캐릭터를 이미지로 저장하는 기능입니다."
        />
      </Helmet>
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
        <Container $activeTab={activeTab}>
          <HeaderWrap>
            <Tabs>
              <Tab
                onClick={() => handleTabClick(1)}
                $activeTab={activeTab === 1}
              >
                캐릭터 정보
              </Tab>
              <Tab
                onClick={() => handleTabClick(2)}
                $activeTab={activeTab === 2}
              >
                캐릭터 장비
              </Tab>
              <Tab
                onClick={() => handleTabClick(3)}
                $activeTab={activeTab === 3}
              >
                스킬
              </Tab>
              <Tab
                onClick={() => handleTabClick(4)}
                $activeTab={activeTab === 4}
              >
                유니온
              </Tab>
              <Tab
                onClick={() => handleTabClick(5)}
                $activeTab={activeTab === 5}
              >
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
  height: fit-content;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bgColor};
  z-index: 99;
  margin: 10px 0px;

  @media screen and (max-width: 1024px) {
    margin-top: 90px;
    min-width: ${({ $activeTab }) => ($activeTab === 5 ? "75%" : "0")};
  }

  @media screen and (max-width: 576px) {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 5px;
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
`;

const Tabs = styled.div`
  display: flex;
  padding: 5px 0;
  font-family: maple-light;
  font-size: 12px;
  min-width: 390px;

  @media screen and (max-width: 1024px) {
    min-width: 0px;
  }
`;

const Tab = styled.div`
  cursor: pointer;
  padding: 10px 8px;
  margin: 0 5px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  background-color: ${({ theme, $activeTab }) =>
    $activeTab ? theme.tabActiveColor : "transparent"};
  color: ${({ theme, $activeTab }) =>
    $activeTab ? theme.tabActiveTextColor : theme.tabColor};

  &:hover {
    background-color: ${({ theme, $activeTab }) =>
      $activeTab ? "transparents" : theme.tabHoverColor};
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
  height: 100vh;
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
