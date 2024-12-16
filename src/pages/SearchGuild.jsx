import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeProvider";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import loadingImg_light from "../assets/loading/loading_light.gif";
import loadingImg_dark from "../assets/loading/loading_dark.gif";
import npc from "../assets/npc/npc_oceanleli.png";
import error_npc from "../assets/npc/npc_oceanleli_error.png";
import { NpcChatBox } from "../components/common/npcChat/NpcChatBox";
import { SearchGuildRendering } from "../components/searchGuild/SearchGuildRendering";
import { SearchGuildInput } from "../components/searchGuild/SearchGuildInput";
import SearchGuildFetch from "../api/searchGuildFetch";

export const SearchGuild = () => {
  const { theme } = useTheme();
  const { guildName } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setResult(null);
    setLoading(false);
    setError(null);
    if (!guildName) return;

    const fetchDataAndUpdateState = async () => {
      setLoading(true);
      setError(null);

      try {
        await SearchGuildFetch(guildName, setResult, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndUpdateState();
  }, [guildName]);

  return (
    <>
      <Helmet>
        <title>{`길드 검색 - 메짱`}</title>
        <meta
          name="description"
          content="모든 서버의 길드를 불러오는 기능입니다."
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
        <Container>
          <HeaderWrap>
            <SearchGuildInput setResult={setResult} setError={setError} />
            <NpcWarp>
              <NpcChatBox
                text={error}
                error={error}
                errorMessage={error}
              ></NpcChatBox>
              <Npc src={error_npc} alt="바다렐이" />
            </NpcWarp>
          </HeaderWrap>
        </Container>
      ) : (
        <>
          <Container result={result}>
            <HeaderWrap>
              <SearchGuildInput setResult={setResult} setError={setError} />

              {!result && (
                <NpcWarp>
                  <NpcChatBox
                    text={"모든 월드의 길드를 검색 해줄게."}
                  ></NpcChatBox>
                  <Npc src={npc} alt="바다렐이" />
                </NpcWarp>
              )}

              {!loading && result && (
                <SearchGuildRendering result={result}></SearchGuildRendering>
              )}
            </HeaderWrap>
          </Container>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  min-height: 82vh;

  img {
    image-rendering: pixelated;
  }

  @media screen and (max-width: 768px) {
    padding: 0 5px;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
  gap: 10px;
  background-color: rgba(34, 34, 34, 0.9);
  border: 1px solid rgb(255, 255, 255);
  border-radius: 5px;
  outline: 1px solid rgb(141, 141, 141);
  box-shadow: 0 0px 4px 4px rgba(167, 167, 167, 0.47);

  @media screen and (max-width: 1024px) {
    width: 70%;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

const NpcWarp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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

const Npc = styled.img`
  transform: scaleX(-1);
`;
