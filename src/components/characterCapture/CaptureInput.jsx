import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import npc from "../../assets/npc/npc_fish.png";
import characterCaptureFetch from "../../api/characterCaptureFetch";

export const CaptureInput = ({ setResult, setError }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isMainCharacterSearch, setIsMainCharacterSearch] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    const processedSearchValue = searchValue.replace(/\s+/g, "");

    try {
      const result = await characterCaptureFetch(
        processedSearchValue,
        setResult
      );
      const mainCharacterName =
        result?.getCombinedData?.getUnionRanking?.ranking[0]?.character_name;

      const redirectName =
        isMainCharacterSearch && mainCharacterName
          ? mainCharacterName
          : processedSearchValue;

      if (isMainCharacterSearch && !mainCharacterName) {
        setError("유니온 정보가 없어서 본캐를 찾지 못했습니다.");
        navigate(
          `/character-capture/${encodeURIComponent(processedSearchValue)}`
        );
      } else {
        navigate(`/character-capture/${encodeURIComponent(redirectName)}`);
      }
    } catch (error) {
      setError("오류가 발생하였습니다. 닉네임을 확인해주세요.");
      console.error("본캐 찾기 중 오류 발생:", error);
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
    setIsMainCharacterSearch(!isMainCharacterSearch);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Npc src={npc} alt="돌정령"></Npc>
      <FindMainCheckBox>
        <CheckBox
          id="check1"
          type="checkbox"
          checked={isMainCharacterSearch}
          onChange={handleCheckboxChange}
        />
        <CheckBoxLabel htmlFor="check1" />
        본캐 찾기
      </FindMainCheckBox>
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

const CheckBox = styled.input`
  display: none;

  &:checked + label::after {
    content: "✔";
    font-size: 15px;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const CheckBoxLabel = styled.label`
  width: 17px;
  height: 17px;
  border: 2px solid #707070;
  position: relative;
  border-radius: 5px;
`;

const FindMainCheckBox = styled.label`
  display: flex;
  align-items: center;
  align-items: center;
  padding: 2px 4px;
  border: 1px solid rgb(110, 93, 73);
  background: linear-gradient(
    0deg,
    rgba(139, 118, 97, 1) 25%,
    rgba(158, 139, 116, 1) 100%
  );
  border-radius: 5px;
  cursor: pointer;
`;
