import React from "react";
import { loadGuildData } from "../../api/userApi";
import { useLatestQuery } from "../../hooks/useLatestQuery";
import { useParams } from "react-router-dom";
import { Guild } from "../user/Guild";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import loadingImg_light from "../../assets/loading/loading_light.gif";
import loadingImg_dark from "../../assets/loading/loading_dark.gif";
import { useTheme } from "../../context/ThemeProvider";

const fetchGuildDetails = (key, options) => {
  const [guildName, worldName] = JSON.parse(key);
  return loadGuildData(guildName, worldName, options);
};

export const SearchGuildDetail = ({ isGuildDetail }) => {
  const { guildName, worldName } = useParams();
  const { theme } = useTheme();
  const key = guildName && worldName ? JSON.stringify([guildName, worldName]) : null;
  const { result, error } = useLatestQuery(key, fetchGuildDetails);

  if (error) {
    return <div>{error}</div>;
  }

  if (!result) {
    return (
      <LoadingWrap>
        <img
          src={theme === "dark" ? loadingImg_dark : loadingImg_light}
          alt="로딩 중..."
        />
      </LoadingWrap>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`길드 ${guildName}[${worldName}] - 메짱`}</title>
        <meta name="description" content="길드의 정보를 불러오는 기능입니다." />
      </Helmet>
      <Guild result={result} isGuildDetail={isGuildDetail}></Guild>
    </>
  );
};

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
