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
    const fetchData = async () => {
      if (characterName.trim() !== '') {
        try {
          setLoading(true);
          const ocidData = await getOcidApi(characterName);
          if (ocidData) {
            console.log('OCID Data:', ocidData.ocid);

            const results = [];
            for (const api of apiFunctions) {
              await new Promise((resolve) => setTimeout(resolve, 500));
              const result = await api(ocidData.ocid);
              results.push(result);
            }

            const resultObject = Object.fromEntries(apiFunctions.map((api, index) => [api.name, results[index]]));
            setResult(resultObject);
            console.log(resultObject);
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

    fetchData(); // 컴포넌트가 마운트될 때 초기 데이터 로딩
    return () => {
      // 언마운트 시 cleanup 함수 (optional)
      // 여기에 중단할 작업을 추가할 수 있습니다.
    };
  }, [characterName]);

  return (
    <Container>
      {result && result.getBasicInformation && result.getDojang && (
        <InfoWrap>
          <div>정보 갱신 기준: {formatDateString(result.getBasicInformation.date)}</div>
          <BasicInformation BasicInfo={result.getBasicInformation}></BasicInformation>
          <DojangInformation DojangInfo={result.getDojang}></DojangInformation>
          <AbilityInformation AbilityInfo={result.getAbility}></AbilityInformation>
          <HexaStatInformation HexaStatInfo={result.getHexaMatrixStat}></HexaStatInformation>
          <HyperStatInformation HyperStatInfo={result.getHyperStat}></HyperStatInformation>
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
    margin: auto;
    display: flex;
    transition: 1s;
  }
`;

export default Information;
