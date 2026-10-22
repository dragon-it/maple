// 기존 검색창의 입력 상한을 공통으로 사용함. 게임의 생성 규칙을 의미하지 않음
export const CHARACTER_NAME_MAX_LENGTH = 15;

// 같은 글자의 유니코드 표현을 NFC로 맞추고 공백/탭/줄바꿈을 제거함
// 입력한 대소문자는 유지하여 원문 조회에 사용함
export const normalizeCharacterName = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.normalize("NFC").replace(/\s+/g, "");
};

// API 호출 전에 입력을 검사하고, 통과하면 정리된 이름을 반환함
export const validateCharacterName = value => {
  const name = normalizeCharacterName(value);
  if (!name) {
    throw new Error("닉네임을 입력해주세요.");
  }
  if (/[ㄱ-ㅎㅏ-ㅣ]/.test(name)) {
    throw new Error("완성된 한글로 닉네임을 입력해주세요.");
  }
  if (!/^[가-힣a-zA-Z0-9]+$/.test(name)) {
    throw new Error("닉네임은 한글, 영문, 숫자로 입력해주세요.");
  }
  if (name.length > CHARACTER_NAME_MAX_LENGTH) {
    throw new Error(`닉네임은 ${CHARACTER_NAME_MAX_LENGTH}자 이하로 입력해주세요.`);
  }
  return name;
};

// 원문 포함 최대 20개만 반환함
// 후보 수가 차도 글자 순회는 계속하여 이름의 뒷부분이 잘리는 문제를 막음
export const getCharacterNameCandidates = name => {
  let combinations = [""];
  for (const char of name) {
    // 한글/숫자는 대소문자가 같으므로 Set으로 중복 선택지를 제거함
    const variants = [...new Set([char.toLowerCase(), char.toUpperCase()])];

    // 후보마다 현재 글자를 붙임. 각 단계에서 개수를 제한하여 2^n 전체 생성을 피함
    combinations = combinations
      .flatMap(prefix => variants.map(value => prefix + value))
      .slice(0, 20);
  }
  return [...new Set([name, ...combinations])].slice(0, 20);
};
