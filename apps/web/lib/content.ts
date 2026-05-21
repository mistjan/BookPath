import { bookPathData, awardsData } from "@bookpath/content";

export const movements = bookPathData.movements;
export const works = bookPathData.works;
export const guideCards = bookPathData.guideCards;
export const readingPaths = bookPathData.readingPaths;
export const awards = bookPathData.awards;

export function getMovement(slug: string) {
  return movements.find((movement) => movement.id === slug) ?? null;
}

export function getReadingPath(slug: string) {
  return readingPaths.find((path) => path.slug === slug || path.id === slug) ?? null;
}

export function getGuideCardForWork(workId: string) {
  return guideCards.find((card) => card.workId === workId) ?? null;
}

export function movementName(id: string) {
  return movements.find((movement) => movement.id === id)?.label ?? id;
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "");
}

export { awardsData };


