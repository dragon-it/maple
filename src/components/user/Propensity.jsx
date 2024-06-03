import React from "react";
import styled from "styled-components";

import { PropensityInformation } from "./propensity/PropensityInformation";

export const Propensity = ({ propensityData }) => {
  return (
    <Container>
      {propensityData && (
        <PropensityInformation
          propensityData={propensityData.getPropensity}
        ></PropensityInformation>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
`;
