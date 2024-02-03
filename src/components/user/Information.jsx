import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  getOcidApi,
  getBasicInformation,
  getCharacterStat,
  getCharacterPopularity,
  getHyperStat,
  getPropensity,
  getAbility,
  getItemEquipment,
  getCashItemEquipment,
  getSymbolEquipment,
  getSetEffect,
  getBeautyEquipment,
  getAndroidEquipment,
  getPetEquipment,
  getSkill,
  getLinkSkill,
  getVMatrix,
  getHexaMatrix,
  getHexaMatrixStat,
  getDojang,
} from '../../api/api';
import { useParams } from 'react-router-dom';
import { BasicInformation } from './Information/BasicInformation';
import { DojangInformation } from './Information/DojangInformation';
import { HexaStatInformation } from './Information/HexaStatInformation';
import { AbilityInformation } from './Information/AbilityInformation';
import { HyperStatInformation } from './Information/HyperStatInformation';

const apiFunctions = [
  getBasicInformation,
  // getCharacterStat,
  // getCharacterPopularity,
  getHyperStat,
  // getPropensity,
  getAbility,
  // getItemEquipment,
  // getCashItemEquipment,
  // getSymbolEquipment,
  // getSetEffect,
  // getBeautyEquipment,
  // getAndroidEquipment,
  // getPetEquipment,
  // // getSkill,
  // // 스킬 파라미터 조정 예정
  // getLinkSkill,
  // getVMatrix,
  // getHexaMatrix,
  getHexaMatrixStat,
  getDojang,
];

export const Information = () => {
  const { characterName } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



const formatDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

  const handleSearch = async () => {
    if (characterName.trim() !== '') {
      try {
        setLoading(true);
        const ocidData = await getOcidApi(characterName);
        if (ocidData) {
          console.log('OCID Data:', ocidData.ocid);
  
          const results = [];
          for (const api of apiFunctions) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const result = await api(ocidData.ocid);
            results.push(result);
          }
  
          const resultObject = Object.fromEntries(apiFunctions.map((api, index) => [api.name, results[index]]));
          setResult(resultObject);
          console.log(resultObject)
        } else {
          setError('Error fetching OCID.');
        }
      } catch (error) {
        setError(`Error during search: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  
  useEffect(() => {
    handleSearch();
  }, [characterName]);

  return (
    <Container>
      {result && result.getBasicInformation && result.getDojang && (
        <InfoWrap>
          <div>정보 갱신 기준: {formatDateString(result.getBasicInformation.date)}</div>
          <BasicInformation BasicInfo={result.getBasicInformation}></BasicInformation>
          <AbilityInformation AbilityInfo={result.getAbility}></AbilityInformation>
          <DojangInformation DojangInfo={result.getDojang}></DojangInformation>
          <HexaStatInformation HexaStatInfo={result.getHexaMatrixStat}></HexaStatInformation>
          <HyperStatInformation HyperStatInfo={result.getHyperStat}></HyperStatInformation>
          {/* <PointStat>
          {result.getstatInfo.final_stat.slice(16, 22).map((stat, index) => (
            <div key={index}>
              {stat.stat_name}: {stat.stat_value}
            </div>
          ))}
          </PointStat> */}
        </InfoWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 300px;
  height: 500px;
  z-index: 99;
  background-color: #b5b7c9;
  border-radius: 10px;
`;

const InfoWrap = styled.div`
  padding: 14px;
  height: 100%;
  img{
    margin: auto;
    display: flex;
    width: 130px;
    height: 130px;
    transform: scalex(-1);
    transition: 1s;
  }
`;

// const PointStat = styled.div``;
