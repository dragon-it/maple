import React from 'react'
import styled from 'styled-components'
import UnionArtifactIcon from './UnionArtifactIcon';
import { UnionRaider } from './UnionRaider';
import { UnionOccupiedStat } from './UnionOccupiedStat';

export const UnionArtifact = ({ Data,showUnionRaider, setShowUnionRaider }) => {


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
      <UnionRaiderText onClick={() => setShowUnionRaider(prevState => !prevState)}>
        {showUnionRaider ? "유니온 아티팩트 보기": "유니온 점령지도 보기"}
      </UnionRaiderText>
      {showUnionRaider 
      ? 
      <>      
        <RaiderWrap>
          <UnionRaider Data={Data.unionRaider}/>
        </RaiderWrap>
        <UnionOccupiedStat Data={Data.unionRaider}/>
      </>

      :
      <ArtifactWrap>
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
      </ArtifactWrap>
      }

    </Container>
  )
}


const Container = styled.div`
  display: flex;
  justify-content: ${(props) => (props.RaiderShow  ? "space-around" : "flex-start")}; 
  align-items: ${(props) => (props.RaiderShow  ? "center" : "")}; 
  gap: 5px;
  background-color: rgb(56, 60, 69);
  border-radius: 5px;
  border: 1px solid rgb(69,89,100);
  outline: 1px solid rgb(56,70,81);
  padding: 5px;
  width: 682px;
  flex-wrap: wrap;
  color: white;

  @media screen and (max-width:1024px){
    width: 100%;
  }

`
const RaiderWrap = styled.div`
  display: flex;
  background-color: rgb(56, 60, 69);
  border-radius: 5px;
  border: 2px solid rgb(69,89,100);
  outline: 2px solid rgb(56,70,81);
  height: fit-content;
`

const UnionRaiderText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  border-radius: 5px;
  color: black;
  background-color: rgb(144, 177, 187);
  cursor: pointer;
  &:hover{
    background-color: rgb(1, 196, 255);
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


const ArtifactWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  width: 970px;
  gap: 5px;
  :hover{
    background-color: #525050;
  }

  @media screen and (max-width:1024px){
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
`