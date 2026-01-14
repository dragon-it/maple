import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import serchIcon from "../../assets/icons/searchIcons/SearchIcon_small.svg";

export const Search = ({ variant = "page", compact = false }) => {
  // 검색어 상태 관리
  const [searchValue, setSearchValue] = useState("");
  const [hidePlaceholder, setHidePlaceholder] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const shouldAutoFocus =
    variant === "page" && location.pathname === "/" && !isMobile;
  const basePlaceholder = "캐릭터 닉네임을 입력해주세요";
  const placeholderText = hidePlaceholder ? "" : basePlaceholder;

  useEffect(() => {
    if (shouldAutoFocus) {
      inputRef.current?.focus();
    }
  }, [shouldAutoFocus]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      if (typeof window.matchMedia === "function") {
        setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
        return;
      }
      setIsMobile(window.innerWidth <= 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!compact) {
      setHidePlaceholder(false);
      return;
    }

    const inputEl = inputRef.current;
    if (!inputEl) return;

    const update = () => {
      const width = inputEl.offsetWidth;
      setHidePlaceholder(width > 0 && width < 240);
    };

    update();
    window.addEventListener("resize", update);

    let observer;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update);
      observer.observe(inputEl);
    }

    return () => {
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, [compact]);

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
      if (location.pathname.startsWith("/user")) {
        setSearchValue("");
      }
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
    <InputContainer
      onSubmit={handleSubmit}
      $variant={variant}
      $compact={compact}
    >
      <InputWrap $variant={variant} $compact={compact}>
        <StyledInput
          ref={inputRef}
          type="text"
          placeholder={placeholderText}
          value={searchValue}
          onChange={handleInputChange}
          maxLength={15}
          autoFocus={shouldAutoFocus}
        />
        <StyledButton type="submit" $variant={variant}>
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

  ${({ $variant, $compact }) =>
    $variant === "header" &&
    css`
      width: 100%;
      min-width: 220px;
      justify-content: flex-start;
      margin-right: 10px;

      ${$compact &&
      css`
        min-width: 0;
        margin-right: 0;
      `}
    `}
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 688px;
  width: 87%;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 2px solid rgb(0, 0, 0);
  position: relative;
  box-shadow: 0 10px 12px rgba(0, 0, 0, 0.08);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  }

  ${({ $variant, $compact }) =>
    $variant === "header" &&
    css`
      margin: 0;
      width: 100%;
      max-width: 320px;
      min-width: 290px;
      height: 36px;
      border-radius: 10px;
      border-width: 1px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: none;

      ${$compact &&
      css`
        min-width: 0;
        max-width: 240px;
      `}
    `}
`;

const StyledInput = styled.input`
  flex: 1;
  height: 38px;
  padding: 0 16px;

  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: rgb(0, 0, 0);

  &::placeholder {
    color: rgb(0, 0, 0);
  }

  ${({ $variant, $compact }) =>
    $variant === "header" &&
    css`
      font-size: 13px;
      height: 100%;
      padding-right: 40px;
    `}
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

  ${({ $variant, $compact }) =>
    $variant === "header" &&
    css`
      right: 6px;
      width: 28px;
      height: 28px;
    `}
`;
