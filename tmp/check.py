import json

path = r"C:\Users\56265\Documents\BookPath\lib\awards-data.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Quick sanity check
nobel = [a for a in data if a["slug"] == "\u8bfa\u8d1d\u5c14\u6587\u5b66\u5956"][0]
print(f"Nobel editions: {len(nobel['awardEditions'])}")
print(f"Has whoShouldRead: {'whoShouldRead' in nobel}")
print(f"Has limitationNote: {'limitationNote' in nobel}")
print(f"First edition has evaluationNote: {'evaluationNote' in nobel['awardEditions'][0]}")