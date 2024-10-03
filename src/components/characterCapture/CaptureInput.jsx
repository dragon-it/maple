import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import characterCaptureFetch from "../../api/characterCaptureFetch";
import serchIcon from "../../assets/SearchIcon_small.svg";

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
      <InputWrap>
        <NameInput
          type="text"
          placeholder="캐릭터 닉네임을 입력해주세요."
          value={searchValue}
          onChange={handleInputChange}
          maxLength={15}
        />
        <StyledButton>
          <img src={serchIcon} alt="검색" width={20} height={20} />
        </StyledButton>
      </InputWrap>
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
    </Container>
  );
};

const Container = styled.form`
  width: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

const NameInput = styled.input`
  position: relative;
  width: 200px;
  height: 30px;
  padding: 2px 30px 2px 5px;
  border: 1px solid rgb(132, 111, 90);
  border-radius: 8px;
  outline: 2px solid rgb(110, 93, 73);
  background: linear-gradient(0deg, #8b7b6a 25%, rgba(158, 139, 116, 1) 100%);
  color: rgba(255, 255, 255, 0.8);

  &:focus {
    background: linear-gradient(0deg, #a3917d 25%, #b9a388 100%);
    box-shadow: 0 0 3px rgba(235, 136, 112, 0.897);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
    font-size: 13px;
  }
`;

const CheckBox = styled.input`
  display: none;

  &:checked + label::after {
    content: "✔";
    font-size: 20px;
    width: 15px;
    height: 15px;
    position: absolute;
    top: -9px;
    left: 0;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const CheckBoxLabel = styled.label`
  width: 17px;
  height: 17px;
  border: 2px solid rgb(73, 73, 73);
  position: relative;
  border-radius: 5px;
  cursor: pointer;
`;

const FindMainCheckBox = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  padding: 2px 4px;
  border: 1px solid rgb(132, 111, 90);
  border-radius: 5px;
  outline: 2px solid rgb(110, 93, 73);
  background: linear-gradient(0deg, #8b7b6a 25%, rgba(158, 139, 116, 1) 100%);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;

  &:hover {
    background: linear-gradient(0deg, #a3917d 25%, #b9a388 100%);
  }
`;

const InputWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 0px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
`;
