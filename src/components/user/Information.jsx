import React, { useState } from 'react';
import styled from 'styled-components';
import { BasicInformation } from './Information/BasicInformation';
import { AbilityInformation } from './Information/AbilityInformation';
import { HyperStatInformation } from './Information/HyperStatInformation';
import { StatInformation } from './Information/StatInformation';
import { PropensityInformation } from './propensity/PropensityInformation';
import spirit from '../../assets/spirit.png'

const Information = ({ result }) => {

  const [isFlipped, setIsFlipped] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  console.log(result)


  const handleHeightChange = (height) => {
    console.log("HyperStatInformation의 높이:", height);
    // height가 300 이하일 경우 이미지를 표시
    if (height <= 350) {
      document.getElementById('spiritImage').style.display = 'block';
    } else {
      document.getElementById('spiritImage').style.display = 'none';
      const spiritTextElement = document.getElementById('spiritText');
      if (spiritTextElement) {
        spiritTextElement.style.display = 'none';
      }
    }
  };

  const toggleFlip = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 23) {
        return prevCount; 
      } else if (newCount > 6) { 
        setIsFlipped(!isFlipped);
      } else if (newCount <= 6) {
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
                  getDojang: result.getDojang,
                  getUnion: result.getUnion,
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
                    }} 
                  />
                  {clickCount === 22 && <SpiritText id="spiritText">어지럽담...</SpiritText>}
                </ImgWrap>
              </AbilContainer>
            </AbilWrap>
          </StatWrap>
        </SynthesisWrap>
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
  border-radius: 10px;
`;

const InfoWrap = styled.div`
  padding: 10px;
  padding-top: 5px;
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
  min-width: 275px;
`

const ProWrap = styled.div`
  display: flex;
  flex-direction: column;

`

const ImgWrap = styled.div`
  position: relative;
  user-select: none;
  img{
    width: 100%;
    max-height: 220px;
    max-width: 345px;
    border: 1px solid rgb(80,92,101);
    outline: 1px solid rgb(42,49,58);
    border-radius: 5px;
    background-color: rgba(59,66,75, 0.9);
  }
`
const SpiritText = styled.div`
  position: absolute;
  bottom: 40px;
  right: 0;
  color: white;
  font-family: maple-light;
  border-radius: 5px;
`

export default Information;
