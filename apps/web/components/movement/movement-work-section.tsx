import type { Movement } from "@/lib/bookpath-data";

export function MovementWorkSection({ movement }: { movement: Movement }) {
  return (
    <section className="detail-section">
      <h2>作品分组</h2>
      <p>{movement.guideCards.map((card) => card.title).join("、")}</p>
    </section>
  );
}
