import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getItemEquipment, getOcidApi } from '../../api/api';
import { ItemEquipmentInformation } from './equipment/ItemEquipmentInformation';

export const Equipment = () => {
  const { characterName } = useParams();
  const { data: ocidData } = useQuery(['ocid', characterName], () => getOcidApi(characterName));
  const { data: itemEquipment } = useQuery(['itemEquipment', characterName, ocidData], () => getItemEquipment(ocidData.ocid));
  console.log(itemEquipment)

  return (
    <Container>
      <ItemEquipmentInformation EquipData={itemEquipment}></ItemEquipmentInformation>

    </Container>
  )
}

const Container = styled.div`
  
`