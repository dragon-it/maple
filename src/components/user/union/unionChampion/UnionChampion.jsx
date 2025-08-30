import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UnionChampionImages from "./UnionChampionimages";
import ClassData from "../../../common/classIcons/ClassIcons";
import colors from "../../../common/color/colors";
import { ItemDetailContainer } from "../../../common/itemDetailContainer/ItemDetailContainer";
import badgeDetails from "./BadgeDetails";

const { card_Backgrnd, rank, insignia, blessing } = UnionChampionImages;
const { empty, disabled } = card_Backgrnd;
const { ClassIcons, ClassMapping } = ClassData;

export const UnionChampion = ({ Data }) => {
  const [hoveredBadge, setHoveredBadge] = useState(null);
  const navigate = useNavigate();

  const handleNameClick = (name) => {
    navigate(`/user/${encodeURIComponent(name)}`);
  };

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
      {Array.from({ length: 6 }).map((_, index) => {
        const champion = union_champion.find(
          (champion) => champion.champion_slot === index + 1
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
                <GradeLevelWrap>
                  <Grade src={rank[grade]} alt={`${grade} rank`} />
                  {character_level && <Level>Lv.{character_level}</Level>}
                </GradeLevelWrap>

                {character_image && (
                  <CharacterImage>
                    <img src={character_image} alt={name} />
                  </CharacterImage>
                )}

                <BlessingImage
                  src={getBlessingImage(className, badgeInfo.length)}
                  alt={`${className} blessing`}
                />
                <ClassName>{className}</ClassName>
                <NameWrap>
                  <ClassIcon $icon={getClassIcon(className)} />
                  <Name onClick={() => handleNameClick(name)}>{name}</Name>
                </NameWrap>

                <Badge>
                  {["first", "second", "third", "fourth", "fifth"].map(
                    (badgeOrder, badgeIndex) => {
                      const badgeVariant =
                        badgeIndex < badgeInfo.length ? 1 : 0;
                      return (
                        <BadgeImageWrapper
                          key={badgeIndex}
                          onMouseEnter={() =>
                            badgeVariant === 1 &&
                            setHoveredBadge({
                              slot: index,
                              badgeIndex,
                            })
                          }
                          onMouseLeave={() => setHoveredBadge(null)}
                        >
                          <BadgeImage
                            src={insignia[badgeOrder]?.[badgeVariant]}
                          />
                          {hoveredBadge &&
                            hoveredBadge.slot === index &&
                            hoveredBadge.badgeIndex === badgeIndex &&
                            badgeVariant === 1 && (
                              <ItemDetailContainer
                                text={
                                  <div>
                                    <h3>{badgeDetails[badgeIndex].title}</h3>
                                    <p>
                                      {badgeDetails[badgeIndex].description}
                                    </p>
                                  </div>
                                }
                              />
                            )}
                        </BadgeImageWrapper>
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
  gap: 3px;
`;

const Name = styled.p`
  color: ${colors.main.white0};
  font-size: 15px;
  cursor: pointer;
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
  cursor: pointer;

  &:hover {
    filter: brightness(1.3);
  }
`;

const ClassName = styled.p`
  color: ${colors.union.unionChampion.classColor};
  font-size: 14px;
  text-shadow: 1px 1px 2px black;
  z-index: 10;
`;

const CharacterImage = styled.div`
  position: relative;
  width: 162px;
  height: 175px;
  margin: 2px auto;
  overflow: hidden;
  z-index: 999;

  img {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-51%, -47%) scaleX(-1);
    image-rendering: pixelated;
    object-fit: cover;
  }
`;

const Level = styled.p`
  color: ${colors.union.unionChampion.levelColor};
  font-size: 15px;
  font-weight: bold;
  margin-top: 3px;
`;

const BadgeImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
