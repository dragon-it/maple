import React, { useState } from "react";
import styled from "styled-components";
import { BasicInformation } from "./Information/BasicInformation";
import { AbilityInformation } from "./Information/AbilityInformation";
import { HyperStatInformation } from "./Information/HyperStatInformation";
import { StatInformation } from "./Information/StatInformation";
import { PropensityInformation } from "./propensity/PropensityInformation";
import spirit from "../../assets/logos/spirit.png";
import { ExpHistory } from "./Information/ExpHistory";
import dummyUserData from "./Information/dummyUserData";

const Information = ({ result, loading }) => {
  const [rotation, setRotation] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const basicReady = !!result?.getCombinedData?.getBasicInformation;
  const statReady = !!result?.getCombinedData?.getCharacterStat;
  const abilityReady = !!result?.getCombinedData?.getAbility;
  const hyperReady = !!result?.getCombinedData?.getHyperStat;
  const propensityReady = !!result?.getCombinedData?.getPropensity;
  const expReady = !!result?.getExpHistory;
  const basicInfo = {
    getBasicInformation: basicReady
      ? result.getCombinedData.getBasicInformation
      : dummyUserData.getCombinedData.getBasicInformation,
    getCharacterPopularity: basicReady
      ? result.getCombinedData.getCharacterPopularity
      : dummyUserData.getCombinedData.getCharacterPopularity,
    getDojang: basicReady
      ? result.getCombinedData.getDojang
      : dummyUserData.getCombinedData.getDojang,
    getUnion: basicReady
      ? result.getCombinedData.getUnion
      : dummyUserData.getCombinedData.getUnion,
  };
  const statInfo = statReady
    ? result.getCombinedData.getCharacterStat
    : dummyUserData.getCombinedData.getCharacterStat;
  const abilityInfo = abilityReady
    ? result.getCombinedData.getAbility
    : dummyUserData.getCombinedData.getAbility;
  const hyperStatInfo = hyperReady
    ? result.getCombinedData.getHyperStat
    : dummyUserData.getCombinedData.getHyperStat;
  const propensityInfo = propensityReady
    ? result.getCombinedData.getPropensity
    : dummyUserData.getCombinedData.getPropensity;
  const expHistory = expReady
    ? result.getExpHistory
    : dummyUserData.getExpHistory;

  const showInfo =
    loading ||
    basicReady ||
    statReady ||
    abilityReady ||
    hyperReady ||
    propensityReady ||
    expReady;

  const handleHeightChange = (height) => {
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
      {showInfo && (
        <InfoWrap>
          <SynthesisWrap>
            <StatWrap>
              <BasicWrap>
                <SectionSlot>
                  <BasicInformation BasicInfo={basicInfo} blur={!basicReady} />
                </SectionSlot>
                <SectionSlot>
                  <StatInformation statInfo={statInfo} blur={!statReady} />
                </SectionSlot>
              </BasicWrap>
              <AbilWrap>
                <AbilContainer>
                  <SectionSlot>
                    <AbilityInformation
                      AbilityInfo={abilityInfo}
                      blur={!abilityReady}
                    ></AbilityInformation>
                  </SectionSlot>
                  <SectionSlot>
                    <HyperStatInformation
                      HyperStatInfo={hyperStatInfo}
                      onHeightChange={handleHeightChange}
                      blur={!hyperReady}
                    ></HyperStatInformation>
                  </SectionSlot>
                  <SectionSlot>
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
                  </SectionSlot>
                </AbilContainer>
              </AbilWrap>
            </StatWrap>
          </SynthesisWrap>
          <ProWrap>
            <SectionSlot>
              <PropensityInformation
                propensityData={propensityInfo}
                blur={!propensityReady}
              ></PropensityInformation>
            </SectionSlot>
            <SectionSlot>
              <ExpHistory historyData={expHistory} blur={!expReady} />
            </SectionSlot>
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

const SectionSlot = styled.div`
  width: ${({ $width }) => $width || "100%"};
  min-height: ${({ $height }) => $height || "0"};
  height: ${({ $height }) => $height || "auto"};
`;

export default Information;
