import React, { useState } from "react";
import { UnionInfo } from "./union/unionInfo/UnionInfo";
import styled from "styled-components";
import { UnionArtifact } from "./union/unionArtifact/UnionArtifact";

export const Union = ({ result }) => {
  const [activeTab, setActiveTab] = useState("artifact");

  return (
    <Container>
      <InfoWrap>
        <UnionArtifact
          Data={{
            unionArtiFact: result.getCombinedData.getUnionArtiFact,
            unionRaider: result.getCombinedData.getUnionRaider,
            unionChampion: result.getCombinedData.getUnionChampion,
          }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <UnionInfo
          Data={{
            unionArtiFact: result.getCombinedData.getUnionArtiFact,
            union: result.getCombinedData.getUnion,
            unionRaider: result.getCombinedData.getUnionRaider,
            unionChampion: result.getCombinedData.getUnionChampion,
          }}
          activeTab={activeTab}
        />
      </InfoWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
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
