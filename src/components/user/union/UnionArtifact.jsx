import styled from "styled-components";
import UnionArtifactIcon from "./UnionArtifactIcon";
import { UnionRaider } from "./UnionRaider";
import { UnionOccupiedStat } from "./UnionOccupiedStat";
import { UnionChampion } from "./UnionChampion";
import colors from "../../common/color/colors";

export const UnionArtifact = ({ Data, activeTab, setActiveTab }) => {

  const NameValue = Data.unionArtiFact.union_artifact_crystal.map((crystal) =>
    crystal.name.replace("크리스탈 : ", "")
  );

  const getIcon = (name, level) => {
    const nameKey = {
      주황버섯: "orange_Mushroom",
      슬라임: "slime",
      뿔버섯: "horny_Mushroom",
      스텀프: "stump",
      스톤골렘: "stone_Golem",
      발록: "balrog",
      자쿰: "zaqqum",
      핑크빈: "pink_Bean",
      파풀라투스: "papulatus",
    }[name];

    if (nameKey) {
      return UnionArtifactIcon[nameKey][level >= 5 ? 1 : 0];
    } else {
      return null;
    }
  };

  return (
    <Wrap>
      <TabMenu>
        <TabButton
          isActive={activeTab === "raider"}
          onClick={() => setActiveTab("raider")}
        >
          공격대
        </TabButton>
        <TabButton
          isActive={activeTab === "artifact"}
          onClick={() => setActiveTab("artifact")}
        >
          아티팩트
        </TabButton>
        <TabButton
          isActive={activeTab === "champion"}
          onClick={() => setActiveTab("champion")}
        >
          챔피언
        </TabButton>
      </TabMenu>
      <ContentsWrap activeTab={activeTab}>
        <>
          {activeTab === "artifact" && (
            <ArtifactWrap>
              {Data.unionArtiFact.union_artifact_crystal.map((crystal, index) => (
                <InfoWrap key={index}>
                  <img
                    src={getIcon(NameValue[index], crystal.level)}
                    alt={`${NameValue[index]} 아이콘`}
                  />
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
          )}
          {activeTab === "raider" && (
            <>
              <RaiderWrap>
                <UnionRaider Data={Data.unionRaider} />
              </RaiderWrap>
              <UnionOccupiedStat Data={Data.unionRaider} />
            </>
          )}
          {activeTab === "champion" && (
            <ChampionWrap>
              <UnionChampion Data={Data.unionChampion} /> 
              {/* 추후 유니온 챔피언 추가할 것  */}
            </ChampionWrap>
          )}
        </>
      </ContentsWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  gap: 0px;
`

const ContentsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${colors.deepBlue.deepBlue3};
  border-radius: 5px;
  border: 1px solid ${colors.deepBlue.deepBlue4};
  outline: 1px solid ${colors.deepBlue.deepBlue1};
  padding: 5px;
  height: fit-content;
  color: white;
  width: ${(props) =>
    props.activeTab === "raider" ? "100%" : "682px"};
  flex-direction: row;
`;

const RaiderWrap = styled.div`
  display: flex;
  background-color: rgb(56, 60, 69);
  border-radius: 5px;
  border: 2px solid rgb(69, 89, 100);
  outline: 2px solid rgb(56, 70, 81);
  height: fit-content;
`;


const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(48, 54, 63);
  border-radius: 5px;
  border: 1px solid rgb(136, 184, 212);
  outline: 1px solid rgb(56, 70, 81);
  gap: 5px;
  padding: 5px;

  &:hover {
    filter: brightness(0.85);
  }
  img {
    width: 90px;
    height: 90px;
  }
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;

  @media screen and (max-width: 1024px) {
    flex-direction: row;
  }
`;

const Name = styled.p``;

const ArtifactWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  width: 970px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
`;


const TabMenu = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;

  @media screen and (max-width: 1024px) {
    flex-direction: row;
  }
`;

const TabButton = styled.button`
  padding: 10px;
  width: 30px;
  height: auto;
  font-size: 12px;
  background-color: ${(props) =>
    props.isActive ? colors.union.unionRaiderColor.TabHoverBackground : colors.union.unionRaiderColor.TabBackground};
  color: white;
  border: 1px solid ${colors.union.unionRaiderColor.Border};
  cursor: pointer;
  border-radius: 8px 0px 0px 8px;
  
  &:hover {
    background-color: ${colors.union.unionRaiderColor.TabHoverBackground};
  }
`;

const ChampionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(48, 54, 63);
  border-radius: 5px;
  padding: 20px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  width: 970px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
`;