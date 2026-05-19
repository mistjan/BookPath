import { bookPathData } from "@bookpath/content";

export const movements = bookPathData.movements;
export const works = bookPathData.works;
export const guideCards = bookPathData.guideCards;
export const readingPaths = bookPathData.readingPaths;
export const awards = bookPathData.awards;

export function getMovement(slug: string) {
  return movements.find((movement) => movement.id === slug) ?? movements[0];
}

export function getWork(slug: string) {
  return works.find((work) => work.id === slug) ?? works[0];
}

export function getReadingPath(slug: string) {
  return readingPaths.find((path) => path.slug === slug || path.id === slug) ?? readingPaths[0];
}

export function getGuideCardForWork(workId: string) {
  return guideCards.find((card) => card.workId === workId) ?? null;
}

export function getAward(slug: string) {
  return awards.find((award) => award.id === slug) ?? awards[0];
}

export function movementName(id: string) {
  return movements.find((movement) => movement.id === id)?.label ?? id;
}
