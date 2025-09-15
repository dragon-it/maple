import React, { useEffect, useState } from "react";
import {
  getGuildBasicInformation,
  getGuildMembers,
  getGuildRanking,
  getOguildId,
} from "../../api/api";
import { useParams } from "react-router-dom";
import { Guild } from "../user/Guild";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import loadingImg_light from "../../assets/loading/loading_light.gif";
import loadingImg_dark from "../../assets/loading/loading_dark.gif";
import { useTheme } from "../../context/ThemeProvider";

export const SearchGuildDetail = ({ isGuildDetail }) => {
  const { guildName, worldName } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    if ((guildName, worldName)) {
      const fetchGuildDetails = async () => {
        const oguild_id = await getOguildId(guildName, worldName);
        try {
          // 병렬로 길드 정보 및 랭킹 정보 가져오기
          const [guildBasicInformation, guildRankInformation] =
            await Promise.all([
              getGuildBasicInformation(oguild_id.oguild_id),
              getGuildRanking(guildName, worldName),
            ]);

          // 길드 멤버 정보 가져오기
          const { guild_member } = guildBasicInformation;

          let guildMembersData = await getGuildMembers(guild_member);

          // 결과 설정
          setResult({
            guildBasicInformation,
            guildRankInformation,
            guildMembersData,
          });
        } catch (error) {
          console.error("길드 상세 정보를 가져오는 중 오류 발생:", error);
          setError("길드 정보를 가져오는 중 오류가 발생했습니다.");
        }
      };

      fetchGuildDetails();
    }
  }, [guildName, worldName]);

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
