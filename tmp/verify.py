import json
with open(r"C:\Users\56265\Documents\BookPath\lib\awards-data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for a in data:
    eval_count = sum(1 for e in a["awardEditions"] if e.get("evaluationNote"))
    winner_count = sum(1 for e in a["awardEditions"] if len(e.get("workItems",[])) > 0 or len(e.get("authorItems",[])) > 0)
    if eval_count > 0 or winner_count > 0:
        print(f"{a['nameCn']}: {eval_count} evals, {winner_count} winners")