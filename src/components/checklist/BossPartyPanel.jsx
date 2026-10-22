import {
  CHARACTER_NAME_MAX_LENGTH,
  normalizeCharacterName,
} from "../../utils/characterName";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Leaf, Star, X } from "lucide-react";
import { useLatestQuery } from "../../hooks/useLatestQuery";
import {
  loadPartyProfile,
  getCachedPartyProfile,
  formatCombatPower,
} from "../../api/partyProfile";
import {
  BossIconWrap,
  BossIcon,
  DifficultyIcon,
  getDifficultyIcon,
} from "./BossVisuals";

const PartyMember = ({ name, label, isSelf = false, onChange }) => {
  const normalizedName = normalizeCharacterName(name);
  // 이미 저장된 이름은 입력 대기 없이 조회하고, 수정 중인 이름만 700ms 기다림
  const [submitted, setSubmitted] = useState(() =>
    normalizedName ? { name: normalizedName } : null,
  );
  const [composing, setComposing] = useState(false);
  // 한글 조합 중에는 기다리고, 입력이 멈춘 뒤에만 조회함
  useEffect(() => {
    if (!normalizedName || composing || submitted?.name === normalizedName)
      return;
    const timer = setTimeout(() => setSubmitted({ name: normalizedName }), 700);
    return () => clearTimeout(timer);
  }, [normalizedName, composing, submitted]);
  // 입력값이 바뀌는 즉시 이전 조회를 취소하고 오래된 프로필을 숨김
  const key =
    submitted?.name === normalizedName ? JSON.stringify(submitted) : null;
  const query = useLatestQuery(key, loadPartyProfile);
  // 캐시를 첫 렌더부터 사용해 접기/더보기에서 값과 이미지가 깜빡이지 않게 함
  const result = query.result ?? getCachedPartyProfile(normalizedName);
  const loading = query.loading && !result;
  const error = query.error;
  const [failedImage, setFailedImage] = useState(null);
  const imageUrl = result?.characterImage;
  const search = () => {
    if (!normalizedName || loading) return;
    setSubmitted((previous) => ({
      name: normalizedName,
      attempt: (previous?.attempt ?? 0) + 1,
    }));
  };
  const changeName = (value) => {
    if (normalizeCharacterName(value) !== normalizedName) setSubmitted(null);
    onChange(value);
  };

  return (
    <Member $filled={Boolean(name.trim())}>
      <NameCell>
        <SlotMark $filled={Boolean(name.trim())}>
          {isSelf ? (
            <Star size={18} fill="#ffe55b" color="#b59524" aria-label="본인" />
          ) : imageUrl && failedImage !== imageUrl ? (
            <MemberImage
              src={imageUrl}
              alt=""
              onError={() => setFailedImage(imageUrl)}
            />
          ) : (
            <Leaf size={18} aria-hidden="true" />
          )}
        </SlotMark>
        <NameInput
          value={name}
          readOnly={isSelf}
          onChange={(event) => changeName(event.target.value)}
          onCompositionStart={() => setComposing(true)}
          onCompositionEnd={() => setComposing(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              event.preventDefault();
              search();
            }
          }}
          placeholder="닉네임 입력"
          aria-label={label}
          maxLength={CHARACTER_NAME_MAX_LENGTH}
          autoComplete="off"
          spellCheck={false}
        />
      </NameCell>
      <MemberStat data-label="레벨">{result?.level ?? "—"}</MemberStat>
      <MemberStat data-label="직업">{result?.job || "—"}</MemberStat>
      <MemberStat data-label="전투력" title={result?.combatPower ?? undefined}>
        {formatCombatPower(result?.combatPower)}
      </MemberStat>
      <MemberActions>
        {!isSelf && name && (
          <RemoveButton
            type="button"
            aria-label={`${label} 삭제`}
            onClick={() => changeName("")}
          >
            <X size={16} />
          </RemoveButton>
        )}
      </MemberActions>
      {loading && <RowMessage role="status">캐릭터 정보 조회 중…</RowMessage>}
      {error && <RowMessage role="alert">{error}</RowMessage>}
    </Member>
  );
};

const PartyMembers = ({ boss, summary, onMemberChange }) => {
  const listRef = useRef(null);
  // 인원을 줄여도 보관 중인 닉네임은 삭제하지 않음. 현재 보이는 자리만 집계함
  const members = Array.from(
    { length: boss.partySize - 1 },
    (_, index) => boss.partyMembers[index] || "",
  );
  const registeredCount = 1 + members.filter((name) => name.trim()).length;

  const focusEmptySlot = () => {
    const inputs = [
      ...listRef.current.querySelectorAll("input:not([readonly])"),
    ];
    (inputs.find((input) => !input.value.trim()) || inputs[0])?.focus();
  };

  return (
    <>
      <ListToolbar>
        <span>파티원 목록</span>
        <CountBadge>
          {registeredCount} / {boss.partySize}
        </CountBadge>
      </ListToolbar>
      <Members ref={listRef}>
        <TableHeading aria-hidden="true">
          <span>캐릭터 이름</span>
          <span>레벨</span>
          <span>직업</span>
          <span>전투력</span>
          <span>관리</span>
        </TableHeading>
        <PartyMember
          name={summary.nickname}
          label={`${boss.bossName} 본인`}
          isSelf
        />
        {members.map((name, index) => (
          <PartyMember
            key={index}
            name={name}
            label={`${boss.bossName} 파티원 ${index + 2}`}
            onChange={(value) =>
              onMemberChange(summary.characterId, boss.bossId, index, value)
            }
          />
        ))}
      </Members>
      <PartyFooter>
        <FooterHint>
          닉네임 입력 후 자동 조회해요. 실패하면 Enter로 다시 조회할 수 있어요.
        </FooterHint>
        <InviteButton type="button" onClick={focusEmptySlot}>
          파티원 입력
        </InviteButton>
      </PartyFooter>
    </>
  );
};

export const BossPartyPanel = ({ summary, onMemberChange, id }) => {
  const bosses = summary.details.filter((boss) => boss.partySize >= 2);

  return (
    <Panel id={id} aria-label={`${summary.nickname} 파티원 구성`}>
      {bosses.length ? (
        <>
          <Hint>
            선택한 보스 중 2인 이상인 파티만 표시돼요. 입력한 닉네임은 이
            브라우저에 자동 저장돼요.
          </Hint>
          {bosses.map((boss) => (
            <PartyRow key={boss.bossId}>
              <BossHeading>
                <BossIconWrap>
                  <BossIcon src={boss.bossIcon} alt="" />
                </BossIconWrap>
                <strong>{boss.bossName}</strong>
                <DifficultyIcon
                  src={getDifficultyIcon(boss.difficultyId)}
                  alt={`${boss.difficultyLabel} 난이도`}
                />
                <PartyCount>{boss.partySize}인</PartyCount>
              </BossHeading>
              <PartyMembers
                boss={boss}
                summary={summary}
                onMemberChange={onMemberChange}
              />
            </PartyRow>
          ))}
        </>
      ) : (
        <Empty>
          2인 이상으로 설정한 보스가 없어요. 아래 보스 목록에서 보스를 선택하고
          인원을 변경해주세요.
        </Empty>
      )}
    </Panel>
  );
};

const Panel = styled.div`
  box-sizing: border-box;
  width: calc(100% + 2px);
  margin-left: -1px;
  padding: 10px;
  background: #edf2f6;
  border: 1px solid #91a6b5;
  border-top: 0;
  border-radius: 0 0 5px 5px;
  color: #344a5a;
`;
const Hint = styled.p`
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 1.6;
  color: #5c7181;
`;
const PartyRow = styled.div`
  padding: 12px;
  background: #eee;
  border: 1px solid #939da3;
  box-shadow:
    inset 0 1px 0 white,
    0 2px 0 #a5adb1;
  border-radius: 6px;
  & + & {
    margin-top: 10px;
  }
`;
const BossHeading = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  font-size: 16px;
  strong {
    color: #24476a;
  }
`;
const PartyCount = styled.span`
  margin-left: auto;
  font-size: 12px;
  font-weight: 700;
  color: #5c7181;
`;
const Members = styled.div`
  display: grid;
  gap: 3px;
`;
const Member = styled.div`
  display: grid;
  grid-template-columns:
    minmax(140px, 1fr) minmax(40px, 0.5fr) minmax(65px, 1fr)
    minmax(80px, 1.2fr) 64px;
  align-items: center;
  gap: 8px;
  min-width: 0;
  min-height: 48px;
  padding: 3px 10px;
  border: 1px solid #939fa6;
  border-radius: 4px;
  background: ${({ $filled }) => ($filled ? "#d1d6d9" : "#d8dcde")};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
  &:focus-within {
    outline: 2px solid #35afc4;
    outline-offset: 1px;
  }
  @media (max-width: 680px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4px;
    padding: 3px 5px;
  }
`;
const TableHeading = styled(Member)`
  min-height: 36px;
  background: #9daab1;
  color: white;
  text-align: center;
  font-size: 16px;
  text-shadow: 0 1px 1px #667680;
  > span:first-child {
    text-align: left;
    /* 이미지 자리 32px + 간격 6px + 입력창 테두리와 여백 4px에 맞춤 */
    padding-left: 42px;
  }
  @media (max-width: 680px) {
    display: none;
  }
`;
const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  > svg {
    flex-shrink: 0;
  }
  @media (max-width: 680px) {
    grid-column: 1 / -1;
    grid-row: 1;
    padding-right: 68px;
  }
`;
const NameInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 40px;
  padding: 6px 3px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: #000000;
  font-size: 16px;
  font-family: inherit;
  &:read-only {
    color: #000000;
  }
  &:focus-visible {
    outline: none;
    background: #eef8fa;
    border-color: #67b7c5;
  }
`;
const ListToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 14px 3px 9px;
  color: #727e86;
  font-size: 13px;
  font-weight: bold;
`;
const CountBadge = styled.span`
  min-width: 54px;
  padding: 2px 8px;
  border-radius: 20px;
  background: white;
  box-shadow: inset 0 1px 2px #aeb8be;
  text-align: center;
`;
const MemberStat = styled.span`
  text-align: center;
  color: #000000;
  font-size: 14px;
  overflow-wrap: anywhere;
  @media (max-width: 680px) {
    grid-row: 2;
    padding: 4px 0;
    &::before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      color: #7d8a92;
      margin-bottom: 3px;
    }
  }
`;
const MemberActions = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 680px) {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
  }
`;
const RowMessage = styled.div`
  grid-column: 1 / -1;
  color: #6b5260;
  font-size: 12px;
  padding: 2px 4px 6px;
`;
const SlotMark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 5px;
  flex-shrink: 0;
  color: ${({ $filled }) => ($filled ? "#69a125" : "#a8b4bb")};
`;
const MemberImage = styled.img`
  width: 45px;
  height: 45px;
  flex-shrink: 0;
  object-fit: none;
  image-rendering: pixelated;
  transform: translate(-6%, -10%) scaleX(-1);
`;
const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  width: 32px;
  flex-shrink: 0;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #000000;
  cursor: pointer;
  &:hover {
    background: #eef1f3;
    color: #c34f52;
  }
  &:focus-visible {
    outline: 2px solid #35afc4;
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;
const PartyFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;
const FooterHint = styled.span`
  color: #76858e;
  font-size: 12px;
`;
const InviteButton = styled.button`
  min-height: 36px;
  padding: 6px 20px;
  border: 1px solid #24899e;
  border-radius: 5px;
  background: linear-gradient(#40bfd0, #1b9db7);
  box-shadow:
    inset 0 1px 0 #a5e9f1,
    0 2px 0 #6c858f;
  color: white;
  font: inherit;
  font-size: 14px;
  text-shadow: 0 1px 1px #46747f;
  cursor: pointer;
  &:hover {
    filter: brightness(1.06);
  }
  &:focus-visible {
    outline: 2px solid #155d73;
    outline-offset: 2px;
  }
`;
const Empty = styled.p`
  margin: 0;
  padding: 8px;
  font-size: 13px;
  line-height: 1.7;
  text-align: center;
`;
