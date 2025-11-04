import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import styled from "styled-components";

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
      setReserveH(h - 300);
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
              <SkipDayCheckboxWrapper>
                <input
                  type="checkbox"
                  id="skip-day-checkbox"
                  checked={isChecked}
                  onChange={handleSkipDay}
                />
                <label htmlFor="skip-day-checkbox">오늘 하루 보지 않기</label>
              </SkipDayCheckboxWrapper>
              <CloseButton onClick={() => setIsVisible(false)}>X</CloseButton>
            </ButtonWrap>
            <Contents>
              <img src={imgSrc} alt="썬데이 메이플" />
            </Contents>
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
  padding: 3px 10px 10px 10px;
  margin: 10px;
  width: 95%;
  max-width: 876px;
  border: 1px solid rgb(33, 40, 48);
  outline: 2px solid rgb(54, 82, 100);
  background: rgb(43, 53, 62);
  border-radius: 8px;
  overflow: hidden;
`;

const Contents = styled.div`
  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    border: 1px solid rgb(119, 119, 119);
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  gap: 15px;
  margin: 0 5px 5px 0;
`;
const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.35);
  color: #fff;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #888;
  }
`;
const SkipDayCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgb(216, 216, 216);
  font-family: maple-light;
  input {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  label {
    cursor: pointer;
    padding: 4px;
    &:hover {
      color: #fff;
    }
  }
`;

const Spacer = styled.div`
  width: 100%;
  pointer-events: none;
`;
