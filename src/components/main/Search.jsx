import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import light_search_icon from "../../assets/icons/searchIcons/light_mode_icon_search.svg";
import dark_search_icon from "../../assets/icons/searchIcons/dark_mode_icon_search.svg";
import { useTheme } from "../../context/ThemeProvider";

export const Search = ({ variant = "page", compact = false }) => {
  const [searchValue, setSearchValue] = useState("");
  const [hidePlaceholder, setHidePlaceholder] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const { theme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const isHeaderVariant = variant === "header";
  const isHomePage = location.pathname === "/";
  const useMobileHeaderBehavior = isHeaderVariant && isMobile && !isHomePage;

  const shouldAutoFocus =
    variant === "page" && location.pathname === "/" && !isMobile;
  const shouldFocusInput =
    shouldAutoFocus || (useMobileHeaderBehavior && isMobileExpanded);

  const basePlaceholder = "캐릭터명을 입력해주세요";
  const placeholderText = useMobileHeaderBehavior
    ? ""
    : hidePlaceholder
      ? ""
      : basePlaceholder;

  useEffect(() => {
    if (shouldFocusInput) {
      inputRef.current?.focus();
    }
  }, [shouldFocusInput]);

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
    if (!useMobileHeaderBehavior) {
      setIsMobileExpanded(false);
    }
  }, [useMobileHeaderBehavior]);

  useEffect(() => {
    if (!compact || useMobileHeaderBehavior) {
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
  }, [compact, useMobileHeaderBehavior]);

  const handleSearch = () => {
    if (!searchValue.trim()) {
      return;
    }

    const processedSearchValue = searchValue.replace(/\s+/g, "");

    if (location.pathname.startsWith("/character-capture")) {
      navigate(
        `/character-capture/${encodeURIComponent(processedSearchValue)}`,
      );
    } else {
      navigate(`/user/${encodeURIComponent(processedSearchValue)}`);
      if (location.pathname.startsWith("/user")) {
        setSearchValue("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleMobileButtonClick = (e) => {
    if (!useMobileHeaderBehavior) return;
    if (isMobileExpanded) return;

    e.preventDefault();
    setIsMobileExpanded(true);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleMobileInputBlur = () => {
    if (!useMobileHeaderBehavior) return;
    if (searchValue.trim()) return;

    window.setTimeout(() => {
      setIsMobileExpanded(false);
    }, 120);
  };

  return (
    <InputContainer
      onSubmit={handleSubmit}
      $variant={variant}
      $compact={compact}
      $mobileHeader={useMobileHeaderBehavior}
      $mobileExpanded={isMobileExpanded}
    >
      <InputWrap
        $variant={variant}
        $compact={compact}
        $mobileHeader={useMobileHeaderBehavior}
        $mobileExpanded={isMobileExpanded}
      >
        <StyledInput
          ref={inputRef}
          type="text"
          placeholder={placeholderText}
          value={searchValue}
          onChange={handleInputChange}
          onBlur={handleMobileInputBlur}
          maxLength={15}
          autoFocus={shouldFocusInput}
          $variant={variant}
          $compact={compact}
          $mobileHeader={useMobileHeaderBehavior}
          $mobileExpanded={isMobileExpanded}
        />
        <StyledButton
          type="submit"
          $variant={variant}
          $mobileHeader={useMobileHeaderBehavior}
          $mobileExpanded={isMobileExpanded}
          onClick={handleMobileButtonClick}
        >
          <img
            src={
              isHomePage
                ? light_search_icon
                : !isMobile || isMobileExpanded
                  ? light_search_icon
                  : theme === "dark"
                    ? dark_search_icon
                    : light_search_icon
            }
            alt="검색"
            width={18}
            height={18}
            $mobileExpanded={isMobileExpanded}
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
  max-width: 688px;
  gap: 2px;

  ${({ $variant, $compact, $mobileHeader, $mobileExpanded }) =>
    $variant === "header" &&
    css`
      width: 100%;
      min-width: 220px;
      justify-content: flex-end;
      margin-right: 10px;

      ${$compact &&
      css`
        min-width: 0;
        margin-right: 0;
      `}

      ${$mobileHeader &&
      css`
        min-width: 0;
        margin-right: 0;
        justify-content: flex-end;
        width: ${$mobileExpanded ? "100%" : "auto"};
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

  &:focus-within {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  }

  ${({ $variant, $compact, $mobileHeader, $mobileExpanded }) =>
    $variant === "header" &&
    css`
      margin: 0;
      width: 100%;
      height: 36px;
      transition:
        width 0.28s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      ${$compact &&
      css`
        min-width: 0;
        max-width: 240px;
        border: none;
        border-radius: 10px;
      `}

      ${$mobileHeader &&
      css`
        width: ${$mobileExpanded ? "100%" : "36px"};
        max-width: none;
        transform-origin: right center;
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
  border-radius: 10px;
  font-size: 14px;
  color: rgb(0, 0, 0);

  &::placeholder {
    color: rgb(0, 0, 0);
  }

  ${({ $variant, $mobileHeader, $mobileExpanded }) =>
    $variant === "header" &&
    css`
      font-size: 13px;
      height: 100%;
      padding-right: 40px;
      background-color: #ffffff;

      ${$mobileHeader &&
      css`
        width: ${$mobileExpanded ? "100%" : "0"};
        min-width: 0;
        transition:
          opacity 0.18s ease,
          width 0.28s ease,
          padding 0.28s ease;
        display: ${$mobileExpanded ? "block" : "none"};
      `}
    `}
`;

const StyledButton = styled.button`
  position: absolute;
  width: 36px;
  height: 36px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background: none;
  cursor: pointer;

  ${({ $variant, $mobileHeader, $mobileExpanded }) =>
    $variant === "header" &&
    css`
      z-index: 2;

      ${$mobileHeader &&
      css`
        flex-shrink: 0;
        transform: translateZ(0);
        background-color: ${({ theme }) => theme.headerBgColor};
        border: ${({ theme }) => theme.toggleBorderColor};
        &:hover {
          background-color: ${({ theme }) => theme.headerIconHoverColor};
        }
      `}

      ${$mobileExpanded &&
      css`
        background-color: transparent;
        border: none;
        &:hover {
          background-color: transparent;
        }
      `}
    `}
`;
