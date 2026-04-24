import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { getCombinedData, getOcidApi } from "../../api/api";
import { ContainerCss } from "../common/searchCharacter/ContainerBox";
import { CharacterPreviewCard } from "../common/CharacterPreviewCard";
import {
  expirationCheckDummyCharacter,
  expirationCheckPlaceholderSections,
} from "./expirationCheckDummyData";
import { getUnionArtifactIcon } from "../user/union/unionArtifact/getUnionArtifactIcon";

const CASH_TRACKED_PARTS = [
  "얼굴장식",
  "눈장식",
  "귀고리",
  "장갑",
  "무기",
  "모자",
  "망토",
];

const UNION_ARTIFACT_NAMES = [
  "크리스탈 : 주황버섯",
  "크리스탈 : 슬라임",
  "크리스탈 : 뿔버섯",
  "크리스탈 : 스텀프",
  "크리스탈 : 스톤골렘",
  "크리스탈 : 발록",
  "크리스탈 : 자쿰",
  "크리스탈 : 핑크빈",
  "크리스탈 : 파풀라투스",
];

const formatExpire = (expireAt) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(expireAt));

const formatRemainLabel = (expireAt) => {
  const diff = new Date(expireAt).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (Number.isNaN(days)) return "-";
  if (days < 0) return `D+${Math.abs(days)}`;
  return `D-${days}`;
};

const getRemainTone = (expireAt) => {
  const diff = new Date(expireAt).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days <= 1) return "danger";
  if (days <= 7) return "warning";
  return "normal";
};

const normalizeLabel = (value) => value?.replace(/\s+/g, " ").trim() ?? "";

const createEmptyCard = ({
  id,
  name,
  icon = null,
  slot,
  detail,
  emptyMessage,
}) => ({
  id,
  name,
  icon,
  slot,
  detail,
  expireAt: null,
  badgeLabel: "없음",
  badgeTone: "empty",
  emptyMessage,
});

const createInformationalCard = ({
  id,
  name,
  icon = null,
  slot,
  detail,
  emptyMessage,
}) => ({
  id,
  name,
  icon,
  slot,
  detail,
  expireAt: null,
  badgeLabel: "없음",
  badgeTone: "muted",
  emptyMessage,
});

const getAllCaseCombinations = (value) => {
  if (!value.length) {
    return [""];
  }

  const first = value[0];
  const rest = getAllCaseCombinations(value.slice(1));
  const next = [];

  rest.forEach((entry) => {
    next.push(first.toLowerCase() + entry);
    next.push(first.toUpperCase() + entry);
  });

  return next;
};

const resolveOcid = async (characterName) => {
  const isKorean = /^[가-힣]+$/.test(characterName);
  const candidates = isKorean
    ? [characterName]
    : [characterName, ...getAllCaseCombinations(characterName).slice(0, 20)];

  for (const candidate of candidates) {
    const ocidData = await getOcidApi(candidate);
    if (ocidData?.ocid) {
      return ocidData.ocid;
    }
  }

  return null;
};

const buildExpirationSections = (combinedData) => {
  const sections = [];
  const titleEquipment = combinedData?.getItemEquipment?.title;
  const cashEquipment = combinedData?.getCashItemEquipment ?? {};
  const cashSectionKeys = [
    {
      key: "cash_item_equipment_base",
      label: "캐시",
    },
    {
      key: "cash_item_equipment_preset_1",
      label: "캐시 프리셋 1",
    },
    {
      key: "cash_item_equipment_preset_2",
      label: "캐시 프리셋 2",
    },
    {
      key: "cash_item_equipment_preset_3",
      label: "캐시 프리셋 3",
    },
  ];

  cashSectionKeys.forEach(({ key, label }) => {
    const itemsByPart = new Map(
      (cashEquipment[key] ?? []).map((item) => [
        normalizeLabel(item?.cash_item_equipment_part),
        item,
      ]),
    );

    const items = CASH_TRACKED_PARTS.map((part) => {
      const item = itemsByPart.get(part);

      if (!item) {
        return createEmptyCard({
          id: `${key}-${part}`,
          name: part,
          slot: part,
          detail: "장착 안 함",
          emptyMessage: "해당 캐시 슬롯에 아이템이 없습니다.",
        });
      }

      if (!item.date_option_expire) {
        return createInformationalCard({
          id: `${key}-${part}`,
          name: item.cash_item_name || part,
          icon: item.cash_item_icon,
          slot: part,
          detail: "만료 정보 없음",
          emptyMessage: "옵션 만료 정보가 없습니다.",
        });
      }

      return {
        id: `${key}-${part}`,
        name: item.cash_item_name || part,
        icon: item.cash_item_icon,
        slot: part,
        expireAt: item.date_option_expire,
        detail: "옵션 유효 기간",
      };
    });

    sections.push({ id: key, title: label, items });
  });

  const hasTitleData = Boolean(
    titleEquipment?.title_name ||
    titleEquipment?.title_icon ||
    titleEquipment?.date_option_expire,
  );

  sections.push({
    id: "title",
    title: "칭호",
    items: [
      !hasTitleData
        ? createEmptyCard({
            id: "title",
            name: "칭호",
            slot: "칭호",
            detail: "장착 안 함",
            emptyMessage: "장착한 칭호가 없습니다.",
          })
        : titleEquipment?.date_option_expire
          ? {
              id: "title-option-expire",
              name: titleEquipment.title_name || "칭호",
              icon: titleEquipment.title_icon,
              slot: "칭호",
              expireAt: titleEquipment.date_option_expire,
              detail: "유효 기간",
            }
          : createInformationalCard({
              id: "title-option-expire",
              name: titleEquipment.title_name || "칭호",
              icon: titleEquipment.title_icon,
              slot: "칭호",
              detail: "만료 정보 없음",
              emptyMessage: "칭호 만료 정보가 없습니다.",
            }),
    ],
  });

  const artifactByName = new Map(
    (combinedData?.getUnionArtiFact?.union_artifact_crystal ?? []).map(
      (artifact) => [normalizeLabel(artifact?.name), artifact],
    ),
  );

  const artifactItems = UNION_ARTIFACT_NAMES.map((artifactName) => {
    const artifact = artifactByName.get(normalizeLabel(artifactName));

    if (!artifact) {
      return createEmptyCard({
        id: artifactName,
        name: artifactName,
        slot: "유니온 아티팩트",
        detail: "보유하지 않음",
        emptyMessage: "해당 아티팩트를 보유하고 있지 않습니다.",
      });
    }

    if (!artifact.date_expire) {
      return createInformationalCard({
        id: artifactName,
        name: artifact.name || artifactName,
        icon: getUnionArtifactIcon(artifact.name, artifact.level),
        slot: artifact.level ? `Lv.${artifact.level}` : "유니온 아티팩트",
        detail: "만료 정보 없음",
        emptyMessage: "아티팩트 만료 정보가 없습니다.",
      });
    }

    return {
      id: artifactName,
      name: artifact.name || artifactName,
      icon: getUnionArtifactIcon(artifact.name, artifact.level),
      slot: artifact.level ? `Lv.${artifact.level}` : "유니온 아티팩트",
      expireAt: artifact.date_expire,
      detail: "아티팩트 만료 기간",
    };
  });

  sections.push({
    id: "union-artifact",
    title: "유니온 아티팩트",
    items: artifactItems,
  });

  const petEquipment = combinedData?.getPetEquipment ?? {};
  const petItems = [1, 2, 3].map((index) => {
    const petName =
      petEquipment[`pet_${index}_nickname`] ||
      petEquipment[`pet_${index}_name`] ||
      `펫 ${index}`;
    const petIcon = petEquipment[`pet_${index}_appearance_icon`] || null;
    const petType = petEquipment[`pet_${index}_pet_type`] || `펫 ${index}`;
    const petExpireAt = petEquipment[`pet_${index}_date_expire`] || null;
    const hasPetData = Boolean(
      petEquipment[`pet_${index}_nickname`] ||
      petEquipment[`pet_${index}_name`] ||
      petEquipment[`pet_${index}_appearance`] ||
      petIcon,
    );

    if (!hasPetData) {
      return createEmptyCard({
        id: `pet-${index}`,
        name: `펫 ${index}`,
        slot: petType,
        detail: "장착 안 함",
        emptyMessage: "해당 펫 슬롯이 비어 있습니다.",
      });
    }

    if (!petExpireAt) {
      return createInformationalCard({
        id: `pet-${index}`,
        name: petName,
        icon: petIcon,
        slot: petType,
        detail: "마법의 시간 만료 기간",
        emptyMessage: "펫 만료 정보가 없습니다.",
      });
    }

    return {
      id: `pet-${index}`,
      name: petName,
      icon: petIcon,
      slot: petType,
      expireAt: petExpireAt,
      detail: "마법의 시간 만료 기간",
    };
  });

  sections.push({
    id: "pets",
    title: "펫",
    items: petItems,
  });

  return sections;
};

export const ExpirationCheckTab = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  const [combinedData, setCombinedData] = useState(null);

  const sections = useMemo(() => {
    if (loading) {
      return expirationCheckPlaceholderSections;
    }

    return combinedData ? buildExpirationSections(combinedData) : [];
  }, [combinedData, loading]);

  const characterPreview = useMemo(() => {
    if (loading || !combinedData) {
      return expirationCheckDummyCharacter;
    }

    return combinedData.getBasicInformation;
  }, [combinedData, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const characterName = searchValue.replace(/\s+/g, "");
    if (!characterName) {
      return;
    }

    const isChosung = /^[ㄱ-ㅎ]+$/.test(characterName);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(characterName);

    if (isChosung) {
      setError("초성만으로는 검색할 수 없습니다.");
      setCombinedData(null);
      setHasSearched(true);
      return;
    }

    if (hasSpecialChar) {
      setError("특수문자가 포함된 닉네임은 검색할 수 없습니다.");
      setCombinedData(null);
      setHasSearched(true);
      return;
    }

    try {
      setHasSearched(true);
      setLoading(true);
      setError(null);
      setCombinedData(null);

      const ocid = await resolveOcid(characterName);
      if (!ocid) {
        throw new Error("캐릭터를 찾지 못했습니다.");
      }

      const nextCombinedData = await getCombinedData(ocid);
      if (!nextCombinedData?.getBasicInformation) {
        throw new Error("기본 정보를 가져오지 못했습니다.");
      }

      setCombinedData(nextCombinedData);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  const showResultArea = hasSearched || loading || combinedData;

  return (
    <ContentWrap>
      <SearchPanel onSubmit={handleSubmit}>
        <SearchLabel htmlFor="checklist-character-search">
          캐릭터 닉네임
        </SearchLabel>
        <SearchRow>
          <SearchInput
            id="checklist-character-search"
            type="text"
            value={searchValue}
            maxLength={15}
            placeholder="닉네임을 입력하세요"
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <SearchButton type="submit" disabled={loading}>
            {loading ? "검색 중..." : "검색"}
          </SearchButton>
        </SearchRow>
        <SearchHint>
          캐시 옵션, 칭호, 유니온 아티팩트, 펫의 만료 정보를 한 번에 정리합니다.
        </SearchHint>
      </SearchPanel>

      {error && <ErrorText>{error}</ErrorText>}

      {showResultArea ? (
        <ResultGrid>
          <InfoCard>
            <CharacterPreviewCard
              characterName={characterPreview?.character_name}
              characterImage={characterPreview?.character_image}
              characterLevel={characterPreview?.character_level}
              blur={loading}
            />
          </InfoCard>

          <SectionColumn>
            {sections.length > 0 ? (
              sections.map((section) => (
                <ExpireSection key={section.id}>
                  <ExpireSectionTitle>{section.title}</ExpireSectionTitle>
                  <ExpireList>
                    {section.items.map((item) => (
                      <ExpireCard key={item.id} $blurred={loading}>
                        <ExpireCardTop>
                          <ExpireItemHeading>
                            {item.icon && (
                              <ExpireIcon
                                src={item.icon}
                                alt={`${item.name} 아이콘`}
                              />
                            )}
                            <ExpireName>{item.name}</ExpireName>
                          </ExpireItemHeading>
                          <RemainBadge
                            $tone={
                              item.expireAt
                                ? getRemainTone(item.expireAt)
                                : item.badgeTone
                            }
                          >
                            {item.expireAt
                              ? formatRemainLabel(item.expireAt)
                              : item.badgeLabel}
                          </RemainBadge>
                        </ExpireCardTop>
                        <ExpireMeta>
                          {item.slot} | {item.detail}
                        </ExpireMeta>
                        <ExpireDate $isEmpty={!item.expireAt}>
                          {item.expireAt
                            ? formatExpire(item.expireAt)
                            : item.emptyMessage}
                        </ExpireDate>
                      </ExpireCard>
                    ))}
                  </ExpireList>
                </ExpireSection>
              ))
            ) : (
              <EmptyPanel>현재 확인할 기간 만료 정보가 없습니다.</EmptyPanel>
            )}
          </SectionColumn>
        </ResultGrid>
      ) : (
        <GuidePanel>
          기간 만료 체크 탭에서 닉네임을 검색하면 만료 예정 항목을 보여줍니다.
        </GuidePanel>
      )}
    </ContentWrap>
  );
};

const panelCss = `
  ${ContainerCss};
  padding: 14px;
  color: white;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SearchPanel = styled.form`
  ${panelCss}
`;

const SearchLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
`;

const SearchRow = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.92);
  color: rgb(0, 0, 0);
  outline: none;
`;

const SearchButton = styled.button`
  cursor: pointer;
  min-width: 140px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: ${({ theme }) => theme.tabActiveColor};
  color: ${({ theme }) => theme.tabActiveTextColor};

  &:disabled {
    cursor: wait;
    opacity: 0.72;
  }
`;

const SearchHint = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.45;
`;

const ErrorText = styled.div`
  ${panelCss}
  border-color: rgba(214, 74, 74, 0.65);
  color: #ffd4d4;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(290px, 360px) minmax(0, 1fr);
  gap: 12px;
  align-items: start;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  ${panelCss}

  > div {
    width: 100%;
  }
`;

const SectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ExpireSection = styled.section`
  ${panelCss}
`;

const ExpireSectionTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 17px;
  color: rgb(220, 252, 2);
`;

const ExpireList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExpireCard = styled.article`
  padding: 12px;
  border-radius: 10px;
  background: rgba(15, 21, 26, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  filter: ${({ $blurred }) => ($blurred ? "blur(12px)" : "blur(0)")};
  opacity: ${({ $blurred }) => ($blurred ? 0.7 : 1)};
  transition:
    filter 0.45s ease,
    opacity 0.45s ease;
`;

const ExpireCardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ExpireItemHeading = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 8px;
`;

const ExpireIcon = styled.img`
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
`;

const ExpireName = styled.div`
  min-width: 0;
  font-size: 15px;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

const RemainBadge = styled.span`
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  background: ${({ $tone }) => {
    if ($tone === "danger") return "rgba(214, 74, 74, 0.22)";
    if ($tone === "warning") return "rgba(255, 196, 22, 0.22)";
    return "rgba(141, 199, 209, 0.2)";
  }};
  color: ${({ $tone }) => {
    if ($tone === "danger") return "#ffd1d1";
    if ($tone === "warning") return "#ffefb0";
    if ($tone === "empty") return "#d4d9df";
    if ($tone === "muted") return "#bfe7ff";
    return "#d8f4ff";
  }};
`;

const ExpireMeta = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
`;

const ExpireDate = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: ${({ $isEmpty }) =>
    $isEmpty ? "rgba(255, 255, 255, 0.64)" : "#fff2be"};
`;

const EmptyPanel = styled.div`
  ${panelCss}
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
`;

const GuidePanel = styled.div`
  ${panelCss}
  text-align: center;
  color: rgba(255, 255, 255, 0.74);
`;
