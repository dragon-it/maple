import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeProvider";
import { useParams } from "react-router-dom";
import loadingImg_light from "../assets/loading/loading_light.gif";
import loadingImg_dark from "../assets/loading/loading_dark.gif";
import { Error } from "./Error";
import characterCaptureFetch from "../api/characterCaptureFetch";
import { CaptureInput } from "../components/characterCapture/CaptureInput";
import { CaptureRenderingBox } from "../components/characterCapture/CaptureRenderingBox";

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
          <Container>
            <HeaderWrap>
              <CaptureInput
                setResult={setResult}
                setError={setError}
              ></CaptureInput>
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
