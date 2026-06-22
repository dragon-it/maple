import React, { useEffect } from "react";
import styled from "styled-components";
import { FooterText } from "./FooterText";

export const Footer = () => {
  useEffect(() => {
    const pushAds = () => {
      try {
        const ads = document.querySelectorAll(
          ".adsbygoogle:not([data-adsbygoogle-status])",
        );

        ads.forEach(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
      } catch (e) {
        console.error("Adsense Error:", e);
      }
    };

    const loadAds = () => {
      const existingScript = document.querySelector(
        'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
      );

      if (existingScript) {
        pushAds();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9967012422287379";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = pushAds;
      script.onerror = () => {
        console.error("Failed to load AdSense script");
      };

      document.head.appendChild(script);
    };

    if (document.readyState === "complete") {
      loadAds();
    } else {
      window.addEventListener("load", loadAds);
    }

    return () => {
      window.removeEventListener("load", loadAds);
    };
  }, []);

  return (
    <>
      <Adsense>
        <ins
          className="adsbygoogle"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
  min-width: 300px;
  height: auto;
  display: flex;
  justify-content: center;
  padding: 0px 10px;
`;

const FooterTextDiv = styled.div`
  width: 100%;
  padding: 3px 0;
  margin-bottom: calc(
    var(--footer-safe-area, 0px) + var(--adsense-footer-safe-area, 0px)
  );
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${({ theme }) => theme.footerBgColor};
  color: ${({ theme }) => theme.footerTextColor};
  text-decoration: none;
`;
