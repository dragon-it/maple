import React, { useState } from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { useNavigate, useLocation } from "react-router-dom";
import serchIcon_big from "../../assets/SearchIcon_big.svg";
import serchIcon_small from "../../assets/SearchIcon_small.svg";

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

    if (location.pathname.startsWith("/find-main")) {
      navigate(`/find-main/${encodeURIComponent(processedSearchValue)}`);
    } else {
      navigate(`/user/${encodeURIComponent(processedSearchValue)}`);
    }
  };

  // 폼 제출을 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음
    handleSearch(); // 검색 처리 함수 호출
  };

  // 현재 경로가 /user/로 시작하는지 여부 확인
  const isUserRoute = location.pathname.startsWith("/user/");

  // 상태 업데이트 함수
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <InputContainer isUserRoute={isUserRoute} onSubmit={handleSubmit}>
      <Logo error={error} isUserRoute={isUserRoute} />
      <InputWrap>
        <StyledInput
          type="text"
          placeholder="캐릭터 닉네임을 입력해주세요."
          value={searchValue}
          onChange={handleInputChange}
          isUserRoute={isUserRoute}
          maxLength={15}
        />
        <StyledButton isUserRoute={isUserRoute}>
          <img
            src={isUserRoute ? serchIcon_small : serchIcon_big}
            alt="검색"
            width={isUserRoute ? "18" : "23"}
            height={isUserRoute ? "18" : "23"}
          />
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
  gap: 5px;
  z-index: ${({ isUserRoute }) => (isUserRoute ? "1" : "99999")};

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const InputWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled.input`
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

const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  width: ${({ isUserRoute }) => (isUserRoute ? "30px" : "35px")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
`;
