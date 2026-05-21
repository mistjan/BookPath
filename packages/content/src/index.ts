import { bookPathData } from "./bookpath-data";
import { awardsData } from "./awards-data";

export { bookPathData, awardsData };
export type { Award, BookPathData, Movement, ReadingPath, Work } from "./bookpath-data";
export type { AwardData, AwardEdition } from "./awards-data";

export const contentVersion = bookPathData.version;
export const contentScope = bookPathData.scope;
export const movements = bookPathData.movements;
export const works = bookPathData.works;
export const guideCards = bookPathData.guideCards;
export const readingPaths = bookPathData.readingPaths;
export const awards = bookPathData.awards;