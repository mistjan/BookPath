import json
path = r"C:\Users\56265\Documents\BookPath\lib\awards-data.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)
print(f"Awards: {len(data)}")
print(f"First: {data[0]['nameCn']}")
print(f"Editions: {len(data[0]['awardEditions'])}")
print("OK")