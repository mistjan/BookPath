export { countSearchResults, searchBookPath } from "@bookpath/core";
export type { SearchScope } from "@bookpath/core";

export function searchSuggestions() {
  return [
    { label: "现代主义", href: "/search?q=现代主义" },
    { label: "科幻小说", href: "/search?q=科幻小说" },
    { label: "适合入口", href: "/search?q=适合入口" },
    { label: "中国当代文学", href: "/search?q=中国当代文学" },
    { label: "诺贝尔文学奖", href: "/search?q=诺贝尔文学奖" }
  ];
}
