import React, { useEffect, useState } from "react";
import {
  getGuildBasicInformation,
  getGuildMembers,
  getGuildRanking,
  getOguildId,
} from "../../api/api";
import { useParams } from "react-router-dom";
import { Guild } from "../user/Guild";

export const SearchGuildDetail = () => {
  const { guildName, worldName } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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
    return <div>오류: {error}</div>;
  }

  if (!result) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Guild result={result}></Guild>
    </div>
  );
};
