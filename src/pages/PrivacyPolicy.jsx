import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

const isDarkTheme = (theme) => theme.textColor === "rgb(220,220,220)";

const sections = [
  {
    title: "1. 개인정보의 처리 목적",
    contents: [
      "서비스는 다음의 목적을 위하여 정보를 처리합니다. 처리하고 있는 정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.",
      "캐릭터 및 길드 검색 결과 제공: 메이플스토리 캐릭터명, 길드명 조회를 통한 검색 서비스 제공",
      "사용자 편의 기능 제공: 즐겨찾기 캐릭터, 체크리스트 설정값, 테마 설정 등 개인화 기능 유지",
      "서비스 이용 통계 분석 및 광고 제공: 방문자 이용 통계 분석 및 구글 애드센스를 통한 맞춤형 광고 게재",
      "서비스 안정성 개선: 시스템 오류 확인, 부정 이용 방지, 웹사이트 보안 강화",
    ],
  },
  {
    title: "2. 처리하는 개인정보의 항목",
    contents: [
      "메짱 서비스는 회원가입을 받지 않으며, 이름, 연락처, 주민등록번호 등 직접 식별 가능한 개인정보를 입력받거나 수집하지 않습니다.",
      "서비스 이용 과정에서 처리되는 정보는 다음과 같습니다.",
      "사용자 입력 및 설정 데이터 (서버 저장 안 함): 사용자가 입력한 메이플스토리 캐릭터명, 길드명, 즐겨찾기 캐릭터 목록, 체크리스트 설정값, 테마 설정 데이터",
      "해당 데이터는 사용자의 브라우저 로컬 스토리지(localStorage)에만 저장되며, 서비스의 서버 계정 데이터베이스에는 별도로 저장되지 않습니다.",
      "웹 서비스 이용 과정에서 자동 수집되는 항목: Google Analytics 및 Google AdSense 연동 과정에서 처리되는 쿠키(Cookie), 광고 식별자, 접속 로그, 방문 일시, 기기 및 브라우저 정보, IP 주소",
    ],
  },
  {
    title: "3. 개인정보의 처리 및 보유 기간",
    contents: [
      "서비스는 법령에 따른 기준 또는 정보주체로부터 수집 시 동의받은 보유·이용 기간 내에서 정보를 처리 및 보유합니다.",
      "브라우저 로컬 스토리지 정보: 서버에 저장되지 않으며, 사용자가 직접 브라우저의 사이트 데이터를 삭제하거나 저장소를 초기화할 때까지 사용자의 기기에 보관됩니다.",
      "서버 임시 로그: 웹 서버 운영 중 생성되는 접속/오류 로그는 서비스 안정성 확인 및 보안 목적으로 필요한 최소한의 기간 동안 보관된 후 완전히 삭제됩니다.",
      "제3자(Google) 수집 정보: Google Analytics 및 Google AdSense를 통해 처리되는 정보의 보유 기간과 관리 방식은 Google의 자체 정책을 따릅니다.",
    ],
  },
  {
    title: "4. 개인정보의 제3자 제공에 관한 사항",
    contents: [
      "서비스 운영자는 법령에 따른 경우를 제외하고 사용자의 개인정보를 임의로 제3자에게 판매하거나 제공하지 않습니다. 다만, 메이플스토리 검색 결과를 제공하기 위해 다음과 같이 외부 API 시스템으로 정보가 전송될 수 있습니다.",
      "제공받는 자: (주)넥슨코리아 (Nexon OpenAPI)",
      "제공 목적: 메이플스토리 캐릭터 및 길드 검색 결과 조회",
      "제공 항목: 사용자가 검색을 위해 입력한 캐릭터명 또는 길드명",
      "보유 및 이용기간: API 호출 및 결과 반환 후 즉시 소멸 (넥슨 자체 정책에 따름)",
    ],
  },
  {
    title: "5. 개인정보의 국외 이전에 관한 사항",
    contents: [
      "서비스는 안정적인 웹로그 분석 및 온라인 광고 제공을 위하여 일부 정보를 국외에 위치한 제3자 플랫폼에 제공(위탁)하고 있습니다.",
      "이전받는 자: Google LLC (구글 고객센터: https://support.google.com)",
      "이전 국가: 미국 등 Google 데이터 센터 소재지",
      "이전 목적: 이용 통계 분석 및 맞춤형 광고 제공",
      "이전 항목: 쿠키, 광고 식별자, 기기 및 브라우저 정보, 접속 로그 등",
      "이전 방법 및 시기: 사용자가 웹사이트 접속 시 네트워크를 통해 자동 전송",
      "보유 및 이용기간: Google의 개인정보 처리방침 정책에 따름",
    ],
  },
  {
    title: "6. 개인정보의 파기 절차 및 방법에 관한 사항",
    contents: [
      "데이터가 불필요하게 되었을 때에는 지체 없이 해당 정보를 파기합니다.",
      "파기 절차: 본 서비스는 민감 식별 정보를 수집·보관하지 않으므로 파기 대상이 최소화되어 있습니다. 목적이 달성된 서버 로그 등은 즉시 파기 대상이 됩니다.",
      "파기 방법: 전자적 파일은 재생할 수 없는 기술적 방법으로 삭제하며, 브라우저 로컬 데이터는 사용자가 직접 기기에서 영구 파기(캐시/데이터 삭제)할 수 있습니다.",
    ],
  },
  {
    title: "7. 정보주체와 법정대리인의 권리·의무 및 행사방법",
    contents: [
      "정보주체는 서비스에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.",
      "본 서비스는 회원가입이나 DB 보관이 없으므로, 사용자는 본인의 웹 브라우저 기능을 이용하여 직접 권리를 행사해야 합니다.",
      "직접 행사 방법: 웹 브라우저의 '인터넷 사용 기록 삭제' 또는 개발자 도구(F12)의 Application -> Local Storage 메뉴를 통해 기기에 저장된 정보를 직접 열람·수정·삭제할 수 있습니다.",
      "기타 권리 행사가 필요한 경우, 개인정보 보호책임자에게 이메일로 연락하시면 조치하겠습니다.",
      "본 서비스는 14세 미만 아동의 개인정보를 수집하지 않으며, 이에 따른 별도의 법정대리인 동의 절차를 두지 않고 있습니다.",
    ],
  },
  {
    title: "8. 개인정보의 안전성 확보조치에 관한 사항",
    contents: [
      "데이터 유출 및 위변조를 방지하기 위해 다음과 같은 보호 조치를 취하고 있습니다.",
      "관리적 조치: 개인정보 수집을 최소화하는 구조(No-DB, 로컬 브라우저 저장소 활용)를 채택하여 서버 해킹 등으로 인한 정보 유출 위험을 원천 차단합니다.",
      "기술적 조치: 사용자 브라우저와 웹 서버 간의 통신 구간은 인증서 기반의 암호화 통신(HTTPS)을 적용합니다.",
    ],
  },
  {
    title: "9. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항",
    contents: [
      "서비스는 이용자 맞춤서비스 및 분석을 위해 '쿠키(cookie)' 등을 사용합니다.",
      "사용 목적: Google Analytics를 통한 이용 형태 분석 및 구글 애드센스 맞춤형 광고 제공",
      "거부 방법: - 크롬(Chrome): 설정 > 개인정보 보호 및 보안 > 서드파티 쿠키 차단 / - 엣지(Edge): 설정 > 개인 정보, 검색 및 서비스 > 타사 쿠키 차단",
      "쿠키 저장을 거부할 경우, 맞춤형 광고 노출은 제한될 수 있으나 메이플 검색 등 기본 기능은 정상적으로 이용 가능합니다.",
    ],
  },
  {
    title: "10. 행태정보의 수집·이용 및 거부 등에 관한 사항",
    contents: [
      "서비스는 맞춤형 광고 등을 제공하기 위해 제3자가 행태정보를 수집하도록 허용하고 있습니다.",
      "수집 사업자: Google LLC (구글 애드센스)",
      "수집 항목: 웹사이트 방문 및 서비스 이용 이력, 검색 키워드 등",
      "거부 방법: 구글의 맞춤형 광고 설정 페이지(https://adssettings.google.com)를 통해 수신 여부를 직접 제어할 수 있습니다.",
    ],
  },
  {
    title: "11. 개인정보 보호책임자 및 담당 부서 안내",
    contents: [
      "개인정보 처리와 관련한 정보주체의 불만 처리 및 피해구제 등을 위하여 아래와 같이 보호책임자를 지정하고 있습니다.",
      "성명/직위: 메짱 서비스 운영자",
      "문의처(이메일): sideoff0217@naver.com",
    ],
  },
  {
    title: "12. 정보주체의 권익침해에 대한 구제방법",
    contents: [
      "개인정보 침해에 대한 피해구제, 상담 등이 필요하신 경우 아래의 기관에 문의하실 수 있습니다.",
      "개인정보 분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)",
      "개인정보침해 신고센터: (국번없이) 118 (privacy.kisa.or.kr)",
      "경찰청 사이버수사국: (국번없이) 182 (ecrm.cyber.go.kr)",
    ],
  },
  {
    title: "13. 개인정보 처리방침의 변경에 관한 사항",
    contents: [
      "본 처리방침은 운영 정책 및 법령의 개정에 따라 변경될 수 있습니다.",
      "본 개인정보 처리방침은 2026년 6월 25일부터 적용됩니다.",
    ],
  },
];

export const PrivacyPolicy = () => {
  return (
    <PageWrap>
      <Helmet>
        <title>개인정보 처리방침 - 메짱</title>
        <meta
          name="description"
          content="메짱 서비스의 개인정보 처리방침입니다."
        />
      </Helmet>
      <PolicyCard>
        <Header>
          <h1>개인정보 처리방침</h1>
          <p>시행일: 2026년 6월 25일</p>
        </Header>

        <Intro>
          메짱(이하 '회사' 또는 '서비스')은(는) 정보주체의 자유와 권리 보호를
          위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게
          개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보
          보호법」 제30조에 따라 정보주체에게 개인정보의 처리와 보호에 관한 절차
          및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수
          있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        </Intro>

        {sections.map((section) => (
          <Section key={section.title}>
            <h2>{section.title}</h2>
            <ul>
              {section.contents.map((content, index) => (
                <li key={index}>{content}</li>
              ))}
            </ul>
          </Section>
        ))}

        <Notice>
          본 방침은 서비스 기능 또는 관련 법령, 외부 서비스 정책 변경에 따라
          수정될 수 있으며, 변경 시 본 페이지를 통해 안내합니다.
        </Notice>
      </PolicyCard>
    </PageWrap>
  );
};

const PageWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 48px 16px 64px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
`;

const PolicyCard = styled.article`
  width: min(920px, 100%);
  padding: 36px;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${({ theme }) =>
    isDarkTheme(theme)
      ? "rgba(24, 24, 24, 0.92)"
      : "rgba(255, 255, 255, 0.94)"};
  color: ${({ theme }) => theme.textColor};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14);

  @media screen and (max-width: 576px) {
    padding: 24px 18px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;

  h1 {
    margin: 0;
    font-size: 28px;
    line-height: 1.3;
  }

  p {
    margin: 0;
    color: ${({ theme }) =>
      isDarkTheme(theme) ? "rgb(190, 190, 190)" : "rgb(90, 90, 90)"};
    font-size: 14px;
  }
`;

const Intro = styled.p`
  margin: 0 0 28px;
  line-height: 1.7;
`;

const Section = styled.section`
  margin-top: 26px;

  h2 {
    margin: 0 0 12px;
    font-size: 18px;
    line-height: 1.4;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin: 4px 0;
    line-height: 1.7;
  }
`;

const Notice = styled.p`
  margin: 32px 0 0;
  padding-top: 20px;
  border-top: 1px solid
    ${({ theme }) =>
      isDarkTheme(theme) ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.12)"};
  color: ${({ theme }) =>
    isDarkTheme(theme) ? "rgb(190, 190, 190)" : "rgb(90, 90, 90)"};
  line-height: 1.7;
`;
