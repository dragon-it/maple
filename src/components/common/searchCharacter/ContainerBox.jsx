import React from 'react';
import styled from 'styled-components';

export const ContainerBox = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 7px;
  width: 100%;
  font-size: 12px;
  border: 1px solid rgb(80, 92, 101);
  outline: 1px solid rgb(42, 49, 58);
  border-radius: 5px;
  background-color: rgba(35, 38, 43, 0.9);
`;
