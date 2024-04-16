import React, { useState } from 'react'
import styled from 'styled-components'
import UnionArtifactIcon from './UnionArtifactIcon';
import { UnionRaider } from './UnionRaider';

export const UnionArtifact = ({ Data }) => {
  console.log(Data)
  const [showUnionRaider, setShowUnionRaider] = useState(false);
  const NameValue = Data.unionArtiFact.union_artifact_crystal.map(crystal => 
    crystal.name.replace('크리스탈 : ', '')
  );


  const getIcon = (name, level) => {
    const nameKey = {
      "주황버섯": "orange_Mushroom",
      "슬라임": "slime",
      "뿔버섯": "horny_Mushroom",
      "스텀프": "stump",
      "스톤골렘": "stone_Golem",
      "발록": "balrog",
      "자쿰": "zaqqum",
      "핑크빈":"pink_Bean",
      "파풀라투스":"papulatus"
    }[name];

    if(nameKey) {
      return UnionArtifactIcon[nameKey][level >= 5 ? 1 : 0];
    } else {
      return null;
    }
  };
  
  return (
    <Container RaiderShow={showUnionRaider}>
      <UnionRaiderText onClick={() => setShowUnionRaider(prevState => !prevState)}> {showUnionRaider? "유니온 점령지도 보기": "유니온 아티팩트 보기"}</UnionRaiderText>
      {showUnionRaider 
      ? 
      <RaiderWrap>
        <UnionRaider Data={Data.unionRaider}/>
      </RaiderWrap>
      
      :
      <>
        {Data.unionArtiFact.union_artifact_crystal.map((crystal, index) => (
        <InfoWrap key={index}>
          <ArtiFactIcon>          
            <img src={getIcon(NameValue[index], crystal.level)} alt={`${NameValue[index]} 아이콘`} />
          </ArtiFactIcon>

          <Name>
            {NameValue[index]} Lv.{crystal.level}
          </Name>
          <Option>
            <p>{crystal.crystal_option_name_1}</p>
            <p>{crystal.crystal_option_name_2}</p>
            <p>{crystal.crystal_option_name_3}</p>
          </Option>
      </InfoWrap>
      ))}
      </>
      }

    </Container>
  )
}


const Container = styled.div`
  display: flex;
  justify-content: ${(props) => (props.RaiderShow  ? "center" : "flex-start")}; 
  gap: 5px;
  flex-direction: row;
  font-family: maple-light;
  background-color: rgb(56, 60, 69);
  border-radius: 5px;
  border: 1px solid rgb(69,89,100);
  outline: 1px solid rgb(56,70,81);
  padding: 5px;
  width: 682px;
  height: auto;
  flex-wrap: wrap;
  color: white;
`
const RaiderWrap = styled.div`
  background-color: rgb(56, 60, 69);
  border-radius: 5px;
  border: 2px solid rgb(69,89,100);
  outline: 2px solid rgb(56,70,81);
  height: fit-content;
`

const UnionRaiderText = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 5px;
  text-align: center;
  background-color: rgb(87, 179, 207);
  cursor: pointer;
  :hover{
    background-color: rgba(189, 179, 179, 0.171);
  }
`

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(48,54,63);
  border-radius: 5px;
  border: 1px solid rgb(136, 184, 212);
  outline: 1px solid rgb(56,70,81);
  gap: 5px;
  padding: 5px;
  width: 220px;

`

const ArtiFactIcon = styled.div`
  img{
  width: 90px;
  height: 90px;
  }

`


const Option = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
`

const Name = styled.div`
  
`

const Level = styled.div`
`