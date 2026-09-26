import React from "react";
import styled from "styled-components";
import {
  BossIconWrap,
  BossIcon,
  DifficultyIcon,
  getDifficultyIcon,
} from "./BossVisuals";

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
              <Members>
                <Member>
                  <span>본인</span>
                  <NameInput
                    value={summary.nickname}
                    readOnly
                    aria-label={`${boss.bossName} 본인`}
                  />
                </Member>
                {Array.from({ length: boss.partySize - 1 }, (_, index) => (
                  <Member key={index}>
                    <span>파티원 {index + 2}</span>
                    <NameInput
                      value={boss.partyMembers[index] || ""}
                      onChange={(event) =>
                        onMemberChange(
                          summary.characterId,
                          boss.bossId,
                          index,
                          event.target.value,
                        )
                      }
                      placeholder="닉네임 입력"
                      aria-label={`${boss.bossName} 파티원 ${index + 2}`}
                      maxLength={15}
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </Member>
                ))}
              </Members>
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
  background: #ffffff;
  border: 1px solid #d0dce5;
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
  font-size: 14px;
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
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 9px;
  margin-top: 12px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const Member = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
  span {
    font-size: 13px;
    color: #5c7181;
  }
`;
const NameInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 40px;
  padding: 8px 10px;
  border: 1px solid #b5c6d2;
  border-radius: 4px;
  background: white;
  color: #24476a;
  font-size: 16px;
  &:read-only {
    background: #e9eff4;
    color: #627989;
  }
  &:focus-visible {
    outline: 2px solid #348ca6;
    outline-offset: 1px;
  }
`;
const Empty = styled.p`
  margin: 0;
  padding: 8px;
  font-size: 13px;
  line-height: 1.7;
  text-align: center;
`;
