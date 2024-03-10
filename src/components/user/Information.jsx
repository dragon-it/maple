import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { BasicInformation } from './Information/BasicInformation';
import { HexaStatInformation } from './Information/HexaStatInformation';
import { AbilityInformation } from './Information/AbilityInformation';
import { HyperStatInformation } from './Information/HyperStatInformation';
import { StatInformation } from './Information/StatInformation';

import fetchData from '../../api/fetchData';


const Information = () => {
  const { characterName } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchData(characterName, setResult, setLoading, setError);
    return () => {
    };
  }, [characterName]);


  return (
    <Container>
      {result && result.getBasicInformation && (
        <InfoWrap>
          {/* <div>정보 갱신 기준: {formatDateString(result.getBasicInformation.date)}</div> */}
        <SynthesisWrap>
          <BasicWrap>
              <BasicInformation BasicInfo={{
                getBasicInformation: result.getBasicInformation,
                getCharacterPopularity: result.getCharacterPopularity,
                getDojang: result.getDojang
                }}>
              </BasicInformation>
          </BasicWrap>
          <StatWrap>
            <StatInformation statInfo={result.getCharacterStat}></StatInformation>
            <AbilWrap>
              <AbilityInformation AbilityInfo={result.getAbility}></AbilityInformation>
              <HyperStatInformation HyperStatInfo={result.getHyperStat}></HyperStatInformation>
            </AbilWrap>
          </StatWrap>
        </SynthesisWrap>
          {/* <HexaStatInformation HexaStatInfo={result.getHexaMatrixStat}></HexaStatInformation> */}
        </InfoWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 99;
  background-color: #b5b7c9;
  border-radius: 10px;
`;

const InfoWrap = styled.div`
  padding: 14px;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-family: sans-serif;
  img {
    display: flex;
    transition: 1s;
  }
`;

const SynthesisWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  
`
const BasicWrap = styled.div`
  display: flex;
  align-items: center;
  
`

const StatWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`
const HyperWrap = styled.div`
  display: flex;
  align-items: flex-end;
`

const AbilWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export default Information;
