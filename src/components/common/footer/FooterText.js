import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OpenAPILogo from "../../../assets/logos/footerLogo.svg";
import logoIcon from "../../../assets/logos/LogoIcon.svg";
import logoText from "../../../assets/logos/Logo_Text_Only.svg";

export const FooterText = () => {
  return (
    <FooterContainer>
      <FooterInnerWrap>
        {/* Left Section: Logo & Company Metadata */}
        <FooterLeftSection>

          <FooterInfoGroup>
            <InfoRow>
              <span>메짱 (MapleStory Search & Utility)</span>
              <Divider>|</Divider>
              <span>제공: NEXON OPEN API</span>
              <Divider>|</Divider>
              <span>폰트: MapleStory Font</span>
            </InfoRow>

            <InfoRow>
              <span>Contact: sideoff0217@naver.com</span>
              <Divider>|</Divider>
              <PrivacyLink to="/privacy">개인정보 처리방침</PrivacyLink>
            </InfoRow>

            <CopyrightRow>
              Copyright ⓒ 메짱. All rights reserved.
            </CopyrightRow>
          </FooterInfoGroup>
        </FooterLeftSection>

        {/* Right Section: NEXON OPEN API Badge & Compliance */}
        <FooterRightSection>
          <ComplianceBadge>
            <a
              href="https://openapi.nexon.com/ko/"
              target="_blank"
              rel="noopener noreferrer"
              className="nexon-logo-link"
              title="NEXON OPEN API 바로가기"
            >
              <img
                src={OpenAPILogo}
                alt="NEXON OPEN API"
                className="nexon-api-logo"
              />
            </a>
            <BadgeTextGroup>
              <span className="badge-title">NEXON OPEN API</span>
              <span className="badge-sub">공식 가이드라인을 준수합니다</span>
            </BadgeTextGroup>
          </ComplianceBadge>
        </FooterRightSection>
      </FooterInnerWrap>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  background: ${({ theme }) => theme.footerBgColor || "rgba(15, 23, 42, 0.85)"};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 24px 20px;
  box-sizing: border-box;
  margin-top: auto;
`;

const FooterInnerWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;

  @media screen and (max-width: 860px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const FooterLeftSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex: 1;

  @media screen and (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const FooterLogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  .footer-logo-icon {
    width: 32px;
    height: auto;
  }

  .footer-logo-text {
    width: 48px;
    height: auto;
  }
`;

const FooterInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  font-size: 0.75rem;
  color: var(--muted-foreground, rgba(255, 255, 255, 0.65));
  line-height: 1.5;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
`;

const Divider = styled.span`
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.7rem;
`;

const PrivacyLink = styled(Link)`
  color: var(--foreground, rgba(255, 255, 255, 0.85));
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 600;

  &:hover {
    color: var(--primary, oklch(0.72 0.16 285));
  }
`;

const NoticeRow = styled.div`
  margin-top: 4px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.45);
`;

const CopyrightRow = styled.div`
  margin-top: 2px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
`;

const FooterRightSection = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const ComplianceBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);

  .nexon-logo-link {
    display: flex;
    align-items: center;
  }

  .nexon-api-logo {
    width: 120px;
    height: auto;
    display: block;
  }
`;

const BadgeTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 10px;

  .badge-title {
    font-size: 0.75rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
  }

  .badge-sub {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;
