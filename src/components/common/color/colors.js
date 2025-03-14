const colors = {
  main: {
    white0: "rgb(255, 255, 255)", // Item Value Text && Ability Btn Color Active
    white0Alpha30: "rgba(255, 255, 255, 0.3)",
    white0Alpha35: "rgba(255, 255, 255, 0.35)",
    white0Alpha40: "rgba(255, 255, 255, 0.4)",
    white0Alpha60: "rgba(255, 255, 255, 0.6)",
    white0Alpha80: "rgba(255, 255, 255, 0.8)",
    white1: "rgb(247, 247, 247)", // Ability Btn Border Actve
    white2: "rgb(230, 230, 230)",
    white3: "rgb(220, 220, 220)", // Ability Btn Color Not Active
    white2Alpha60: "rgba(230, 230, 230, 0.6)",
    white4: "rgb(216, 216, 216)", // Notice Background
    white5: "rgb(204, 204, 204)", // Component Header Text
    white6: "rgb(192, 192, 192)", // Item name text && Notice text
    white7: "rgb(195, 195, 195)",
    white8: "rgb(180, 180, 180)", // Ability&&HyperStat Btn Wrap Background
    white8Alpha20: "rgba(195, 195, 195, 0.2)", // Guild Member Border-bottom

    dark0: "rgb(0, 0, 0)",
    dark0Alpha10: "rgba(0, 0, 0, 0.10)", // Ability Border
    dark0Alpha25: "rgba(0, 0, 0, 0.25)", // Text Shadow
    dark0Alpha30: "rgba(0, 0, 0, 0.3)", // Ability Wrap Text Shadow
    dark0Alpha40: "rgba(0, 0, 0, 0.4)",
    dark0Alpha50: "rgba(0, 0, 0, 0.5)", // Favorite Background && CharacterInfo Title Shadow
    dark0Alpha90: "rgba(0, 0, 0, 0.9)",
    dark1: "rgb(24, 24, 24)", // Character Capture Text
    dark2: "rgb(39, 39, 39)", // Guild Tab Not Active Background
    dark3: "rgb(51, 51, 51)", // Symbol Background
    dark4: "rgb(55, 56, 58)", // Item, Skill Icon Border Dotted --old
    dark4_1: "rgb(89, 85, 82)", // Item Icon Border Dotted --new && Guild Top Class border
    dark5: "rgb(58, 58, 58)", // Guild Sorting Background
    dark5Alpha50: "rgba(58, 58, 58, 0.5)",
    dark6: "rgb(44, 44, 44)",
    dark6Alpha70: "rgba(44, 44, 44, 0.7)", // Guild Member Level Text
    dark7: "rgb(46, 48, 53)",
    dark8: "rgb(66, 66, 66)", // Guild Top Class Background
    dark9: "rgb(61, 69, 78)",
    dark10: "rgb(57, 57, 57)", // Guild Skill Background
    dark11: "rgb(70, 77, 83)",
  },

  greyScale: {
    grey0: "rgb(73, 73, 73)",
    grey1: "rgb(82, 79, 87)",
    grey2: "rgb(85, 85, 85)", // Guild Tab Hover
    grey3: "rgb(91, 91, 91)",
    grey3Alpha50: "rgba(91, 91, 91, 0.5)",
    grey4: "rgb(108, 106, 106)",
    grey5: "rgb(119, 119, 119)", // Character Search Btn border
    grey5Alpha85: "rgba(119, 119, 119, 0.85)", // Character Search Btn border
    grey6: "rgb(136, 136, 136)", // Guild Member Image Background
    grey7: "rgb(141, 141, 141)", // Guild NoDataWrap Border
    grey8: "rgb(150, 149, 143)",
    grey9: "rgb(153,	153, 153)", // Chracter Search Btn Background && Guild Member Background
    grey10Alpha25: "rgba(184, 184, 184, 0.25)", // Favorite Hover
    grey11: "rgb(90, 96, 102)",
    grey12: "rgb(169, 186, 193)",
  },

  deepBlue: {
    deepBlue0: "rgb(33, 40, 48)",
    deepBlue1: "rgb(42, 49, 58)", // Character Search outline && Ability Wrap Outline
    deepBlue2: "rgb(43, 53, 62)", // Sunday Maple Background
    deepBlue3: "rgba(59, 66, 75, 0.9)", // Character Search Background && Ability Wrap Background
    deepBlue4: "rgb(80, 92, 101)", // Character Search Border && Ability Wrap Border && Sliding Puzzle Background
    deepBlue5: "rgb(68, 79, 89)", // Ability Btn Background
    deepBlue6: "rgb(62, 73, 81)", // Guild Member Image Border
    deepBlue7: "rgb(133, 145, 145)", // Guild Member Image Border
    deepBlue8: "rgb(130, 143, 154)", // Ability Btn Background Not Actve
    deepBlue9: "rgb(69, 77, 87)", // Ability Btn Border Not Actve
    deepBlue10: "rgb(54, 82, 100)", // Guild Member Image Shadow
    deepBlue11: "rgb(67, 121, 128)", // Sliding Puzzle border
    deepBlue12: "rgb(141, 199, 209)",
    deepBlue13: "rgb(197, 220, 242)",
  },

  brownScale: {
    darkBrown: "rgb(51, 46, 46)",
    brown0: "rgb(110, 93, 73)",
    brown1: "rgb(132, 111, 90)",
    brown2: "rgb(139, 123, 106)",
    brown3: "rgb(158, 139, 116)",
    brown4: "rgb(163, 145, 125)",
    brown5: "rgb(185, 163, 136)",
    brown6: "rgb(200, 175, 137)", // Guild Level, Info Text, Skill Header
  },

  subColor: {
    red0: "rgb(255, 25, 25)", // Guild Class Statistic Text
    red0Alpha50: "rgba(255, 51, 0, 0.5)",
    red0Alpha90: "rgba(255, 51, 0, 0.9)",
    deepRed: "rgb(81, 21, 25)",
    deepPink: "rgb(173, 92, 92)",
    warmBrown: "rgb(235, 136, 112)",
    warmBrownAlpha50: "rgba(235, 136, 112, 0.5)",
    warmOrange0: "rgb(228,119,51)", // Character Search Btn border
    orange0: "rgb(213, 125, 13)",
    orange1: "rgb(221, 136, 17)",
    orange2: "rgb(255,	170, 0)", // Character Search Btn Background
    yellow0: "rgb(255, 221, 85)",
    yellow1: "rgb(237,208,103)", // Guild Skill MaxLevel Text
    yellow2: "rgb(255, 230, 132)",
    yellow3: "rgb(212, 188, 108)",
    darkYellow0: "rgb(220, 252, 2)", // Search Componenet Header Text
    darkYellow1: "rgb(170, 187, 51)", // Search Guild Btn Background
    darkYellow2: "rgb(187, 202, 88)", // Search Guild Btn Hover
    darkYellow3: "rgb(199, 222, 90)",
    blueGreen0: "rgb(19, 130, 149)", // Guild Tab Background
    blueGreen1: "rgb(67, 121, 128)",
    blueGreen2: "rgb(141, 199, 209)",
    lightBlue: "rgb(197, 220, 242)", // Hyper Stat Level Text
    lightViolet: "rgb(182, 101, 243)", // Hexa Stat Background
  },

  commonInfo: {
    wrapBackground: "rgb(44, 51, 58)", // CommonInfo Background
    wrapBorder: "rgb(67, 79, 86)", // CommonInfo Outline
    wrapOutline: "rgb(36, 43, 51)", // CommonInfo Border
    wrapHeaderText: "rgb(221, 254, 1)", // CommonInfo Header Text
    textShadow: "0px 0px 3px rgb(30, 38, 47);", // CommonInfo Text Shadow
    contentBackground: "rgb(238, 238, 238)", // CommonInfo Content Background

    normalBtn: {
      btnBackground: "linear-gradient(to top,rgb(76, 90, 105),rgb(42, 59, 78))", // CommonInfo Btn Background
      btnBorder: "1px solid rgb(93, 125, 167)", // CommonInfo Btn Border
      btnOutline: "1px solid rgb(9, 11, 15)", // CommonInfo Btn Outline
      btnText: "rgb(255, 255, 255)", // CommonInfo Btn Text
      btnTextShadow: "0px -1px 0px rgb(0, 0, 0)", // CommonInfo Btn Text Shadow
      btnActiveborder: "1px solid rgb(255, 255, 255)", // CommonInfo Btn Active Border
      btnActiveOutline: "1px solid rgb(255, 255, 255)", // CommonInfo Btn Active Outline
      btnACtiveTextShadow: "0px 0px 3px rgb(255, 255, 255)", // CommonInfo Btn Active Text Shadow
    },

    hardBtn: {
      btnBackground:
        "linear-gradient(to top,rgb(213, 90, 164),rgb(109, 17, 58))", // CommonInfo Btn Background
      btnBorder: "1px solid rgb(204, 73, 146)", // CommonInfo Btn Border
      btnOutline: "1px solid rgb(9, 11, 15)", // CommonInfo Btn Outline
      btnText: "rgb(255, 255, 255)", // CommonInfo Btn Text
      btnTextShadow: "0px -1px 0px rgb(0, 0, 0)", // CommonInfo Btn Text Shadow
      btnActiveborder: "1px solid rgb(255, 255, 255)", // CommonInfo Btn Active Border
      btnActiveOutline: "1px solid rgb(255, 255, 255)", // CommonInfo Btn Active Outline
      btnACtiveTextShadow: "0px 0px 1px rgb(255, 255, 255)", // CommonInfo Btn Active Text Shadow
    },
  }, // Character Info, Skill Wrap, Sliding Puzzle,

  characterInfo: {
    levelBackground: "rgba(204, 204, 204, 0.9)", // Character Level Background
    nameBackground: "rgb(60, 194, 216)", // Character Name Background
    experienceBackground: "rgb(170, 204, 0)", // Character Experience Background
    contentBackground: "rgba(202, 204, 206, 0.8))", // CharacterInfo Background (Class, World, Guild)

    characterStatColor: {
      combatPowerText: "rgb(255, 250, 210)", // Combat Power Text
      combatPowerBackground: "rgb(62, 96, 118)", // Combat Power Background
      combatPowerBorder: "rgb(71, 119, 149)", // Combat Power Border
      statBackground: "rgba(134, 148, 158, 0.8)", // Stat 1st,3rd Section Background
      statBackground2: "rgb(103 113 125)", // Stat 2nd Section Background
      statHeaderColor: "rgb(210, 221, 225)", // Stat Header Text
    },

    propensityColor: {
      propensityBackground: "rgb(106, 214, 241)", // Propensity Item Background
      propensityText: "rgb(255, 255, 255)", // Propensity Text
    },
  },

  abilityColor: {
    rareGrade: "rgb(54,184,208)", // Ability Rare Grade
    epicGrade: "rgb(127,102,211)", // Ability Epic Grade
    uniqueGrade: "rgb(232,156,9)", // Ability Unique Grade
    legendaryGrade: "rgb(164,199,0)", // Ability Legendary Grade
  },

  itemColor: {
    itemLabelColor: {
      redLabel: "rgb(255,0,89)", // Item Name Text (Red Label)
      blackLabel: "rgb(255,204,0)", // Item Name Text (Black Label)
      specialLabel: "rgb(188,186,187)", // Item Name Text (Special Label)
      masterLabel: "rgb(108,168,192)", // Item Name Text (Master Label)
    },

    itemAddOptionColor: {
      addOption: "rgb(204, 255, 0)", // Item Add Option Text
      starforceOption: "rgb(255, 204, 0)", // Item Starforce Option Text
      baseOption: "rgb(255, 255, 255)", // Item Base Option Text
      etcOption: "rgb(170, 170, 255)", // Item Etc Option Text
      mergeOption: "rgb(102,255,255)", // Item Merge Option Text
    },
    itemIconBorderColor: {
      rareGrade: "rgb(0,154,255)", // Item Icon Border (Rare Grade)
      epicGrade: "rgb(120,0,239)", // Item Icon Border (Epic Grade)
      uniqueGrade: "rgb(255,188,0)", // Item Icon Border (Unique Grade)
      legendaryGrade: "rgb(0,187,136)", // Item Icon Border (Legendary Grade)
      basicGrade: "rgb(134, 130, 132)", // Item Icon Border (Basic Grade)
    },
    itemOptionHeaderColor: {
      rareGrade: "rgb(102,225,225)", // Item Option Header Text (Rare Grade)
      epicGrade: "rgb(153,91,197)", // Item Option Header Text (Epic Grade)
      uniqueGrade: "rgb(255,204,0)", // Item Option Header Text (Unique Grade)
      legendaryGrade: "rgb(204,241,20)", // Item Option Header Text (Legendary Grade)
    },

    itemSoulOptionColor: {
      soulOption: "rgb(255, 255, 68)", // Item Soul Option Text
    },

    exOptionColor: {
      exOption: "rgb(255, 51, 51)", // Item ExOption Text
    },
  },

  petColor: {
    petTypeColor: {
      lunaSweet: "rgb(160,133,186)", // Pet Type Text (Luna Sweet)
      lunaDream: "rgb(0,205,255)", // Pet Type Text (Luna Dream)
      wonderBlack: "rgb(235,189,5)", // Pet Type Text (Wonder Black)
    },
    petItemColor: {
      petItemOption: "rgb(255,153,0)", // Pet Item Option Text
    },
  },

  union: {
    unionRaiderColor: {
      Background: "rgb(56, 60, 69)", // Union Raider Background
      Border: "rgb(69, 89, 100)", // Union Raider Border
      Outline: "rgb(56, 70, 81)", // Union Raider Outline
      TabBackground: "rgb(56, 70, 81)", // Union Raider Switch Btn Background
      TabHoverBackground: "rgb(91, 120, 145)", // Union Raider Switch Btn Hover Background
    },

    unionRaiderStat: {
      warpBackground: "rgb(51, 51, 51)", // Union Raider Stat Background
      warpBorder: "rgb(34, 34, 34)", // Union Raider Stat Border
      warpOutline: "rgb(102, 102, 102)", // Union Raider Stat Outline
      itemsColor: "rgb(179, 179, 179)", // Union Raider Stat Items Text
      itemsHoverBackground: "rgb(209, 209, 209)", // Union Raider Stat Items Hover Background
      itemsHoverColor: "rgb(78, 77, 77)", // Union Raider Stat Items Hover Text
    },

    unionArtifactItems: {
      Background: "rgb(48, 54, 63)", // Union Artifact Background
      Border: "rgb(136, 184, 212)", // Union Artifact Border
      Outline: "rgb(56, 70, 81)", // Union Artifact Outline
    },

    unionArtifactEffect: {
      warpBackground: "rgb(48, 54, 63)", // Union Artifact Effect Background
      warpBorder: "rgb(69, 89, 100)", // Union Artifact Effect Border
      warpOutline: "rgb(56, 70, 81)", // Union Artifact Effect Outline
      itemsBorder: "rgb(136, 184, 212)", // Union Artifact Effect Items Border
      itemsOutline: "rgb(56, 70, 81)", // Union Artifact Effect Items Border
    },

    unionInfoColor: {
      warpBackground: "rgb(56, 60, 69)", // Union Artifact Effect Background
      warpBorder: "rgb(69, 89, 100)", // Union Artifact Effect Border
      warpOutline: "rgb(56, 70, 81)", // Union Artifact Effect Outline
      itemBackground: "rgb(48, 54, 63)", // Union Artifact Effect Item Background
      itemBorder: "rgb(69, 89, 100)", // Union Artifact Effect Item Border
      itemOutline: "rgb(56, 70, 81)", // Union Artifact Effect Item Outline
      gradeColor: "rgb(255, 255, 0)", // Union Grade Text
      gradeShadow: "rgb(219, 250, 46)", // Union Grade Text Shadow
    },
  },

  characterCapture: {
    wrapBackground: "rgba(181, 165, 149, 0.85)", // Character Capture Background
    wrapBorder: "rgb(220, 217, 202)", // Character Capture Border
    wrapOutline: "rgb(146, 139, 102)", // Character Capture Outline
    wrapText: "rgb(255, 255, 255)", // Character Capture Text
  },

  expSimulator: {
    wrapBackground: "rgb(30, 38, 47)", // Exp Simulator Background
    wrapBorder: "rgb(56, 87, 106)", // Exp Simulator Border
    wrapOutline: "rgb(43, 53, 62)", // Exp Simulator Outline
    headerColor: "rgb(255, 255, 255)", // Exp Simulator Header Text
    headerShadow: "rgb(38, 151, 185)", // Exp Simulator Header Text Shadow
  },

  randomClass: {
    wrapBackground: "rgb(30, 38, 47)", // Random Class Background
    wrapBorder: "rgb(56, 87, 106)", // Random Class Border
    wrapOutline: "rgb(43, 53, 62)", // Random Class Outline
    headerColor: "rgba(227, 186, 252, 1) 18%,rgba(180, 234, 246, 1) 89%", // Random Class Header Text
    classNameBackground: "rgb(238, 238, 238)", // Random Class Name Background
    classNameText: "rgb(0, 0, 0)", // Random Class Name Text
    classImageBorder: "rgb(145, 145, 145)", // Random Class Image Border
    pickText: "rgb(221, 62, 62)", // Random Class Pick Text
    lightEffect:
      "rgb(255 255 255 / 0%) 52%,rgb(255 255 255 / 80%) 59%,rgb(255 255 255 / 0%) 66%", // Random Class Light Effect
    btnText: "rgb(252, 252, 252)", // Random Class Btn Text
    btnTextShadow: "rgb(189, 109, 5)", // Random Class Btn Shadow
    btnBackground: "    rgba(255, 196, 22, 1) 44%,rgba(246, 164, 1, 1) 100%", // Random Class Btn Background
    btnBorderTop: "rgb(255, 229, 36)", // Random Class Btn Border Top
    btnOutline: "rgb(190, 102, 16)", // Random Class Btn Outline
    btnBoxShadow: "rgb(190, 102, 16)", // Random Class Btn Box Shadow
  },

  guildSearch: {
    wrapBackground: "rgba(34, 34, 34, 0.9)", // Guild Search Background
    wrapBorder: "rgb(255, 255, 255)", // Guild Search Border
    wrapOutline: "rgb(141, 141, 141)", // Guild Search Outline
    wrapBoxShadow: "rgba(167, 167, 167, 0.5)", // Guild Search Box Shadow
  },
};

export default colors;
