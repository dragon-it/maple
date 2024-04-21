import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Search } from '../components/main/Search';
import Information from '../components/user/Information';
import { Equipment } from '../components/user/Equipment';
import { Skill } from '../components/user/Skill';
import { useParams } from 'react-router-dom';
import fetchData from '../api/fetchData';
import loadingImg from '../assets/loading.gif'
import { Error } from './Error';
import { Union } from '../components/user/Union';
import { useTheme } from '../context/ThemeProvider';


export const User = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const { characterName } = useParams();
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(result)

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        setLoading(true);
        await fetchData(characterName, setResult, setError);
        setLoading(false); 
      } catch (error) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false); 
      }
    };

    fetchDataAndUpdateState();
  }, [characterName]);


  return (
    <>
      {loading ? (
        <LoadingWrap>
          <img src={loadingImg} alt="로딩 중..." />
        </LoadingWrap>
      ) : (
        <Container>
          <HeaderWrap>
            <Tabs>
              <Tab onClick={() => handleTabClick(1)} active={activeTab === 1}>캐릭터 정보</Tab>
              <Tab onClick={() => handleTabClick(2)} active={activeTab === 2}>캐릭터 장비</Tab>
              <Tab onClick={() => handleTabClick(3)} active={activeTab === 3}>스킬</Tab>
              <Tab onClick={() => handleTabClick(4)} active={activeTab === 4}>유니온</Tab>
            </Tabs>
            <SearchWrap>
              <Search />
            </SearchWrap>
          </HeaderWrap>
          {activeTab === 1 && <Information result={result} />}
          {activeTab === 2 && <Equipment result={result}/>}
          {activeTab === 3 && <Skill result={result}/>}
          {activeTab === 4 && <Union result={result}/>}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  height: auto;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bgColor};
  z-index: 99;
  box-sizing: border-box;
  margin-top: 40px;
`

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px 10px;

`

const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
`


const Tabs = styled.div`
  display: flex;
  top: 0;
  flex-direction: row;
  padding: 10px 0;
  z-index: 999999;
`;


const Tab = styled.div`
  cursor: pointer;
  padding: 10px 8px;
  margin: 0 10px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  background-color: ${({ theme, active }) => (active ? theme.tabActiveColor : 'transparent')};  
  color:  ${({ theme, active }) => (active ? theme.tabActiveTextColor : theme.tabColor)};  
  &:hover {
  background-color: ${({ theme, active }) => (active ? theme.tabNotHoverColor : theme.tabHoverColor)};
}
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

