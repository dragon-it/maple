import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import dark_to_top_icon from "../../assets/icons/sundayMaple/dark_to_top.svg";
import light_to_top_icon from "../../assets/icons/sundayMaple/light_to_top.svg";
import { useTheme } from "../../context/ThemeProvider";

export const SundayMaple = ({ noticeData, loading, error }) => {
  const { theme } = useTheme();
  const [sundayMapleNoticeDetail, setSundayMapleNoticeDetail] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const skipDay = localStorage.getItem("skipDay");
    if (skipDay) {
      const skipUntil = new Date(skipDay);
      if (skipUntil > new Date()) {
        setIsVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      if (loading || error || !noticeData?.event_notice) return;

      const sundayMapleNotices = noticeData.event_notice.filter((item) =>
        item.title.includes("썬데이 메이플")
      );

      if (sundayMapleNotices.length > 0) {
        const sundayMapleNotice = sundayMapleNotices[0];
        const sundayMapleNoticeId = Number(sundayMapleNotice.notice_id);
        const eventEndTime = new Date(sundayMapleNotice.date_event_end);

        // 현재 시간과 이벤트 종료 시간 비교
        const currentTime = new Date();
        if (eventEndTime > currentTime) {
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
  }, [noticeData, loading, error]);

  const extractDesiredContent = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const desiredContent = doc.querySelector(
      'div[style="margin: 0px auto; height: 100%; position: relative; max-width: 876px;"]'
    );
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <Container>로딩 중...</Container>;
  }

  if (error || !isVisible || !sundayMapleNoticeDetail) {
    return null;
  }

  const desiredHtmlContent = extractDesiredContent(
    sundayMapleNoticeDetail.contents
  );

  return (
    <Container>
      {desiredHtmlContent && (
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
          <ScrollTopButton onClick={scrollToTop}>
            <ToTopIcon
              onClick={scrollToTop}
              src={theme === "dark" ? dark_to_top_icon : light_to_top_icon}
              alt="to-top-icon"
            />
          </ScrollTopButton>
        </ContentsWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
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
  width: 100%;
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

const ScrollTopButton = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 24px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.toggleBgColor};
  border: ${({ theme }) => theme.toggleBorderColor};
  color: ${({ theme }) => theme.toggleColor};
  border-radius: 20px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 32px;
    height: 32px;
  }

  &:hover {
    filter: brightness(1.4);
  }
`;

const ToTopIcon = styled.img`
  width: 32px;
  height: 32px;

  @media screen and (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
