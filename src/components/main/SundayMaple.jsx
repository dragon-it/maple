import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Footer } from "../common/footer/Footer";

export const SundayMaple = ({ eventData, loading, error }) => {
  const [sundayMapleNoticeDetail, setSundayMapleNoticeDetail] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const skipDay = localStorage.getItem("skipDay");
    if (skipDay) {
      const skipUntil = new Date(skipDay);
      if (!isNaN(skipUntil.getTime()) && skipUntil > new Date()) {
        setIsVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      if (loading || error || !eventData) return;

      const notices = eventData.event_notice || eventData;
      const sundayMapleNotices = notices.filter((item) =>
        item.title.includes("썬데이")
      );

      if (sundayMapleNotices.length > 0) {
        const sundayMapleNotice = sundayMapleNotices[0];
        const sundayMapleNoticeId = Number(sundayMapleNotice.notice_id);
        const eventEndTime = new Date(sundayMapleNotice.date_event_end);
        const currentTime = new Date();

        if (eventEndTime.getTime() > currentTime.getTime()) {
          try {
            const response = await axios.get("/notice-event/detail", {
              params: { notice_id: sundayMapleNoticeId },
            });

            if (response.status === 200) {
              setSundayMapleNoticeDetail(response.data);
              localStorage.setItem("sundayMaple", response.data.url);
            } else {
              console.error("공지 상세 데이터를 가져오지 못했습니다.");
            }
          } catch (err) {
            console.error("공지 상세 데이터 가져오기 오류:", err.message);
          }
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
    };

    fetchNoticeDetail();
  }, [eventData, loading, error]);

  const extractDesiredContent = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const desiredContent = doc.querySelector("img");
    return desiredContent ? desiredContent.outerHTML : "";
  };

  const handleSkipDay = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      const skipUntil = new Date();
      skipUntil.setDate(skipUntil.getDate() + 1);
      localStorage.setItem("skipDay", skipUntil.toISOString());
      setIsVisible(false);
    }
  };

  if (loading) {
    return <Container isContentsVisible={false}>로딩 중...</Container>;
  }

  if (error || !isVisible || !sundayMapleNoticeDetail) {
    return (
      <>
        <Footer />
      </>
    );
  }

  const desiredHtmlContent = extractDesiredContent(
    sundayMapleNoticeDetail.contents
  );

  // ContentsWrap이 보일 때만 Container의 position을 absolute로 설정
  const isContentsVisible = desiredHtmlContent !== "";

  return (
    <Container isContentsVisible={isContentsVisible}>
      {isContentsVisible && (
        <ContentsWrap>
          <ButtonWrap>
            <SkipDayCheckboxWrapper>
              <input
                type="checkbox"
                id="skip-day-checkbox"
                checked={isChecked}
                onChange={handleSkipDay}
              />
              <label htmlFor="skip-day-checkbox">오늘 하루 보지 않기</label>
            </SkipDayCheckboxWrapper>
            <CloseButton onClick={() => setIsVisible(false)}>X</CloseButton>
          </ButtonWrap>
          <Contents dangerouslySetInnerHTML={{ __html: desiredHtmlContent }} />
        </ContentsWrap>
      )}
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  position: ${({ isContentsVisible }) =>
    isContentsVisible ? "absolute" : "relative"};
  transform: translateY(180px);
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: 95;
  margin-bottom: 20px;
`;

const Contents = styled.div`
  img {
    width: 100%;
    object-fit: contain;
    border-radius: 20px;
    border: 1px solid rgb(119, 119, 119);
  }
`;

const ContentsWrap = styled.div`
  padding: 3px 10px 10px 10px;
  margin: 10px;
  width: 95%;
  position: relative;
  max-width: 876px;
  border: 1px solid rgb(33, 40, 48);
  outline: 2px solid rgb(54, 82, 100);
  background-color: rgb(43, 53, 62);
  border-radius: 20px;
  overflow: hidden;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    padding: 5px;
  }

  @media screen and (max-width: 576px) {
    padding: 3px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 15px;
  margin: 0 5px 5px 0;
`;

const CloseButton = styled.button`
  position: relative;
  background-color: rgba(255, 255, 255, 0.35);
  color: rgb(255, 255, 255);
  padding: 3px;
  width: 25px;
  height: 25px;
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    background-color: rgb(136, 136, 136);
  }
`;

const SkipDayCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: maple-light;
  color: rgb(216, 216, 216);

  :hover {
    background: rgba(184, 184, 184, 0.25);
    border-radius: 5px;
  }

  input[type="checkbox"] {
    cursor: pointer;
  }

  label {
    cursor: pointer;
    padding: 4px;
    &:hover {
      color: rgb(255, 255, 255);
    }
  }
`;
