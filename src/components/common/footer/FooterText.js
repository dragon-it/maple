import React from "react";
import OpenAPILogo from "../../../assets/logos/footerLogo.svg";

const FooterText = () => (
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
  </div>
);

export default FooterText;
