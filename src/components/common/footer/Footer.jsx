import React, { useEffect } from "react";
import styled from "styled-components";
import FooterText from "./FooterText";

export const Footer = () => {
  useEffect(() => {
    let initialized = false;

    const loadAds = () => {
      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9967012422287379";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);

      script.onload = () => {
        try {
          const ads = document.querySelectorAll(".adsbygoogle");
          if (ads.length > 0 && !initialized) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            initialized = true;
          }
        } catch (e) {
          console.error("Adsense Error:", e);
        }
      };

      script.onerror = () => {
        console.error("Failed to load AdSense script");
      };
    };

    if (document.readyState === "complete") {
      loadAds();
    } else {
      window.addEventListener("load", loadAds);
      return () => window.removeEventListener("load", loadAds);
    }
  }, []);

  return (
    <>
      <Adsense>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "auto" }}
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
  width: 100%;
  min-width: 300px;
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
