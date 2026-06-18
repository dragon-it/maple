import { getUnionArtifactIcon } from "../user/union/unionArtifact/getUnionArtifactIcon";

const UNION_ARTIFACT_NAMES = [
  "크리스탈 : 주황버섯",
  "크리스탈 : 슬라임",
  "크리스탈 : 뿔버섯",
  "크리스탈 : 스텀프",
  "크리스탈 : 스톤골렘",
  "크리스탈 : 발록",
  "크리스탈 : 자쿰",
  "크리스탈 : 핑크빈",
  "크리스탈 : 파풀라투스",
];

const CASH_BASE_SECTION = {
  key: "cash_item_equipment_base",
  label: "캐시",
};

const CASH_PRESET_SECTIONS = [
  {
    key: "cash_item_equipment_preset_1",
    label: "캐시 프리셋 1",
  },
  {
    key: "cash_item_equipment_preset_2",
    label: "캐시 프리셋 2",
  },
  {
    key: "cash_item_equipment_preset_3",
    label: "캐시 프리셋 3",
  },
];

const normalizeLabel = (value) => value?.replace(/\s+/g, " ").trim() ?? "";

const getCashItemIdentity = (item) =>
  [
    normalizeLabel(item?.cash_item_equipment_part),
    normalizeLabel(item?.cash_item_name),
  ].join("|");

const createEmptyCard = ({
  id,
  name,
  icon = null,
  slot,
  detail,
  emptyMessage,
  extraLines = [],
}) => ({
  id,
  name,
  icon,
  slot,
  detail,
  expireAt: null,
  badgeLabel: "없음",
  badgeTone: "empty",
  emptyMessage,
  extraLines,
});

const createInformationalCard = ({
  id,
  name,
  icon = null,
  slot,
  detail,
  emptyMessage,
  extraLines = [],
}) => ({
  id,
  name,
  icon,
  slot,
  detail,
  expireAt: null,
  badgeLabel: "없음",
  badgeTone: "muted",
  emptyMessage,
  extraLines,
});

const createTimedCard = ({
  id,
  name,
  icon = null,
  slot,
  detail,
  expireAt,
  extraLines = [],
  alertTone = null,
}) => ({
  id,
  name,
  icon,
  slot,
  detail,
  expireAt,
  extraLines,
  alertTone,
});

const buildBaseCashSection = (cashEquipment) => {
  const items = (cashEquipment[CASH_BASE_SECTION.key] ?? [])
    .filter((item) => item?.date_option_expire)
    .map((item) =>
      createTimedCard({
        id: `${CASH_BASE_SECTION.key}-${getCashItemIdentity(item)}`,
        name: item.cash_item_name || item.cash_item_equipment_part,
        icon: item.cash_item_icon,
        slot: item.cash_item_equipment_part || "캐시",
        expireAt: item.date_option_expire,
        detail: "캐시 장착 옵션 유효 기간",
      }),
    );

  if (items.length === 0) {
    items.push(
      createInformationalCard({
        id: "cash-base-empty",
        name: "캐시",
        slot: "캐시",
        detail: "만료 정보 없음",
        emptyMessage: "캐시에 장착된 옵션 만료 아이템이 없습니다.",
      }),
    );
  }

  return {
    id: CASH_BASE_SECTION.key,
    title: CASH_BASE_SECTION.label,
    items,
  };
};

const buildPresetCashWarningSection = (cashEquipment) => {
  const baseItemIdentities = new Set(
    (cashEquipment[CASH_BASE_SECTION.key] ?? [])
      .filter((item) => item?.date_option_expire)
      .map(getCashItemIdentity),
  );

  const warningItems = CASH_PRESET_SECTIONS.flatMap(({ key, label }) =>
    (cashEquipment[key] ?? [])
      .filter((item) => item?.date_option_expire)
      .filter((item) => !baseItemIdentities.has(getCashItemIdentity(item)))
      .map((item) =>
        createTimedCard({
          id: `${key}-${getCashItemIdentity(item)}`,
          name: item.cash_item_name || item.cash_item_equipment_part,
          icon: item.cash_item_icon,
          slot: `${label} / ${item.cash_item_equipment_part || "캐시"}`,
          expireAt: item.date_option_expire,
          detail: "프리셋에만 있는 옵션 유효 기간",
          extraLines: [
            "캐시가 아니라 프리셋에 장착되어 있어 해당 프리셋을 낄 때만 옵션이 유지됩니다.",
            "항상 유지하려면 캐시에 장착해야 합니다.",
          ],
          alertTone: "danger",
        }),
      ),
  );

  if (warningItems.length === 0) {
    return null;
  }

  return {
    id: "cash-preset-warning",
    title: "캐시 프리셋",
    items: warningItems,
  };
};

const buildCashSections = (cashEquipment) =>
  [
    buildBaseCashSection(cashEquipment),
    buildPresetCashWarningSection(cashEquipment),
  ].filter(Boolean);

const buildTitleSection = (titleEquipment) => {
  const hasTitleData = Boolean(
    titleEquipment?.title_name ||
    titleEquipment?.title_icon ||
    titleEquipment?.date_option_expire,
  );

  return {
    id: "title",
    title: "칭호",
    items: [
      !hasTitleData
        ? createEmptyCard({
            id: "title",
            name: "칭호",
            slot: "칭호",
            detail: "장착 안 함",
            emptyMessage: "장착한 칭호가 없습니다.",
          })
        : titleEquipment?.date_option_expire
          ? createTimedCard({
              id: "title-option-expire",
              name: titleEquipment.title_name || "칭호",
              icon: titleEquipment.title_icon,
              slot: "칭호",
              expireAt: titleEquipment.date_option_expire,
              detail: "유효 기간",
            })
          : createInformationalCard({
              id: "title-option-expire",
              name: titleEquipment.title_name || "칭호",
              icon: titleEquipment.title_icon,
              slot: "칭호",
              detail: "만료 정보 없음",
              emptyMessage: "칭호 만료 정보가 없습니다.",
            }),
    ],
  };
};

const buildArtifactSection = (unionArtifactData) => {
  const artifactByName = new Map(
    (unionArtifactData?.union_artifact_crystal ?? []).map((artifact) => [
      normalizeLabel(artifact?.name),
      artifact,
    ]),
  );

  const items = UNION_ARTIFACT_NAMES.map((artifactName) => {
    const artifact = artifactByName.get(normalizeLabel(artifactName));

    if (!artifact) {
      return createEmptyCard({
        id: artifactName,
        name: artifactName,
        slot: "유니온 아티팩트",
        detail: "보유하지 않음",
        emptyMessage: "해당 아티팩트를 보유하고 있지 않습니다.",
      });
    }

    if (!artifact.date_expire) {
      return createInformationalCard({
        id: artifactName,
        name: artifact.name || artifactName,
        icon: getUnionArtifactIcon(artifact.name, artifact.level),
        slot: artifact.level ? `Lv.${artifact.level}` : "유니온 아티팩트",
        detail: "만료 정보 없음",
        emptyMessage: "아티팩트 만료 정보가 없습니다.",
      });
    }

    return createTimedCard({
      id: artifactName,
      name: artifact.name || artifactName,
      icon: getUnionArtifactIcon(artifact.name, artifact.level),
      slot: artifact.level ? `Lv.${artifact.level}` : "유니온 아티팩트",
      expireAt: artifact.date_expire,
      detail: "아티팩트 만료 기간",
    });
  });

  return {
    id: "union-artifact",
    title: "유니온 아티팩트",
    items,
  };
};

const getPetEquipmentExpireAt = (equipment) =>
  equipment?.date_expire ||
  equipment?.date_option_expire ||
  equipment?.item_date_expire ||
  null;

const buildPetEquipmentExtraLines = (equipment) => {
  const optionLines = Array.isArray(equipment?.item_option)
    ? equipment.item_option
        .filter((option) => option?.option_type && option?.option_value)
        .map((option) => `${option.option_type} : ${option.option_value}`)
    : [];

  const scrollLine =
    equipment?.scroll_upgradable !== undefined &&
    equipment?.scroll_upgradable !== null
      ? `주문서 강화 필요: ${equipment.scroll_upgradable}`
      : null;

  return scrollLine ? [...optionLines, scrollLine] : optionLines;
};
const buildPetEquipmentCard = (targetPetData, index) => {
  // 활성화된 펫 데이터 내부의 equipment 객체를 가져옴
  const equipment = targetPetData?.equipment || null;

  // 장비 객체가 없거나 실제 아이템 이름이 없으면 장착 안 함 처리
  if (!equipment || !equipment.item_name) {
    return createEmptyCard({
      id: `pet-equipment-${index}`,
      name: `펫 장비 ${index}`,
      slot: `펫 장비 슬롯 ${index}`,
      detail: "장착 안 함",
      emptyMessage: "해당 펫 장비 슬롯이 비어 있습니다.",
    });
  }

  const icon = equipment.item_icon || equipment.item_shape_icon || null;
  const expireAt = getPetEquipmentExpireAt(equipment);
  const extraLines = buildPetEquipmentExtraLines(equipment);

  // 만료 정보가 없거나 "-1"(영구)인 경우 처리
  if (!expireAt || expireAt === "-1") {
    return createInformationalCard({
      id: `pet-equipment-${index}`,
      name: equipment.item_name || `펫 장비 ${index}`,
      icon,
      slot: `펫 장비 슬롯 ${index}`,
      detail: "펫 장비",
      emptyMessage: "펫 장비 만료 정보가 없습니다.",
      extraLines,
    });
  }

  return createTimedCard({
    id: `pet-equipment-${index}`,
    name: equipment.item_name || `펫 장비 ${index}`,
    icon,
    slot: `펫 장비 슬롯 ${index}`,
    detail: "펫 장비 유효 기간",
    expireAt,
    extraLines,
  });
};

const buildPetSection = (petEquipment) => {
  // 1. pet_activate_flag 값에 따라 접두사(Prefix) 결정 (기본값 "0"은 개인 펫)
  const isWorldShare = petEquipment?.pet_activate_flag === "1";
  const prefix = isWorldShare ? "world_share_pet" : "pet";

  const items = [1, 2, 3].flatMap((index) => {
    // 2. 현재 순번(index)에 맞는 펫 데이터를 정규화해서 추출
    const targetPetData = {
      name: petEquipment[`${prefix}_${index}_name`],
      nickname: petEquipment[`${prefix}_${index}_nickname`],
      icon:
        petEquipment[`${prefix}_${index}_appearance_icon`] ||
        petEquipment[`${prefix}_${index}_icon`],
      petType: petEquipment[`${prefix}_${index}_pet_type`],
      dateExpire: petEquipment[`${prefix}_${index}_date_expire`],
      appearance: petEquipment[`${prefix}_${index}_appearance`],
      equipment: petEquipment[`${prefix}_${index}_equipment`],
    };

    const petName =
      targetPetData.nickname || targetPetData.name || `펫 ${index}`;
    const petType = targetPetData.petType || `펫 ${index}`;

    const hasPetData = Boolean(
      targetPetData.name ||
      targetPetData.nickname ||
      targetPetData.appearance ||
      targetPetData.icon,
    );

    // 3. 펫 카드 생성
    const petCard = !hasPetData
      ? createEmptyCard({
          id: `pet-${index}`,
          name: `펫 ${index}`,
          slot: petType,
          detail: "장착 안 함",
          emptyMessage: "해당 펫 슬롯이 비어 있습니다.",
        })
      : !targetPetData.dateExpire
        ? createInformationalCard({
            id: `pet-${index}`,
            name: petName,
            icon: targetPetData.icon,
            slot: petType,
            detail: "마법의 시간 만료 기간",
            emptyMessage: "펫 만료 정보가 없습니다.",
          })
        : createTimedCard({
            id: `pet-${index}`,
            name: petName,
            icon: targetPetData.icon,
            slot: petType,
            expireAt: targetPetData.dateExpire,
            detail: "마법의 시간 만료 기간",
          });

    // 4. 추출해둔 데이터를 넘겨서 장비 카드 생성
    return [petCard, buildPetEquipmentCard(targetPetData, index)];
  });

  return {
    id: "pets",
    title: "펫",
    items,
  };
};
export const buildExpirationSections = (combinedData) => {
  const titleEquipment = combinedData?.getItemEquipment?.title;
  const cashEquipment = combinedData?.getCashItemEquipment ?? {};
  const unionArtifactData = combinedData?.getUnionArtiFact;
  const petEquipment = combinedData?.getPetEquipment ?? {};

  return [
    ...buildCashSections(cashEquipment),
    buildTitleSection(titleEquipment),
    buildArtifactSection(unionArtifactData),
    buildPetSection(petEquipment),
  ];
};
