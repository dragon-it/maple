import styled from "styled-components";

const Popup = styled.div`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 180px;
  max-width: 220px;
  padding: 8px 10px;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  z-index: 999;
`;

const PopupTitle = styled.div`
  font-weight: 800;
  font-size: 12px;
  margin-bottom: 6px;
  text-align: center;
`;

const PopupRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin: 2px 0;
`;

export const InfoPopup = ({ data, compact = false }) => {
  if (!data) return null;
  const { name, growth, nextNeed, ups, needToMax } = data;
  const isMax = nextNeed === 0;

  return (
    <Popup style={compact ? { bottom: 62 } : undefined}>
      <PopupTitle>{name}</PopupTitle>
      {!isMax ? (
        <PopupRow>
          <span>성장치</span>
          <span>
            {growth.toLocaleString()} / {nextNeed.toLocaleString()}
          </span>
        </PopupRow>
      ) : (
        <PopupRow>
          <span>성장치</span>
          <span>MAX</span>
        </PopupRow>
      )}
      <PopupRow>
        <span>레벨업 가능</span>
        <span>{ups}레벨</span>
      </PopupRow>
      <PopupRow>
        <span>만렙까지 필요</span>
        <span>{needToMax.toLocaleString()}개</span>
      </PopupRow>
    </Popup>
  );
};
