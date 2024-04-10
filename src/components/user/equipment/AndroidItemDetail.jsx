import styled from 'styled-components'

export const AndroidItemDetail = ({ item, clicked }) => {
  console.log(clicked)
  console.log(item)
  
  if (!item) { // 아이템 정보가 없는 경우를 처리
    return <SelectContainer>아이템을 선택해주세요.</SelectContainer>
  }

  return (
    <Container>
        <div style={{ position: 'relative' }}>
          {clicked && <PinImage/>}
        </div>
      <ItemNameWrap>
        <h2> {/* 아이템 이름 */}
          <ItemName>{item.cash_item_name}</ItemName>
          <ItemLabel Label={item.cash_item_label}>{item.cash_item_label}</ItemLabel>
        </h2>
      </ItemNameWrap>
      <IconWrap>
        <IconImage>
          <img src={item.cash_item_icon} alt="icon" /> 
        </IconImage>
      </IconWrap>
      <ItemOptionWrap>
        <div>장비 분류 : {item.cash_item_equipment_part}</div>
      </ItemOptionWrap>
      <ItemDescriptionWrap Value={item.cash_item_description}>
        <div>{item.cash_item_description}</div>
      </ItemDescriptionWrap>
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
  h2{
    font-size: 16px;
    padding: 10px 0;
    line-height: 24px;
    text-align: center;
  }
`

const ItemName = styled.div`
  
`

const ItemLabel = styled.div`
  ${({ Label }) => Label === '블랙라벨' && `
    color: rgb(255,204,0);
  `}
  ${({ Label }) => Label === '레드라벨' && `
    color: rgb(255,0,89);
  `}
    ${({ Label }) => Label === '스페셜라벨' && `
    color: rgb(188,186,187);
  `}
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
  font-size: 13px;

`

const ItemDescriptionWrap = styled.div`
  font-size: 13px;
  white-space: normal;
  ${({ Value }) => Value && `
    border-top: 2px dotted rgb(55, 56, 58);
    padding: 5px 0;
  `}
`