import React from 'react'
import styled from 'styled-components'

export const AbilityInformation = ({AbilityInfo}) => {
  return (
    <Container>
      <div>보유 명성치: {AbilityInfo.remain_fame}</div>
      <div>적용중인 프리셋: {AbilityInfo.preset_no}</div>

      <div>1번 프리셋 번호: {AbilityInfo.ability_preset_1.ability_info.ability_no}</div>
      <div>1번 프리셋 등급: {AbilityInfo.ability_preset_1.ability_info.ability_grade}</div>
      <div>1번 프리셋 옵션 및 수치: {AbilityInfo.ability_preset_1.ability_info.ability_value}</div>

      <div>2번 프리셋 번호: {AbilityInfo.ability_preset_2.ability_info.ability_no}</div>
      <div>2번 프리셋 등급: {AbilityInfo.ability_preset_2.ability_info.ability_grade}</div>
      <div>2번 프리셋 옵션 및 수치: {AbilityInfo.ability_preset_2.ability_info.ability_value}</div>

      <div>3번 프리셋 번호: {AbilityInfo.ability_preset_3.ability_info.ability_no}</div>
      <div>3번 프리셋 등급: {AbilityInfo.ability_preset_3.ability_info.ability_grade}</div>
      <div>3번 프리셋 옵션 및 수치: {AbilityInfo.ability_preset_3.ability_info.ability_value}</div>
    </Container>
  )
}

const Container = styled.div`
  
`