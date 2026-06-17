import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getCombinedData, getOcidApi } from "../../api/api";
import favorite_false from "../../assets/icons/favoriteIcon/favorite_Star_False.svg";
import favorite_true from "../../assets/icons/favoriteIcon/favorite_Star_True.svg";
import { ContainerCss } from "../common/searchCharacter/ContainerBox";
import { expirationCheckPlaceholderSections } from "./expirationCheckDummyData";
import { buildExpirationSections } from "./expirationCheckSectionData";

const FAVORITE_STORAGE_KEY = "checklist-expiration-favorite-characters";

const readFavoriteCharacters = () => {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(FAVORITE_STORAGE_KEY) || "[]",
    );

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const toFavoriteCharacter = (basicInformation) => ({
  characterName: basicInformation?.character_name,
  characterImage: basicInformation?.character_image,
  characterLevel: basicInformation?.character_level,
});

const hasCharacterImage = (characterImage) =>
  Boolean(
    characterImage && characterImage !== "-" && characterImage !== "null",
  );

const CharacterAvatar = ({ characterName, characterImage }) => (
  <CharacterAvatarFrame>
    {hasCharacterImage(characterImage) && (
      <img src={characterImage} alt={`${characterName || "캐릭터"} 이미지`} />
    )}
  </CharacterAvatarFrame>
);

const getValidExpireDate = (expireAt) => {
  const expireDate = new Date(expireAt);
  return Number.isNaN(expireDate.getTime()) ? null : expireDate;
};

const formatExpire = (expireAt) => {
  const expireDate = getValidExpireDate(expireAt);

  if (!expireDate) {
    return "만료 정보 없음";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(expireDate);
};

const formatRemainLabel = (expireAt) => {
  const expireDate = getValidExpireDate(expireAt);

  if (!expireDate) return "없음";

  const diff = expireDate.getTime() - Date.now();
  if (diff < 0) return "만료됨";

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (Number.isNaN(days)) return "-";
  return `D-${days}`;
};

const getRemainTone = (expireAt) => {
  const expireDate = getValidExpireDate(expireAt);

  if (!expireDate) return "empty";

  const diff = expireDate.getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days <= 7) return "danger";
  if (days <= 14) return "warning";
  return "normal";
};

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

export const ExpirationCheckTab = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  const [combinedData, setCombinedData] = useState(null);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    setFavoriteCharacters(readFavoriteCharacters());
  }, []);

  const sections = useMemo(() => {
    if (loading) {
      return expirationCheckPlaceholderSections;
    }

    return combinedData ? buildExpirationSections(combinedData) : [];
  }, [combinedData, loading]);

  const currentFavoriteCharacter = useMemo(
    () => toFavoriteCharacter(combinedData?.getBasicInformation),
    [combinedData],
  );

  const currentCharacterName = currentFavoriteCharacter.characterName;
  const isCurrentFavorite = useMemo(
    () =>
      Boolean(
        currentCharacterName &&
        favoriteCharacters.some(
          (character) => character.characterName === currentCharacterName,
        ),
      ),
    [currentCharacterName, favoriteCharacters],
  );

  const saveFavoriteCharacters = (nextFavorites) => {
    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(nextFavorites));
    setFavoriteCharacters(nextFavorites);
  };

  const toggleFavoriteCharacter = (character) => {
    if (!character?.characterName || loading) {
      return;
    }

    const isFavorite = favoriteCharacters.some(
      (favoriteCharacter) =>
        favoriteCharacter.characterName === character.characterName,
    );
    const nextFavorites = isFavorite
      ? favoriteCharacters.filter(
          (favoriteCharacter) =>
            favoriteCharacter.characterName !== character.characterName,
        )
      : [
          ...favoriteCharacters,
          {
            characterName: character.characterName,
            characterImage: character.characterImage,
            characterLevel: character.characterLevel,
          },
        ];

    saveFavoriteCharacters(nextFavorites);
  };

  const searchCharacter = async (rawCharacterName) => {
    if (loading) {
      return;
    }

    const characterName = rawCharacterName.replace(/\s+/g, "");
    if (!characterName) {
      return;
    }

    setSearchValue(characterName);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await searchCharacter(searchValue);
  };

  const showExpirationArea = hasSearched || loading || combinedData;
  const showCurrentCharacter = Boolean(combinedData) && !loading;
  const showFavoriteGroup =
    favoriteCharacters.length > 0 || !showExpirationArea;

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

      {showFavoriteGroup && (
        <CharacterContextPanel>
          <SectionHeader>
            <SectionTitle>즐겨찾기</SectionTitle>
          </SectionHeader>
          <CharacterContextGroup>
            <FavoriteCharacterList>
              {favoriteCharacters.map((character) => (
                <FavoriteCharacterItem
                  key={character.characterName}
                  type="button"
                  onClick={() => searchCharacter(character.characterName)}
                >
                  <CharacterAvatar
                    characterName={character.characterName}
                    characterImage={character.characterImage}
                  />
                  <FavoriteCharacterName>
                    {character.characterName}
                  </FavoriteCharacterName>
                  <CurrentFavoriteButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteCharacter(character);
                    }}
                    aria-label="즐겨찾기 해제"
                  >
                    <img src={favorite_true} alt="" aria-hidden="true" />
                  </CurrentFavoriteButton>
                </FavoriteCharacterItem>
              ))}
              {favoriteCharacters.length === 0 && (
                <FavoriteEmptyText>
                  현재 저장된 즐겨찾기가 없습니다.
                </FavoriteEmptyText>
              )}
            </FavoriteCharacterList>
          </CharacterContextGroup>
        </CharacterContextPanel>
      )}

      {showCurrentCharacter && (
        <CharacterContextPanel>
          <SectionHeader>
            <SectionTitle>현재 검색</SectionTitle>
          </SectionHeader>
          <CharacterContextGroup>
            <CurrentCharacterCard>
              <CharacterAvatar
                characterName={currentFavoriteCharacter.characterName}
                characterImage={currentFavoriteCharacter.characterImage}
              />
              <CurrentCharacterMeta>
                <CurrentCharacterName>
                  {currentFavoriteCharacter.characterName}
                </CurrentCharacterName>
                <CurrentCharacterLevel>
                  Lv.{currentFavoriteCharacter.characterLevel}
                </CurrentCharacterLevel>
              </CurrentCharacterMeta>
              <CurrentFavoriteButton
                type="button"
                onClick={() =>
                  toggleFavoriteCharacter(currentFavoriteCharacter)
                }
                aria-label={
                  isCurrentFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"
                }
              >
                <img
                  src={isCurrentFavorite ? favorite_true : favorite_false}
                  alt=""
                  aria-hidden="true"
                />
              </CurrentFavoriteButton>
            </CurrentCharacterCard>
          </CharacterContextGroup>
        </CharacterContextPanel>
      )}

      {showExpirationArea && (
        <SectionColumn>
          {sections.length > 0 ? (
            sections.map((section) => (
              <ExpireSection key={section.id}>
                <ExpireSectionTitle>{section.title}</ExpireSectionTitle>
                <ExpireList>
                  {section.items.map((item) => {
                    const hasValidExpireAt = Boolean(
                      item.expireAt && getValidExpireDate(item.expireAt),
                    );
                    const remainTone = hasValidExpireAt
                      ? getRemainTone(item.expireAt)
                      : (item.badgeTone ?? getRemainTone(item.expireAt));

                    return (
                      <ExpireCard
                        key={item.id}
                        $blurred={loading}
                        $alertTone={item.alertTone}
                        $remainTone={remainTone}
                      >
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
                          <RemainBadge $tone={remainTone}>
                            {hasValidExpireAt
                              ? formatRemainLabel(item.expireAt)
                              : (item.badgeLabel ??
                                formatRemainLabel(item.expireAt))}
                          </RemainBadge>
                        </ExpireCardTop>
                        <ExpireMeta>
                          {item.slot} | {item.detail}
                        </ExpireMeta>
                        <ExpireDate
                          $isEmpty={!hasValidExpireAt}
                          $tone={remainTone}
                        >
                          {hasValidExpireAt
                            ? formatExpire(item.expireAt)
                            : (item.emptyMessage ??
                              formatExpire(item.expireAt))}
                        </ExpireDate>
                        {item.extraLines?.length > 0 && (
                          <ExpireExtraList>
                            {item.extraLines.map((line, index) => (
                              <ExpireExtraLine
                                key={`${item.id}-extra-${index}`}
                              >
                                {line}
                              </ExpireExtraLine>
                            ))}
                          </ExpireExtraList>
                        )}
                      </ExpireCard>
                    );
                  })}
                </ExpireList>
              </ExpireSection>
            ))
          ) : (
            <EmptyPanel>현재 확인할 기간 만료 정보가 없습니다.</EmptyPanel>
          )}
        </SectionColumn>
      )}
      {false && (
        <GuidePanel>
          기간 만료 체크 탭에서 닉네임을 검색하면 만료 예정 항목을 보여줍니다.
        </GuidePanel>
      )}
    </ContentWrap>
  );
};

const panelCss = `
  ${ContainerCss};
  padding: 8px;
  color: white;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchPanel = styled.form`
  ${panelCss}
`;

const SearchLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);

  @media screen and (max-width: 960px) {
    margin-bottom: 6px;
    font-size: 12px;
  }
`;

const SearchRow = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    gap: 7px;
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
  box-sizing: border-box;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.2;

  @media screen and (max-width: 960px) {
    flex: none;
    width: 100%;
    height: 36px;
    min-height: 0;
    padding: 0 12px;
    border-radius: 12px;
    font-size: 13px;
  }
`;

const SearchButton = styled.button`
  cursor: pointer;
  min-width: 140px;
  height: 44px;
  padding: 0 18px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(
    180deg,
    rgba(54, 184, 208, 0.95) 0%,
    rgba(34, 149, 184, 0.95) 100%
  );
  color: #ffffff;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.72;
  }

  @media screen and (max-width: 960px) {
    flex: none;
    width: 100%;
    min-width: 0;
    height: 36px;
    min-height: 0;
    padding: 0 12px;
    border-radius: 12px;
    font-size: 13px;
  }
`;

const SearchHint = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.45;

  @media screen and (max-width: 960px) {
    margin-top: 8px;
    font-size: 12px;
    line-height: 1.35;
  }
`;

const ErrorText = styled.div`
  ${panelCss}
  border-color: rgba(214, 74, 74, 0.65);
  color: #ffd4d4;
`;

const CharacterContextPanel = styled.div`
  ${panelCss}
  display: flex;
  flex-direction: column;
  gap: 7px;
  background: rgba(24, 33, 40, 0.78);
`;

const CharacterContextGroup = styled.section`
  min-width: 0;
`;

const SectionHeader = styled.div`
  padding: 6px 12px;
  border-radius: 3px;
  border: 1px solid rgba(178, 189, 197, 0.65);
  background: #8f979c;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);

  @media screen and (max-width: 1200px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #f7f7f2;
  font-size: 19px;
  font-weight: 700;
  text-shadow: 0 1px 0 rgb(0, 0, 0);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const FavoriteCharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FavoriteCharacterItem = styled.button`
  min-width: 140px;
  max-width: 180px;
  padding: 6px 8px;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(94, 210, 232, 0.4);
    background: rgba(255, 255, 255, 0.14);
  }
`;

const CharacterAvatarFrame = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  overflow: hidden;

  img {
    width: 45px;
    height: 45px;
    object-fit: none;
    image-rendering: pixelated;
    transform: translate(-6%, -10%) scaleX(-1);
  }
`;

const FavoriteCharacterName = styled.div`
  min-width: 0;
  font-size: 14px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

const CurrentCharacterCard = styled.div`
  min-width: 220px;
  width: fit-content;
  max-width: 100%;
  padding: 6px 8px;
  border-radius: 7px;
  border: 1px solid rgba(122, 242, 255, 0.88);
  background:
    linear-gradient(180deg, rgba(67, 202, 226, 0.2), rgba(255, 255, 255, 0.08)),
    rgba(255, 255, 255, 0.08);
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 0 16px rgba(88, 222, 245, 0.46),
    0 12px 32px rgba(0, 0, 0, 0.18);
`;

const CurrentCharacterMeta = styled.div`
  min-width: 0;
  flex: 1;
`;

const CurrentCharacterName = styled.div`
  font-size: 14px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CurrentCharacterLevel = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
`;

const CurrentFavoriteButton = styled.button`
  width: 28px;
  height: 28px;
  padding: 4px;
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.28);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  img {
    width: 20px;
    height: 20px;
    display: block;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.46);
  }
`;

const FavoriteEmptyText = styled.div`
  width: 100%;
  padding: 16px 10px;
  border-radius: 8px;
  background: rgba(15, 21, 26, 0.38);
  color: rgba(255, 255, 255, 0.72);
  text-align: center;
  font-size: 14px;
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
  gap: 5px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExpireCard = styled.article`
  padding: 12px;
  border-radius: 10px;
  background: rgba(15, 21, 26, 0.5);
  border: 1px solid
    ${({ $alertTone, $remainTone }) =>
      $alertTone === "danger" || $remainTone === "danger"
        ? "rgba(255, 79, 79, 0.9)"
        : $remainTone === "warning"
          ? "rgba(255, 196, 22, 0.72)"
          : "rgba(255, 255, 255, 0.08)"};
  box-shadow: ${({ $alertTone, $remainTone }) =>
    $alertTone === "danger" || $remainTone === "danger"
      ? "0 0 0 1px rgba(255, 79, 79, 0.22), 0 0 16px rgba(214, 74, 74, 0.22)"
      : $remainTone === "warning"
        ? "0 0 0 1px rgba(255, 196, 22, 0.14), 0 0 14px rgba(255, 196, 22, 0.14)"
        : "none"};
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
  margin-top: 2px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
`;

const ExpireDate = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: ${({ $isEmpty, $tone }) => {
    if ($isEmpty) return "rgba(255, 255, 255, 0.64)";
    if ($tone === "danger") return "#ffd1d1";
    if ($tone === "warning") return "#ffdf69";
    return "#fff2be";
  }};
`;

const ExpireExtraList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

const ExpireExtraLine = styled.div`
  font-size: 12px;
  line-height: 1.45;
  color: rgba(255, 191, 102, 0.92);
  word-break: break-word;
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
