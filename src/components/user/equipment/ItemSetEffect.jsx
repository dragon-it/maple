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
    const newArray = prevArray.map((_, i) => (i === index ? !prevArray[i] : false));
    return newArray;
  });
};


  return (
    <Container>
      {setinfo.set_effect && Array.isArray(setinfo.set_effect) && (
        <ul>
          {setinfo.set_effect.map((effect, index) => (
            <li key={index} onClick={() => handleSetClick(index)}>
              {effect.set_effect_info.length > 0 && ( // set_effect_info가 비어있지 않은 경우에만 출력
                <>
                  {effect.set_name ? `${effect.set_name}` : `${effect.set_count}`} {effect.set_option}
                  {expandedArray[index] && (
                    <div>
                      {effect.set_effect_info.length > 0 && (
                        <ul>
                          {effect.set_effect_info.map((info, infoIndex) => (
                            <li key={infoIndex}>
                              <SetEffectWrap>
                                <SetEffectHeader>{info.set_count}세트 효과</SetEffectHeader>
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
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: 100%;
  margin-left: 10px;
  padding: 10px;
  white-space: pre-line;
  background-color: black;
  border-radius: 5px;
  border: 1px solid white;
  outline: 1px solid black;
  color: white;
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    cursor: pointer;
    margin: 8px 0;
    color: #e45b5b;
  }

`;

const SetEffectWrap  = styled.div`
  font-size: 14px;
`

const SetEffectDetail = styled.div`
  color: white;
`
const SetEffectHeader = styled.div`
  color: #ccff00;
`