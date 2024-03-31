import React from 'react'
import styled from 'styled-components';


export const ItemDetail = ({ item, clicked }) => {
  if (!item) { // 아이템 정보가 없는 경우를 처리
    return <SelectContainer>아이템을 선택해주세요.</SelectContainer>
  }

  const optionNameMap = {
    str: 'STR',
    dex: 'DEX',
    int: 'INT',
    luk: 'LUK',
    attack_power: '공격력',
    magic_power: '마력',
    armor: '방어력',
    all_stat: '올스탯',
    max_hp: '최대 HP',
    max_mp: '최대 MP',
    speed: '이동속도',
    jump: '점프력',
    ignore_monster_armor: '몬스터 방어율 무시',
    boss_damage: '보스 몬스터 공격 시 데미지',
    equipment_level_decrease: '착용 레벨 감소',
    max_hp_rate: '최대 HP',
    max_mp_rate: '최대 MP',
    damage: '데미지'
  }

  function StatsSummary({ stats }) {
    // 세부 스탯이 모두 동일하고 0이 아닌 값을 가질 경우 해당 값을 반환하는 함수
    const getCommonValue = (...keys) => {
      const allEqual = keys.every(key => stats[key] === stats[keys[0]]);
      return allEqual && stats[keys[0]] !== '0' ? stats[keys[0]] : null;
    };
  
    // 올스텟, 최대 HP/MP, 공격력/마력에 대한 공통값을 확인
    const allStatValue = getCommonValue('str', 'dex', 'int', 'luk');
    const attackMagicValue = getCommonValue('attack_power', 'magic_power');
    const maxHpMpValue = getCommonValue('max_hp', 'max_mp');
  
    return (
      <div>
        {allStatValue && (
          <div>올스텟 : +{allStatValue}</div>
        )}
        {attackMagicValue && (
          <div>공격력 / 마력 : +{attackMagicValue}</div>
        )}
        {maxHpMpValue && (
          <div>최대 HP / 최대 MP : +{maxHpMpValue}</div>
        )}
      </div>
    );
  }
  const isAllZero = (stats) => {
    return Object.values(stats).every(value => value === "0");
  };
  
  const optionValueModifierMap = {
    all_stat: value => `+${value}%`,
    equipment_level_decrease: value => `-${value}`,
    max_hp_rate: value => `+${value}%`,
    max_mp_rate: value => `+${value}%`,
    ignore_monster_armor: value => `+${value}%`,
    boss_damage: value => `+${value}%`,
    damage: value => `+${value}%`,
    default: value => `+${Number(value).toLocaleString()}`,
  }

  const getInitial = (grade) => {
    switch (grade) {
      case '레어':
        return 'R';
      case '에픽':
        return 'E';
      case '유니크':
        return 'U';
      case '레전드리':
        return 'L';
      default:
        return '';
    }
  };
  
  
  return (
    <Container>
        <div style={{ position: 'relative' }}>
          {clicked && (
            <PinImage/>
          )}
        </div>
      <ItemNameWrap>
        <StarForce noPadding={item.starforce === 0 || item.starforce === '0'} style={{ display: item.starforce === 0 ? 'none' : 'block' }}>
        <StartForceFirstLine>{Array.from({ length: Math.min(item.starforce, 15) }, (_, i) => (i + 1) % 5 === 0 ? '★ ' : '★')}</StartForceFirstLine>
        <StartForceSecondLine>{item.starforce > 15 && Array.from({ length: item.starforce - 15 }, (_, i) => (i + 1) % 5 === 0 ? '★ ' : '★')}</StartForceSecondLine>
      </StarForce>
      <h2> {/* 아이템 이름 */}
        {item && item.soul_name && (
          <span>{item.soul_name.replace(" 소울 적용", "")}</span>
        )}
        <p>
          <div>{`${item.item_name}${item.scroll_upgrade > 0 ? ` (+${item.scroll_upgrade})` : ''}`}</div>
          {item && item.special_ring_level !== 0 && (
          <div> &nbsp;{`Lv.${item.special_ring_level}`}</div>
        )}
        </p>
      </h2>

        {item.potential_option_grade && <p>{`(${item.potential_option_grade} 아이템)`}</p>} {/* 아이템 품질 */}
      </ItemNameWrap>
      <IconWrap>
        <IconImage grade={item.potential_option_grade}>
          <img src={item.item_icon} alt={item.item_name} /> 
        </IconImage>
      </IconWrap>
      <ItemOptionWrap>
        <div>장비 분류 : {item && item.item_equipment_part}</div>
        {Object.entries(item.item_total_option).map(([key, value]) => {
          if ((value !== '0' && value !== 0)) {
            const modifier = optionValueModifierMap[key] || optionValueModifierMap.default;
            const base = item.item_base_option[key] || 0;
            const add = item.item_add_option[key] || 0;
            const etc = item.item_etc_option[key] || 0;
            const starforce = item.item_starforce_option[key] || 0;
            const addPart = (add !== undefined && add !== '0' && add !== 0) 
            ? <span style={{color: 'rgb(204, 255, 0)'}}> {`${modifier(add)}`}</span> 
            : null;
            const starforcePart = (starforce !== undefined && starforce !== '0' && starforce !== 0) 
            ? <span style={{color: 'rgb(255, 204, 0)'}}> {`${modifier(starforce)}`}</span> 
            : null;
            const basePart = (add !== 0 || starforce !== 0) 
            ? <span style={{color: 'rgb(255, 255, 255)'}}>{`${modifier(base)}`}</span> 
            : null;
            const etcPart = (etc !== undefined && etc !== '0' && etc !== 0) 
            ? <span style={{color: 'rgb(170, 170, 255)'}}> {`${modifier(etc)}`}</span> 
            : null;
              let outputPart = null;
              if (basePart && (addPart || starforcePart || etcPart)) {
                outputPart = (
                  <>
                    <span style={{ color: 'white' }}>(</span>
                    {basePart}
                    {addPart}
                    {etcPart}
                    {starforcePart}
                    <span style={{ color: 'white' }}>)</span>
                  </>
                );
              } else if (basePart) {
                outputPart = null;
              }
              return (
                <p key={key} style={{ color: basePart && (addPart || starforcePart || etcPart) ? 'rgb(102,255,255)' : 'white' }}>
                {`${optionNameMap[key]} : ${modifier(value)} `}
                {outputPart}
              </p>
              );
            }
            return null;
          })}
      </ItemOptionWrap>
      <OptionWrap PotenOptions={item && (item.potential_option_grade || item.additional_potential_option_grade || item.soul_name || (item.item_exceptional_option && !isAllZero(item.item_exceptional_option)))}>

        {item.potential_option_grade && (
          <PotentialOptionWrap>
            <PotenOptionHeader potengrade={item.potential_option_grade}>
              <OptionInitial potengrade={item.potential_option_grade}>{getInitial(item.potential_option_grade)}</OptionInitial><span>잠재옵션</span>
            </PotenOptionHeader>
            <PotentialItems>{item.potential_option_1}</PotentialItems>
            <PotentialItems>{item.potential_option_2}</PotentialItems>
            <PotentialItems>{item.potential_option_3}</PotentialItems>
          </PotentialOptionWrap>
        )}
        {item.additional_potential_option_grade && (
          <AdditionalOptionWrap>
            <AddiOptionHeader potengrade={item.additional_potential_option_grade}>
              <OptionInitial potengrade={item.additional_potential_option_grade}>{getInitial(item.additional_potential_option_grade)}</OptionInitial><span>에디셔널 잠재옵션</span>
            </AddiOptionHeader>
            <AdditionalItems>{item.additional_potential_option_1}</AdditionalItems>
            <AdditionalItems>{item.additional_potential_option_2}</AdditionalItems>
            <AdditionalItems>{item.additional_potential_option_3}</AdditionalItems>
          </AdditionalOptionWrap>
        )}
        {item.soul_name && (
          <SoulOptionWrap>
            <div>{item.soul_name}</div>
            <div>{item.soul_option}</div>
          </SoulOptionWrap>
        )}
      {item.item_exceptional_option && !isAllZero(item.item_exceptional_option) && (
        <ExOptionWrap>
          <ExOptionHeader>
            <ExInitial>EX</ExInitial>익셉셔널
          </ExOptionHeader>
          <StatsSummary stats={item.item_exceptional_option} />
        </ExOptionWrap>
      )}
      </OptionWrap>
    </Container>
  )
}
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
  margin-top: 5px;
  font-family: maple-light;
`

const Container = styled.div`
  width: 290px;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  line-height: 18px;
  color: white; 
  padding: 0px 10px;
`
const ItemNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px dotted rgb(55, 56, 58);
  padding-bottom: 10px;
  h2{
    font-size: 16px;
    padding: 10px 0;
    line-height: 24px;
    text-align: center;
    span{
      color: rgb(210,245,57);
    }
    p{
      display: flex;
    }
  }
`

const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px dotted rgb(55, 56, 58);
`

const IconImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  background-color: white;
  border-radius: 10px;
  img{
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
  ${({ grade }) => {
    switch (grade) {
      case '레어':
        return 'border: 3px solid rgb(0,154,255); ';
      case '에픽':
        return 'border: 3px solid rgb(120,0,239); ';
      case '유니크':
        return 'border: 3px solid rgb(255,188,0) ';
      case '레전드리':
        return 'border: 3px solid rgb(0,187,136); ';
      default:
        return 'border: 3px solid rgb(134, 130, 132); ';
    }
  }}

`

const StarForce = styled.div`
  color: rgb(255, 204, 0);
  font-size: 13px;
  padding-top: ${(props) => (props.noPadding ? '0' : '15px')};
`

const StartForceFirstLine = styled.div`
  margin-bottom: 10px;
`
const StartForceSecondLine = styled.div`
  display: flex;
  justify-content: center;
  
`


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

`

const OptionWrap = styled.div`
  font-size: 13px;
  white-space: pre-line;
  border-top: 2px dotted rgb(55, 56, 58);
  padding-bottom: 5px;
  ${props => !props.PotenOptions && 'padding-bottom: 0;'}
`

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
    switch (potengrade) {
      case '레어':
        return 'border: 1px solid rgb(255,255,255); background-color: rgb(0,154,255); text-shadow: 0px 0px 1px black, -1px 0px 1px black, 0px -1px 1px black';
      case '에픽':
        return 'border: 1px solid rgb(255,255,255); background-color: rgb(120,0,239); text-shadow: 0px 0px 1px black, -1px 0px 1px black, 0px -1px 1px black';
      case '유니크':
        return 'border: 1px solid rgb(255,255,255); background-color: rgb(255,188,0); text-shadow: 0px 0px 1px black, -1px 0px 3px black, 0px -1px 1px black';
      case '레전드리':
        return 'border: 1px solid rgb(255,255,255); background-color: rgb(120,239,0); text-shadow: 0px 0px 1px black, -1px 0px 1px black, 0px -1px 1px black';
      default:
        return '';
    }
  }}
`;

const PotenOptionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ potengrade }) => {
    if (potengrade === '레어') return 'color: rgb(102,225,225);';
    if (potengrade === '에픽') return 'color: rgb(153,91,197);';
    if (potengrade === '유니크') return 'color: rgb(255,204,0);';
    if (potengrade === '레전드리') return 'color: rgb(204,241,20);';
  }}
`;

const AddiOptionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
    ${({ potengrade }) => {
    if (potengrade === '레어') return 'color: rgb(102,225,225);';
    if (potengrade === '에픽') return 'color: rgb(153,91,197);';
    if (potengrade === '유니크') return 'color: rgb(255,204,0);';
    if (potengrade === '레전드리') return 'color: rgb(204,241,20);';
  }}
`
const PotentialOptionWrap = styled.div`
    padding: 2px 0;

`

const AdditionalOptionWrap = styled.div`
    padding: 2px 0;
    border-top: 2px dotted rgb(55, 56, 58);
`

const PotentialItems = styled.div`
      font-size: 12px;

`

const AdditionalItems = styled.div`
      font-size: 12px;

`

const SoulOptionWrap = styled.div`
      border-top: 2px dotted rgb(55, 56, 58);
      padding-bottom: 10px;
      padding-top: 3px;
      :first-child{
        color: rgb(255,255,68);
      }
`

const ExOptionWrap = styled.div`
    border-top: 2px dotted rgb(55, 56, 58);
    padding-top: 3px;
    `

const ExOptionHeader = styled.div`
  display: flex;
  align-items: center;
  color: rgb(255,51,51);
`

const ExInitial = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 14px;
  margin-right: 3px;
  color: white;
  background-color: rgb(255,51,51);
  border: 1px solid rgb(255,255,255);
  border-radius: 4px;
  text-shadow: 0px 0px 1px black, -1px 0px 1px black, 0px -1px 1px black
`