"use client";

import { useEffect, useState } from "react";
import { isFavorited, toggleFavorite, getStatus, setStatus, statusLabel, allStatuses } from "@bookpath/core";
import type { ReadingStatus } from "@bookpath/core";

export function WorkActions({ workId, title }: { workId: string; title: string }) {
  const [faved, setFaved] = useState(false);
  const [reading, setReading] = useState<ReadingStatus | null>(null);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    (async () => {
      setFaved(await isFavorited(workId));
      setReading(await getStatus(workId));
    })();
  }, [workId]);

  const handleFav = async () => {
    const now = await toggleFavorite(workId, title);
    setFaved(now);
  };

  const handleStatus = async (s: ReadingStatus) => {
    await setStatus(workId, s);
    setReading(s);
    setShowStatus(false);
  };

  return (
    <div className="work-actions" style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
      <button onClick={handleFav} className="action-link" style={{ cursor: "pointer", font: "inherit", fontSize: 14 }}>
        {faved ? "❤ 已收藏" : "♡ 收藏"}
      </button>

      <div style={{ position: "relative" }}>
        <button onClick={() => setShowStatus((p) => !p)} className="action-link secondary" style={{ cursor: "pointer", font: "inherit", fontSize: 14 }}>
          {reading ? statusLabel(reading) : "标记状态"}
        </button>
        {showStatus && (
          <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, background: "var(--paper-strong)", border: "1px solid var(--line)", zIndex: 10, minWidth: 120 }}>
            {allStatuses.map((s) => (
              <button
                key={s}
                onClick={() => handleStatus(s)}
                style={{ display: "block", width: "100%", padding: "8px 16px", border: "none", background: reading === s ? "var(--accent)" : "transparent", color: reading === s ? "var(--paper-strong)" : "var(--ink)", cursor: "pointer", textAlign: "left", font: "inherit", fontSize: 13 }}
              >
                {statusLabel(s)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
