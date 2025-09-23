import React from "react";
import styled from "styled-components";
import { ContainerBox } from "../../common/searchCharacter/ContainerBox";
import { SkillDetail } from "./SkillDetail";

export const SkillLinks = ({ Data, selectedItem, setSelectedItem }) => {
  // 모바일 환경인지 확인
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // 디테일 클릭시 창 닫기
  const handleCloseClick = () => {
    setSelectedItem(null);
  };

  // 모바일 환경에서는 클릭으로 선택
  const handleItemClick = (item) => {
    if (isMobile) {
      setSelectedItem(item);
    }
  };

  // hover시 아이템 출력 모바일 환경에서는 hover 비활성화
  const handleItemHover = (item) => {
    if (isMobile) {
      return;
    } else {
      setSelectedItem(item);
    }
  };

  // pc환경에서 컨테이너 벗어나면 아이템 초기화
  const handleMouseLeave = () => {
    if (!isMobile) {
      setSelectedItem(null);
    }
  };

  return (
    <ContainerBox>
      {Data.character_link_skill && Data.character_link_skill.length > 0 ? (
        <>
          <SkillHeader>링크 스킬</SkillHeader>
          <SkillGrid onMouseLeave={handleMouseLeave}>
            {Data.character_link_skill.map((item, index) => (
              <SkillItem
                key={item.skill_name}
                onClick={() => handleItemClick(item)}
                onMouseOver={() => handleItemHover(item)}
              >
                <SkillIcon src={item.skill_icon} alt={`icon-${index}`} />
                <SkillNameLevelWrap>
                  <SkillName>{item.skill_name}</SkillName>
                  <SkillLevel>Lv.{item.skill_level}</SkillLevel>
                </SkillNameLevelWrap>
              </SkillItem>
            ))}
          </SkillGrid>
          {/* SkillDetail 컴포넌트는 조건부로 렌더링 */}
          {selectedItem && (
            <SkillDetail item={selectedItem} onClose={handleCloseClick} />
          )}
        </>
      ) : (
        <>
          <SkillHeader>링크 스킬</SkillHeader>
          <SkillNoDataText>데이터가 없습니다.</SkillNoDataText>
        </>
      )}
    </ContainerBox>
  );
};

const SkillHeader = styled.h2`
  font-size: 15px;
  color: rgb(220, 252, 2);
  margin-bottom: 3px;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
`;

const SkillGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2px;
  width: 100%;
`;

const SkillIcon = styled.img`
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
`;

const SkillItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  cursor: pointer;
  padding: 2px;
  border-radius: 8px;
  transition: transform 0.1s ease, background-color 0.1s ease;

  &:hover {
    background-color: rgb(91, 91, 91);
    img {
      transform: scale(1.1);
    }
  }
`;

const SkillNameLevelWrap = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

const SkillName = styled.span``;

const SkillLevel = styled.span`
  opacity: 0.85;
  font-size: 14px;
  @media (max-width: 576px) {
    font-size: 10px;
  }
`;

const SkillNoDataText = styled.p``;
