// API의 문자열 수치를 숫자로 비교함. 누락·빈 값·잘못된 값은 표시하지 않음
const readBonus = value => {
  if (value == null || String(value).trim() === "") return 0;
  const bonus = Number(value);
  return Number.isFinite(bonus) && bonus > 0 ? bonus : 0;
};

export const getSoulOptions = item => {
  const attack = readBonus(item.soul_pad);
  const magic = readBonus(item.soul_mad);
  const bonuses = [];

  // 같은 증가량은 한 줄로 합치고, 다르면 각각의 수치를 유지함
  if (attack > 0 && attack === magic) {
    bonuses.push(`공격력/마력 +${attack}`);
  } else {
    if (attack > 0) bonuses.push(`공격력 +${attack}`);
    if (magic > 0) bonuses.push(`마력 +${magic}`);
  }

  const grade = item.soul_potential_grade;
  const amplifiedGrade = readBonus(item.soul_potential_amplified_grade);
  const options = [
    item.soul_potential_option_1,
    item.soul_potential_option_2,
    item.soul_potential_option_3,
  ].filter(option => typeof option === "string" && option.trim());

  return {
    bonuses,
    grade,
    amplifiedGrade,
    options,
    // 활성 소울의 잠재 등급이 명시적으로 null인 응답만 부여 가능으로 표시함
    // 과거 응답처럼 필드 자체가 없는 경우에는 가능 여부를 추측하지 않음
    canApply: Boolean(item.soul_name) &&
      String(item.soul_active) === "1" && grade === null,
  };
};
