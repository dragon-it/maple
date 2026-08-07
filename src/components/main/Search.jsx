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
  gap: 12px;
  margin: 0 auto;
  max-width: 688px;
  width: 100%;
  padding: 14px 20px;
  border-radius: 9999px;
  box-sizing: border-box;
  background: rgba(36, 45, 57, 0.7);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.12));
  position: relative;
  transition: all 0.2s ease-in-out;
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);

  &:focus-within {
    border-color: var(--primary, oklch(0.72 0.16 285));
    box-shadow:
      0 0 0 1px var(--glow),
      0 0 24px -8px var(--glow);
  }

  ${({ $variant, $compact }) =>
    $variant === "header" &&
    css`
      margin: 0;
      width: 100%;
      height: 38px;
      padding: 4px 6px 4px 14px;
      gap: 6px;
      border-radius: 9999px;
      border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.15));
      background: rgba(36, 45, 57, 0.63);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      transition: all 0.2s ease;

      ${$compact &&
      css`
        min-width: 0;
        max-width: 230px;
      `}
    `}
`;

const StyledInput = styled.input`
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 40px;
  padding: 0 8px;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.95);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
  }

  ${({ $variant }) =>
    $variant === "header" &&
    css`
      font-size: 13px;
      height: 100%;
      padding: 0 4px;
      background: transparent;
      color: var(--foreground, rgba(255, 255, 255, 0.95));

      &::placeholder {
        color: var(--muted-foreground, rgba(255, 255, 255, 0.6));
      }
    `}
`;

const StyledButton = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 9999px;
  background: var(--primary, oklch(0.72 0.16 285));
  color: var(--primary-foreground, #ffffff);
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(168, 85, 247, 0.35);
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary, oklch(0.76 0.17 285));
    filter: brightness(1.15);
    transform: scale(1.06);
    box-shadow: 0 0 16px var(--glow, rgba(168, 85, 247, 0.5));
  }

  ${({ $variant }) =>
    $variant === "header" &&
    css`
      position: relative;
      right: auto;
      width: 28px;
      height: 28px;
      border-radius: 9999px;
      background: var(--primary, oklch(0.72 0.16 285));
      color: var(--primary-foreground, #ffffff);
      box-shadow: 0 2px 8px rgba(168, 85, 247, 0.35);

      &:hover {
        background: var(--primary, oklch(0.76 0.17 285));
        filter: brightness(1.15);
        transform: scale(1.06);
      }
    `}
`;
