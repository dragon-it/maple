import React from "react";
import styled from "styled-components";

export const SkillDetail = ({ item, clicked, onClose }) => {
  if (!item) {
    return <SelectContainer>스킬을 선택해주세요.</SelectContainer>;
  }

  return (
    <Container onClick={onClose}>
      <div style={{ position: "relative" }}>{clicked && <PinImage />}</div>
      <SkillNameWrap>
        <h2>
          <SkillName>{item.skill_name}</SkillName>
        </h2>
      </SkillNameWrap>
      <IconWrap>
        <IconImage>
          <img src={item.skill_icon} alt="icon" />
        </IconImage>
      </IconWrap>
      <SkillDescriptionWrap>
        <p>{item.skill_description}</p>
      </SkillDescriptionWrap>
      <SkillEffect>
        <p>{item.skill_effect}</p>
      </SkillEffect>
    </Container>
  );
};

const SelectContainer = styled.div`
  position: absolute;
  right: -292px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 290px;
  height: 50px;
  color: white;
  padding: 0px 10px;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  font-family: maple-light;

  @media screen and (max-width: 1504px) {
    display: none;
  }
`;
const Container = styled.div`
  position: absolute;
  right: -322px;
  width: 320px;
  background-color: #000000;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  line-height: 16px;
  color: white;
  padding: 0px 10px;
  padding-bottom: 10px;
  max-height: 600px;
  overflow-y: scroll;

  @media screen and (max-width: 1504px) {
    position: fixed;
    left: 50%;
    z-index: 99999;
    transform: translateX(-50%) translateY(0%);
  }

  @media screen and (max-width: 380px) {
    width: 292px;
  }
`;

const SkillNameWrap = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px dotted rgb(55, 56, 58);
  h2 {
    font-size: 16px;
    padding: 20px 0;
    text-align: center;
  }
`;

const SkillName = styled.div``;

const IconWrap = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  border-bottom: 2px dotted rgb(55, 56, 58);
`;

const IconImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`;

const PinImage = styled.div`
  position: absolute;
  top: -5px;
  left: -10px;
  width: 11px;
  height: 10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
  transform: rotate(45deg);
`;

const SkillDescriptionWrap = styled.div`
  font-size: 13px;
  white-space: pre-wrap;
  margin-top: 10px;
`;

const SkillEffect = styled.div`
  font-size: 13px;
  white-space: pre-wrap;
  margin-top: 10px;
`;
