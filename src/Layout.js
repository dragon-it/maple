import { Notice } from "./components/common/header/Notice";
import axios from "axios";
import { Header } from "./components/common/header/Header.jsx";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Layout({ children }) {
  const [noticeData, setNoticeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axios.get("/notice-event", {
          headers: {
            "x-nxopen-api-key": process.env.REACT_APP_API_KEY,
          },
        });
        if (response.status === 200) {
          setNoticeData(response.data);
        } else {
          console.error(
            "현재 API 호출이 원활하지 않습니다. 잠시 후 다시 시도해주세요."
          );
          setError(
            "현재 API 호출이 원활하지 않습니다. 잠시 후 다시 시도해주세요."
          );
        }
      } catch (err) {
        console.error("공지 데이터 가져오기 오류:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, []);

  return (
    <>
      <HeaderContentsWrap>
        <Header />
        <Notice noticeData={noticeData} isSunday={new Date().getDay() === 0} />
      </HeaderContentsWrap>
      {React.cloneElement(children, { noticeData, loading, error })}
    </>
  );
}

const HeaderContentsWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Layout;
