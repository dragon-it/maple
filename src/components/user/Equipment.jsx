import React from "react";
import styled from "styled-components";
import { ItemEquipmentInformation } from "./equipment/ItemEquipmentInformation";

export const Equipment = ({ result }) => {
  return (
    <Container>
      {result && result.getItemEquipment && (
        <ItemEquipmentInformation
          EquipData={{
            ...result.getItemEquipment,
            getSetEffect: result.getSetEffect,
            getSymbol: result.getSymbolEquipment,
            getCashItemEquipment: result.getCashItemEquipment,
            getPetEquipment: result.getPetEquipment,
            getAndroidEquipment: result.getAndroidEquipment,
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  padding-top: 5px;

  @media screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
