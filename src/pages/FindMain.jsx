import React, { useEffect, useState } from "react";
import { FindRenderingBox } from "../components/findCharacter/FindRenderingBox";
import { FindInput } from "../components/findCharacter/FindInput";
import styled from "styled-components";
import { useTheme } from "../context/ThemeProvider";
import { useParams } from "react-router-dom";
import FindCharacterFetch from "../api/findCharacterFetch";
import loadingImg_light from "../assets/loading/loading_light.gif";
import loadingImg_dark from "../assets/loading/loading_dark.gif";
import { Error } from "./Error";

export const FindMain = () => {
  const { theme } = useTheme();
  const { characterName } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!characterName) return;

    const fetchDataAndUpdateState = async () => {
      setLoading(true);
      setError(null);
      await FindCharacterFetch(characterName, setResult, setLoading, setError);
      setLoading(false);
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
          <Error
            error={error}
            errorMessage="존재하지 않는 캐릭터 명이거나 오랫동안 접속하지 않은 캐릭터입니다."
          />
        </ErrorWrap>
      ) : (
        <>
          <Container>
            <HeaderWrap>
              <FindInput></FindInput>
              {!loading && result && (
                <FindRenderingBox result={result}>
                  {JSON.stringify(result)}
                </FindRenderingBox>
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
  padding: 0 10px;
`;

const HeaderWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
