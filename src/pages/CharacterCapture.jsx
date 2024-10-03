import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeProvider";
import { useParams } from "react-router-dom";
import loadingImg_light from "../assets/loading/loading_light.gif";
import loadingImg_dark from "../assets/loading/loading_dark.gif";
import npc from "../assets/npc/npc_fish.png";
import { Error } from "./Error";
import characterCaptureFetch from "../api/characterCaptureFetch";
import { CaptureInput } from "../components/characterCapture/CaptureInput";
import { CaptureRenderingBox } from "../components/characterCapture/CaptureRenderingBox";
import { NpcChatBox } from "../components/common/npcChat/NpcChatBox";

export const CharacterCapture = () => {
  const { theme } = useTheme();
  const { characterName } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setResult(null);
    setLoading(false);
    setError(null);
    if (!characterName) return;

    const fetchDataAndUpdateState = async () => {
      setLoading(true);
      setError(null);

      try {
        await characterCaptureFetch(characterName, setResult, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndUpdateState();
  }, [characterName]);

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
          <Error error={error} errorMessage={error} />
        </ErrorWrap>
      ) : (
        <>
          <Container result={result}>
            <HeaderWrap>
              <CaptureInput setResult={setResult} setError={setError} />

              {!result && (
                <NpcWarp>
                  <NpcChatBox text={"캐릭터 이름을 검색해봐!"}></NpcChatBox>
                  <Npc src={npc} alt="날치" />
                </NpcWarp>
              )}

              {!loading && result && (
                <CaptureRenderingBox result={result}>
                  {JSON.stringify(result)}
                </CaptureRenderingBox>
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
  height: ${({ result }) => (result ? "60%" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    padding: 0 5px;
  }
`;

const HeaderWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const NpcWarp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
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

const ErrorWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Npc = styled.img`
  width: 207px;
  height: auto;
  transform: scaleX(-1);
`;
