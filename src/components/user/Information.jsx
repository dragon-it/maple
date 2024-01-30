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

export const Information = () => {
  const { characterName } = useParams();
  const [basicInfo, setBasicInfo] = useState(null);
  const [statInfo, setstatInfo] = useState(null);
  
  // Add more states for other information if needed

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async () => {
    if (characterName.trim() !== '') {
      try {
        const ocidData = await getOcidApi(characterName);
        if (ocidData) {
          console.log('OCID Data:', ocidData);

          const characterBasicInfo = await getBasicInformation(ocidData.ocid);
          if (characterBasicInfo) {
            console.log('Character Basic Information:', characterBasicInfo);
            setBasicInfo(characterBasicInfo);

            // Add more API calls for other information
            const characterStat = await getCharacterStat(ocidData.ocid);
            if (characterStat) {
              console.log('Character Stat Information:', characterStat);
              setstatInfo(characterStat);

              // Set state for characterStat or update as needed
            } else {
              console.error('Error fetching character stat information.');
            }

            // Repeat the process for other APIs
          } else {
            console.error('Error fetching character basic information.');
          }
        } else {
          console.error('Error fetching OCID.');
        }
      } catch (error) {
        console.error('Error during search:', error);
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, [characterName]);

  return (
    <Container>
      {basicInfo && (
        <InfoWrap>
          <img src={basicInfo.character_image} alt={basicInfo.character_name} />
          <div>캐릭터 이름: {basicInfo.character_name}</div>
          <div>클래스: {basicInfo.character_class}</div>
          <div>레벨: {basicInfo.character_level}</div>
          <div>길드: {basicInfo.character_guild_name}</div>
          <div>차수: {basicInfo.character_class_level}차</div>
          <div>경험치: {basicInfo.character_exp_rate}%</div>
          <div>경험치: {basicInfo.character_exp}</div>
          <div>월드: {basicInfo.world_name}</div>
          <div>스탯: </div>
          <div>정보 갱신 기준: {formatDateString(basicInfo.date)}</div>
        </InfoWrap>
      )}
      {/* Render other information based on the state of other API calls */}
    </Container>
  );
};

const Container = styled.div``;

const InfoWrap = styled.div``;
