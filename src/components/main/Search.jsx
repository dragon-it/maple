import React, { useState } from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { useNavigate, useLocation } from "react-router-dom";
import serchIcon from "../../assets/icons/searchIcons/SearchIcon_small.svg";

export const Search = ({ error }) => {
  // 검색어 상태 관리
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 검색 함수
  const handleSearch = () => {
    if (!searchValue.trim()) {
      return; // 검색어가 비어있을 경우 아무것도 하지 않음
    }

    const processedSearchValue = searchValue.replace(/\s+/g, ""); // 공백 제거

    if (location.pathname.startsWith("/character-capture")) {
      navigate(
        `/character-capture/${encodeURIComponent(processedSearchValue)}`
      );
    } else {
      navigate(`/user/${encodeURIComponent(processedSearchValue)}`);
    }
  };

  // 폼 제출을 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음
    handleSearch(); // 검색 처리 함수 호출
  };

  // 상태 업데이트 함수
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <InputContainer onSubmit={handleSubmit}>
      <Logo error={error} />
      <InputWrap>
        <StyledInput
          type="text"
          placeholder="캐릭터 닉네임을 입력해주세요"
          value={searchValue}
          onChange={handleInputChange}
          maxLength={15}
        />
        <StyledButton>
          <img src={serchIcon} alt="검색" width={18} height={18} />
        </StyledButton>
      </InputWrap>
    </InputContainer>
  );
};

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 688px;
  width: 90%;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 1px solid rgb(0, 0, 0);
  position: relative;
  box-shadow: 0 10px 12px rgba(0, 0, 0, 0.08);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  }
`;

const StyledInput = styled.input`
  flex: 1;
  height: 38px;
  padding: 0 16px;
  padding-right: 42px;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: rgb(0, 0, 0);

  &::placeholder {
    color: rgb(0, 0, 0);
  }
`;

const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
`;
