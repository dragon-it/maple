import { getUnionArtifactIcon } from "../user/union/unionArtifact/getUnionArtifactIcon";

const CASH_TRACKED_PARTS = [
  "얼굴장식",
  "눈장식",
  "귀고리",
  "장갑",
  "무기",
  "모자",
  "망토",
];

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

const CASH_SECTION_KEYS = [
  {
    key: "cash_item_equipment_base",
    label: "캐시",
  },
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

const createEmptyCard = ({
  id,
  name,
  icon = null,
  slot,
  detail,
  emptyMessage,
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
});

const createInformationalCard = ({
  id,
  name,
  icon = null,
  slot,
  detail,
  emptyMessage,
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
});

const buildCashSections = (cashEquipment) =>
  CASH_SECTION_KEYS.map(({ key, label }) => {
    const itemsByPart = new Map(
      (cashEquipment[key] ?? []).map((item) => [
        normalizeLabel(item?.cash_item_equipment_part),
        item,
      ]),
    );

    const items = CASH_TRACKED_PARTS.map((part) => {
      const item = itemsByPart.get(part);

      if (!item) {
        return createEmptyCard({
          id: `${key}-${part}`,
          name: part,
          slot: part,
          detail: "장착 안 함",
          emptyMessage: "해당 캐시 슬롯에 아이템이 없습니다.",
        });
      }

      if (!item.date_option_expire) {
        return createInformationalCard({
          id: `${key}-${part}`,
          name: item.cash_item_name || part,
          icon: item.cash_item_icon,
          slot: part,
          detail: "만료 정보 없음",
          emptyMessage: "옵션 만료 정보가 없습니다.",
        });
      }

      return {
        id: `${key}-${part}`,
        name: item.cash_item_name || part,
        icon: item.cash_item_icon,
        slot: part,
        expireAt: item.date_option_expire,
        detail: "옵션 유효 기간",
      };
    });

    return { id: key, title: label, items };
  });

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
          ? {
              id: "title-option-expire",
              name: titleEquipment.title_name || "칭호",
              icon: titleEquipment.title_icon,
              slot: "칭호",
              expireAt: titleEquipment.date_option_expire,
              detail: "유효 기간",
            }
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

    return {
      id: artifactName,
      name: artifact.name || artifactName,
      icon: getUnionArtifactIcon(artifact.name, artifact.level),
      slot: artifact.level ? `Lv.${artifact.level}` : "유니온 아티팩트",
      expireAt: artifact.date_expire,
      detail: "아티팩트 만료 기간",
    };
  });

  return {
    id: "union-artifact",
    title: "유니온 아티팩트",
    items,
  };
};

const buildPetSection = (petEquipment) => {
  const items = [1, 2, 3].map((index) => {
    const petName =
      petEquipment[`pet_${index}_nickname`] ||
      petEquipment[`pet_${index}_name`] ||
      `펫 ${index}`;
    const petIcon = petEquipment[`pet_${index}_appearance_icon`] || null;
    const petType = petEquipment[`pet_${index}_pet_type`] || `펫 ${index}`;
    const petExpireAt = petEquipment[`pet_${index}_date_expire`] || null;
    const hasPetData = Boolean(
      petEquipment[`pet_${index}_nickname`] ||
        petEquipment[`pet_${index}_name`] ||
        petEquipment[`pet_${index}_appearance`] ||
        petIcon,
    );

    if (!hasPetData) {
      return createEmptyCard({
        id: `pet-${index}`,
        name: `펫 ${index}`,
        slot: petType,
        detail: "장착 안 함",
        emptyMessage: "해당 펫 슬롯이 비어 있습니다.",
      });
    }

    if (!petExpireAt) {
      return createInformationalCard({
        id: `pet-${index}`,
        name: petName,
        icon: petIcon,
        slot: petType,
        detail: "마법의 시간 만료 기간",
        emptyMessage: "펫 만료 정보가 없습니다.",
      });
    }

    return {
      id: `pet-${index}`,
      name: petName,
      icon: petIcon,
      slot: petType,
      expireAt: petExpireAt,
      detail: "마법의 시간 만료 기간",
    };
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
