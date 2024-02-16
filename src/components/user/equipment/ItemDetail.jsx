import React from 'react'
import styled from 'styled-components'

export const ItemDetail = ({ item }) => {
  if (!item) { // 아이템 정보가 없는 경우를 처리
    return <Container>아이템을 선택해주세요.</Container>
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
  }
  
  const optionValueModifierMap = {
    all_stat: value => `+${value}%`,
    equipment_level_decrease: value => `-${value}`,
    max_hp_rate: value => `+${value}%`,
    max_mp_rate: value => `+${value}%`,
    ignore_monster_armor: value => `+${value}%`,
    boss_damage: value => `+${value}%`,
    default: value => `+${Number(value).toLocaleString()}`,
  }
  
  return (
    <Container>
      <ItemNameWrap>
      <StarForce style={{ display: item.starforce === 0 ? 'none' : 'block' }}>
        <StartForceFirstLine>{Array.from({ length: Math.min(item.starforce, 15) }, (_, i) => (i + 1) % 5 === 0 ? '★ ' : '★')}</StartForceFirstLine>
        <StartForceSecondLine>{item.starforce > 15 && Array.from({ length: item.starforce - 15 }, (_, i) => (i + 1) % 5 === 0 ? '★ ' : '★')}</StartForceSecondLine>
      </StarForce>

        <h2>{`${item.item_name}${item.scroll_upgrade > 0 ? ` (+${item.scroll_upgrade})` : ''}`}</h2> {/* 아이템 이름 */}

        {item.potential_option_grade && <p>{`(${item.potential_option_grade} 아이템)`}</p>} {/* 아이템 품질 */}
      </ItemNameWrap>

      <ItemOptionWrap>
        {Object.entries(item.item_total_option).map(([key, value]) => {
          if ((value !== '0' && value !== 0)) {
            const modifier = optionValueModifierMap[key] || optionValueModifierMap.default;
            return <p key={key}>{`${optionNameMap[key]}: ${modifier(value)}`}</p>
          }
          return null;
        })}
      </ItemOptionWrap>

      <img src={item.item_icon} alt={item.item_name} /> 
    </Container>
  )
}

const Container = styled.div`
  width: 400px;
  background-color: #000000;
  color: white; 
  padding: 20px;
`
const ItemNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px dotted rgb(55, 56, 58);
  padding-bottom: 20px;
  h2{
    font-size: 20px;
    padding: 10px 0;
  }
`

const StarForce = styled.div`
  color: rgb(255, 204, 0);
  font-size: 1.2em; 
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
`
