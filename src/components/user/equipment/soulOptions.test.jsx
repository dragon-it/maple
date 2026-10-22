import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ItemDetail } from "./ItemDetail";
import { getSoulOptions } from "./soulOptions";

// 사용자가 제공한 잠재 미부여 무기의 소울 응답을 재현함
const availableSoul = {
  item_name: "제네시스 스태프",
  starforce: "0",
  soul_name: "위대한 메이린의 소울 적용",
  soul_option: "마력 +3%",
  soul_active: "1",
  soul_pad: "20",
  soul_mad: "20",
  soul_potential_grade: null,
  soul_potential_amplified_grade: null,
};

test("활성 소울의 같은 공격력·마력을 합치고 잠재 부여 가능 안내를 표시함", () => {
  const html = renderToStaticMarkup(<ItemDetail item={availableSoul} />);
  expect(html).toContain("마력 +3%, 공격력/마력 +20");
  expect(html).toContain("소울 잠재능력 부여 가능");
});

test("이미 잠재가 있는 소울은 등급·증폭 단계·세 옵션을 표시함", () => {
  const html = renderToStaticMarkup(<ItemDetail item={{
    ...availableSoul,
    soul_potential_grade: "레전드리",
    soul_potential_amplified_grade: 4,
    soul_potential_option_1: "공격력 +8%",
    soul_potential_option_2: "공격력 +8%",
    soul_potential_option_3: "공격력 +8%",
  }} />);
  expect(html).toContain("소울 잠재능력: 레전드리");
  expect(html).toContain("(증폭 4단계)");
  expect(html.match(/공격력 \+8%/g)).toHaveLength(3);
  expect(html).not.toContain("소울 잠재능력 부여 가능");
});

test.each([
  ["20", "10", ["공격력 +20", "마력 +10"]],
  ["0", "20", ["마력 +20"]],
  [null, undefined, []],
  ["", "잘못된 값", []],
  [20, "20", ["공격력/마력 +20"]],
])("공격력 %s / 마력 %s 값을 누락과 0까지 구분함", (pad, mad, expected) => {
  expect(getSoulOptions({ soul_pad: pad, soul_mad: mad }).bonuses).toEqual(expected);
});

test("비활성·과거 응답에서는 잠재 부여 가능 여부를 추측하지 않음", () => {
  expect(getSoulOptions({ ...availableSoul, soul_active: "0" }).canApply).toBe(false);
  expect(getSoulOptions({ soul_name: "기존 소울" }).canApply).toBe(false);
  expect(getSoulOptions({ ...availableSoul, soul_name: null }).canApply).toBe(false);
});

test("증폭 0단계나 누락 옵션으로 불필요한 줄을 만들지 않음", () => {
  const html = renderToStaticMarkup(<ItemDetail item={{
    ...availableSoul,
    soul_potential_grade: "레어",
    soul_potential_amplified_grade: 0,
    soul_potential_option_1: "마력 +1%",
    soul_potential_option_2: null,
    soul_potential_option_3: "",
  }} />);
  expect(html).toContain("마력 +1%");
  expect(html).not.toContain("증폭 0단계");
});
