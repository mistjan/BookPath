import { awards, movements, readingPaths, works } from "@bookpath/content";

export type SearchScope = "all" | "works" | "movements" | "paths" | "awards";
export type ReadingPathType = "BEGINNER" | "GENRE" | "REGION" | "AWARD";
export type WorkFilterInput = {
  query?: string;
  category?: string;
  subcategory?: string;
  difficulty?: string | number;
  region?: string;
  movement?: string;
  beginner?: "" | "yes" | "no" | string;
};

export const pathGroups = [
  {
    id: "BEGINNER",
    label: "入门路径",
    description: "从可进入性开始，帮助读者完成第一组文学经验。"
  },
  {
    id: "GENRE",
    label: "体裁路径",
    description: "从科幻、推理等体裁进入，连接文学大类和下属子类。"
  },
  {
    id: "REGION",
    label: "地区路径",
    description: "按地区、语言传统和阅读距离组织作品。"
  },
  {
    id: "AWARD",
    label: "奖项路径",
    description: "把奖项作为发现线索，而不是把获奖等同于适合入门。"
  }
] as const;

export function getMovementById(id: string) {
  return movements.find((movement) => movement.id === id) ?? null;
}

export function getWorkById(id: string) {
  return works.find((work) => work.id === id) ?? null;
}

export function getReadingPathBySlug(slug: string) {
  return readingPaths.find((path) => path.slug === slug || path.id === slug) ?? null;
}

export function getAwardById(id: string) {
  return awards.find((award) => award.id === id) ?? null;
}

export function beginnerWorks(limit?: number) {
  const result = works.filter((work) => work.beginnerEntry);
  return typeof limit === "number" ? result.slice(0, limit) : result;
}

export function beginnerFriendlyWorks(limit?: number) {
  const result = works.filter((work) => work.difficultyLevel <= 2);
  return typeof limit === "number" ? result.slice(0, limit) : result;
}

export function movementName(id: string) {
  return getMovementById(id)?.label ?? id;
}

export function pathsByType(type: string) {
  return readingPaths.filter((path) => path.type === type);
}

export function firstPathByType(type: string) {
  return pathsByType(type)[0] ?? readingPaths[0] ?? null;
}

export function pathGroupCounts() {
  return pathGroups.map((group) => ({
    ...group,
    count: pathsByType(group.id).length
  }));
}

export function workSearchText(work: (typeof works)[number]) {
  return [
    work.titleOriginal,
    work.titleTranslatedCn ?? "",
    work.titleDisplayCn,
    work.authorName,
    work.countryOrRegion,
    work.literaryCategory,
    work.literarySubcategory,
    ...work.movementIds.map(movementName)
  ].join(" ");
}

export function filterWorks(filters: WorkFilterInput = {}) {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const category = filters.category ?? "";
  const subcategory = filters.subcategory ?? "";
  const difficulty = filters.difficulty ? String(filters.difficulty) : "";
  const region = filters.region ?? "";
  const movement = filters.movement ?? "";
  const beginner = filters.beginner ?? "";

  return works.filter((work) => {
    if (query && !workSearchText(work).toLowerCase().includes(query)) return false;
    if (category && work.literaryCategory !== category) return false;
    if (subcategory && work.literarySubcategory !== subcategory) return false;
    if (difficulty && String(work.difficultyLevel) !== difficulty) return false;
    if (region && work.countryOrRegion !== region) return false;
    if (movement && !(work.movementIds as readonly string[]).includes(movement)) return false;
    if (beginner === "yes" && !work.beginnerEntry) return false;
    if (beginner === "no" && work.beginnerEntry) return false;
    return true;
  });
}

export function countBy<T extends string>(items: readonly T[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {});
}

export function topEntries(counts: Record<string, number>, limit = 12) {
  return Object.entries(counts)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "zh-CN"))
    .slice(0, limit);
}

export function workFilterFacets(limit = 12) {
  const categoryEntries = topEntries(countBy(works.map((work) => work.literaryCategory)), limit);
  const subcategoryEntries = topEntries(countBy(works.map((work) => work.literarySubcategory)), 16);
  const regionEntries = topEntries(countBy(works.map((work) => work.countryOrRegion).filter((item) => item !== "待补充")), limit);
  const movementEntries = movements
    .map((item) => [item.id, movementName(item.id), works.filter((work) => (work.movementIds as readonly string[]).includes(item.id)).length] as const)
    .filter((item) => item[2] > 0)
    .sort((left, right) => right[2] - left[2])
    .slice(0, limit);

  return {
    categoryEntries,
    subcategoryEntries,
    regionEntries,
    movementEntries,
    categoryCount: new Set(works.map((work) => work.literarySubcategory)).size
  };
}

export function searchBookPath(query: string, scope: SearchScope = "all") {
  const normalized = query.trim().toLowerCase();
  const empty = { movements: [], works: [], readingPaths: [], awards: [] };
  if (!normalized) return empty;

  const result = {
    movements: movements.filter((item) =>
      [
        item.label,
        item.originalName,
        item.period,
        item.region,
        item.oneLine,
        item.definitionPrecise,
        item.whyAppeared,
        item.reactsAgainst,
        item.keyFeatures.join(" "),
        item.relatedMovements.join(" ")
      ].join(" ").toLowerCase().includes(normalized)
    ),
    works: works.filter((item) =>
      [
        item.titleOriginal,
        item.titleTranslatedCn ?? "",
        item.titleDisplayCn,
        item.authorName,
        item.countryOrRegion,
        item.literaryCategory,
        item.literarySubcategory
      ].join(" ").toLowerCase().includes(normalized)
    ),
    readingPaths: readingPaths.filter((item) =>
      [
        item.title,
        item.description,
        item.targetReader,
        item.type,
        item.difficultyRange,
        item.steps.map((step) => `${step.titleOriginal} ${step.titleTranslatedCn} ${step.reason}`).join(" ")
      ].join(" ").toLowerCase().includes(normalized)
    ),
    awards: awards.filter((item) =>
      [
        item.titleCn,
        item.originalName,
        item.countryOrRegion,
        item.awardType,
        item.beginnerValue
      ].join(" ").toLowerCase().includes(normalized)
    )
  };

  return {
    movements: scope === "all" || scope === "movements" ? result.movements : [],
    works: scope === "all" || scope === "works" ? result.works : [],
    readingPaths: scope === "all" || scope === "paths" ? result.readingPaths : [],
    awards: scope === "all" || scope === "awards" ? result.awards : []
  };
}

export function countSearchResults(results: ReturnType<typeof searchBookPath>) {
  return results.movements.length + results.works.length + results.readingPaths.length + results.awards.length;
}
