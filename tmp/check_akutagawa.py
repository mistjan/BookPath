import json
with open(r"C:\Users\56265\Documents\BookPath\lib\awards-data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

akutagawa = [a for a in data if a["slug"] == "\u82a5\u5ddd\u9f99\u4e4b\u4ecb\u5956"][0]
print("Akutagawa edition cycles:")
for e in akutagawa["awardEditions"][:10]:
    print(f"  cycle={e['awardCycle']}, year={e['awardYear']}")