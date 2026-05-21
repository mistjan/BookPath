import json, os, re

WIKI_DIR = os.path.join(os.getcwd(), "tmp")
AWARDS_PATH = os.path.join(os.getcwd(), "lib", "awards-data.json")

def load_awards():
    with open(AWARDS_PATH, "r", encoding="utf-8") as f: return json.load(f)
def save_awards(data):
    with open(AWARDS_PATH, "w", encoding="utf-8") as f: json.dump(data, f, ensure_ascii=False, indent=2)
def load_wiki(name):
    fname = os.path.join(WIKI_DIR, "wiki_" + name + ".json")
    if not os.path.exists(fname): return None
    with open(fname, "r", encoding="utf-8") as f: d = json.load(f)
    return d["parse"]["wikitext"]

def extract_from_wikitable(text):
    winners = {}
    lns = text.split(chr(10))
    in_tbl = False; yr = None
    for line in lns:
        ls = line.strip()
        if ls.startswith("{| class=") and "wikitable" in ls:
            in_tbl = True; continue
        if in_tbl and ls == "|} ".strip():
            in_tbl = False; yr = None; continue
        if not in_tbl: continue
        # Year rows start with !
        if ls.startswith("!"):
            m = re.search(r"(\d{4})", ls)
            if m: yr = int(m.group(1)); continue
        # Data rows start with |
        if yr and ls.startswith("|") and not ls.startswith("|-") and not ls.startswith("|+"):
            if "colspan" in ls: continue
            if "Not awarded" in ls: yr = None; continue
            # Extract all [[display|link]] or [[name]] links
            names = []
            for m in re.finditer(r"\\[\\[\\([^\\]\\|]*)", ls):
                raw = m.group(1)
                if "|" in raw:
                    name = raw.split("|")[-1]
                else:
                    name = raw
                if name and not name.startswith("File:") and not name.startswith("Image:"):
                    names.append(name)
            if names and yr not in winners:
                winners[yr] = names
    return winners

def fill_award(award_name, wiki_name):
    awards = load_awards()
    text = load_wiki(wiki_name)
    if not text:
        print(f"  No wiki data for {wiki_name}")
        return 0
    wiki_winners = extract_from_wikitable(text)
    print(f"  Wiki has {len(wiki_winners)} entries for {award_name}")
    idx = next((i for i, a in enumerate(awards) if a["nameCn"] == award_name), None)
    if idx is None:
        print(f"  Award not found: {award_name}")
        return 0
    award = awards[idx]
    count = 0
    for ed in award["awardEditions"]:
        if ed.get("status") == "VERIFIED_WITH_DATA": continue
        yr = ed.get("awardYear")
        if yr is None or yr not in wiki_winners: continue
        authors = wiki_winners[yr]
        ed["authorItems"] = [{"nameCn": a[:100], "nameOriginal": "", "country": ""} for a in authors]
        ed["status"] = "VERIFIED_WITH_DATA"
        ed["verificationStatus"] = "EDITION_YEAR_VERIFIED"
        count += 1
    save_awards(awards)
    return count

if __name__ == "__main__":
    mapping = [
        ("普利策小说奖", "Pulitzer_Prize_for_Fiction"),
        ("布克奖", "Booker_Prize"),
        ("国际布克奖", "International_Booker_Prize"),
        ("美国国家图书奖小说奖", "National_Book_Award_for_Fiction"),
        ("雨果奖", "Hugo_Award_for_Best_Novel"),
        ("龚古尔奖", "Prix_Goncourt"),
        ("塞万提斯奖", "Miguel_de_Cervantes_Prize"),
        ("卡夫卡奖", "Franz_Kafka_Prize"),
        ("星云奖", "Nebula_Award_for_Best_Novel"),
        ("克拉克奖", "Arthur_C._Clarke_Award"),
        ("爱伦·坡奖", "Edgar_Allan_Poe_Award_for_Best_Novel"),
        ("贝利·吉福德奖", "Baillie_Gifford_Prize"),
        ("沃尔夫森历史奖", "Wolfson_History_Prize"),
        ("坎迪尔历史奖", "Cundill_History_Prize"),
        ("英国皇家学会科学图书奖", "Royal_Society_Science_Book_Prize"),
    ]
    total = 0
    for an, wn in mapping:
        print(f"Processing {an}...")
        c = fill_award(an, wn)
        print(f"  Filled {c} editions")
        total += c
    print(f"Total filled: {total}")