import React from 'react';
import styled from 'styled-components';

export const ItemEquipmentInformation = ({ EquipData }) => {
  console.log(EquipData);

  return (
    <Container>
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

const EquipItems = styled.div`
  display: flex;
`;

const ItemIcon = styled.div`
  margin-right: 5px; 
`;
