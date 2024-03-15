import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { BasicInformation } from './Information/BasicInformation';
import { HexaStatInformation } from './Information/HexaStatInformation';
import { AbilityInformation } from './Information/AbilityInformation';
import { HyperStatInformation } from './Information/HyperStatInformation';
import { StatInformation } from './Information/StatInformation';
import fetchData from '../../api/fetchData';
import { PropensityInformation } from './propensity/PropensityInformation';
import spirit from '../../assets/spirit.png'

const Information = () => {
  const { characterName } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    fetchData(characterName, setResult, setLoading, setError);
    return () => {
    };
  }, [characterName]);

  const handleHeightChange = (height) => {
    console.log("HyperStatInformation의 높이:", height);
    // height가 270 이하일 경우 이미지를 표시합니다.
    if (height <= 300) {
      document.getElementById('spiritImage').style.display = 'block';
    } else {
      document.getElementById('spiritImage').style.display = 'none';
    }
  };

  const toggleFlip = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount > 6) { 
        setIsFlipped(!isFlipped);
      } else if (newCount < 6) {
        setIsFlipped(!isFlipped);
      }
      return newCount;
    });
  };

  const getTransformStyle = () => {
    if (clickCount < 5) {
      return isFlipped ? 'scaleX(-1)' : 'scaleX(1)';
    } else {
      return isFlipped ? 'scaleY(-1)' : 'scaleY(1)';
    }
  };

  return (
    <Container>
      {result && result.getBasicInformation && (
        <InfoWrap>
          {/* <div>정보 갱신 기준: {formatDateString(result.getBasicInformation.date)}</div> */}
        <SynthesisWrap>
          <StatWrap>
            <BasicWrap>
              <BasicInformation BasicInfo={{
                  getBasicInformation: result.getBasicInformation,
                  getCharacterPopularity: result.getCharacterPopularity,
                  getDojang: result.getDojang
                  }}>
              </BasicInformation>
              <StatInformation statInfo={result.getCharacterStat}></StatInformation>
            </BasicWrap>
            <AbilWrap>
              <AbilContainer>
                <AbilityInformation AbilityInfo={result.getAbility}></AbilityInformation>
                <HyperStatInformation HyperStatInfo={result.getHyperStat} onHeightChange={handleHeightChange}></HyperStatInformation>
                <ImgWrap>
                  <img id="spiritImage" src={spirit} alt="" onClick={toggleFlip}
                    style={{
                    transform: getTransformStyle(),
                    transition: 'transform 0.5s',
                  }} />
                </ImgWrap>
              </AbilContainer>
            </AbilWrap>
          </StatWrap>
        </SynthesisWrap>
          {/* <HexaStatInformation HexaStatInfo={result.getHexaMatrixStat}></HexaStatInformation> */}
          <ProWrap>          
            <PropensityInformation propensityData={result.getPropensity}></PropensityInformation>
          </ProWrap>
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
  gap: 5px;
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
  gap: 5px;
  flex-direction: column;
  align-items: center;
  
`

const StatWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`


const AbilWrap = styled.div`
    display: flex;
  justify-content: flex-end;
  
`

const AbilContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  max-height: 614px;
  min-width: 275px;
`

const ProWrap = styled.div`
  display: flex;
  flex-direction: column;

`

const ImgWrap = styled.div`
  img{
    width: 100%;
    height: 90%;
    max-height: 220px;
    max-width: 322px;
    border: 1px solid rgb(80,92,101);
    outline: 1px solid rgb(42,49,58);
    border-radius: 5px;
    background-color: rgba(59,66,75, 0.9);
  }
  
`
export default Information;
