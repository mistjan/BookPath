import sys
sys.path.insert(0, r"C:\Users\56265\Documents\BookPath\tmp")
from gen_editions import EDITION_DATA

# Copy the patching logic inline
import json

JSON_PATH = r"C:\Users\56265\Documents\BookPath\lib\awards-data.json"
with open(JSON_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

def find_award(slug):
    for a in data:
        if a["slug"] == slug:
            return a
    return None

total = 0
for award in data:
    slug = award.get("slug", "")
    edition_map = EDITION_DATA.get(slug, {})
    if not edition_map:
        continue
    
    count = 0
    for ed in award.get("awardEditions", []):
        # Match by awardYear (as string) primarily, fall back to awardCycle
        year_str = str(ed["awardYear"])
        cycle = ed.get("awardCycle", "")
        info = edition_map.get(year_str) or edition_map.get(cycle)
        if not info:
            continue
        if info.get("winners"):
            if award.get("recipientType") == "AUTHOR":
                ed["authorItems"] = info["winners"]
            else:
                ed["workItems"] = info["winners"]
        if info.get("evaluationNote"):
            ed["evaluationNote"] = info["evaluationNote"]
            ed["status"] = "VERIFIED_WITH_DATA"
        count += 1
    
    if count:
        print(f"{slug}: {count} editions updated")
    total += count

print(f"\nTotal editions updated: {total}")

with open(JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Done")