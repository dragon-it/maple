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


const apiFunctions = [
  getBasicInformation,
  // getCharacterStat,
  // getCharacterPopularity,
  // getHyperStat,
  // getPropensity,
  // getAbility,
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
  // getHexaMatrixStat,
  // getDojang,
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
      {result && result.getBasicInformation && (
        <InfoWrap>
          <div><img src={result.getBasicInformation.character_image} alt={result.getBasicInformation.character_name} /></div>
          <div>캐릭터 이름: {result.getBasicInformation.character_name}</div>
          <div>직업: {result.getBasicInformation.character_class}</div>
          <div>레벨: {result.getBasicInformation.character_level}</div>
          <div>길드: {result.getBasicInformation.character_guild_name}</div>
          <div>차수: {result.getBasicInformation.character_class_level}차</div>
          <div>경험치 비율: {result.getBasicInformation.character_exp_rate}%</div>
          <div>월드: {result.getBasicInformation.world_name}</div>
          {/* <PointStat>
          {result.getstatInfo.final_stat.slice(16, 22).map((stat, index) => (
            <div key={index}>
              {stat.stat_name}: {stat.stat_value}
            </div>
          ))}
          </PointStat> */}
          <div>정보 갱신 기준: {formatDateString(result.getBasicInformation.date)}</div>
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
  background-color: #6b77e0;

`;

const InfoWrap = styled.div`

  width: 100%;
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
