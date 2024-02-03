import React from 'react';
import styled from 'styled-components';


export const DojangInformation = ({ DojangInfo }) => {
  return (
    <Container>
      <div>무릉도장: {DojangInfo.dojang_best_floor}층</div>
    </Container>
  );
};

const Container = styled.div`
`;
