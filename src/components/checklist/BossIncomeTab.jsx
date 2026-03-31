import React, { useMemo, useState, useCallback, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { ContainerCss } from "../common/searchCharacter/ContainerBox";
import { periodGroups } from "./bossIncomeData";
import EasyDifficultyIcon from "../../assets/pages/checklist/icons/Easy_icon.png";
import NormalDifficultyIcon from "../../assets/pages/checklist/icons/Normal__icon.png";
import HardDifficultyIcon from "../../assets/pages/checklist/icons/Hard__icon.png";
import ChaosDifficultyIcon from "../../assets/pages/checklist/icons/Chaos_icon.png";
import ExtremeDifficultyIcon from "../../assets/pages/checklist/icons/Extreme_icon.png";

const MAX_WEEKLY_BOSSES = 12;

const formatMeso = (value) => {
  const roundedValue = Math.round(value);
  const absValue = Math.abs(roundedValue);
  const useEokUnit = absValue >= 100000000;
  const eok = Math.floor(roundedValue / 100000000);
  const man = Math.floor((roundedValue % 100000000) / 10000);
  const manPart = man === 0 ? "" : ` ${man}만`;

  const unitValue = useEokUnit
    ? `${eok}억` + manPart
    : Math.floor(roundedValue / 10000) + `만`;

  return unitValue;
};

const hasRewardValue = (value) => typeof value === "number";

const formatReward = (value) =>
  hasRewardValue(value) ? formatMeso(value) : "-";

const difficultyIconMap = {
  easy: EasyDifficultyIcon,
  normal: NormalDifficultyIcon,
  hard: HardDifficultyIcon,
  chaos: ChaosDifficultyIcon,
  extreme: ExtremeDifficultyIcon,
};

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

// 주간 보스 개수 계산 (weekly 그룹만)
const countWeeklySelected = (selections) => {
  let count = 0;
  periodGroups.forEach((group) => {
    if (group.key !== "weekly") return;
    group.bosses.forEach((boss) => {
      if (selections[boss.id]?.enabled) count++;
    });
  });
  return count;
};

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
        displayName: `${boss.bossName}`,
      })),
    )
    .sort(
      (a, b) =>
        (b.difficulties[0]?.reward ?? 0) - (a.difficulties[0]?.reward ?? 0),
    );
};

export const BossIncomeTab = () => {
  const [selections, setSelections] = useState(createInitialSelections);
  const [toastVisible, setToastVisible] = useState(false);
  // groupKey → "default" | "price"
  const [sortModes, setSortModes] = useState({});
  const toastTimerRef = React.useRef(null);

  const toggleSort = useCallback((groupKey) => {
    setSortModes((prev) => ({
      ...prev,
      [groupKey]: prev[groupKey] === "price" ? "default" : "price",
    }));
  }, []);

  const showToast = useCallback(() => {
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleDifficultyChange = (boss, difficultyId, groupKey) => {
    setSelections((prev) => {
      const current = prev[boss.id] ?? {};
      const isSameSelection =
        current.enabled && current.difficultyId === difficultyId;

      // 선택 해제는 항상 허용
      if (isSameSelection) {
        return {
          ...prev,
          [boss.id]: {
            ...current,
            enabled: false,
            difficultyId,
            partySize: clampPartySize(boss, current.partySize, difficultyId),
          },
        };
      }

      // 주간 그룹이고 이미 활성화되어 있지 않은 보스를 새로 활성화하려는 경우
      if (groupKey === "weekly" && !current.enabled) {
        const weeklyCount = countWeeklySelected(prev);
        if (weeklyCount >= MAX_WEEKLY_BOSSES) {
          showToast();
          return prev;
        }
      }

      return {
        ...prev,
        [boss.id]: {
          ...current,
          enabled: true,
          difficultyId,
          partySize: clampPartySize(boss, current.partySize, difficultyId),
        },
      };
    });
  };

  const handlePartySizeChange = (boss, partySize) => {
    setSelections((prev) => ({
      ...prev,
      [boss.id]: {
        ...prev[boss.id],
        partySize: clampPartySize(
          boss,
          partySize,
          prev[boss.id]?.difficultyId ?? boss.difficulties[0]?.id,
        ),
      },
    }));
  };

  const handleSummaryRemove = useCallback((bossId) => {
    setSelections((prev) => {
      const current = prev[bossId];

      if (!current?.enabled) {
        return prev;
      }

      return {
        ...prev,
        [bossId]: {
          ...current,
          enabled: false,
        },
      };
    });
  }, []);

  const summary = useMemo(() => {
    const details = [];

    periodGroups.forEach((group) => {
      group.bosses.forEach((boss) => {
        const selection = selections[boss.id];
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
          difficultyId: difficulty.id,
          difficultyLabel: difficulty.label,
          partySize,
          splitReward,
          weeklyIncome:
            splitReward === null ? null : splitReward * group.weeklyMultiplier,
          monthlyIncome:
            splitReward === null ? null : splitReward * group.monthlyMultiplier,
        });
      });
    });

    return {
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
  }, [selections]);

  const weeklySelectedCount = useMemo(
    () => countWeeklySelected(selections),
    [selections],
  );

  return (
    <ContentWrap>
      {/* 토스트 팝업 */}
      <Toast $visible={toastVisible}>
        주간 최대 처치 가능 보스는 {MAX_WEEKLY_BOSSES}마리 입니다
      </Toast>

      <SummaryStrip>
        <SummaryCard>
          <SummaryLabel>선택한 주간 보스</SummaryLabel>
          <SummaryValue>{summary.selectedCount}개</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>주간 총 수익</SummaryLabel>
          <SummaryValue>{formatMeso(summary.weeklyTotal)}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>월간 총 수익</SummaryLabel>
          <SummaryValue>{formatMeso(summary.monthlyTotal)}</SummaryValue>
        </SummaryCard>
      </SummaryStrip>

      <Section>
        <SectionHeader>
          <SectionTitleWrap>
            <SectionTitle>주간 보스 환산</SectionTitle>
            <SectionDescription>
              선택한 주간 보스만 집계하며, 파티 인원 분배 기준으로 계산합니다.
            </SectionDescription>
          </SectionTitleWrap>
        </SectionHeader>

        {summary.details.length > 0 ? (
          <ResultTable>
            <thead>
              <tr>
                <th>보스</th>
                <th>난이도</th>
                <th>파티</th>
                <th>1인당</th>
                <th>주간</th>
                <th>월간</th>
                <th aria-label="선택 해제" />
              </tr>
            </thead>
            <tbody>
              {summary.details.map((item) => (
                <tr key={item.bossId}>
                  <td>{item.bossName}</td>
                  <td>
                    <ResultDifficultyIcon
                      src={getDifficultyIcon(item.difficultyId)}
                      alt={`${item.difficultyLabel} 난이도`}
                    />
                  </td>
                  <td>{item.partySize}인</td>
                  <td>{formatReward(item.splitReward)}</td>
                  <td>{formatReward(item.weeklyIncome)}</td>
                  <td>{formatReward(item.monthlyIncome)}</td>
                  <ResultActionCell>
                    <SummaryRemoveButton
                      aria-label={`${item.bossName} 선택 해제`}
                      onClick={() => handleSummaryRemove(item.bossId)}
                      type="button"
                    >
                      ×
                    </SummaryRemoveButton>
                  </ResultActionCell>
                </tr>
              ))}
            </tbody>
          </ResultTable>
        ) : (
          <EmptyState>
            주간 보스를 선택하면 주간 / 월간 수익을 계산해서 표시합니다.
          </EmptyState>
        )}
      </Section>

      {periodGroups.map((group) => (
        <Section key={group.key}>
          <SectionHeader>
            <SectionTitleWrap>
              <SectionTitle>
                {group.label}
                {group.key === "weekly" && (
                  <WeeklyCounter
                    $isFull={weeklySelectedCount >= MAX_WEEKLY_BOSSES}
                  >
                    {weeklySelectedCount} / {MAX_WEEKLY_BOSSES}
                  </WeeklyCounter>
                )}
              </SectionTitle>
            </SectionTitleWrap>
            <HeaderLegend>
              <span>난이도</span>
              <SortButtonWrap>
                <span>파티</span>
                <SortButton
                  $active={sortModes[group.key] === "price"}
                  onClick={() => toggleSort(group.key)}
                  type="button"
                >
                  {sortModes[group.key] === "price" ? "가격순 ▼" : "가격순"}
                </SortButton>
              </SortButtonWrap>
            </HeaderLegend>
          </SectionHeader>

          <Rows>
            {getDisplayRows(group, sortModes[group.key]).map((row) => {
              const { boss, difficulties, displayName, rowKey } = row;
              const selection = selections[boss.id];
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
                    <BossNameBlock>
                      <BossName>{displayName}</BossName>
                    </BossNameBlock>
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
                            alt={`${difficulty.label} 난이도`}
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

// ── Animations ──────────────────────────────────────────────────────────────

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

// ── Styled Components ────────────────────────────────────────────────────────

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
`;

const panelCss = css`
  ${ContainerCss};
  padding: 12px;
  color: white;
`;

// 토스트 팝업
const Toast = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 12px 24px;
  border-radius: 8px;
  background: rgba(30, 36, 42, 0.96);
  border: 1px solid rgba(255, 200, 80, 0.55);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 200, 80, 0.12);
  color: #ffe28b;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;

  animation: ${({ $visible }) => ($visible ? fadeInUp : fadeOut)} 0.28s ease
    forwards;
  display: ${({ $visible }) => ($visible ? "block" : "none")};

  /* 사라질 때도 애니메이션 보이도록 */
  ${({ $visible }) =>
    !$visible &&
    css`
      display: block;
      animation: ${fadeOut} 0.28s ease forwards;
    `}
`;

const SummaryStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
  font-size: 12px;
  color: rgba(229, 238, 246, 0.78);
`;

const SummaryValue = styled.div`
  margin-top: 4px;
  color: #ffe28b;
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
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 12px;
  border-radius: 3px;
  border: 1px solid rgba(178, 189, 197, 0.65);
  background: #a5afb5;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);

  @media screen and (max-width: 960px) {
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
  transition:
    background 0.2s,
    color 0.2s;
`;

const SectionDescription = styled.p`
  margin: 0;
  color: rgba(28, 38, 48, 0.82);
  font-size: 12px;
  font-weight: 600;
`;

const HeaderLegend = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 100px;
  gap: 12px;
  min-width: min(100%, 332px);
  color: rgba(24, 34, 43, 0.76);
  font-size: 12px;
  font-weight: 700;

  @media screen and (max-width: 960px) {
    display: none;
  }
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
  padding: 4px 12px;
  border-radius: 3px;
  border: 2px solid #eaebec;
  outline: 1px solid #9aa3a7;
  background: #d1d4d6;
  box-shadow: 0px 2px #9aa3a7;

  @media screen and (max-width: 1200px) {
    grid-template-columns: minmax(180px, 220px) minmax(0, 1fr);
    grid-template-areas:
      "identity party"
      "difficulty difficulty";
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "identity"
      "difficulty"
      "party";
    gap: 10px;
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

const BossNameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
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
  width: 56px;
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
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 100px;

  @media screen and (max-width: 1200px) {
    grid-area: party;
    flex-direction: row;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
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

const SortButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SortButton = styled.button`
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(255, 210, 80, 0.7)" : "rgba(24, 34, 43, 0.35)"};
  background: ${({ $active }) =>
    $active ? "rgba(255, 200, 60, 0.22)" : "rgba(24, 34, 43, 0.12)"};
  color: ${({ $active }) => ($active ? "#b87a00" : "rgba(24, 34, 43, 0.76)")};
  font-size: 11px;
  font-weight: 700;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;

  &:hover {
    background: rgba(255, 200, 60, 0.18);
    border-color: rgba(255, 200, 60, 0.55);
    color: #9a6600;
  }
`;

const ResultTable = styled.table`
  width: 100%;
  margin-top: 10px;
  border-collapse: separate;
  border-spacing: 0 4px;

  thead th {
    padding: 6px 8px;
    color: rgba(227, 236, 243, 0.78);
    font-size: 12px;
    font-weight: 700;
    text-align: left;
  }

  tbody td {
    padding: 10px 8px;
    color: #eff6fb;
    font-size: 13px;
    vertical-align: middle;
    background: rgba(167, 176, 183, 0.18);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.18);
  }

  tbody td:first-child {
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  tbody td:last-child {
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  thead th:last-child,
  tbody td:last-child {
    width: 52px;
    padding-left: 4px;
    padding-right: 4px;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const ResultDifficultyIcon = styled(DifficultyIcon)`
  margin: 0 auto 0 0;
`;

const ResultActionCell = styled.td`
  vertical-align: middle;
`;

const SummaryRemoveButton = styled.button`
  cursor: pointer;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: rgba(160, 0, 18, 0.92);
  font-size: 26px;
  line-height: 1;
  font-weight: 700;

  &:hover {
    background: rgba(160, 0, 18, 0.12);
  }
`;

const EmptyState = styled.div`
  margin-top: 10px;
  padding: 18px;
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.18);
  color: rgba(231, 238, 243, 0.72);
  text-align: center;
  background: rgba(167, 176, 183, 0.08);
`;
