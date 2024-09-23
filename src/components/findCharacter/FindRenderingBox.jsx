import React from "react";
import styled from "styled-components";
import { NpcChatBox } from "../common/npcChat/NpcChatBox";

export const FindRenderingBox = () => {
  return (
    <Container>
      <NpcChatBox text="연속으로 실패할 놈들..." />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
