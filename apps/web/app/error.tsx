"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function PageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="page">
      <section className="hero" style={{ gridTemplateColumns: "1fr", minHeight: 300 }}>
        <div>
          <p className="eyebrow">Error</p>
          <h1>页面出错了</h1>
          <p className="lede">发生了意外错误，请重试或返回首页。</p>
          <div className="hero-actions">
            <button onClick={reset} className="action-link">
              重试
            </button>
            <Link href="/" className="action-link secondary">
              返回首页
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
