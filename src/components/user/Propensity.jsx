import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchData from '../../api/fetchData';
import { useParams } from 'react-router-dom';
import { PropensityInformation } from './propensity/PropensityInformation';

export const Propensity = () => {
  const { characterName } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      {/* 로딩 중일 때 로딩 표시 */}
      {loading && <LoadingIndicator>Loading...</LoadingIndicator>}

      {/* 에러가 발생했을 때 에러 메시지 표시 */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* 로딩이 완료되고 데이터가 있을 때 컴포넌트를 표시 */}
      {result && (
        <PropensityInformation propensityData={result.getPropensity}></PropensityInformation>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
`;

const LoadingIndicator = styled.div`
  /* 로딩 중일 때 표시될 스타일을 여기에 추가하세요. */
`;

const ErrorMessage = styled.div`
  /* 에러 발생 시 표시될 스타일을 여기에 추가하세요. */
`;

// 나머지 컴포넌트 및 스타일링은 상황에 맞게 추가하면 됩니다.
