import React from "react";
import styled from "styled-components";

export const ItemDetail = ({ item, clicked }) => {
  if (!item) {
    // 아이템 정보가 없는 경우
    return <SelectContainer>아이템을 선택해주세요.</SelectContainer>;
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
  const optionValueModifierMap = {
    all_stat: (value) => `+${value}%`,
    equipment_level_decrease: (value) => `-${value}`,
    max_hp_rate: (value) => `+${value}%`,
    max_mp_rate: (value) => `+${value}%`,
    ignore_monster_armor: (value) => `+${value}%`,
    boss_damage: (value) => `+${value}%`,
    damage: (value) => `+${value}%`,
    default: (value) => `+${Number(value).toLocaleString()}`,
  };

  // 등급의 첫 글자를 반환하는 함수
  const getInitial = (grade) => {
    switch (grade) {
      case "레어":
        return "R";
      case "에픽":
        return "E";
      case "유니크":
        return "U";
      case "레전드리":
        return "L";
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
            {/* 
            Array.from 메서드를 이용하여 새 배열 생성.
            첫 번째 인자로 length를 포함한 유사 객체 생성.
            두 번째 인자로 콜백 함수, 배열의 각 요소에 대해 호출됨. ( _, i ) => ...의 형태로 작성되며, 두 개의 매개변수를 가짐.
            콜백 함수의 첫 번째 매개변수 _는 배열의 요소 값. 이 경우 배열 요소의 값은 사용되지 않으므로 언더스코어로 표기하여 무시.
            콜백 함수의 두 번째 매개변수 i는 배열의 인덱스를 나타냄. 0부터 시작하며, 각 요소의 위치를 나타냄.
             */}
            {Array.from(
              { length: Math.min(item.starforce, 15) },
              (_, i) => ((i + 1) % 5 === 0 ? "★ " : "★") // 별을 5개마다 공백을 추가하여 표시
            )}
          </StartForceFirstLine>
          <StartForceSecondLine>
            {/* 두 번째 줄의 별 (15개 이상일 때) */}
            {item.starforce > 15 &&
              Array.from(
                { length: item.starforce - 15 },
                (_, i) => ((i + 1) % 5 === 0 ? "★ " : "★") // 별을 5개마다 공백을 추가하여 표시
              )}
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
          <p>{`(${item.potential_option_grade} 아이템)`}</p>
        )}
      </ItemNameWrap>

      {/* 아이콘 래퍼 */}
      <IconWrap>
        {/* 아이템 아이콘 이미지 */}
        <IconImage grade={item.potential_option_grade}>
          <img src={item.item_icon || item.android_icon} alt="android_icon" />
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
              <OptionInitial potengrade={item.potential_option_grade}>
                {getInitial(item.potential_option_grade)}
              </OptionInitial>
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
              >
                {getInitial(item.additional_potential_option_grade)}
              </OptionInitial>
              <span>에디셔널 잠재옵션</span>
            </OptionHeader>
            <AdditionalItems>
              {item.additional_potential_option_1}
              <br />
              {item.additional_potential_option_2}
              <br />
              {item.additional_potential_option_3}
            </AdditionalItems>
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
const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 50px;
  color: white;
  padding: 0px 10px;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;

  @media screen and (max-width: 1024px) {
    width: 200px;
  }

  @media screen and (max-width: 768px) {
    width: 460px;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

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

  @media screen and (max-width: 1024px) {
    width: 300px;
  }
`;
const ItemNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px dotted rgb(89, 85, 82);
  padding-bottom: 10px;
  h2 {
    font-size: 16px;
    padding: 3px 0;
    line-height: 24px;
    text-align: center;
    span {
      color: rgb(210, 245, 57);
    }
    p {
      display: flex;
    }
  }
`;

const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px dotted rgb(89, 85, 82);
`;

const IconImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 10px;
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
  ${({ grade }) => {
    switch (grade) {
      case "레어":
        return "border: 3px solid rgb(0,154,255); ";
      case "에픽":
        return "border: 3px solid rgb(120,0,239); ";
      case "유니크":
        return "border: 3px solid rgb(255,188,0) ";
      case "레전드리":
        return "border: 3px solid rgb(0,187,136); ";
      default:
        return "border: 3px solid rgb(134, 130, 132); ";
    }
  }}
`;

const StarForce = styled.div`
  color: rgb(255, 204, 0);
  font-size: 13px;
  padding-top: ${(props) => (props.Data ? "0" : "15px")};
`;

const StartForceFirstLine = styled.div``;

const StartForceSecondLine = styled.div`
  display: flex;
  justify-content: center;
`;

const PinImage = styled.div`
  position: absolute;
  top: -5px;
  left: -10px;
  width: 11px;
  height: 10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
  transform: rotate(45deg);
`;

const ItemOptionWrap = styled.div`
  padding: 5px 0;
  line-height: 16px;
  font-size: 12px;
`;

const OptionWrap = styled.div`
  font-size: 13px;
  white-space: pre-line;
  ${(props) => !props.PotenOptions && "padding-bottom: 0;"}
  ${(props) => props.PotenOptions && "border-top: 2px dotted rgb(89, 85, 82);"}
`;

const OptionInitial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 13px;
  height: 13px;
  box-sizing: border-box;
  font-size: 11px;
  border-radius: 3px;
  margin-right: 3px;
  ${({ potengrade }) => {
    if (potengrade === "레어")
      return "border: 1px solid rgb(255,255,255); background-color: rgb(0,154,255); text-shadow: 0px 0px 1px black, -1px 0px 1px black, 0px -1px 1px black";
    if (potengrade === "에픽")
      return "border: 1px solid rgb(255,255,255); background-color: rgb(120,0,239); text-shadow: 0px 0px 1px black, -1px 0px 1px black, 0px -1px 1px black";
    if (potengrade === "유니크")
      return "border: 1px solid rgb(255,255,255); background-color: rgb(255,188,0); text-shadow: 0px 0px 1px black, -1px 0px 3px black, 0px -1px 1px black";
    if (potengrade === "레전드리")
      return "border: 1px solid rgb(255,255,255); background-color: rgb(120,239,0); text-shadow: 0px 0px 1px black, -1px 0px 1px black, 0px -1px 1px black";
  }}
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
  border-top: 2px dotted rgb(89, 85, 82);
`;

const SoulOptionWrap = styled.div`
  border-top: 2px dotted rgb(89, 85, 82);
  padding-top: 3px;
  :first-child {
    color: rgb(255, 255, 68);
  }
`;

const ExOptionWrap = styled.div`
  border-top: 2px dotted rgb(89, 85, 82);
  padding-top: 5px;
`;

const PotentialItems = styled.div`
  font-size: 12px;
`;

const AdditionalItems = styled.div`
  font-size: 12px;
`;

const ExOptionHeader = styled.div`
  display: flex;
  align-items: center;
  color: rgb(255, 51, 51);
  margin-bottom: 3px;
`;

const ExInitial = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 13px;
  margin-right: 3px;
  color: white;
  background-color: rgb(255, 51, 51);
  border: 1px solid rgb(255, 255, 255);
  border-radius: 4px;
  text-shadow: 0px 0px 1px black, -1px 0px 1px black, 0px -1px 1px black;
`;

const ADItemDescription = styled.div`
  white-space: normal;
`;

const ADItemGrade = styled.div`
  display: flex;
  flex-direction: column;
`;

const ADCategory = styled.span``;

const ADGrade = styled.span`
  margin-bottom: 10px;
`;
