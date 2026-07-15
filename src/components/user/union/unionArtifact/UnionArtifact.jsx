import styled from "styled-components";
import UnionArtifactIcon from "../unionArtifact/UnionArtifactIcon";
import { UnionRaider } from "../UnionRaider";
import { UnionChampion } from "../unionChampion/UnionChampion";
import colors from "../../../common/color/colors";
import level1 from "../../../../assets/pages/user/union/artifact/artifact_level_1.png";
import level2 from "../../../../assets/pages/user/union/artifact/artifact_level_2.png";
import level3 from "../../../../assets/pages/user/union/artifact/artifact_level_3.png";
import level4 from "../../../../assets/pages/user/union/artifact/artifact_level_4.png";
import level5 from "../../../../assets/pages/user/union/artifact/artifact_level_5.png";

const levelIcons = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
  5: level5,
};

export const UnionArtifact = ({
  Data,
  $activeTab,
  setActiveTab,
  selectedPresetNo,
  setSelectedPresetNo,
}) => {
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
          $isActive={$activeTab === "raider"}
          onClick={() => setActiveTab("raider")}
        >
          공격대
        </TabButton>
        <TabButton
          $isActive={$activeTab === "artifact"}
          onClick={() => setActiveTab("artifact")}
        >
          아티팩트
        </TabButton>
        <TabButton
          $isActive={$activeTab === "champion"}
          onClick={() => setActiveTab("champion")}
        >
          챔피언
        </TabButton>
      </TabMenu>

      <ContentsWrap $activeTab={$activeTab}>
        <>
          {$activeTab === "artifact" && (
            <ArtifactWrap>
              {Data.unionArtiFact.union_artifact_crystal.length === 0 ? (
                <p>데이터가 없습니다</p>
              ) : (
                Data.unionArtiFact.union_artifact_crystal.map(
                  (crystal, index) => (
                    <InfoWrap key={index}>
                      <CrystalWrap>
                        {levelIcons[crystal.level] && (
                          <LevelBadge
                            src={levelIcons[crystal.level]}
                            alt={`Lv.${crystal.level}`}
                          />
                        )}
                        <CrystalIcon
                          src={getIcon(NameValue[index], crystal.level)}
                          alt={`${NameValue[index]} 아이콘`}
                        />
                      </CrystalWrap>
                      <Option>
                        <p>{crystal.crystal_option_name_1}</p>
                        <p>{crystal.crystal_option_name_2}</p>
                        <p>{crystal.crystal_option_name_3}</p>
                      </Option>
                    </InfoWrap>
                  )
                )
              )}
            </ArtifactWrap>
          )}
          {$activeTab === "raider" && (
            <UnionRaider
              Data={Data.unionRaider}
              selectedPresetNo={selectedPresetNo}
              setSelectedPresetNo={setSelectedPresetNo}
            />
          )}
          {$activeTab === "champion" && (
            <ChampionWrap>
              <UnionChampion
                Data={{
                  unionChampion: Data.unionChampion,
                  unionChampionDetail: Data.unionChampionDetail,
                }}
              />
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
  flex: 1;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ContentsWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 8px;
  height: fit-content;
  color: white;
  width: 580px;
  flex-direction: row;
  background: radial-gradient(circle at 50% 242%, #3d87a9 38%, #23292E 64%);
  border: 1px solid rgb(200, 169, 129);
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;


const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgb(48, 54, 63), rgb(48, 54, 63)), 
                    linear-gradient(to bottom, rgb(173, 200, 234), rgb(124, 146, 181));
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 13px;
  border: 4px solid transparent;
  outline: 1px solid rgb(56, 70, 81);
  gap: 8px;
  padding: 8px 6px;
  height: 100%;
  box-sizing: border-box;

  &:hover {
    filter: brightness(0.85);
  }
`;

const CrystalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CrystalIcon = styled.img`
  width: 100px;
  height: 100px;
`;

const LevelBadge = styled.img`
    width: 95px;
    height: auto;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  text-align: center;
  word-break: keep-all;
  width: 100%;
  margin-top: 4px;

  p {
    margin: 1px 0;
    line-height: 1.2;
    color: #e2e8f0;
  }
`;

const ArtifactWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 8px;
  width: 100%;

  @media screen and (max-width: 768px) {
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
    margin-bottom: 0px;
    margin-top: 20px;
  }
`;

const TabButton = styled.button`
  padding: 10px;
  width: 30px;
  height: auto;
  font-size: 12px;
  background-color: ${(props) =>
    props.$isActive
      ? colors.union.unionRaiderColor.TabHoverBackground
      : colors.union.unionRaiderColor.TabBackground};
  color: white;
  border: 1px solid ${colors.union.unionRaiderColor.Border};
  cursor: pointer;
  border-radius: 8px 0px 0px 8px;

  &:hover {
    background-color: ${colors.union.unionRaiderColor.TabHoverBackground};
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    border-radius: 8px 8px 0px 0px;
  }
`;

const ChampionWrap = styled.div``;
