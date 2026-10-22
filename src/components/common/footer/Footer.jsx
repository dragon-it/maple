import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FooterText } from "./FooterText";

export const Footer = () => {
  const adRef = useRef(null);
  const requestedRef = useRef(false);

  useEffect(() => {
    const ad = adRef.current;
    if (!ad) return;

    // 광고 스크립트는 public/index.html에서 한 번만 로드함
    const script = document.querySelector('script[src*="pagead/js/adsbygoogle.js"]');
    let ready = document.readyState === "complete" || Boolean(window.adsbygoogle?.loaded);
    const pushAd = () => {
      if (!ready || requestedRef.current || ad.hasAttribute("data-adsbygoogle-status")) return;
      // 너비가 없는 숨겨진 영역에서는 초기화하지 않음
      if (!ad.isConnected || ad.getBoundingClientRect().width <= 0) return;
      requestedRef.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("Adsense Error:", e);
      }
    };

    const onReady = () => {
      ready = true;
      pushAd();
    };

    const observer = new ResizeObserver(pushAd);
    observer.observe(ad);
    script?.addEventListener("load", onReady);
    window.addEventListener("load", onReady);
    pushAd();

    return () => {
      observer.disconnect();
      script?.removeEventListener("load", onReady);
      window.removeEventListener("load", onReady);
    };
  }, []);

  return (
    <>
      <Adsense>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxWidth: "100vw",
          }}
          data-ad-client="ca-pub-9967012422287379"
          data-ad-slot="4851119038"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </Adsense>

      <FooterTextDiv>
        <FooterText />
      </FooterTextDiv>
    </>
  );
};

const Adsense = styled.div`
  width: 90%;
  box-sizing: border-box;
  min-width: 0;
  height: auto;
  display: flex;
  justify-content: center;
  padding: 0px 10px;
`;

const FooterTextDiv = styled.div`
  width: 100%;
`;
