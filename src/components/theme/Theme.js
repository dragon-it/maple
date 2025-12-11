export const light = {
  toggleBgColor: "rgb(55,55,55)",
  toggleColor: "rgb(255,255,255)",
  toggleBorderColor: "1px solid rgb(44, 45, 51)",
  bgColor: "rgba(255,255,255, 0.63)",
  textColor: "rgb(0,0,0)",
  borderColor: "1px solid rgb(234, 234, 234)",
  logoColor: "rgb(0,0,0)",
  tabColor: "rgb(0,0,0)",
  tabActiveColor: "rgb(0,123,255)",
  tabActiveTextColor: "rgb(255,255,255)",
  tabNotActiveColor: "rgb(224, 224, 224)",
  tabHoverColor: "rgba(255,255,255, 0.65)",
  tabNotHoverColor: "rgb(0, 86, 179)",
  headerBgColor: "rgba(255,255,255, 0.55)",
  headerHoverColor: "rgb(205,205,205)",
  headerIconHoverColor: "rgb(230,230,230)",
  footerBgColor: "rgba(38,38,38, 0.85)",
  footerTextColor: "rgb(220,220,220)",
  infoPanelColor: {
    headerBackground: "rgba(255, 255, 255, 0.3)",
    contentsBackground: "rgba(255, 255, 255, 0.7)",
    dateColor: "rgb(43, 43, 43)",
    toPuzzle: {
      background: `linear-gradient(
        180deg,
        rgb(110, 198, 255) 44%,
        rgb(33, 150, 243) 100%
      )`,
      borderTop: "1px solid rgb(179, 229, 252)",
      outline: "1px solid rgb(25, 118, 210)",
      boxShadow: "0px 2px 0px rgb(25, 118, 210)",
    },
  },
};

export const dark = {
  toggleBgColor: "rgb(255,255,255)",
  toggleColor: "rgb(49, 48, 46)",
  toggleBorderColor: "1px solid rgb(99, 99, 99)",
  bgColor: "rgba(30,30,34, 0.86)",
  textColor: "rgb(220,220,220)",
  logoColor: "rgb(220,220,220)",
  borderColor: "1px solid rgb(44, 45, 51)",
  tabColor: "rgb(205,205,205)",
  tabActiveColor: "rgb(109,109,109)",
  tabActiveTextColor: "rgb(255,255,255)",
  tabHoverColor: "rgba(255,255,255, 0.15)",
  tabNotHoverColor: "rgba(255,255,255, 0.1)",
  headerBgColor: "rgba(38,38,38, 0.85)",
  headerHoverColor: "rgb(205,205,205)",
  headerIconHoverColor: "rgb(75, 75, 75)",
  footerBgColor: "rgba(38,38,38, 0.85)",
  footerTextColor: "rgb(220,220,220)",
  infoPanelColor: {
    headerBackground: "rgba(255, 255, 255, 0.05)",
    contentsBackground: "rgba(37, 40, 43, 0.7)",
    dateColor: "rgb(170,170,170)",
    toPuzzle: {
      background: `linear-gradient(
        180deg,
        rgba(255, 196, 22, 1) 44%,
        rgba(246, 164, 1, 1) 100%
      )`,
      borderTop: "1px solid rgb(255, 229, 36)",
      outline: "1px solid rgb(190, 102, 16)",
      boxShadow: "0px 2px 0px rgb(190, 102, 16)",
    },
  },
};

export const theme = {
  light,
  dark,
};
