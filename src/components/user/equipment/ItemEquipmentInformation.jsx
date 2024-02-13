import React from 'react';
import styled from 'styled-components';
import equipmentUi from '../../../assets/ui/equipmentUi/equipUi.png'

export const ItemEquipmentInformation = ({ EquipData }) => {


  return (
    <Container>
      <UiBackgrnd>
        <img src={equipmentUi} alt="ui" />
      </UiBackgrnd>
      <EquipItems>
        {EquipData.item_equipment.map((item, index) => (
          <ItemIcon key={index}>
            <img src={item.item_icon} alt={`icon-${index}`} />
          </ItemIcon>
        ))}
      </EquipItems>
    </Container>
  );
};

const Container = styled.div`
  white-space: nowrap;

`;

const UiBackgrnd = styled.div`
  position: relative;
  img{
    width: 262px;
    height: 312px;
  }
`

const EquipItems = styled.div`
display: flex;
width: 500px;
flex-wrap: wrap;
div{
  position: absolute;
}
// 모자 
div:nth-child(1){
    left: 158px;
    top: 62px;
}
// 얼굴장식
div:nth-child(2){
    left: 158px;
    top: 112px;
} 
// 눈장식
div:nth-child(3){
    left: 158px;
    top: 161px;
}
// 귀고리
div:nth-child(4){
    left: 207px;
    top: 161px;
}
// 상의
div:nth-child(5){
    left: 158px;
    top: 210px;
}
// 하의
div:nth-child(6){
    left: 158px;
    top: 260px;
}
// 신발
div:nth-child(7){
    left: 158px;
    top: 309px;
}
// 장갑
div:nth-child(8){
    left: 207px;
    top: 260px;
}
// 망토
div:nth-child(9){
    left: 256px;
    top: 260px;
}
// 보조 무기
div:nth-child(10){
    left: 256px;
    top: 210px;
}
// 무기
div:nth-child(11){
    left: 109px;
    top: 210px;
}
// 반지
div:nth-child(12){
    left: 60px;
    top: 63px;
}
// 반지
div:nth-child(13){
    left: 60px;
    top: 112px;
}
// 반지
div:nth-child(14){
    left: 60px;
    top: 161px;
}
// 반지
div:nth-child(15){
    left: 60px;
    top: 210px;
}
// 펜던트
div:nth-child(16){
    left: 109px;
    top: 112px;
}
// 훈장
div:nth-child(17){
    left: 257px;
    top: 161px;
}
// 벨트
div:nth-child(18){
    left: 109px;
    top: 260px;
}
// 어깨장식
div:nth-child(19){
    left: 207px;
    top: 210px;
}
// 포켓 아이템
div:nth-child(20){
    left: 60px;
    top: 260px;
}
// 기계 심장
div:nth-child(21){
    left: 257px;
    top: 308px;
}
// 뱃지
div:nth-child(22){
    left: 257px;
    top: 112px;
}
// 엠블렘
div:nth-child(23){
    left: 257px;
    top: 62px;
}
// 펜던트
div:nth-child(24){
    left: 109px;
    top: 161px;
}
`;

const ItemIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  width: 46px;
  height: 46px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #e0a7a7;
`;
