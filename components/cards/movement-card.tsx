import Link from "next/link";
import type { Movement } from "@/lib/bookpath-data";

export function MovementCard({ movement }: { movement: Movement }) {
  return (
    <article className="info-card simple-card">
      <strong>{movement.label}</strong>
      <p>解释摘要：{movement.beginnerSummary}</p>
      <Link className="text-link" href={`/movements/${movement.id}`}>进入流派</Link>
    </article>
  );
}
