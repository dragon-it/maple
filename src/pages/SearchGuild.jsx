import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeProvider";
import { useParams } from "react-router-dom";
import loadingImg_light from "../assets/loading/loading_light.gif";
import loadingImg_dark from "../assets/loading/loading_dark.gif";
import npc from "../assets/npc/npc_fish.png";
import error_npc from "../assets/npc/npc_fish_error.png";
import characterCaptureFetch from "../api/characterCaptureFetch";
import { NpcChatBox } from "../components/common/npcChat/NpcChatBox";
import { SearchGuildRendering } from "../components/searchGuild/SearchGuildRendering";
import { SearchGuildInput } from "../components/searchGuild/SearchGuildInput";

export const SearchGuild = () => {
  const { theme } = useTheme();
  const { guildName, worldName } = useParams();
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
        await characterCaptureFetch(guildName, worldName, setResult, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndUpdateState();
  }, [guildName, worldName]);

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
        <Container>
          <HeaderWrap>
            <SearchGuildInput setResult={setResult} setError={setError} />
            <NpcWarp>
              <NpcChatBox
                text={error}
                error={error}
                errorMessage={error}
              ></NpcChatBox>
              <Npc src={error_npc} alt="날치" />
              {/* 바다렐이 */}
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
                  <NpcChatBox text={""}></NpcChatBox>
                  <Npc src={npc} alt="날치" />
                  {/* 바다렐이 */}
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

  @media screen and (max-width: 768px) {
    padding: 0 5px;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  padding: 10px 20px 20px 20px;
  background-color: rgba(181, 165, 149, 0.85);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
  border: 1px solid rgb(220, 217, 202);
  outline: 1px solid rgb(146, 139, 102);
  border-radius: 10px;
  z-index: 9999;

  @media screen and (max-width: 576px) {
    padding: 10px 5px 20px 5px;
  }
`;

const NpcWarp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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

const Npc = styled.img`
  transform: scaleX(-1);
`;
