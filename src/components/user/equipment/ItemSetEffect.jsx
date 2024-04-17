import React, { useState } from 'react';
import styled from 'styled-components';

export const ItemSetEffect = ({ setinfo }) => {
  const [expandedArray, setExpandedArray] = useState([]);

  const extractAll = (setOption) => {
    const patterns = [
      { regex: /공격력\s*:\s*\+(\d+),\s*마력\s*:\s*\+(\d+)/, replacement: '공격력 / 마력 : +$1' },
      { regex: /최대 HP\s*:\s*\+(\d+),\s*최대 MP\s*:\s*\+(\d+)/, replacement: '최대 HP / 최대 MP : +$1' },
      { regex: /최대 HP\s*:\s*\+(\d+)%,\s*최대 MP\s*:\s*\+(\d+)%/, replacement: '최대 HP / 최대 MP : +$1%' } // 백분율을 위한 새로운 패턴
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
      // 토글된 상태를 현재 상태에 반대로 설정합니다.
      newArray[index] = !newArray[index]; // 불리언 값을 토글합니다.
      return newArray;
    });
  };


  return (
    <Container>
      <Header>SET EFFECT</Header>
      {setinfo.set_effect && Array.isArray(setinfo.set_effect) && (
        <ul>
          {setinfo.set_effect.map((effect, index) => (
            <SetEffectName key={index} onClick={() => handleSetClick(index)}>
              {effect.set_effect_info.length > 0 && ( // set_effect_info가 비어있지 않은 경우에만 출력
                <>
                  {effect.set_name ? (
                    <>
                      <span>{expandedArray[index] ? <span>▼&nbsp;</span> : <span>▶&nbsp;</span>}{effect.set_name}</span> {/* 기존 세트 이름 출력 */}
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  {effect.set_option}
                  {expandedArray[index] && (
                    <div>
                      {effect.set_effect_info.length > 0 && (
                        <ul>
                          {effect.set_effect_info.map((info, infoIndex) => (
                            <li key={infoIndex}>
                              <SetEffectWrap>
                                <SetEffectHeader>{info.set_count}세트효과</SetEffectHeader>
                                <SetEffectDetail>
                                  {extractAll(info.set_option)
                                    .split(',')
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
  background-color: rgba(0,0,0, 0.9);
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  color: white;
  max-height: 600px;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #ffffff rgba(104, 103, 103, 0.5);

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
`;

const Header = styled.div`
    font-size: 15px;
  font-weight: 700;
  color: rgb(220,252,2);
  margin-bottom: 5px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`

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

const SetEffectWrap  = styled.div`
  font-size: 14px;
`
const SetEffectHeader = styled.div`
  color: #ccff00;
  margin-bottom: 3px;
`

const SetEffectDetail = styled.div`
  color: white;
  font-size: 12px;
  line-height: 14px;
`


