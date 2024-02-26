import React, { useState } from 'react';
import styled from 'styled-components';

export const ItemSetEffect = ({ setinfo }) => {
  const [expandedArray, setExpandedArray] = useState([]);

  

  const extractAttackAndMagic = (setOption) => {
    const regexResult = setOption.match(/공격력\s*:\s*\+(\d+),\s*마력\s*:\s*\+(\d+)/);
    if (regexResult) {
      const [, attack, magic] = regexResult;
      const updatedOption = setOption.replace(/공격력\s*:\s*\+\d+,\s*마력\s*:\s*\+\d+/, `공격력 / 마력 : +${attack}`);
      return updatedOption;
    }
    return setOption; // 만약 공격력과 마력이 없다면 그대로 반환
  };

  const handleSetClick = (index) => {
    setExpandedArray(prevArray => {
      const newArray = [...prevArray];
      // 토글된 상태를 현재 상태에 반대로 설정합니다. 
      newArray[index] = !newArray[index]; // 불리언 값을 토글합니다.
      return newArray;
    });
  };
  return (
    <Container>
      {setinfo.set_effect && Array.isArray(setinfo.set_effect) && (
        <ul>
      {setinfo.set_effect.map((effect, index) => (
        <li key={index} onClick={() => handleSetClick(index)}>
              {effect.set_name ? `${effect.set_name}` : `${effect.set_count}`}  {effect.set_option}
              {expandedArray[index] && (
                <div>
                  {effect.set_effect_info && effect.set_effect_info.length > 0 && (
                    <ul>
                      {effect.set_effect_info.map((info, infoIndex) => (
                        <li key={infoIndex}>
                          <SetEffectText>
                            <div>{info.set_count}세트 효과</div>
                            <div>{extractAttackAndMagic(info.set_option).split(',').map((option, index) => (
                              <p key={index}>{option.trim()}</p>
                            ))}</div>
                          </SetEffectText>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};



const Container = styled.div`
  width: 500px;
  border: 1px solid black;
  white-space: pre-line;
  background-color: black;
  color: white;
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    cursor: pointer;
    margin: 8px 0;
    color: #ccff00;;
  }

  div{
    color: white;
  }
`;

const SetEffectText  = styled.div`
  font-size: 14px;
`

