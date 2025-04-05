import React from "react";
import styled from "styled-components";
import unionChampionImages from "./unionChampionimages";
import ClassData from "../../../common/classIcons/ClassIcons";
import colors from "../../../common/color/colors";

const { card_Backgrnd, rank, insignia } = unionChampionImages;
const { empty, disabled } = card_Backgrnd;
const { ClassIcons, ClassMapping } = ClassData;

export const UnionChampion = ({ Data }) => {
  console.log(Data);
  const getClassIcon = (championClass) => {
    // 챔피언 클래스에 따른 아이콘 매핑
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

  return (
    <GridContainer>
      {/* Array.from으로 길이 6인 배열을 만들어 map으로 6개 슬롯 렌더링 */}
      {Array.from({ length: 6 }).map((_, index) => {
        const champion = Data.union_champion.find(
          (champion) => champion.champion_slot === index + 1 // 슬롯이 1부터 시작하므로 index + 1
        );

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
                <Grade src={rank[grade]} alt={`${grade} rank`} />
                <ClassName>{className}</ClassName>

                <NameWrap>
                  <ClassIcon $icon={getClassIcon(className)} />
                  <Name>{name}</Name>
                </NameWrap>

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
  width: 182px;
  height: 338px;
  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.$background})`};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  @media screen and (max-width: 768px) {
    width: 182px;
    height: 338px;
  }
`;

const ClassIcon = styled.div`
  width: 19px;
  height: 20px;
  background-image: ${(props) => `url(${props.$icon})`};
  background-size: contain;
  background-position: center;
`;

const Grade = styled.img`
  width: 34px;
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
`;

const BadgeImage = styled.img`
  width: 32px;
  height: auto;
`;

const ClassName = styled.p`
  color: ${colors.union.unionChampion.classColor};
  font-size: 14px;
  text-shadow: 1px 1px 2px black;
`;
