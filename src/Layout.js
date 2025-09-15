import { Notice } from "./components/common/header/Notice";
import axios from "axios";
import { Header } from "./components/common/header/Header.jsx";
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Footer } from "./components/common/footer/Footer";
import { NoticeEventProvider } from "./context/NoticeEventContext";

function Layout({ children }) {
  const [eventData, setEventData] = useState(null);
  const [noticeData, setNoticeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const headers = { "x-nxopen-api-key": process.env.REACT_APP_API_KEY };
        const [ev, no] = await Promise.all([
          axios.get("/notice-event", { headers, signal: ctrl.signal }),
          axios.get("/notice", { headers, signal: ctrl.signal }),
        ]);
        if (ev.status === 200) setEventData(ev.data);
        if (no.status === 200) setNoticeData(no.data);
      } catch (err) {
        if (axios.isCancel?.(err) || err.name === "CanceledError") return;
        console.error("공지/이벤트 가져오기 오류:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, []);

  const isSunday = new Date().getDay() === 0;

  // 리렌더 최적화
  const contextValue = useMemo(
    () => ({ eventData, noticeData, loading, error }),
    [eventData, noticeData, loading, error]
  );

  return (
    <NoticeEventProvider value={contextValue}>
      <HeaderContentsWrap>
        <Header />
        <Notice isSunday={isSunday} error={error} />
      </HeaderContentsWrap>
      {children}
      {location.pathname !== "/" && <Footer />}
    </NoticeEventProvider>
  );
}

const HeaderContentsWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Layout;
