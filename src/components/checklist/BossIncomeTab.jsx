import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styled, { css, keyframes } from "styled-components";
import { ContainerCss } from "../common/searchCharacter/ContainerBox";
import { periodGroups } from "./bossIncomeData";
import { getCombinedData, getOcidApi } from "../../api/api";
import EasyDifficultyIcon from "../../assets/pages/checklist/icons/Easy_icon.png";
import NormalDifficultyIcon from "../../assets/pages/checklist/icons/Normal__icon.png";
import HardDifficultyIcon from "../../assets/pages/checklist/icons/Hard__icon.png";
import ChaosDifficultyIcon from "../../assets/pages/checklist/icons/Chaos_icon.png";
import ExtremeDifficultyIcon from "../../assets/pages/checklist/icons/Extreme_icon.png";

const STORAGE_KEY = "checklist-boss-income-characters-v2";
const MAX_WEEKLY_BOSSES = 12;

const difficultyIconMap = {
  easy: EasyDifficultyIcon,
  normal: NormalDifficultyIcon,
  hard: HardDifficultyIcon,
  chaos: ChaosDifficultyIcon,
  extreme: ExtremeDifficultyIcon,
};

const bossLookup = periodGroups.reduce((acc, group) => {
  group.bosses.forEach((boss) => {
    acc[boss.id] = boss;
  });
  return acc;
}, {});

const formatMeso = (value) => {
  const roundedValue = Math.round(value);
  const absValue = Math.abs(roundedValue);
  const useEokUnit = absValue >= 100000000;
  const eok = Math.floor(roundedValue / 100000000);
  const man = Math.floor((roundedValue % 100000000) / 10000);
  const manPart = man === 0 ? "" : ` ${man}만`;

  return useEokUnit
    ? `${eok}억${manPart}`
    : `${Math.floor(roundedValue / 10000)}만`;
};

const hasRewardValue = (value) => typeof value === "number";

const formatReward = (value) =>
  hasRewardValue(value) ? formatMeso(value) : "-";

const createInitialSelections = () =>
  periodGroups.reduce((acc, group) => {
    group.bosses.forEach((boss) => {
      acc[boss.id] = {
        enabled: false,
        difficultyId: boss.difficulties[0]?.id ?? null,
        partySize: 1,
      };
    });
    return acc;
  }, {});

const getDifficultyMaxPartySize = (boss, difficultyId) => {
  const selectedDifficulty = boss.difficulties.find(
    (difficulty) => difficulty.id === difficultyId,
  );

  return selectedDifficulty?.maxPartySize ?? boss.maxPartySize ?? 1;
};

const clampPartySize = (boss, partySize, difficultyId) =>
  Math.min(
    Math.max(Number(partySize) || 1, 1),
    getDifficultyMaxPartySize(boss, difficultyId),
  );

const getDifficultyIcon = (difficultyId) =>
  difficultyIconMap[difficultyId] ?? NormalDifficultyIcon;

const difficultyBadgeStyleMap = {
  chaos: {
    background: "#494949",
    border: "#DCBE97",
    color: "#E8CCAE",
    shadow: "#A5AFB5",
  },
  easy: {
    background: "#909BA4",
    border: "#9CA5AD",
    color: "#ffffff",
    shadow: "#A5AFB5",
  },
  extreme: {
    background: "#494949",
    border: "#ff043b",
    color: "#CC5E50",
    shadow: "#A5AFB5",
  },
  hard: {
    background: "#D15A84",
    border: "#E26C96",
    color: "#F2F2F2",
    shadow: "#A5AFB5",
  },
  normal: {
    background: "#41A8C4",
    border: "#52B3CD",
    color: "#ffffff",
    shadow: "#A5AFB5",
  },
};

const getDifficultyInitial = (difficultyId) =>
  typeof difficultyId === "string" && difficultyId.length > 0
    ? difficultyId.slice(0, 1).toUpperCase()
    : "?";

const countSelectedBosses = (selections) =>
  periodGroups.reduce((count, group) => {
    if (group.key !== "weekly") {
      return count;
    }

    return (
      count +
      group.bosses.filter((boss) => {
        return selections?.[boss.id]?.enabled;
      }).length
    );
  }, 0);

const getDisplayRows = (group, sortMode) => {
  if (sortMode !== "price") {
    return group.bosses.map((boss) => ({
      rowKey: boss.id,
      boss,
      difficulties: boss.difficulties,
      displayName: boss.bossName,
    }));
  }

  return group.bosses
    .flatMap((boss) =>
      boss.difficulties.map((difficulty) => ({
        rowKey: `${boss.id}-${difficulty.id}`,
        boss,
        difficulties: [difficulty],
        displayName: boss.bossName,
      })),
    )
    .sort(
      (a, b) =>
        (b.difficulties[0]?.reward ?? 0) - (a.difficulties[0]?.reward ?? 0),
    );
};

const getAllCaseCombinations = (text) => {
  if (!text) {
    return [""];
  }

  const [firstChar, ...restChars] = text;
  const rest = getAllCaseCombinations(restChars.join(""));
  const combinations = [];

  rest.forEach((suffix) => {
    combinations.push(firstChar.toLowerCase() + suffix);
    combinations.push(firstChar.toUpperCase() + suffix);
  });

  return combinations;
};

const findCharacterOcid = async (nickname) => {
  const isKorean = /^[가-힣]+$/.test(nickname);
  const candidates = isKorean
    ? [nickname]
    : Array.from(
        new Set([nickname, ...getAllCaseCombinations(nickname)]),
      ).slice(0, 20);

  for (const candidate of candidates) {
    const ocidData = await getOcidApi(candidate);
    if (ocidData?.ocid) {
      return ocidData.ocid;
    }
  }

  return null;
};

const fetchCharacterProfile = async (nickname) => {
  const ocid = await findCharacterOcid(nickname);
  if (!ocid) {
    return null;
  }

  const combinedData = await getCombinedData(ocid);
  const basicInfo = combinedData?.getBasicInformation;

  if (!basicInfo) {
    return null;
  }

  return {
    nickname: basicInfo.character_name || nickname,
    characterImage: basicInfo.character_image || null,
  };
};

const normalizeSelections = (rawSelections) => {
  const initialSelections = createInitialSelections();

  return Object.entries(initialSelections).reduce(
    (acc, [bossId, defaultValue]) => {
      const boss = bossLookup[bossId];
      const currentValue = rawSelections?.[bossId];
      const difficultyId = boss.difficulties.some(
        (difficulty) => difficulty.id === currentValue?.difficultyId,
      )
        ? currentValue.difficultyId
        : defaultValue.difficultyId;

      acc[bossId] = {
        enabled: Boolean(currentValue?.enabled),
        difficultyId,
        partySize: clampPartySize(
          boss,
          currentValue?.partySize ?? defaultValue.partySize,
          difficultyId,
        ),
      };

      return acc;
    },
    {},
  );
};

const normalizeCharacter = (character, index) => {
  const nickname =
    typeof character?.nickname === "string"
      ? character.nickname.trim()
      : typeof character?.name === "string"
        ? character.name.trim()
        : "";

  if (!nickname) {
    return null;
  }

  return {
    id:
      typeof character?.id === "string" && character.id
        ? character.id
        : `character-${index}-${nickname}`,
    nickname,
    characterImage:
      typeof character?.characterImage === "string" && character.characterImage
        ? character.characterImage
        : null,
    selections: normalizeSelections(character?.selections),
  };
};

const loadStoredState = () => {
  if (typeof window === "undefined") {
    return {
      characters: [],
      activeCharacterId: null,
    };
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    const characters = Array.isArray(parsed?.characters)
      ? parsed.characters.map(normalizeCharacter).filter(Boolean)
      : [];
    const activeCharacterId = characters.some(
      (character) => character.id === parsed?.activeCharacterId,
    )
      ? parsed.activeCharacterId
      : (characters[0]?.id ?? null);

    return {
      characters,
      activeCharacterId,
    };
  } catch (error) {
    return {
      characters: [],
      activeCharacterId: null,
    };
  }
};

const buildCharacterSummary = (character) => {
  const details = [];

  periodGroups.forEach((group) => {
    group.bosses.forEach((boss) => {
      const selection = character.selections?.[boss.id];
      if (!selection?.enabled) {
        return;
      }

      const difficulty = boss.difficulties.find(
        ({ id }) => id === selection.difficultyId,
      );

      if (!difficulty) {
        return;
      }

      const partySize = clampPartySize(
        boss,
        selection.partySize,
        difficulty.id,
      );
      const splitReward = hasRewardValue(difficulty.reward)
        ? difficulty.reward / partySize
        : null;

      details.push({
        bossId: boss.id,
        bossName: boss.bossName,
        bossIcon: boss.icon,
        difficultyId: difficulty.id,
        difficultyLabel: difficulty.label,
        difficultyInitial: getDifficultyInitial(difficulty.id),
        weeklyIncome:
          splitReward === null ? null : splitReward * group.weeklyMultiplier,
        monthlyIncome:
          splitReward === null ? null : splitReward * group.monthlyMultiplier,
      });
    });
  });

  return {
    characterId: character.id,
    nickname: character.nickname,
    characterImage: character.characterImage,
    selectedCount: details.length,
    weeklyTotal: details.reduce(
      (sum, item) => sum + (item.weeklyIncome ?? 0),
      0,
    ),
    monthlyTotal: details.reduce(
      (sum, item) => sum + (item.monthlyIncome ?? 0),
      0,
    ),
    details,
  };
};

const createCharacterId = () =>
  `character-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const BossIncomeTab = () => {
  const storedState = useMemo(() => loadStoredState(), []);
  const [characters, setCharacters] = useState(storedState.characters);
  const [activeCharacterId, setActiveCharacterId] = useState(
    storedState.activeCharacterId,
  );
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [sortModes, setSortModes] = useState({});
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newCharacterName, setNewCharacterName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        characters,
        activeCharacterId,
      }),
    );
  }, [characters, activeCharacterId]);

  useEffect(() => {
    if (characters.length === 0) {
      if (activeCharacterId !== null) {
        setActiveCharacterId(null);
      }
      return;
    }

    if (!characters.some((character) => character.id === activeCharacterId)) {
      setActiveCharacterId(characters[0].id);
    }
  }, [characters, activeCharacterId]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const activeCharacter = useMemo(
    () =>
      characters.find((character) => character.id === activeCharacterId) ??
      null,
    [characters, activeCharacterId],
  );

  const characterSummaries = useMemo(
    () => characters.map((character) => buildCharacterSummary(character)),
    [characters],
  );

  const totalSummary = useMemo(
    () => ({
      weeklyTotal: characterSummaries.reduce(
        (sum, character) => sum + character.weeklyTotal,
        0,
      ),
      monthlyTotal: characterSummaries.reduce(
        (sum, character) => sum + character.monthlyTotal,
        0,
      ),
    }),
    [characterSummaries],
  );

  const activeCharacterSelections = activeCharacter?.selections ?? null;
  const activeWeeklySelectedCount = activeCharacterSelections
    ? countSelectedBosses(activeCharacterSelections)
    : 0;

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setToastVisible(true);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  }, []);

  const toggleSort = useCallback((groupKey) => {
    setSortModes((prev) => ({
      ...prev,
      [groupKey]: prev[groupKey] === "price" ? "default" : "price",
    }));
  }, []);

  const handleCharacterSelect = useCallback((characterId) => {
    setActiveCharacterId(characterId);
  }, []);

  const handleCharacterDelete = useCallback((characterId) => {
    setCharacters((prev) => {
      const nextCharacters = prev.filter(
        (character) => character.id !== characterId,
      );

      setActiveCharacterId((current) => {
        if (current !== characterId) {
          return current;
        }

        return nextCharacters[0]?.id ?? null;
      });

      return nextCharacters;
    });
  }, []);

  const handleDifficultyChange = (boss, difficultyId, groupKey) => {
    if (!activeCharacterId) {
      showToast("먼저 캐릭터를 등록하고 선택해주세요.");
      return;
    }

    setCharacters((prev) =>
      prev.map((character) => {
        if (character.id !== activeCharacterId) {
          return character;
        }

        const current = character.selections?.[boss.id] ?? {
          enabled: false,
          difficultyId: boss.difficulties[0]?.id ?? null,
          partySize: 1,
        };
        const isSameSelection =
          current.enabled && current.difficultyId === difficultyId;

        if (isSameSelection) {
          return {
            ...character,
            selections: {
              ...character.selections,
              [boss.id]: {
                ...current,
                enabled: false,
                difficultyId,
                partySize: clampPartySize(
                  boss,
                  current.partySize,
                  difficultyId,
                ),
              },
            },
          };
        }

        if (groupKey === "weekly" && !current.enabled) {
          const weeklyCount = countSelectedBosses(character.selections);
          if (weeklyCount >= MAX_WEEKLY_BOSSES) {
            showToast(
              `캐릭터별로 주간 보스는 최대 ${MAX_WEEKLY_BOSSES}개까지 선택할 수 있습니다.`,
            );
            return character;
          }
        }

        return {
          ...character,
          selections: {
            ...character.selections,
            [boss.id]: {
              ...current,
              enabled: true,
              difficultyId,
              partySize: clampPartySize(boss, current.partySize, difficultyId),
            },
          },
        };
      }),
    );
  };

  const handlePartySizeChange = (boss, partySize) => {
    if (!activeCharacterId) {
      showToast("먼저 캐릭터를 등록하고 선택해주세요.");
      return;
    }

    setCharacters((prev) =>
      prev.map((character) => {
        if (character.id !== activeCharacterId) {
          return character;
        }

        const current = character.selections?.[boss.id];
        const difficultyId = current?.difficultyId ?? boss.difficulties[0]?.id;

        return {
          ...character,
          selections: {
            ...character.selections,
            [boss.id]: {
              ...current,
              enabled: Boolean(current?.enabled),
              difficultyId,
              partySize: clampPartySize(boss, partySize, difficultyId),
            },
          },
        };
      }),
    );
  };

  const handleResetSelections = useCallback(() => {
    if (!activeCharacterId) {
      showToast("초기화할 캐릭터를 먼저 선택해주세요.");
      return;
    }

    setCharacters((prev) =>
      prev.map((character) =>
        character.id === activeCharacterId
          ? {
              ...character,
              selections: createInitialSelections(),
            }
          : character,
      ),
    );
  }, [activeCharacterId, showToast]);

  const handleAddCharacter = async (event) => {
    event.preventDefault();

    const nickname = newCharacterName.trim();
    if (!nickname) {
      showToast("등록할 캐릭터 닉네임을 입력해주세요.");
      return;
    }

    setIsRegistering(true);

    let profile = null;

    try {
      profile = await fetchCharacterProfile(nickname);
    } catch (error) {
      profile = null;
    }

    const nextCharacter = {
      id: createCharacterId(),
      nickname: profile?.nickname ?? nickname,
      characterImage: profile?.characterImage ?? null,
      selections: createInitialSelections(),
    };

    setCharacters((prev) => [...prev, nextCharacter]);
    setActiveCharacterId(nextCharacter.id);
    setNewCharacterName("");
    setIsAddFormOpen(false);
    setIsRegistering(false);

    if (!profile) {
      showToast("검색된 캐릭터 정보가 없어 닉네임만 등록했습니다.");
    }
  };

  return (
    <ContentWrap>
      <Toast $visible={toastVisible}>{toastMessage}</Toast>

      <SummaryStrip>
        <SummaryCard>
          <SummaryLabel>주간 총 수익</SummaryLabel>
          <SummaryValue>{formatMeso(totalSummary.weeklyTotal)}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>월간 총 수익</SummaryLabel>
          <SummaryValue>{formatMeso(totalSummary.monthlyTotal)}</SummaryValue>
        </SummaryCard>
      </SummaryStrip>

      <Section>
        <SectionHeader>
          <SectionTitleWrap>
            <SectionTitle>캐릭터 등록</SectionTitle>
          </SectionTitleWrap>
          <HeaderActions $fullWidthOnMobile>
            <HeaderButton
              type="button"
              $fullOnMobile
              onClick={() => setIsAddFormOpen((prev) => !prev)}
            >
              {isAddFormOpen ? "닫기" : "캐릭터 추가"}
            </HeaderButton>
          </HeaderActions>
        </SectionHeader>

        {isAddFormOpen && (
          <CharacterAddForm onSubmit={handleAddCharacter}>
            <CharacterNameInput
              value={newCharacterName}
              onChange={(event) => setNewCharacterName(event.target.value)}
              placeholder="닉네임을 입력하세요"
              maxLength={12}
            />
            <FormButton type="submit" disabled={isRegistering}>
              {isRegistering ? "등록 중..." : "등록"}
            </FormButton>
          </CharacterAddForm>
        )}

        {characterSummaries.length > 0 ? (
          <CharacterRows>
            {characterSummaries.map((summary) => {
              const isActive = summary.characterId === activeCharacterId;
              const nameInitial =
                typeof summary.nickname === "string" &&
                summary.nickname.length > 0
                  ? summary.nickname.slice(0, 1)
                  : "?";

              return (
                <CharacterCard
                  key={summary.characterId}
                  $active={isActive}
                  onClick={() => handleCharacterSelect(summary.characterId)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleCharacterSelect(summary.characterId);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <CharacterIdentity>
                    <Avatar>
                      {summary.characterImage ? (
                        <img
                          src={summary.characterImage}
                          alt={`${summary.nickname} 이미지`}
                        />
                      ) : (
                        <AvatarFallback>{nameInitial}</AvatarFallback>
                      )}
                    </Avatar>
                    <CharacterNameBlock>
                      <CharacterNameRow>
                        <CharacterName>{summary.nickname}</CharacterName>
                        <CharacterCountBadge
                          $isFull={summary.selectedCount >= MAX_WEEKLY_BOSSES}
                        >
                          {summary.selectedCount} / {MAX_WEEKLY_BOSSES}
                        </CharacterCountBadge>
                      </CharacterNameRow>
                    </CharacterNameBlock>
                  </CharacterIdentity>

                  <CharacterBossList>
                    {summary.details.length > 0 ? (
                      summary.details.map((item) => (
                        <SelectedBossItem
                          key={`${summary.characterId}-${item.bossId}`}
                        >
                          <SelectedBossIconWrap>
                            {item.bossIcon ? (
                              <SelectedBossIcon
                                src={item.bossIcon}
                                alt={`${item.bossName} 아이콘`}
                              />
                            ) : (
                              <SelectedBossFallback>
                                {item.bossName.slice(0, 1)}
                              </SelectedBossFallback>
                            )}
                          </SelectedBossIconWrap>
                          <SelectedBossBadge $difficultyId={item.difficultyId}>
                            {item.difficultyInitial}
                          </SelectedBossBadge>
                        </SelectedBossItem>
                      ))
                    ) : (
                      <CharacterBossEmpty>
                        선택한 보스가 없습니다.
                      </CharacterBossEmpty>
                    )}
                  </CharacterBossList>

                  <CharacterIncome $area="weekly">
                    <IncomeLabel>주간</IncomeLabel>
                    <IncomeValue>{formatMeso(summary.weeklyTotal)}</IncomeValue>
                  </CharacterIncome>

                  <CharacterIncome $area="monthly">
                    <IncomeLabel>월간</IncomeLabel>
                    <IncomeValue>
                      {formatMeso(summary.monthlyTotal)}
                    </IncomeValue>
                  </CharacterIncome>

                  <DeleteButton
                    type="button"
                    aria-label={`${summary.nickname} 삭제`}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCharacterDelete(summary.characterId);
                    }}
                  >
                    ×
                  </DeleteButton>
                </CharacterCard>
              );
            })}
          </CharacterRows>
        ) : (
          <EmptyState>
            캐릭터를 등록하면 캐릭터별 주간 보스 선택과 수익 합산이 시작됩니다.
          </EmptyState>
        )}
      </Section>

      {periodGroups.map((group) => (
        <Section key={group.key}>
          <SectionHeader>
            <SectionTitleWrap>
              <SectionTitle>
                {activeCharacter
                  ? `${activeCharacter.nickname} 주간 보스`
                  : "주간 보스"}
                {activeCharacter && (
                  <WeeklyCounter
                    $isFull={activeWeeklySelectedCount >= MAX_WEEKLY_BOSSES}
                  >
                    {activeWeeklySelectedCount} / {MAX_WEEKLY_BOSSES}
                  </WeeklyCounter>
                )}
              </SectionTitle>
            </SectionTitleWrap>
            <HeaderActions>
              <HeaderButton
                type="button"
                $secondary
                onClick={() => toggleSort(group.key)}
              >
                {sortModes[group.key] === "price" ? "기본순" : "가격순"}
              </HeaderButton>
              <HeaderButton
                type="button"
                $secondary
                onClick={handleResetSelections}
                disabled={!activeCharacter || activeWeeklySelectedCount === 0}
              >
                초기화
              </HeaderButton>
            </HeaderActions>
          </SectionHeader>

          <Rows>
            {getDisplayRows(group, sortModes[group.key]).map((row) => {
              const { boss, difficulties, displayName, rowKey } = row;
              const selection = activeCharacterSelections?.[boss.id];
              const isRowEnabled =
                selection?.enabled &&
                difficulties.some(
                  (difficulty) => difficulty.id === selection.difficultyId,
                );
              const activeDifficultyId =
                selection?.difficultyId ?? boss.difficulties[0]?.id;
              const maxPartySize = getDifficultyMaxPartySize(
                boss,
                activeDifficultyId,
              );

              return (
                <BossRow key={rowKey} $enabled={isRowEnabled}>
                  <BossIdentity>
                    <BossIconWrap>
                      {boss.icon ? (
                        <BossIcon
                          src={boss.icon}
                          alt={`${boss.bossName} 아이콘`}
                        />
                      ) : (
                        <BossIconFallback>
                          {boss.bossName.slice(0, 1)}
                        </BossIconFallback>
                      )}
                    </BossIconWrap>
                    <BossName>{displayName}</BossName>
                  </BossIdentity>

                  <DifficultyCell>
                    {difficulties.map((difficulty) => {
                      const isSelected =
                        selection?.enabled &&
                        selection?.difficultyId === difficulty.id;
                      const partySize = selection?.partySize ?? 1;
                      const displayPartySize = clampPartySize(
                        boss,
                        partySize,
                        difficulty.id,
                      );
                      const displayReward = hasRewardValue(difficulty.reward)
                        ? difficulty.reward / displayPartySize
                        : null;

                      return (
                        <DifficultyButton key={difficulty.id}>
                          <DifficultyCheck
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              handleDifficultyChange(
                                boss,
                                difficulty.id,
                                group.key,
                              )
                            }
                          />
                          <DifficultyIcon
                            src={getDifficultyIcon(difficulty.id)}
                            alt={`${difficulty.label} 아이콘`}
                          />
                          <DifficultyReward>
                            {formatReward(displayReward)}
                          </DifficultyReward>
                        </DifficultyButton>
                      );
                    })}
                  </DifficultyCell>

                  <PartyCell>
                    <PartySelect
                      value={selection?.partySize ?? 1}
                      onChange={(event) =>
                        handlePartySizeChange(boss, event.target.value)
                      }
                    >
                      {Array.from(
                        { length: maxPartySize },
                        (_, index) => index + 1,
                      ).map((count) => (
                        <option key={count} value={count}>
                          {count}인
                        </option>
                      ))}
                    </PartySelect>
                  </PartyCell>
                </BossRow>
              );
            })}
          </Rows>
        </Section>
      ))}
    </ContentWrap>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

const panelCss = css`
  ${ContainerCss};
  padding: 8px;
  color: white;
`;

const Toast = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 12px 24px;
  border-radius: 8px;
  background: rgba(30, 36, 42, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 243, 216, 0.12);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  animation: ${({ $visible }) => ($visible ? fadeInUp : fadeOut)} 0.28s ease
    forwards;
  display: ${({ $visible }) => ($visible ? "block" : "none")};

  ${({ $visible }) =>
    !$visible &&
    css`
      display: block;
      animation: ${fadeOut} 0.28s ease forwards;
    `}
`;

const SummaryStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  ${panelCss};
  background:
    linear-gradient(
      180deg,
      rgba(83, 96, 107, 0.96) 0%,
      rgba(53, 64, 73, 0.96) 100%
    ),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, transparent 100%);
  border-color: #6f818d;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
`;

const SummaryLabel = styled.div`
  font-size: 15px;
  color: rgba(229, 238, 246, 0.78);
`;

const SummaryValue = styled.div`
  margin-top: 4px;
  color: #ffffff;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 700;
  letter-spacing: 0.02em;
`;

const Section = styled.section`
  ${panelCss};
  background: linear-gradient(
    180deg,
    rgba(79, 91, 101, 0.98) 0%,
    rgba(58, 69, 79, 0.98) 8%,
    rgba(45, 54, 61, 0.98) 100%
  );
  border-color: #7b8b96;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 6px 12px;
  border-radius: 3px;
  border: 1px solid rgba(178, 189, 197, 0.65);
  background: #8f979c;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);

  @media screen and (max-width: 1200px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const SectionTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #f7f7f2;
  font-size: 19px;
  font-weight: 700;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media screen and (max-width: 1200px) {
    width: ${({ $fullWidthOnMobile }) =>
      $fullWidthOnMobile ? "100%" : "auto"};
  }
`;

const HeaderButton = styled.button`
  cursor: pointer;
  min-width: 92px;
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid
    ${({ $secondary }) =>
      $secondary ? "rgba(57, 68, 77, 0.36)" : "rgba(57, 68, 77, 0.42)"};
  background: ${({ $secondary }) =>
    $secondary
      ? "linear-gradient(180deg, #eef3f6 0%, #d7e0e6 100%)"
      : "linear-gradient(180deg, #fdfefe 0%, #e8eef2 100%)"};
  color: #324250;
  font-size: 12px;
  font-weight: 700;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  @media screen and (max-width: 1200px) {
    width: ${({ $fullOnMobile }) => ($fullOnMobile ? "100%" : "auto")};
  }
`;

const WeeklyCounter = styled.span`
  font-size: 13px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  background: ${({ $isFull }) =>
    $isFull ? "rgba(220, 80, 60, 0.85)" : "rgba(40, 52, 62, 0.72)"};
  color: ${({ $isFull }) => ($isFull ? "#ffe28b" : "rgba(220, 232, 242, 0.9)")};
  border: 1px solid
    ${({ $isFull }) =>
      $isFull ? "rgba(255, 120, 80, 0.6)" : "rgba(255,255,255,0.18)"};
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 6px;
`;

const BossRow = styled.article`
  display: grid;
  grid-template-columns: minmax(180px, 220px) minmax(220px, 1fr) 100px;
  gap: 12px;
  align-items: center;
  padding: 6px 12px;
  border-radius: 3px;
  border: 2px solid ${({ $enabled }) => ($enabled ? "#fff7a9" : "#eaebec")};
  outline: 1px solid ${({ $enabled }) => ($enabled ? "#b38728" : "#9aa3a7")};
  background: ${({ $enabled }) => ($enabled ? "#ddd3a9" : "#d1d4d6")};
  box-shadow: 0 2px ${({ $enabled }) => ($enabled ? "#9f7f32" : "#9aa3a7")};

  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "identity"
      "difficulty"
      "party";
  }
`;

const BossIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 1200px) {
    grid-area: identity;
  }
`;

const BossIconWrap = styled.div`
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(79, 86, 93, 0.8);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32);
  background: linear-gradient(180deg, #6c747a 0%, #4a4f54 100%);
`;

const BossIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const BossIconFallback = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: #f4fbff;
  font-size: 14px;
  font-weight: 700;
`;

const BossName = styled.div`
  color: #24476a;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
`;

const DifficultyCell = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px;

  @media screen and (max-width: 1200px) {
    grid-area: difficulty;
  }
`;

const DifficultyButton = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  color: #324250;
  font-size: 13px;
  font-weight: 700;
`;

const DifficultyCheck = styled.input`
  width: 20px;
  height: 20px;
  margin: 0;
`;

const DifficultyIcon = styled.img`
  height: 18px;
  display: block;
  object-fit: contain;
`;

const DifficultyReward = styled.span`
  color: rgba(55, 70, 83, 0.78);
  font-size: 13px;
  font-weight: 700;
`;

const PartyCell = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;

  @media screen and (max-width: 1200px) {
    grid-area: party;
  }
`;

const PartySelect = styled.select`
  width: 100%;
  height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid rgba(93, 103, 112, 0.72);
  background: linear-gradient(180deg, #eef2f5 0%, #dbe3e8 100%);
  color: #2d4254;
  font-size: 12px;
  font-weight: 700;
`;

const CharacterAddForm = styled.form`
  ${ContainerCss};
  display: grid;
  grid-template-columns: minmax(0, 1fr) 110px;
  gap: 10px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 3px;
  border: 2px solid #eaebec;
  outline: 1px solid #9aa3a7;
  background: #d1d4d6;
  box-shadow: 0 2px #9aa3a7;

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CharacterNameInput = styled.input`
  height: 38px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid rgba(93, 103, 112, 0.72);
  background: linear-gradient(180deg, #f8fbfd 0%, #e3ebf0 100%);
  color: #2d4254;
  font-size: 14px;
  font-weight: 700;
`;

const FormButton = styled(HeaderButton)`
  width: 100%;
  height: 38px;
`;

const CharacterRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`;

const CharacterCard = styled(BossRow)`
  position: relative;
  grid-template-columns:
    minmax(220px, 235px) minmax(180px, 1fr)
    130px 130px 44px;
  cursor: pointer;
  border-color: ${({ $active }) => ($active ? "#fff1a1" : "#eaebec")};
  outline-color: ${({ $active }) => ($active ? "#d88a1e" : "#9aa3a7")};
  background: ${({ $active }) => ($active ? "#dfd2a2" : "#d1d4d6")};
  box-shadow: 0 2px ${({ $active }) => ($active ? "#b97718" : "#9aa3a7")};

  @media screen and (max-width: 1200px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      "identity identity"
      "bosses bosses"
      "weekly monthly";
  }
`;

const CharacterIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;

  @media screen and (max-width: 1200px) {
    grid-area: identity;
    padding-right: 36px;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 45px;
    height: 45px;
    object-fit: none;
    image-rendering: pixelated;
    transform: translate(-6%, -10%) scaleX(-1);
  }
`;

const AvatarFallback = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
`;

const CharacterNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const CharacterNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const CharacterName = styled.div`
  color: #24476a;
  font-size: 16px;
  font-weight: 700;
`;

const CharacterCountBadge = styled(WeeklyCounter)``;

const CharacterBossList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;

  @media screen and (max-width: 1200px) {
    grid-area: bosses;
  }
`;

const SelectedBossItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const SelectedBossIconWrap = styled.div`
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(79, 86, 93, 0.8);
  background: linear-gradient(180deg, #6c747a 0%, #4a4f54 100%);
`;

const SelectedBossIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const SelectedBossFallback = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: #f4fbff;
  font-size: 12px;
  font-weight: 700;
`;

const SelectedBossBadge = styled.div`
  padding: 2px 8px 3px;
  border: 1px solid
    ${({ $difficultyId }) =>
      difficultyBadgeStyleMap[$difficultyId]?.border ?? "#947055"};
  background: ${({ $difficultyId }) =>
    difficultyBadgeStyleMap[$difficultyId]?.background ?? "#77553B"};

  color: ${({ $difficultyId }) =>
    difficultyBadgeStyleMap[$difficultyId]?.color ?? "#F3E7D4"};
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.28);
  white-space: nowrap;
`;

const CharacterBossEmpty = styled.div`
  color: rgba(50, 66, 80, 0.72);
  font-size: 12px;
  font-weight: 700;
`;

const CharacterIncome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media screen and (max-width: 1200px) {
    grid-area: ${({ $area }) => $area};
    flex-direction: row;
    align-items: center;
    gap: 6px;
  }
`;

const IncomeLabel = styled.div`
  color: rgba(50, 66, 80, 0.72);
  font-size: 11px;
  font-weight: 700;
`;

const IncomeValue = styled.div`
  color: #24476a;
  font-size: 14px;
  font-weight: 800;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: rgb(255, 55, 78);
  font-size: 26px;
  line-height: 1;
  font-weight: 700;

  @media screen and (max-width: 1200px) {
    grid-area: delete;
    position: absolute;
    top: 8px;
    right: 10px;
    justify-self: auto;
  }
`;

const EmptyState = styled.div`
  margin-top: 10px;
  padding: 16px 14px;
  border-radius: 8px;
  border: 1px dashed rgba(210, 223, 232, 0.35);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(227, 236, 243, 0.78);
  font-size: 13px;
  font-weight: 600;
`;
