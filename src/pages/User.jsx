import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Search } from '../components/main/Search';
import Information from '../components/user/Information';
import { Equipment } from '../components/user/Equipment';
import { Skill } from '../components/user/Skill';
import { useParams } from 'react-router-dom';
import fetchData from '../api/fetchData';
import errorImg from '../assets/error.png'
import loadingImg from '../assets/loading.gif'
import { Error } from './Error';

export const User = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const { characterName } = useParams();
  const [result, setResult] = useState(null); // result의 타입을 any로 지정
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(result)

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        setLoading(true); // 로딩 시작
        await fetchData(characterName, setResult, setError);
        setLoading(false); // 로딩 완료
      } catch (error) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.'); // 오류 메시지 설정
        setLoading(false); // 로딩 완료
      }
    };

    fetchDataAndUpdateState();
  }, [characterName]);

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
          스킬
        </Tab>
      </Tabs>
        {activeTab === 1 && <Information result={result} />}
        {activeTab === 2 && <Equipment result={result}/>}
        {activeTab === 3 && <Skill result={result}/>}
      </Container>
      <LoadingWrap>{loading && <img src={loadingImg} alt="로딩 중..." />}</LoadingWrap>
      {error && Error}
    </>
  );
};

const Container = styled.div`
  height: auto;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
  padding: 0px 20px 20px;
  border-radius: 5px;
  background-color: #ffffff;
  z-index: 99;
  box-sizing: border-box;
`

const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 90px;

`


const Tabs = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  padding: 10px;
  z-index: 999999;
`;


const Tab = styled.div`
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

const LoadingWrap = styled.div`
  width: 50px;
  height: 50px;
`