import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import npc from "../../assets/npc/npc_fish.png";
import characterCaptureFetch from "../../api/characterCaptureFetch";

export const CaptureInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isMainCharacterSearch, setIsMainCharacterSearch] = useState(false); // 체크박스 상태
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    const processedSearchValue = searchValue.replace(/\s+/g, "");

    if (isMainCharacterSearch) {
      // 본캐 찾기 로직
      try {
        const result = await characterCaptureFetch(processedSearchValue);
        const mainCharacterName =
          result?.getCombinedData?.getUnionRanking?.ranking[0]?.character_name;

        if (mainCharacterName) {
          // 본캐 찾으면 해당 본캐의 URL로 리다이렉트
          navigate(
            `/character-capture/${encodeURIComponent(mainCharacterName)}`
          );
        } else {
          alert("본캐 정보를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("본캐 찾기 중 오류 발생:", error);
      }
    } else {
      // 캐릭터 캡처 로직
      navigate(
        `/character-capture/${encodeURIComponent(processedSearchValue)}`
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsMainCharacterSearch(!isMainCharacterSearch); // 체크박스 상태 토글
  };
  return (
    <Container onSubmit={handleSubmit}>
      <Npc src={npc} alt="돌정령"></Npc>
      <label>
        <input
          type="checkbox"
          checked={isMainCharacterSearch}
          onChange={handleCheckboxChange}
        />
        본캐 찾기
      </label>
      <NameInput
        type="text"
        placeholder="캐릭터 닉네임을 입력해주세요."
        value={searchValue}
        onChange={handleInputChange}
        maxLength={15}
      />
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const NameInput = styled.input`
  position: relative;
  width: 220px;
  height: 30px;
  padding: 2px 10px;
  border: 2px solid rgba(0, 0, 0, 0.9);
  border-radius: 7px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.4);

  &:focus {
    border-color: rgba(255, 51, 0, 0.9);
    box-shadow: 0 0 10px rgba(255, 51, 0, 0.5);
  }

  &:focus + button {
    color: rgba(255, 51, 0, 0.9);
  }
`;

const Npc = styled.img`
  width: 207px;
  height: auto;
  transform: scaleX(-1);
`;
