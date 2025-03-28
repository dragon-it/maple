import React, { useState } from "react";
import { UnionInfo } from "./union/UnionInfo";
import styled from "styled-components";
import { UnionArtifact } from "./union/UnionArtifact";

export const Union = ({ result }) => {
  const [activeTab, setActiveTab] = useState("artifact"); 

  return (
    <Container>
      <InfoWrap>
        <UnionArtifact
          Data={{
            unionArtiFact: result.getCombinedData.getUnionArtiFact,
            unionRaider: result.getCombinedData.getUnionRaider,
          }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <UnionInfo
          Data={{
            unionArtiFact: result.getCombinedData.getUnionArtiFact,
            union: result.getCombinedData.getUnion,
            unionRaider: result.getCombinedData.getUnionRaider,
          }}
          activeTab={activeTab}
        />
      </InfoWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 5px;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  height: 100%;

  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;
