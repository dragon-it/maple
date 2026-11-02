import { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import defaultCursor from "../../assets/cursor/Cursor_Pointer.png";
import hoverCursor from "../../assets/cursor/Cursor_Hover.png";
import pressedCursor from "../../assets/cursor/Cursor_Click.png";

const CursorStyle = createGlobalStyle`
  html[data-maple-cursor="default"] { --maple-cursor: url("${defaultCursor}") 0 0, default; }
  html[data-maple-cursor="hover"] { --maple-cursor: url("${hoverCursor}") 0 0, pointer; }
  html[data-maple-cursor="pressed"] { --maple-cursor: url("${pressedCursor}") 0 0, pointer; }

  html[data-maple-cursor], html[data-maple-cursor] * {
    cursor: var(--maple-cursor) !important;
  }
`;

export function MapleCursor() {
  useEffect(() => {
    const root = document.documentElement;
    let pressed = false;
    let target = null;

    const update = () => {
      // 덮어쓰기 전 커서를 읽어 기존 cursor: pointer 요소도 인식함
      // 위치에 따라 별도 커서 이미지를 움직이지 않고 브라우저 기본 커서 기능을 사용함
      root.removeAttribute("data-maple-cursor");
      const element = target instanceof Element && target.isConnected ? target : null;
      const disabled = element?.closest(':disabled, [aria-disabled="true"], [inert]');
      const nativeCursor = element ? getComputedStyle(element).cursor : "default";
      const control = element?.closest('a[href], button, summary, select, label[for], [role="button"], [role="link"], input[type="checkbox"], input[type="radio"], input[type="range"]');
      const clickable = !disabled && (control || ["pointer", "grab", "grabbing"].includes(nativeCursor));
      root.setAttribute("data-maple-cursor", pressed ? "pressed" : clickable ? "hover" : "default");
    };

    const onOver = (event) => {
      if (event.pointerType !== "mouse") return;
      target = event.target;
      update();
    };
    const onDown = (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      target = event.target;
      pressed = true;
      update();
    };
    const onUp = (event) => {
      if (event.pointerType !== "mouse") return;
      pressed = Boolean(event.buttons & 1);
      target = document.elementFromPoint(event.clientX, event.clientY);
      update();
    };
    const reset = () => {
      pressed = false;
      target = null;
      update();
    };
    const onMove = (event) => {
      // 창 밖에서 버튼을 놓은 경우 다음 이동에서 눌림 상태를 해제함
      if (pressed && event.pointerType === "mouse" && !(event.buttons & 1)) onUp(event);
    };
    const onVisibility = () => {
      if (document.hidden) reset();
    };

    update();
    window.addEventListener("pointerover", onOver, true);
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("pointerup", onUp, true);
    window.addEventListener("pointermove", onMove, true);
    window.addEventListener("pointercancel", reset, true);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointerover", onOver, true);
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("pointerup", onUp, true);
      window.removeEventListener("pointermove", onMove, true);
      window.removeEventListener("pointercancel", reset, true);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", onVisibility);
      root.removeAttribute("data-maple-cursor");
    };
  }, []);

  return <CursorStyle />;
}
