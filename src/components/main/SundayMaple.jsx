import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export const SundayMaple = () => {
  const [notice, setNotice] = useState(null);
  const [sundayMapleNoticeDetail, setSundayMapleNoticeDetail] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get("/notice-event");
        if (response.status === 200) {
          setNotice(response.data);
        } else {
          console.error("Failed to fetch notice data");
        }
      } catch (error) {
        console.error("Error fetching notice data:", error.message);
      }
    };

    fetchNotice();
  }, []);

  useEffect(() => {
    if (notice && notice.event_notice) {
      const sundayMapleNotices = notice.event_notice.filter(
        (item) => item.title === "고브의 선물"
      );

      if (sundayMapleNotices.length > 0) {
        const sundayMapleNoticeId = Number(sundayMapleNotices[0].notice_id);

        const fetchNoticeDetail = async () => {
          try {
            const response = await axios.get("/notice-event/detail", {
              params: { notice_id: sundayMapleNoticeId },
            });
            if (response.status === 200) {
              setSundayMapleNoticeDetail(response.data);
            } else {
              console.error("Failed to fetch notice detail data");
            }
          } catch (error) {
            console.error("Error fetching notice detail data:", error.message);
          }
        };

        fetchNoticeDetail();
      }
    }
  }, [notice]);

  const extractDesiredContent = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const desiredContent = doc.querySelector(
      'div[style="margin: 0px auto; height: 100%; position: relative; max-width: 876px;"]'
    );
    return desiredContent ? desiredContent.outerHTML : "";
  };

  if (!notice || !notice.event_notice || !isVisible) {
    // isVisible 상태에 따라 렌더링 여부 결정
    return null;
  }

  const desiredHtmlContent =
    sundayMapleNoticeDetail &&
    extractDesiredContent(sundayMapleNoticeDetail.contents);

  return (
    <Container>
      {/* X 버튼 추가 */}
      {desiredHtmlContent && (
        <ContentsWrap>
          <Contents dangerouslySetInnerHTML={{ __html: desiredHtmlContent }} />
          <CloseButton onClick={() => setIsVisible(false)}>X</CloseButton>
        </ContentsWrap>
      )}
    </Container>
  );
};

const Container = styled.div`
  z-index: 999999999999999;
  position: absolute;
  width: 100%;
  top: 90px;
  display: flex;
  justify-content: center;
`;

const Contents = styled.div`
  padding: 10px;
  width: 80%;
  position: relative;
  max-width: 876px;
  border: 1px solid rgb(30, 38, 47);
  outline: 1px solid rgb(56, 87, 106);
  background-color: rgb(43, 53, 62);
  border-radius: 20px;
  overflow: hidden;
  object-fit: cover;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 20px;
  }

  @media screen and (max-width: 768px) {
    padding: 5px;
  }

  @media screen and (max-width: 576px) {
    width: 90%;
  }
`;

const ContentsWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 1000000000000000;

  &:hover {
    background-color: darkred;
  }
`;
