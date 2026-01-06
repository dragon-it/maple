import React, { useEffect, useState } from "react";
import { ContainerBox } from "./ContainerBox";
import styled from "styled-components";
import { SkillDetail } from "../../user/skill/SkillDetail";

export const SkillGradeBox = ({
  grade,
  data,
  selectedItem,
  setSelectedItem,
}) => {
  const SKILL_HEADER_MAP = {
    6: "HEXA 매트릭스",
    5: "V 매트릭스",
    hyperpassive: "하이퍼 패시브",
    hyperactive: "하이퍼 액티브",
  };
  const header = SKILL_HEADER_MAP[grade] ?? `${grade}차 스킬`;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setIsMobile(window.innerWidth <= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
      {data && data.character_skill && data.character_skill.length > 0 ? (
        <>
          <SkillHeader>{header}</SkillHeader>
          <SkillGrid role="list" onMouseLeave={handleMouseLeave}>
            {data.character_skill.map((item) => (
              <SkillItem
                role="listitem"
                key={item.skill_name}
                onClick={() => handleItemClick(item)}
                onMouseOver={() => handleItemHover(item)}
              >
                <SkillIcon
                  src={item.skill_icon}
                  alt={`${item.skill_name} 아이콘`}
                />
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
          <SkillHeader>{header}</SkillHeader>
          <SkillNoDataText>데이터가 없습니다.</SkillNoDataText>
        </>
      )}
    </ContainerBox>
  );
};

const SkillHeader = styled.h2`
  font-size: 16px;
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

const SkillItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
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

const SkillIcon = styled.img`
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
`;

const SkillNameLevelWrap = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

const SkillName = styled.span``;

const SkillLevel = styled.span`
  opacity: 0.85;
  font-size: 13px;
`;

const SkillNoDataText = styled.p``;