"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Uncaught error:", error);
  }, [error]);

  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <main
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "100dvh",
            padding: 40,
            backgroundColor: "#f7f1e8",
            color: "#252018",
            textAlign: "center",
            gap: 16,
          }}
        >
          <h1 style={{ fontSize: 48, fontWeight: 900, margin: 0, lineHeight: 1.08 }}>
            出了点问题
          </h1>
          <p style={{ fontSize: 18, color: "#6f6254", maxWidth: 480, lineHeight: 1.6 }}>
            页面发生了意外错误。请刷新重试，或返回首页。
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                padding: "12px 24px",
                border: "1px solid #7b3f2d",
                background: "#7b3f2d",
                color: "#fffaf1",
                fontWeight: 800,
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              重试
            </button>
            <Link
              href="/"
              style={{
                padding: "12px 24px",
                border: "1px solid #d8cabb",
                background: "#fffaf1",
                color: "#7b3f2d",
                fontWeight: 800,
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              返回首页
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
