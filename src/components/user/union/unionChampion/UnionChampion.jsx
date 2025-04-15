import React from "react";
import styled from "styled-components";
import UnionChampionImages from "./UnionChampionimages";
import ClassData from "../../../common/classIcons/ClassIcons";
import colors from "../../../common/color/colors";

const { card_Backgrnd, rank, insignia, blessing } = UnionChampionImages;
const { empty, disabled } = card_Backgrnd;
const { ClassIcons, ClassMapping } = ClassData;

export const UnionChampion = ({ Data }) => {
  console.log(Data);
  // 챔피언 클래스에 따른 아이콘 매핑
  const getClassIcon = (championClass) => {
    if (ClassMapping.warriorClass.includes(championClass))
      return ClassIcons.fighter;
    if (ClassMapping.mageClass.includes(championClass))
      return ClassIcons.wizard;
    if (ClassMapping.archerClass.includes(championClass))
      return ClassIcons.archer;
    if (ClassMapping.thiefClass.includes(championClass))
      return ClassIcons.thief;
    if (ClassMapping.pirateClass.includes(championClass))
      return ClassIcons.pirate;
    if (championClass === ClassMapping.xenonClass) return ClassIcons.xenon;
    return null;
  };

  // 챔피언 클래스에 따른 블레스 이미지 매핑
  const getBlessingImage = (championClass, badgeCount) => {
    const classKey = getClassKey(championClass);
    return blessing[classKey]?.[badgeCount] || blessing[classKey]?.[0];
  };

  // 챔피언 클래스에 따른 키 매핑
  const getClassKey = (championClass) => {
    if (ClassMapping.warriorClass.includes(championClass)) return "fighter";
    if (ClassMapping.mageClass.includes(championClass)) return "wizard";
    if (ClassMapping.archerClass.includes(championClass)) return "archer";
    if (ClassMapping.thiefClass.includes(championClass)) return "thief";
    if (ClassMapping.pirateClass.includes(championClass)) return "pirate";
    return "thief"; // 기본값으로 thief (제논 처리)
  };

  const { union_champion } = Data.unionChampion;
  const unionChampionDetail = Data.unionChampionDetail;

  return (
    <GridContainer>
      {/* Array.from으로 길이 6인 배열을 만들어 map으로 6개 슬롯 렌더링 */}
      {Array.from({ length: 6 }).map((_, index) => {
        const champion = union_champion.find(
          (champion) => champion.champion_slot === index + 1 // 슬롯이 1부터 시작하므로 index + 1
        );

        const detail = unionChampionDetail[index] || {};
        const { character_image, character_level } = detail;

        const {
          champion_class: className,
          champion_grade: grade,
          champion_name: name,
          champion_badge_info: badgeInfo,
        } = champion || {};

        return (
          <GridItem key={index} $background={champion ? empty : disabled}>
            {champion && (
              <>
                {/* 랭크, 레벨 Wrap */}
                <GradeLevelWrap>
                  <Grade src={rank[grade]} alt={`${grade} rank`} />
                  {character_level && <Level>Lv.{character_level}</Level>}
                </GradeLevelWrap>

                {character_image && (
                  <CharacterImage
                    src={`${character_image}?x=90&y=130&width=172&height=170`}
                    alt={`${name} image`}
                  />
                )}

                <BlessingImage
                  src={getBlessingImage(className, badgeInfo.length)}
                  alt={`${className} blessing`}
                />

                {/* 직업 이름 */}
                <ClassName>{className}</ClassName>

                {/* 직업 아이콘, 닉네임 Wrap */}
                <NameWrap>
                  <ClassIcon $icon={getClassIcon(className)} />
                  <Name>{name}</Name>
                </NameWrap>

                {/* 배지 아이콘 */}
                <Badge>
                  {["first", "second", "third", "fourth", "fifth"].map(
                    (badgeOrder, badgeIndex) => {
                      // badgeInfo의 길이보다 badgeIndex가 작으면 1, 아니면 0
                      const badgeVariant =
                        badgeIndex < badgeInfo.length ? 1 : 0;
                      return (
                        <BadgeImage
                          key={badgeIndex}
                          src={insignia[badgeOrder]?.[badgeVariant]}
                        />
                      );
                    }
                  )}
                </Badge>
              </>
            )}
          </GridItem>
        );
      })}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GridItem = styled.div`
  position: relative;
  width: 182px;
  height: 338px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.$background})`};
  padding: 10px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 182px;
    height: 338px;
  }
`;

const BlessingImage = styled.img`
  position: absolute;
  z-index: 1;
  top: 15%;
`;

const GradeLevelWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ClassIcon = styled.div`
  width: 17px;
  height: 18px;
  background-image: ${(props) => `url(${props.$icon})`};
  background-size: contain;
  background-position: center;
`;

const Grade = styled.img`
  height: auto;
`;

const NameWrap = styled.div`
  display: flex;
  gap: 5px;
`;

const Name = styled.p`
  color: ${colors.main.white0};
  font-size: 15px;
`;

const Badge = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const BadgeImage = styled.img`
  width: 32px;
  height: auto;
`;

const ClassName = styled.p`
  color: ${colors.union.unionChampion.classColor};
  font-size: 14px;
  text-shadow: 1px 1px 2px black;
  z-index: 10;
`;

const CharacterImage = styled.img`
  height: auto;
  margin-top: 10px;
  z-index: 10;
  image-rendering: pixelated;
`;

const Level = styled.p`
  color: ${colors.union.unionChampion.levelColor};
  font-size: 15px;
  font-weight: bold;
  margin-top: 3px;
`;
