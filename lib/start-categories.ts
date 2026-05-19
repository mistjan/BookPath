import type { Work } from "./bookpath-data";
import { movementName, works } from "./content";

type StartWorkCard = {
  kind: "work";
  title: string;
  href: string;
  meta: string;
  description: string;
  difficulty: number;
};

type EmptyTypeBoundary = {
  kind: "empty-boundary";
  title: string;
  meta: string;
  description: string;
};

export type StartCategory = {
  title: string;
  intro: string;
  cards: Array<StartWorkCard | EmptyTypeBoundary>;
};

export const futureTypeBoundaries = [
  {
    id: "science-fiction",
    title: "科幻入门",
    literaryCategory: "小说",
    targetSubcategories: ["科幻小说", "社会科幻", "技术幻想小说"],
    status: "EMPTY_BOUNDARY"
  },
  {
    id: "mystery",
    title: "推理入门",
    literaryCategory: "小说",
    targetSubcategories: ["推理小说", "本格推理", "社会派推理"],
    status: "EMPTY_BOUNDARY"
  }
] as const;

function stableScore(work: Work, seed: string) {
  return Array.from(`${seed}:${work.id}`).reduce((score, char) => score + char.charCodeAt(0), 0);
}

function pickWorks(candidates: readonly Work[], seed: string, count = 3) {
  return [...candidates]
    .sort((left, right) => stableScore(left, seed) - stableScore(right, seed))
    .slice(0, count);
}

function toWorkCard(work: Work): StartWorkCard {
  return {
    kind: "work",
    title: work.titleDisplayCn,
    href: `/works/${work.id}`,
    meta: `${work.literaryCategory} / ${work.literarySubcategory} · 难度 ${work.difficultyLevel}`,
    description: `${work.authorName}；相关流派：${work.movementIds.map(movementName).join("、")}`,
    difficulty: work.difficultyLevel
  };
}

function toBoundaryCard(boundary: (typeof futureTypeBoundaries)[number]): EmptyTypeBoundary {
  return {
    kind: "empty-boundary",
    title: boundary.title,
    meta: `${boundary.literaryCategory} / ${boundary.targetSubcategories.join("、")}`,
    description: "当前没有真实作品数据，不展示假书目；这里先作为类型入口边界保留。"
  };
}

const lowDifficulty = works.filter((work) => work.difficultyLevel <= 2);
const foreignLowDifficulty = lowDifficulty.filter((work) => String(work.countryOrRegion) !== "中国");
const chineseModern = works.filter((work) => String(work.countryOrRegion) === "中国").slice(0, 3);
const scienceFiction = works.filter((work) => work.literarySubcategory.includes("科幻"));
const mystery = works.filter((work) => work.literarySubcategory.includes("推理"));

export const startCategories: StartCategory[] = [
  {
    title: "文学入门",
    intro: "先选短、清楚、读完有反馈的作品，建立继续读的信心。",
    cards: pickWorks(lowDifficulty, "literature").map(toWorkCard)
  },
  {
    title: "外国文学入门",
    intro: "从叙事入口清楚、篇幅或结构压力较小的外国文学开始。",
    cards: pickWorks(foreignLowDifficulty, "foreign-literature").map(toWorkCard)
  },
  {
    title: "中国现当代文学入门",
    intro: "先从语言和历史距离都较近的作品进入中国现代经验。",
    cards: pickWorks(chineseModern, "chinese-modern").map(toWorkCard)
  },
  {
    title: "科幻入门",
    intro: "科幻后续作为体裁入口独立建库，当前先保留类型边界。",
    cards: scienceFiction.length ? pickWorks(scienceFiction, "science-fiction").map(toWorkCard) : [toBoundaryCard(futureTypeBoundaries[0])]
  },
  {
    title: "推理入门",
    intro: "推理后续按本格、社会派、硬汉、心理悬疑等路线组织。",
    cards: mystery.length ? pickWorks(mystery, "mystery").map(toWorkCard) : [toBoundaryCard(futureTypeBoundaries[1])]
  }
];
