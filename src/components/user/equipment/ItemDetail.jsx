import React from 'react'
import styled from 'styled-components'
import gradeColors from './ItemGradeColors'

export const ItemDetail = ({ item, clicked, gradeColors }) => {
  console.log(clicked)
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
        <p>{`${item.item_name}${item.scroll_upgrade > 0 ? ` (+${item.scroll_upgrade})` : ''}`}</p>
      </h2>
        {item.potential_option_grade && <p>{`(${item.potential_option_grade} 아이템)`}</p>} {/* 아이템 품질 */}
      </ItemNameWrap>
      <IconWrap>
        <IconImage gradeColors={gradeColors} grade={item.potential_option_grade}>
          <img src={item.item_icon} alt={item.item_name} /> 
        </IconImage>
      </IconWrap>
      <ItemOptionWrap>
        {Object.entries(item.item_total_option).map(([key, value]) => {
          if ((value !== '0' && value !== 0)) {
            const modifier = optionValueModifierMap[key] || optionValueModifierMap.default;
            const base = item.item_base_option[key] || 0;
            const add = item.item_add_option[key] || 0;
            const etc = item.item_etc_option[key] || 0;
            const starforce = item.item_starforce_option[key] || 0;
            const addPart = (add !== undefined && add !== '0' && add !== 0) ? <span style={{color: 'rgb(204, 255, 0)'}}> {`${modifier(add)}`}</span> : null;
            const starforcePart = (starforce !== undefined && starforce !== '0' && starforce !== 0) ? <span style={{color: 'rgb(255, 204, 0)'}}> {`${modifier(starforce)}`}</span> : null;
            const basePart = (add !== 0 || starforce !== 0) ? <span style={{color: 'rgb(255, 255, 255)'}}>{`${modifier(base)}`}</span> : null;
            const etcPart = (etc !== undefined && etc !== '0' && etc !== 0) ? <span style={{color: 'rgb(170, 170, 255)'}}> {`${modifier(etc)}`}</span> : null;
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
    </Container>
  )
}
const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 50px;
  background-color: #000000;
  color: white; 
  padding: 0px 10px;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  margin-top: 5px;
`

const Container = styled.div`
  width: 290px;
  background-color: #000000;
  color: white; 
  padding: 0px 10px;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  margin-top: 5px;
`
const ItemNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px dotted rgb(55, 56, 58);
  padding-bottom: 10px;
  h2{
    font-size: 18px;
    padding: 10px 0;
    line-height: 24px;
    text-align: center;
    span{
      color: rgb(210,245,57);
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

  border: ${({ grade, gradeColors }) => `3px solid ${gradeColors[grade] || 'rgb(134, 130, 132)'}`};
  img{
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
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

const ItemOptionWrap = styled.div`
  padding: 15px 0;
  line-height: 20px;
  font-size: 12px;
`

const PinImage = styled.div`
  position: absolute;
  top: -5px;
  left: -10px;
  width: 10px;
  height: 10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
  transform: rotate(45deg);
`;
