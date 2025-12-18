import React, { useState } from "react";
import styled from "styled-components";
import { BasicInformation } from "./Information/BasicInformation";
import { AbilityInformation } from "./Information/AbilityInformation";
import { HyperStatInformation } from "./Information/HyperStatInformation";
import { StatInformation } from "./Information/StatInformation";
import { PropensityInformation } from "./propensity/PropensityInformation";
import spirit from "../../assets/logos/spirit.png";
import { ExpHistory } from "./Information/ExpHistory";

const Information = ({ result }) => {
  const [rotation, setRotation] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleHeightChange = (height) => {
    // height가 300 이하일 경우 이미지를 표시
    if (height <= 350) {
      document.getElementById("spiritImage").style.display = "block";
      document.getElementById("imgWrap").style.border =
        "1px solid rgb(80, 92, 101)";
      document.getElementById("imgWrap").style.outline =
        "1px solid rgb(42, 49, 58)";
    } else {
      document.getElementById("spiritImage").style.display = "none";
      document.getElementById("imgWrap").style.border = "none";
      document.getElementById("imgWrap").style.outline = "none";
      const spiritTextElement = document.getElementById("spiritText");
      if (spiritTextElement) {
        spiritTextElement.style.display = "none";
      }
    }
  };

  const toggleFlip = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount >= 23) return prevCount;
      setRotation((prevRotation) => prevRotation + 360);
      return newCount;
    });
  };

  return (
    <Container>
      {result && result.getCombinedData.getBasicInformation && (
        <InfoWrap>
          <SynthesisWrap>
            <StatWrap>
              <BasicWrap>
                <BasicInformation
                  BasicInfo={{
                    getBasicInformation:
                      result.getCombinedData.getBasicInformation,
                    getCharacterPopularity:
                      result.getCombinedData.getCharacterPopularity,
                    getDojang: result.getCombinedData.getDojang,
                    getUnion: result.getCombinedData.getUnion,
                  }}
                ></BasicInformation>
                <StatInformation
                  statInfo={result.getCombinedData.getCharacterStat}
                ></StatInformation>
              </BasicWrap>
              <AbilWrap>
                <AbilContainer>
                  <AbilityInformation
                    AbilityInfo={result.getCombinedData.getAbility}
                  ></AbilityInformation>
                  <HyperStatInformation
                    HyperStatInfo={result.getCombinedData.getHyperStat}
                    onHeightChange={handleHeightChange}
                  ></HyperStatInformation>
                  <ImgWrap id="imgWrap">
                    <img
                      id="spiritImage"
                      src={spirit}
                      alt="돌정령"
                      onClick={toggleFlip}
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: "transform 0.5s",
                      }}
                    />
                    {clickCount === 22 && (
                      <SpiritText id="spiritText">어지럽담...</SpiritText>
                    )}
                  </ImgWrap>
                </AbilContainer>
              </AbilWrap>
            </StatWrap>
          </SynthesisWrap>
          <ProWrap>
            <PropensityInformation
              propensityData={result.getCombinedData.getPropensity}
            ></PropensityInformation>
            <ExpHistory historyData={result.getExpHistory} />
          </ProWrap>
        </InfoWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  border-radius: 10px;
  white-space: nowrap;
  width: 100%;
`;

const InfoWrap = styled.div`
  width: 100%;
  padding: 5px;
  padding-top: 5px;
  height: 100%;
  display: flex;
  gap: 5px;
  flex-direction: row;

  img {
    display: flex;
    max-width: 96px;
  }

  @media screen and (max-width: 1300px) {
    display: flex;
    flex-direction: column;
  }
`;

const SynthesisWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const BasicWrap = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
`;

const StatWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const AbilWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AbilContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  min-width: 275px;
`;

const ProWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ImgWrap = styled.div`
  position: relative;
  user-select: none;
  border-radius: 5px;
  background-color: rgba(59, 66, 75, 0.9);

  img {
    width: 100%;
    max-height: 220px;
    max-width: 345px;
    margin: auto;
  }
`;

const SpiritText = styled.div`
  position: absolute;
  bottom: 40px;
  right: 0;
  color: white;
  font-family: maple-light;
  border-radius: 5px;
`;

export default Information;
