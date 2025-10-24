import React from "react";
import styled from "styled-components";
import { User } from "./User";

export const UserPage = () => (
  <UserWrap>
    <User />
  </UserWrap>
);

const UserWrap = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
