import fs from "fs";
const R = fs.readFileSync("lib/bookpath-data.ts", "utf-8");
const O = R.indexOf("{", R.indexOf("export const bookPathData = "));
let d = 0, E = O;
for (let i = O; i < R.length; i++) { if (R[i] === "{") d++; else if (R[i] === "}") { d--; if (d === 0) { E = i + 1; break; } } }
const D = JSON.parse(R.slice(O, E));
const { guideCards, works, movements } = D;

movements.forEach(m => {
  // Find works that belong to this movement
  const movementWorks = works.filter(w => (w.movementIds || []).includes(m.id));
  // Find guide cards for those works
  const movementGuideIds = guideCards
    .filter(g => movementWorks.some(w => g.workId === w.id))
    .map(g => g.id);
  // Assign
  m.guideCardIds = movementGuideIds;
  console.log(`✅ ${m.id}: ${movementWorks.length} works, ${movementGuideIds.length} guide cards`);
});

fs.writeFileSync("lib/bookpath-data.ts", R.slice(0, O) + JSON.stringify(D, null, 2) + R.slice(E), "utf-8");
console.log("\nDone! All movements populated.");
