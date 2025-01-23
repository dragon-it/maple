import React from "react";
import styled from "styled-components";
import epic_Icon from "../../../assets/optionIcon/Option.epic.png";
import legendary_Icon from "../../../assets/optionIcon/Option.legendary.png";
import rare_Icon from "../../../assets/optionIcon/Option.rare.png";
import unique_Icon from "../../../assets/optionIcon/Option.unique.png";
import iconBackground from "../../../assets/optionIcon/Item.ItemIcon.base.png";
import starForce_Icon from "../../../assets/optionIcon/starForceIcon.png";
import rare_Border from "../../../assets/optionIcon/Item.ItemIcon.1.png";
import epic_Border from "../../../assets/optionIcon/Item.ItemIcon.2.png";
import unique_Border from "../../../assets/optionIcon/Item.ItemIcon.3.png";
import legendary_Border from "../../../assets/optionIcon/Item.ItemIcon.4.png";
import DesiredPart from "./itemDetailDesiredPart";

export const ItemDetail = ({ item, clicked }) => {
  if (!item) {
    // 아이템 정보가 없는 경우
    return null;
  }

  // 옵션 이름을 매핑하는 객체
  const optionNameMap = {
    str: "STR",
    dex: "DEX",
    int: "INT",
    luk: "LUK",
    attack_power: "공격력",
    magic_power: "마력",
    armor: "방어력",
    all_stat: "올스탯",
    max_hp: "최대 HP",
    max_mp: "최대 MP",
    speed: "이동속도",
    jump: "점프력",
    ignore_monster_armor: "몬스터 방어율 무시",
    boss_damage: "보스 몬스터 공격 시 데미지",
    equipment_level_decrease: "착용 레벨 감소",
    max_hp_rate: "최대 HP",
    max_mp_rate: "최대 MP",
    damage: "데미지",
  };

  // 아이템 익셉셔널 스탯 요약 함수형 컴포넌트
  function StatsSummary({ stats }) {
    // 세부 스탯이 모두 동일하고 0이 아닌 값을 가질 경우 해당 값을 반환하는 함수
    // every 메서드를 이용하여 배열의 모든 요소가 주어진 조건을 만족하는지 검사
    // 예를 들어, keys의 값이 "str", "dex", "int", "luk"일 때,
    // keys.every((key) => stats[key] === stats[keys[0]]);를 사용하여
    // 모든 키의 값이 동일한지 순회하여 확인함.
    // 예시) keys.every((key) => stats["str"] === stats["str"]);
    // 만약 모든 키의 값이 동일하면 allEqual은 true가 됨.
    // 그런 다음, stats[keys[0]] 값이 "0"이 아닌지 확인함.
    // 두 조건이 모두 true일 때 stats[keys[0]] 값을 반환하고,
    // 그렇지 않으면 null을 반환함.

    const getCommonValue = (...keys) => {
      const allEqual = keys.every((key) => stats[key] === stats[keys[0]]);
      return allEqual && stats[keys[0]] !== "0" ? stats[keys[0]] : null;
    };

    // 올스텟, 최대 HP/MP, 공격력/마력에 대한 공통값을 확인
    const allStatValue = getCommonValue("str", "dex", "int", "luk");
    const attackMagicValue = getCommonValue("attack_power", "magic_power");
    const maxHpMpValue = getCommonValue("max_hp", "max_mp");

    return (
      <div>
        {allStatValue && <div>올스텟 : +{allStatValue}</div>}
        {attackMagicValue && <div>공격력 / 마력 : +{attackMagicValue}</div>}
        {maxHpMpValue && <div>최대 HP / 최대 MP : +{maxHpMpValue}</div>}
      </div>
    );
  }

  // 모든 스탯이 0인지 확인하는 함수
  const isAllZero = (stats) => {
    // stats가 null이거나 undefined일 경우 false를 반환
    if (!stats || typeof stats !== "object") return false;

    // exceptional_upgrade도 체크
    return Object.entries(stats).every(
      ([key, value]) => value === "0" || value === 0 || value === null
    );
  };

  // 옵션 값 수정자를 매핑하는 객체
  const formatValue = (value, isPercentage = false) =>
    `${Math.sign(value) >= 0 ? "+" : ""}${value}${isPercentage ? "%" : ""}`;

  const optionValueModifierMap = {
    all_stat: (value) => formatValue(value, true),
    equipment_level_decrease: (value) => formatValue(value),
    max_hp_rate: (value) => formatValue(value, true),
    max_mp_rate: (value) => formatValue(value, true),
    max_hp: (value) => formatValue(value),
    max_mp: (value) => formatValue(value),
    ignore_monster_armor: (value) => formatValue(value, true),
    boss_damage: (value) => formatValue(value, true),
    damage: (value) => formatValue(value, true),
    default: (value) => formatValue(Number(value).toLocaleString()),
  };

  // 등급의 첫 글자를 반환하는 함수
  const getInitial = (grade) => {
    switch (grade) {
      case "레어":
        return rare_Icon;
      case "에픽":
        return epic_Icon;
      case "유니크":
        return unique_Icon;
      case "레전드리":
        return legendary_Icon;
      default:
        return "";
    }
  };

  return (
    <Container>
      {/* 클릭 시 PinImage를 보여줌 */}
      <div style={{ position: "relative" }}>{clicked && <PinImage />}</div>

      {/* 아이템 이름과 별 관련 정보를 보여주는 래퍼 */}
      <ItemNameWrap>
        {/* StarForce 컴포넌트로 별 표시 */}
        <StarForce
          noData={item.starforce === 0 || item.starforce === "0"} // starforce가 0 또는 "0"이면 noData 속성에 true를 전달
          style={{ display: item.starforce === 0 ? "none" : "block" }} // starforce가 0이면 스타일을 none으로 설정하여 표시하지 않음
        >
          <StartForceFirstLine>
            {/* 첫 번째 줄의 별 (최대 15개) */}
            {Array.from({ length: Math.min(item.starforce, 15) }, (_, i) => (
              <>
                <StarForceIcon src={starForce_Icon} alt="star" />
                {(i + 1) % 5 === 0 && <span style={{ margin: "0 3px" }}></span>}
              </>
            ))}
          </StartForceFirstLine>
          <StartForceSecondLine>
            {/* 두 번째 줄의 별 (15개 이상일 때) */}
            {item.starforce > 15 &&
              Array.from({ length: item.starforce - 15 }, (_, i) => (
                <>
                  <StarForceIcon src={starForce_Icon} alt="star" />
                  {(i + 1) % 5 === 0 && (
                    <span style={{ margin: "0 3px" }}></span>
                  )}
                </>
              ))}
          </StartForceSecondLine>
        </StarForce>

        <h2>
          {/* 아이템 이름 */}
          {item && item.soul_name && (
            <span>{item.soul_name.replace(" 소울 적용", "")}</span>
          )}
          {item.item_name ? (
            <p>
              <div>
                {/* 아이템 이름과 스크롤 업그레이드 수치 */}
                {`${item.item_name}${
                  item.scroll_upgrade > 0 ? ` (+${item.scroll_upgrade})` : ""
                }`}
              </div>
              {/* 특수 반지 레벨 표시 */}
              {item.special_ring_level !== 0 && (
                <div> &nbsp;{`Lv.${item.special_ring_level}`}</div>
              )}
            </p>
          ) : item.android_name ? (
            <div>{item.android_name}</div>
          ) : null}
        </h2>
        {/* 잠재 옵션 등급 표시 */}
        {item.potential_option_grade && (
          <NamePotentialName>{`(${item.potential_option_grade} 아이템)`}</NamePotentialName>
        )}
      </ItemNameWrap>

      {/* 아이콘 래퍼 */}
      <IconWrap>
        {/* 아이템 아이콘 이미지 */}
        <IconImage grade={item.potential_option_grade}>
          <img src={item.item_icon || item.android_icon} alt="item_icon" />
        </IconImage>
      </IconWrap>

      {/* 아이템 옵션 정보 래퍼 */}
      <ItemOptionWrap>
        {/* 장비 분류 표시 */}
        {item.item_equipment_part && (
          <div>장비 분류 : {item.item_equipment_part}</div>
        )}
        {/* 아이템 옵션 정보 표시 */}
        {item.item_total_option &&
          Object.entries(item.item_total_option).map(([key, value]) => {
            if (value !== "0" && value !== 0) {
              const modifier =
                optionValueModifierMap[key] || optionValueModifierMap.default;
              const base = item.item_base_option[key] || 0;
              const add = item.item_add_option[key] || 0;
              const etc = item.item_etc_option[key] || 0;
              const starforce = item.item_starforce_option[key] || 0;

              const addPart =
                add !== undefined && add !== "0" && add !== 0 ? (
                  <span
                    style={{
                      color: "rgb(204, 255, 0)",
                      padding: "0px 0px 0px 2px",
                    }}
                  >
                    {`${modifier(add)}`}
                  </span>
                ) : null;

              const starforcePart =
                starforce !== undefined &&
                starforce !== "0" &&
                starforce !== 0 ? (
                  <span
                    style={{
                      color: "rgb(255, 204, 0)",
                      padding: "0px 0px 0px 2px",
                    }}
                  >
                    {`${modifier(starforce)}`}
                  </span>
                ) : null;
              const basePart =
                add !== 0 || starforce !== 0 ? (
                  <span
                    style={{
                      color: "rgb(255, 255, 255)",
                    }}
                  >{`${Number(base).toLocaleString()}`}</span>
                ) : null;
              const etcPart =
                etc !== undefined && etc !== "0" && etc !== 0 ? (
                  <span
                    style={{
                      color: "rgb(170, 170, 255)",
                      padding: "0px 0px 0px 2px",
                    }}
                  >
                    {`${modifier(etc)}`}
                  </span>
                ) : null;

              let outputPart = null;
              if (basePart && (addPart || starforcePart || etcPart)) {
                outputPart = (
                  <>
                    <span style={{ color: "white" }}>(</span>
                    {basePart}
                    {addPart}
                    {etcPart}
                    {starforcePart}
                    <span style={{ color: "white" }}>)</span>
                  </>
                );
              } else if (basePart) {
                outputPart = null;
              }

              return (
                <p
                  key={key}
                  style={{
                    color:
                      basePart && (addPart || starforcePart || etcPart)
                        ? "rgb(102,255,255)"
                        : "white",
                  }}
                >
                  {`${optionNameMap[key]} : ${modifier(value)} `}
                  {outputPart}
                </p>
              );
            }
            return null;
          })}
        {item.android_description && (
          <ADItemGrade>
            <ADCategory>장비 분류 : 안드로이드</ADCategory>
            <ADGrade>등급 : {item.android_grade}</ADGrade>
          </ADItemGrade>
        )}
        {/* 안드로이드 description */}
        {item.android_description && (
          <ADItemDescription>{item.android_description}</ADItemDescription>
        )}

        {/* 업그레이드 가능 횟수 */}
        {item.scroll_upgradeable_count &&
          DesiredPart.includes(item.item_equipment_slot) && (
            <p>
              업그레이드 가능 횟수 : {item.scroll_upgradeable_count}
              <ResilienceCount>
                (복구 가능 횟수 : {item.scroll_resilience_count})
              </ResilienceCount>
            </p>
          )}

        {/* 황금망치 제련 여부 */}
        {item.golden_hammer_flag === "적용" && <p>황금 망치 제련 적용</p>}

        {/* 가위 사용 가능 횟수 */}
        {item.cuttable_count && item.cuttable_count !== "255" && (
          <CuttableCount>
            가위 사용 가능 횟수 : {item.cuttable_count}회
          </CuttableCount>
        )}
      </ItemOptionWrap>
      <OptionWrap
        PotenOptions={
          item &&
          (item.potential_option_grade ||
            item.additional_potential_option_grade ||
            item.soul_name ||
            (item.item_exceptional_option &&
              !isAllZero(item.item_exceptional_option)))
        }
      >
        {item.potential_option_grade && (
          <PotentialOptionWrap>
            <OptionHeader potengrade={item.potential_option_grade}>
              <OptionInitial
                potengrade={item.potential_option_grade}
                src={getInitial(item.potential_option_grade)}
                alt="Icon"
              ></OptionInitial>
              <span>잠재옵션</span>
            </OptionHeader>
            {[
              item.potential_option_1,
              item.potential_option_2,
              item.potential_option_3,
            ].map((option, index) => (
              <PotentialItems key={index}>{option}</PotentialItems>
            ))}
          </PotentialOptionWrap>
        )}
        {item.additional_potential_option_grade && (
          <AdditionalOptionWrap>
            <OptionHeader potengrade={item.additional_potential_option_grade}>
              <OptionInitial
                potengrade={item.additional_potential_option_grade}
                src={getInitial(item.additional_potential_option_grade)}
                alt="Icon"
              ></OptionInitial>
              <span>에디셔널 잠재옵션</span>
            </OptionHeader>
            {[
              item.additional_potential_option_1,
              item.additional_potential_option_2,
              item.additional_potential_option_3,
            ].map((option, index) => (
              <AdditionalItems key={index}>{option}</AdditionalItems>
            ))}
          </AdditionalOptionWrap>
        )}
        {item.soul_name && (
          <SoulOptionWrap>
            <div>{item.soul_name}</div>
            <div>{item.soul_option}</div>
          </SoulOptionWrap>
        )}
        {item.item_exceptional_option &&
          !isAllZero(item.item_exceptional_option) && (
            <ExOptionWrap>
              <ExOptionHeader>
                <ExInitial>EX</ExInitial>익셉셔널
              </ExOptionHeader>
              <StatsSummary stats={item.item_exceptional_option} />
            </ExOptionWrap>
          )}
      </OptionWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 290px;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  color: white;
  padding: 0px 10px 5px;
  padding-bottom: 3px;
  height: fit-content;
  font-family: "돋움";
  white-space: pre-line;

  @media screen and (max-width: 1024px) {
    width: 300px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: linear-gradient(
      139deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 1;
    pointer-events: none;
    border-radius: 5px;
  }
`;

const ItemNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px dashed rgb(89, 85, 82);
  padding-bottom: 10px;
  h2 {
    font-size: 15px;
    padding: 3px 0;
    text-align: center;
    span {
      color: rgb(210, 245, 57);
    }
  }
`;

const NamePotentialName = styled.p`
  font-size: 12px;
`;

const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed rgb(89, 85, 82);
`;

const IconImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  background-color: white;
  border-radius: 5px;
  background-image: url(${iconBackground});
  background-size: 62px 62px;
  background-position: center;
  position: relative;
  img {
    width: 45px;
    height: 45px;
    object-fit: contain;
  }
  ${({ grade }) => {
    switch (grade) {
      case "레어":
        return `&::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 112%;
          height: 100%;
          border-radius: 5px;
          background-image: url(${rare_Border});
          background-size: cover;
          background-position: center;
        }`;
      case "에픽":
        return `&::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 112%;
          height: 100%;
          border-radius: 5px;
          background-image: url(${epic_Border});
          background-size: cover;
          background-position: center;
        }`;
      case "유니크":
        return `&::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 112%;
          height: 100%;
          border-radius: 5px;
          background-image: url(${unique_Border});
          background-size: cover;
          background-position: center;
        }`;
      case "레전드리":
        return `&::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 112%;
          height: 100%;
          border-radius: 5px;
          background-image: url(${legendary_Border});
          background-size: cover;
          background-position: center;
        }`;
      default:
        return "";
    }
  }}

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 45px;
    background: linear-gradient(
      130deg,
      rgba(255, 255, 255, 0.6) 44%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 1;
    pointer-events: none;
    border-radius: 5px;
  }
`;

const StarForce = styled.div`
  color: rgb(255, 204, 0);
  font-size: 12px;
  padding-top: ${(props) => (props.Data ? "0" : "15px")};
  padding-bottom: ${(props) => (props.Data ? "0" : "3px")};
`;

const StartForceFirstLine = styled.div``;

const StartForceSecondLine = styled.div`
  display: flex;
  justify-content: center;
`;

const PinImage = styled.div`
  position: absolute;
  top: -5px;
  right: -10px;
  width: 11px;
  height: 10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
  border-radius: 10px;
  transform: rotate(135deg);
`;

const ItemOptionWrap = styled.div`
  padding: 5px 0;
  line-height: 15px;
  font-size: 11px;
`;

const OptionWrap = styled.div`
  font-size: 11px;
  ${(props) => !props.PotenOptions && "padding-bottom: 0;"}
  ${(props) => props.PotenOptions && "border-top: 1px dashed rgb(89, 85, 82);"}
`;

const OptionInitial = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 3px;
`;

const OptionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ potengrade }) => {
    if (potengrade === "레어")
      return "color: rgb(102,225,225); margin-bottom: 2px;";
    if (potengrade === "에픽")
      return "color: rgb(153,91,197); margin-bottom: 2px;";
    if (potengrade === "유니크")
      return "color: rgb(255,204,0); margin-bottom: 2px;";
    if (potengrade === "레전드리")
      return "color: rgb(204,241,20); margin-bottom: 2px;";
  }}
`;

const PotentialOptionWrap = styled.div`
  padding: 5px 0;
`;

const AdditionalOptionWrap = styled.div`
  padding: 5px 0;
  border-top: 1px dashed rgb(89, 85, 82);
`;

const SoulOptionWrap = styled.div`
  border-top: 1px dashed rgb(89, 85, 82);
  padding: 5px 0px;
  :first-child {
    color: rgb(255, 255, 68);
  }
`;

const ExOptionWrap = styled.div`
  border-top: 1px dashed rgb(89, 85, 82);
  padding: 5px 0;
`;

const PotentialItems = styled.div`
  font-size: 11px;
  margin: 1px;
`;

const AdditionalItems = styled.div`
  font-size: 11px;
  margin: 1px;
`;

const ExOptionHeader = styled.div`
  display: flex;
  align-items: center;
  color: rgb(255, 51, 51);
  margin-bottom: 3px;
`;

const ExInitial = styled.div`
  text-align: center;
  font-size: 10px;
  width: 20px;
  height: 13px;
  margin-right: 3px;
  color: white;
  background-color: rgb(255, 51, 51);
  border: 1px solid rgb(255, 255, 255);
  border-radius: 4px;
`;

const ADItemDescription = styled.div`
  white-space: pre-wrap;
`;

const ADItemGrade = styled.div`
  display: flex;
  flex-direction: column;
`;

const ADCategory = styled.span``;

const ADGrade = styled.span`
  margin-bottom: 10px;
`;

const StarForceIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const ResilienceCount = styled.span`
  margin-left: 5px;
  color: rgb(255, 204, 0);
`;

const CuttableCount = styled.span`
  color: rgb(255, 204, 0);
`;
