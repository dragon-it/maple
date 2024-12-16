import React, { useEffect } from "react";
import styled from "styled-components";
import FooterText from "./FooterText";

export const Footer = () => {
  useEffect(() => {
    // 클라이언트 사이드에서만 애드센스 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9967012422287379";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    // 구글 애드센스 광고 초기화
    script.onload = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };
  }, []);

  return (
    <>
      <Adsense>
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "728px", height: "90px" }}
          data-ad-client="ca-pub-9967012422287379"
          data-ad-slot="4851119038"
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
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
`;

const FooterTextDiv = styled.div`
  width: 100%;
  padding: 3px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: maple-light;
  background: ${({ theme }) => theme.footerBgColor};
  text-decoration: none;
`;
