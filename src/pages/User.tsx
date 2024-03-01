import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from '../components/main/Search';
import Information from '../components/user/Information';
import { Propensity } from '../components/user/Propensity';
import { Equipment } from '../components/user/Equipment';
import { Skill } from '../components/user/Skill';



interface UserProps {}

export const User: React.FC<UserProps> = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      <SearchWrap>
        <Search />
      </SearchWrap>
      <Container>
      <Tabs>
        <Tab onClick={() => handleTabClick(1)} active={activeTab === 1}>
          캐릭터 정보
        </Tab>
        <Tab onClick={() => handleTabClick(2)} active={activeTab === 2}>
          캐릭터 장비
        </Tab>
        <Tab onClick={() => handleTabClick(3)} active={activeTab === 3}>
          성향
        </Tab>
        <Tab onClick={() => handleTabClick(4)} active={activeTab === 4}>
          스킬
        </Tab>
      </Tabs>
        {activeTab === 1 && <Information />}
        {activeTab === 2 && <Equipment />}
        {activeTab === 3 && <Propensity />}
        {activeTab === 4 && <Skill />}
      </Container>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  height: auto;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
  padding: 0px 50px;
  min-height: 500px;
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 99;
`

const SearchWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100px;
  z-index: 9999;
`


const Tabs = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: #f0f0f0;
  padding: 10px;
  z-index: 999999;
`;


const Tab = styled.div<{ active: boolean }>`
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? '#007bff' : 'transparent')};
  color: ${(props) => (props.active ? '#ffffff' : '#000000')};
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e0e0e0')};
  }
`;