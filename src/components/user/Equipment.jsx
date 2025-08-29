import React from "react";
import styled from "styled-components";
import { ItemEquipmentInformation } from "./equipment/ItemEquipmentInformation";

export const Equipment = ({ result }) => {
  return (
    <Container>
      {result && result.getCombinedData.getItemEquipment && (
        <ItemEquipmentInformation
          EquipData={{
            ...result.getCombinedData.getItemEquipment,
            getSetEffect: result.getCombinedData.getSetEffect,
            getSymbol: result.getCombinedData.getSymbolEquipment,
            getCashItemEquipment: result.getCombinedData.getCashItemEquipment,
            getPetEquipment: result.getCombinedData.getPetEquipment,
            getAndroidEquipment: result.getCombinedData.getAndroidEquipment,
          }}
          BasicData={{
            getBasicInformation: result.getCombinedData.getBasicInformation,
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 0px 5px 5px 5px;

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
