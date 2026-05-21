import json

JSON_PATH = r"C:\Users\56265\Documents\BookPath\lib\awards-data.json"
with open(JSON_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

def find_award(slug):
    for a in data:
        if a["slug"] == slug:
            return a
    return None

def patch_editions(slug, edition_map):
    award = find_award(slug)
    if not award:
        print(f"Award not found: {slug}")
        return 0
    count = 0
    for ed in award["awardEditions"]:
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
    print(f"{slug}: {count} editions updated")
    return count
