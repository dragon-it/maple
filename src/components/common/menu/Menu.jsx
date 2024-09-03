import React, { useState } from "react";
import styled from "styled-components";
import hamburger_bar_dark from "../../../assets/menu/hamburger_dark.svg";
import hamburger_bar_light from "../../../assets/menu/hamburger_light.svg";
import { useTheme } from "../../../context/ThemeProvider";

export const Menu = () => {
  const { theme } = useTheme();
  const [isClicked, setIsClicked] = useState(false);

  const handleClicked = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Container>
      <HamburgerImg
        onClick={handleClicked}
        src={theme === "light" ? hamburger_bar_dark : hamburger_bar_light}
        alt="hamburger_bar"
      ></HamburgerImg>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  width: 22px;
  height: 22px;
`;

const HamburgerImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 22px;
  height: auto;
  cursor: pointer;
`;
