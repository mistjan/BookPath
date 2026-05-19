import Link from "next/link";

const nav = [
  ["流派", "/movements"],
  ["作品", "/works"],
  ["路径", "/paths"],
  ["奖项", "/awards"],
  ["搜索", "/search"]
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">BP</span>
        <span>书径 BookPath</span>
      </Link>
      <nav className="top-nav" aria-label="主导航">
        {nav.map(([label, href]) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
