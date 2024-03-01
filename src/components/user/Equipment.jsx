import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import fetchData from '../../api/fetchData';
import styled from 'styled-components';
import { ItemEquipmentInformation } from './equipment/ItemEquipmentInformation';

export const Equipment = () => {
  const { characterName } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(result)
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        setLoading(true);

        // fetchData 함수 호출 (로딩 시작)
        await fetchData(characterName, setResult, setError);

        // fetchData 함수 호출이 완료되면 (로딩 완료)
        setLoading(false);
      } catch (error) {
        // fetchData 함수 호출 중 에러 발생 시 (로딩 완료)
        setError(`Error fetching data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchDataAndUpdateState();

    return () => {
      // cleanup 함수 (optional)
      // 컴포넌트가 언마운트될 때 실행될 작업을 추가할 수 있습니다.
    };
  }, [characterName]);


  return (
    <Container>
    {result && result.getItemEquipment && (
      <ItemEquipmentInformation 
        EquipData={{
      ...result.getItemEquipment,
      getSetEffect: result.getSetEffect,
      getSymbol: result.getSymbolEquipment,
    }}
  />
)}

    </Container>
  )
}

const Container = styled.div`
  
`