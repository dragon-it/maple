import React from 'react'
import styled from 'styled-components'

export const PetItemDetail = ({ item, clicked }) => {
  if (!item) { // 아이템 정보가 없는 경우를 처리
    return <SelectContainer>아이템을 선택해주세요.</SelectContainer>
  }

  console.log(item)
  // 날짜 함수
  const formatExpire = (expireString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat('ko-KR', options).format(new Date(expireString));
  };

  return (
    <Container>
      <div style={{ position: 'relative' }}>
        {clicked && <PinImage />}
      </div>
      <ItemNameWrap>

        {item?.nickname && item?.name
          ? `${item?.nickname}(${item?.name})`
          : item?.name
          ? item?.name
          : item?.autoSkillName || item?.equipment?.item_name}

        {/* 타입 */}
        {item.type && <ItemType Type={item.type}>{item.type}</ItemType>}
        
        {/* 마법의 시간 */}
        {item.expire && (<ItemExpire>마법의 시간: {formatExpire(item.expire)}까지</ItemExpire>)}
      </ItemNameWrap>

      {/* 아이콘 */}
      <IconWrap>
        <IconImage>
        <img src={item?.icon || item?.equipment?.item_icon || item?.autoSkillIcon} alt={`${item?.name || item?.equipment?.item_name}`} />
        </IconImage>
      </IconWrap>

      {/* 아이템 설명 */}
      {item.description && 
      <ItemDescriptionWrap Data={!!item?.description}>
          {item?.description}
      </ItemDescriptionWrap>}

      <ItemOptionWrap>
        {/* 스킬 */}
        {Array.isArray(item?.skill) ? item?.skill.map((skill, index) => <div key={index}>{skill}</div>) : null}

        {/* 아이템 옵션 */}
        {Array.isArray(item.equipment?.item_option) ? item.equipment.item_option.map(({option_type, option_value}, index) => (
          <div key={index}>
            {option_type} : {option_value}
          </div>
        )) : null}
      </ItemOptionWrap>
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
   font-family: MaplestoryOTFLight;

  @media screen and (max-width:1024px) {
    width: 200px;
  }

  @media screen and (max-width:768px) {
    width: 460px;
  }

  @media screen and (max-width:576px) {
    width: 100%;
  }
  
`

const Container = styled.div`
  width: 290px;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  color: white; 
  padding: 0px 10px;
  padding-bottom: 3px;
  height: fit-content;

  @media screen and (max-width:1024px) {
    width: 300px;
  }
`
const ItemNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2px dotted rgb(55, 56, 58);
  font-size: 16px;
  padding: 10px 0;
  line-height: 24px;
  text-align: center;
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
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 10px;
  img{
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

`
const ItemExpire = styled.div`
  font-size: 13px;
`

const ItemType = styled.div`
  ${({ Type }) => {
    switch (Type) {
      case '루나 쁘띠':
      case '루나 스윗':
        return `color: rgb(160,133,186);`;
      case '루나 드림':
        return `color: rgb(0,205,255);`;
      case '원더 블랙':
        return `color: rgb(235,189,5);`;
      default:
        return '';
    }
  }}
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
  font-size: 14px;
  color: rgb(255,153,0);
`

const ItemDescriptionWrap = styled.div`
  font-size: 14px;
  white-space: normal;
  padding: 5px 0;
  ${({ Data }) => Data && `border-bottom: 2px dotted rgb(55, 56, 58);`}
`