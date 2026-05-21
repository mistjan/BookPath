import type { Movement } from "@/lib/bookpath-data";

export function MovementHero({ movement }: { movement: Movement }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">{movement.originalName}</p>
        <h1>{movement.label}</h1>
        <p className="lede">{movement.oneLine}</p>
      </div>
    </section>
  );
}
