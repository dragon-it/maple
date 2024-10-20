export const formatPowerStat = (powerValue) => {
  if (powerValue === null || powerValue === undefined) {
    return "데이터 없음";
  }
  if (powerValue >= 100000000) {
    const 억 = Math.floor(powerValue / 100000000);
    const remainder = powerValue % 100000000;
    const 만 = Math.floor(remainder / 10000);

    return `${억 > 0 ? `${억}억 ` : ""}${만 > 0 ? `${만}만 ` : ""}${
      remainder % 10000 > 0 ? remainder % 10000 : ""
    }`;
  } else if (powerValue >= 10000) {
    const 만 = Math.floor(powerValue / 10000);
    return `${만 > 0 ? `${만}만 ` : ""}${
      powerValue % 10000 > 0 ? powerValue % 10000 : ""
    }`;
  } else {
    return `${powerValue}`;
  }
};
