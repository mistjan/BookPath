import { AwardCard } from "@/components/cards/award-card";
import { awards } from "@/lib/content";

export default function AwardsPage() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">/awards</p>
          <h1>奖项中心</h1>
          <p className="lede">奖项是导览地图外围路标。它要解释倾向、局限和对新手的参考价值。</p>
        </div>
      </section>
      <section className="card-grid" aria-label="奖项列表">
        {awards.map((award) => <AwardCard award={award} key={award.id} />)}
      </section>
    </main>
  );
}
