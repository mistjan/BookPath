// start-categories.ts — kept for backward compatibility
// The new start page uses its own inline decision flow.
// This file remains as a stub for any existing imports.

import { works } from "./content";

export const startCategories = works.slice(0, 5).map((w) => ({
  title: w.titleDisplayCn,
  intro: `${w.authorName} · ${w.literaryCategory}`,
  cards: [
    {
      kind: "work" as const,
      title: w.titleDisplayCn,
      href: `/works/${w.slug}`,
      meta: `${w.literaryCategory} · 难度 ${w.difficultyLevel}`,
      description: w.authorName,
      difficulty: w.difficultyLevel,
    },
  ],
}));
