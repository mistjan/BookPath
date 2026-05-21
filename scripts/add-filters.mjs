import fs from "fs";

// ═══ 1. Works: add country filter ═══
let c = fs.readFileSync("apps/mobile/app/works.tsx", "utf-8");
import { works } from "@bookpath/content";
const regions = [...new Set(works.filter(w => w.countryOrRegion && w.countryOrRegion !== "待补充").map(w => w.countryOrRegion))].sort();

c = c.replace(
  'const [sort, setSort] = useState<WorkFilterInput["sort"]>("year-desc");',
  `const [sort, setSort] = useState<WorkFilterInput["sort"]>("year-desc");
  const [country, setCountry] = useState("");`
);
c = c.replace("const active = !!cat || !!diff;", "const active = !!cat || !!diff || !!country;");
c = c.replace(
  `const filtered = useMemo(() => filterWorks({ query, category: cat, difficulty: diff || undefined, sort }), [query, cat, diff, sort]);`,
  `const filtered = useMemo(() => filterWorks({ query, category: cat, difficulty: diff || undefined, sort, country: country || undefined }), [query, cat, diff, sort, country]);`
);
c = c.replace("const allCats =", `const REGS = ${JSON.stringify(regions)};\nconst allCats =`);
// Insert country row after difficulty filterRow
c = c.replace(
  "          </View>\n          <Text style={s.panelLabel}>排序</Text>",
  `          </View>
          <Text style={s.panelLabel}>国家/地区</Text>
          <View style={s.chipRow}>
            {["全部", ...REGS].map(r => ( <Pressable key={r} onPress={() => setCountry(r === "全部" ? "" : r)} style={[s.chip, country === r && s.chipOn]}><Text style={[s.chipText, country === r && s.chipTextOn]}>{r}</Text></Pressable> ))}
          </View>
          <Text style={s.panelLabel}>排序</Text>`
);
c = c.replace('setCat(""); setDiff(""); setSort("year-desc");', 'setCat(""); setDiff(""); setSort("year-desc"); setCountry("");');

fs.writeFileSync("apps/mobile/app/works.tsx", c, "utf-8");
console.log("✅ works.tsx - country filter added");
