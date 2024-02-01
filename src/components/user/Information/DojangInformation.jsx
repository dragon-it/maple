import React from 'react';
import styled from 'styled-components';

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
};

export const DojangInformation = ({ DojangInfo }) => {
  return (
    <Container>
      <div>최고 층수: {DojangInfo.dojang_best_floor}</div>
      <div>최고 기록 달성 일: {formatDateString(DojangInfo.date_dojang_record)}</div>
      <div>최고 층수 클리어에 걸린 시간: {formatTime(DojangInfo.dojang_best_time)}</div>
    </Container>
  );
};

const Container = styled.div`
`;
