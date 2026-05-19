import { bookPathData } from "../../../lib/bookpath-data";

export { bookPathData };
export type { Award, BookPathData, Movement, ReadingPath, Work } from "../../../lib/bookpath-data";

export const contentVersion = bookPathData.version;
export const contentScope = bookPathData.scope;
export const movements = bookPathData.movements;
export const works = bookPathData.works;
export const guideCards = bookPathData.guideCards;
export const readingPaths = bookPathData.readingPaths;
export const awards = bookPathData.awards;
