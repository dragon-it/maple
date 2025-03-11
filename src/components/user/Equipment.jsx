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
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 5px;

  @media screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
