import React, { createContext, useContext } from "react";

const NoticeEventContext = createContext({
  eventData: null,
  noticeData: null,
  loading: true,
  error: null,
});

export function NoticeEventProvider({ value, children }) {
  return (
    <NoticeEventContext.Provider value={value}>
      {children}
    </NoticeEventContext.Provider>
  );
}

export function useNoticeEvent() {
  return useContext(NoticeEventContext);
}
