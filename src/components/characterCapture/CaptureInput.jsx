import { CHARACTER_NAME_MAX_LENGTH, normalizeCharacterName } from "../../utils/characterName";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import characterCaptureFetch from "../../api/characterCaptureFetch";
import serchIcon from "../../assets/icons/searchIcons/light_mode_icon_search.svg";
import colors from "../common/color/colors";
import { isRequestCanceled } from "../../api/requestCancellation";

export const CaptureInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isMainCharacterSearch, setIsMainCharacterSearch] = useState(false);
  const navigate = useNavigate();
  const { pathname, key: locationKey } = useLocation();
  const requestRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    return () => requestRef.current?.abort();
  }, [pathname, locationKey]);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    const processedSearchValue = normalizeCharacterName(searchValue);
    requestRef.current?.abort();
    setError(null);

    // 일반 검색 결과는 URL을 기준으로 조회하는 훅에서만 관리
    if (!isMainCharacterSearch) {
      navigate(
        `/character-capture/${encodeURIComponent(processedSearchValue)}`,
      );
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;

    try {
      const result = await characterCaptureFetch(processedSearchValue, {
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      const mainCharacterName =
        result?.getCombinedData?.getUnionRanking?.ranking?.[0]?.character_name;

      const redirectName =
        isMainCharacterSearch && mainCharacterName
          ? mainCharacterName
          : processedSearchValue;

      if (isMainCharacterSearch && !mainCharacterName) {
        setError("유니온 정보가 없어서 본캐를 찾지 못했습니다.");
        navigate(
          `/character-capture/${encodeURIComponent(processedSearchValue)}`,
        );
      } else {
        navigate(`/character-capture/${encodeURIComponent(redirectName)}`);
      }
    } catch (error) {
      if (controller.signal.aborted || isRequestCanceled(error)) return;
      setError(error.message || "조회에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
      <CaptureHead onClick={() => navigate("/character-capture")}>
        CHARACTER CAPTURE
      </CaptureHead>
      <InputWrap>
        <NameInput
          type="text"
          placeholder="캐릭터 닉네임을 입력해주세요."
          value={searchValue}
          onChange={handleInputChange}
          maxLength={CHARACTER_NAME_MAX_LENGTH}
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
      {error && <div role="alert">{error}</div>}
    </Container>
  );
};

const Container = styled.form`
  width: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const CaptureHead = styled.div`
  width: 100%;
  font-weight: normal;
  margin: 5px 0;
  text-shadow: 0px 0px 4px ${colors.brownScale.darkBrown};
  color: rgb(24, 24, 24);
  font-size: 15px;
  font-weight: bold;
  position: relative;
  padding: 0 10px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
`;

const NameInput = styled.input`
  position: relative;
  max-width: 200px;
  height: 30px;
  padding: 2px 30px 2px 5px;
  border: 1px solid rgb(132, 111, 90);
  border-radius: 8px;
  outline: 2px solid rgb(110, 93, 73);
  background: linear-gradient(
    0deg,
    rgb(139, 123, 106) 25%,
    rgb(158, 139, 116) 100%
  );
  color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

  &:focus {
    background: linear-gradient(
      0deg,
      rgb(163, 145, 125) 25%,
      rgb(185, 163, 136) 100%
    );
    box-shadow: 0 0 10px rgba(235, 136, 112, 0.5);
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
  background: linear-gradient(
    0deg,
    rgb(139, 123, 106) 25%,
    rgb(158, 139, 116) 100%
  );
  color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      0deg,
      rgb(163, 145, 125) 25%,
      rgb(185, 163, 136) 100%
    );
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
