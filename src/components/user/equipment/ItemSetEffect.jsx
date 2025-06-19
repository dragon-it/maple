import React, { useState } from "react";
import styled from "styled-components";

export const ItemSetEffect = ({ setinfo }) => {
  const [expandedArray, setExpandedArray] = useState([]);

  // 옵션 문자열에서 특정 패턴을 추출하고 대체하는 함수
  const extractAll = (setOption) => {
    const patterns = [
      {
        regex: /공격력\s*:\s*\+(\d+),\s*마력\s*:\s*\+(\d+)/, // 공격력과 마력을 추출하는 정규식
        replacement: "공격력 / 마력 : +$1",
      },
      {
        regex: /최대 HP\s*:\s*\+(\d+),\s*최대 MP\s*:\s*\+(\d+)/, // 최대 HP와 MP를 추출하는 정규식
        replacement: "최대 HP / 최대 MP : +$1",
      },
      {
        regex: /최대 HP\s*:\s*\+(\d+)%,\s*최대 MP\s*:\s*\+(\d+)%/, // 백분율 형태의 최대 HP와 MP를 추출하는 정규식
        replacement: "최대 HP / 최대 MP : +$1%",
      },
    ];

    let updatedOption = setOption;

    patterns.forEach(({ regex, replacement }) => {
      const regexResult = updatedOption.match(regex);
      if (regexResult) {
        updatedOption = updatedOption.replace(regex, replacement);
      }
    });
    return updatedOption;
  };

  const handleSetClick = (index) => {
    setExpandedArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index]; // 불리언 값을 토글.
      return newArray;
    });
  };

  return (
    <Container>
      <Header>SET EFFECT</Header>
      {/* setinfo.set_effect가 존재하고 배열인 경우에만 렌더링 */}
      {setinfo.set_effect && Array.isArray(setinfo.set_effect) && (
        <ul>
          {setinfo.set_effect.map((effect, index) => (
            <SetEffectName key={index} onClick={() => handleSetClick(index)}>
              {/* set_effect_info가 비어있지 않은 경우에만 출력. */}
              {effect.set_effect_info.length > 0 && (
                <>
                  {effect.set_name ? (
                    <>
                      <span>
                        {expandedArray[index] ? (
                          <span>▼&nbsp;</span>
                        ) : (
                          <span>▶&nbsp;</span>
                        )}
                        {effect.set_name}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                  {effect.set_option}
                  {/* 확장된 상태일 때만 세트 효과 정보를 표시 */}
                  {expandedArray[index] && (
                    <div>
                      {effect.set_effect_info.length > 0 && (
                        <ul>
                          {effect.set_effect_info.map((info, infoIndex) => (
                            <li key={infoIndex}>
                              <SetEffectWrap>
                                <SetEffectHeader>
                                  {info.set_count}세트효과
                                </SetEffectHeader>
                                <SetEffectDetail>
                                  {/* 옵션 문자열을 추출하고 줄바꿈하여 표시 */}
                                  {extractAll(info.set_option)
                                    .split(",")
                                    .map((option, index) => (
                                      <p key={index}>{option.trim()}</p>
                                    ))}
                                </SetEffectDetail>
                              </SetEffectWrap>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </>
              )}
            </SetEffectName>
          ))}
        </ul>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: -261px;
  width: 250px;
  padding: 10px;
  white-space: pre-wrap;
  background: linear-gradient(
    180deg,
    rgba(57, 70, 81, 1) 0%,
    rgba(46, 55, 62, 1) 9%,
    rgba(44, 51, 58, 1) 100%
  );
  border: 1px solid #4f606b;
  border-radius: 7px;
  outline: 1px solid #242b33;
  color: white;
  max-height: 600px;
  overflow-y: scroll;

  ul {
    list-style: none;
    padding: 0;
    cursor: pointer;
    margin-top: 10px;
  }
  li {
    cursor: pointer;
    margin: 8px 0;
  }

  @media screen and (max-width: 1280px) {
    position: relative;
    width: 100%;
    max-height: fit-content;
    left: 0%;
  }
`;

const Header = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const SetEffectName = styled.div`
  &:not(:empty) {
    color: #ffffff;
    border-bottom: 1px dashed rgb(89, 85, 82);

    span {
      display: flex;
      align-items: center;
      margin: 3px 0;
      &:hover {
        background-color: rgba(91, 91, 91, 0.5);
      }
    }
  }
  ul {
    &:hover {
      background-color: rgba(91, 91, 91, 0.5);
    }
  }
`;

const SetEffectWrap = styled.div`
  font-size: 14px;
`;
const SetEffectHeader = styled.div`
  color: #ccff00;
  margin-bottom: 3px;
`;

const SetEffectDetail = styled.div`
  color: white;
  font-size: 12px;
  line-height: 14px;
`;
