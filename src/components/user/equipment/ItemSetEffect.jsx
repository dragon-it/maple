import React, { useState } from "react";
import styled from "styled-components";

export const ItemSetEffect = ({ setinfo }) => {
  // useState 훅을 사용하여 확장된 배열의 상태를 관리합니다.
  const [expandedArray, setExpandedArray] = useState([]);

  // 옵션 문자열에서 특정 패턴을 추출하고 대체하는 함수입니다.
  const extractAll = (setOption) => {
    const patterns = [
      {
        regex: /공격력\s*:\s*\+(\d+),\s*마력\s*:\s*\+(\d+)/, // 공격력과 마력을 추출하는 정규식입니다.
        replacement: "공격력 / 마력 : +$1", // 해당 패턴을 대체할 문자열입니다.
      },
      {
        regex: /최대 HP\s*:\s*\+(\d+),\s*최대 MP\s*:\s*\+(\d+)/, // 최대 HP와 MP를 추출하는 정규식입니다.
        replacement: "최대 HP / 최대 MP : +$1", // 해당 패턴을 대체할 문자열입니다.
      },
      {
        regex: /최대 HP\s*:\s*\+(\d+)%,\s*최대 MP\s*:\s*\+(\d+)%/, // 백분율 형태의 최대 HP와 MP를 추출하는 정규식입니다.
        replacement: "최대 HP / 최대 MP : +$1%", // 해당 패턴을 대체할 문자열입니다.
      },
    ];

    let updatedOption = setOption;

    // 각 패턴을 적용하여 문자열을 대체합니다.
    patterns.forEach(({ regex, replacement }) => {
      const regexResult = updatedOption.match(regex);
      if (regexResult) {
        updatedOption = updatedOption.replace(regex, replacement);
      }
    });
    return updatedOption; // 대체된 문자열을 반환합니다.
  };

  // 세트 효과 항목을 클릭했을 때 확장/축소 상태를 토글하는 함수입니다.
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
      {/* setinfo.set_effect가 존재하고 배열인 경우에만 렌더링합니다. */}
      {setinfo.set_effect && Array.isArray(setinfo.set_effect) && (
        <ul>
          {setinfo.set_effect.map((effect, index) => (
            <SetEffectName key={index} onClick={() => handleSetClick(index)}>
              {/* set_effect_info가 비어있지 않은 경우에만 출력합니다. */}
              {effect.set_effect_info.length > 0 && (
                <>
                  {effect.set_name ? (
                    <>
                      <span>
                        {expandedArray[index] ? (
                          <span>▼&nbsp;</span> // 확장된 상태일 때의 아이콘입니다.
                        ) : (
                          <span>▶&nbsp;</span> // 축소된 상태일 때의 아이콘입니다.
                        )}
                        {effect.set_name}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                  {effect.set_option}
                  {/* 확장된 상태일 때만 세트 효과 정보를 표시합니다. */}
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
                                  {/* 옵션 문자열을 추출하고 줄바꿈하여 표시합니다. */}
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
  white-space: pre-line;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
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
    color: #e45b5b;
  }

  @media screen and (max-width: 1024px) {
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
    border-bottom: 1px dashed #ffffff78;

    span {
      display: flex;
      align-items: center;
      margin: 3px 0;
      &:hover {
        background-color: rgba(104, 103, 103, 0.5);
      }
    }
  }
  ul {
    &:hover {
      background-color: rgba(104, 103, 103, 0.5);
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
