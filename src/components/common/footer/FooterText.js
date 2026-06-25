import React from "react";
import { Link } from "react-router-dom";
import OpenAPILogo from "../../../assets/logos/footerLogo.svg";

export const FooterText = () => {
  return (
    <div className="footer-text">
      <p>
        Data By{" "}
        <a href="https://openapi.nexon.com/ko/">
          <img
            src={OpenAPILogo}
            alt="Data by OpenAPI"
            style={{ width: "150px" }}
          />
        </a>
      </p>

      <p>Font By MapleStory</p>
      <p>Contact: sideoff0217@naver.com</p>
      <p>
        <Link
          to="/privacy"
          style={{
            color: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          개인정보 처리방침
        </Link>
      </p>
    </div>
  );
};
