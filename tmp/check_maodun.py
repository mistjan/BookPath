import json
with open(r"C:\Users\56265\Documents\BookPath\lib\awards-data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

maodun = [a for a in data if a["slug"] == "\u8305\u76fe\u6587\u5b66\u5956"][0]
print("Maodun edition cycles:")
for e in maodun["awardEditions"]:
    print(f"  cycle={e['awardCycle']}, year={e['awardYear']}")