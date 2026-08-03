import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import styled from "styled-components";
import { X } from "lucide-react";

export const SundayMaple = ({ eventData, loading, error }) => {
  const [booting, setBooting] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [reserveH, setReserveH] = useState(0);
  const wrapRef = useRef(null);

  const isSkipActive = useMemo(() => {
    const raw = localStorage.getItem("skipDay");
    if (!raw) return false;
    const d = new Date(raw);
    return !isNaN(d) && d > new Date();
  }, []);

  useEffect(() => {
    if (isSkipActive) {
      setIsVisible(false);
      setBooting(false);
    }
  }, [isSkipActive]);

  useEffect(() => {
    const run = async () => {
      if (booting === false) return;
      if (loading || error || !eventData) return;

      const notices = eventData.event_notice || eventData || [];
      const sunday = (notices || []).find((n) => n.title?.includes("썬데이"));
      if (!sunday) {
        setIsVisible(false);
        setBooting(false);
        return;
      }

      const end = new Date(sunday.date_event_end);
      if (!(end > new Date())) {
        setIsVisible(false);
        setBooting(false);
        return;
      }

      try {
        const { status, data } = await axios.get("/notice-event/detail", {
          params: { notice_id: Number(sunday.notice_id) },
        });
        if (status !== 200 || !data?.contents) {
          setIsVisible(false);
          setBooting(false);
          return;
        }

        const doc = new DOMParser().parseFromString(data.contents, "text/html");
        const img = doc.querySelector("img");
        const src = img?.getAttribute("src");
        if (!src) {
          setIsVisible(false);
          setBooting(false);
          return;
        }

        const pre = new Image();
        pre.onload = () => {
          setImgSrc(src);
          setReady(true);
          setIsVisible(true);
          setBooting(false);
          localStorage.setItem("sundayMaple", data?.url);
          window.dispatchEvent(new Event("sundayMapleUpdated"));
        };
        pre.onerror = () => {
          setIsVisible(false);
          setBooting(false);
        };
        pre.src = src;
      } catch {
        setIsVisible(false);
        setBooting(false);
      }
    };
    run();
  }, [booting, eventData, loading, error]);

  useLayoutEffect(() => {
    if (!ready || !isVisible) {
      setReserveH(0);
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const h = el.getBoundingClientRect().height;
      setReserveH(h - 600);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ready, isVisible]);

  const handleSkipDay = () => {
    const next = !isChecked;
    setIsChecked(next);
    if (next) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      localStorage.setItem("skipDay", d.toISOString());
      setIsVisible(false);
    }
  };

  if (booting) return null;

  return (
    <>
      {isVisible && ready && imgSrc && (
        <OverlayContainer $show>
          <ContentsWrap ref={wrapRef}>
            <ButtonWrap>
              <TitleHeader>SUNDAYMAPLE</TitleHeader>
              <RightControls>
                <SkipDayCheckboxWrapper>
                  <input
                    type="checkbox"
                    id="skip-day-checkbox-top"
                    checked={isChecked}
                    onChange={handleSkipDay}
                  />
                  <label htmlFor="skip-day-checkbox-top">오늘 하루 보지 않기</label>
                </SkipDayCheckboxWrapper>
                <CloseButton onClick={() => setIsVisible(false)} aria-label="닫기">
                  <X size={15} />
                </CloseButton>
              </RightControls>
            </ButtonWrap>
            <Contents>
              <img src={imgSrc} alt="썬데이 메이플" />
            </Contents>
            <BottomButtonWrap>
              <SkipDayCheckboxWrapper>
                <input
                  type="checkbox"
                  id="skip-day-checkbox-bottom"
                  checked={isChecked}
                  onChange={handleSkipDay}
                />
                <label htmlFor="skip-day-checkbox-bottom">오늘 하루 보지 않기</label>
              </SkipDayCheckboxWrapper>
              <CloseButton onClick={() => setIsVisible(false)} aria-label="닫기">
                <X size={15} />
              </CloseButton>
            </BottomButtonWrap>
          </ContentsWrap>
        </OverlayContainer>
      )}
      <Spacer style={{ height: reserveH }} />
    </>
  );
};

const OverlayContainer = styled.div`
  position: absolute;
  top: 180px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: 95;
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.18s ease-out;
`;

const ContentsWrap = styled.div`
  position: relative;
  padding: 10px 14px 12px 14px;
  margin: 10px;
  width: 95%;
  max-width: 876px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: linear-gradient(
    135deg,
    rgb(25, 33, 50),
    rgb(20, 26, 4)
  );
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  overflow: hidden;
`;

const Contents = styled.div`
  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 2px 2px;
`;

const TitleHeader = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: rgb(220, 252, 2);
  margin: 0;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.25);
  letter-spacing: 0.05em;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BottomButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  padding: 2px 2px;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.85);
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SkipDayCheckboxWrapper = styled.div`
  display: flex;
  gap: 2px;
  color: var(--muted-foreground, rgba(255, 255, 255, 0.85));
  font-size: 1rem;
  font-weight: 500;
  user-select: none;

  input {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
    cursor: pointer;
    position: relative;
    transition: all 0.18s ease;

    &:checked {
      background: var(--primary, oklch(0.72 0.16 285));
      border-color: var(--primary, oklch(0.72 0.16 285));
    }

    &:checked::after {
      content: "";
      position: absolute;
      top: 2px;
      left: 5px;
      width: 4px;
      height: 8px;
      border: solid #ffffff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  label {
    cursor: pointer;
    transition: color 0.15s ease;
    &:hover {
      color: #ffffff;
    }
  }
`;

const Spacer = styled.div`
  width: 100%;
  pointer-events: none;
`;
