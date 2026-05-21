import json, os, re

def load_wiki(name):
    fname = os.path.join(os.getcwd(), 'tmp', 'wiki_' + name + '.json')
    if not os.path.exists(fname):
        return None
    with open(fname, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data['wikitext']

def extract_pulitzer(text):
    winners = {}
    lines = text.split('\n')
    in_table = False
    current_year = None
    for line in lines:
        if line.startswith('{| class="wikitable'):
            in_table = True
            continue
        if in_table and line.strip() == '|}':
            in_table = False
            continue
        if not in_table:
            continue
        ym = re.match(r'^\||s*\(\d{4}\)\s*$', line)
        if ym:
            current_year = int(ym.group(1))
            continue
        ym = re.match(r'\\{\|\s*\[\[.*?\|\(\d{4}\)\]\]\s*$', line)
        if ym:
            current_year = int(ym.group(1))
            continue
        if current_year is not None and line.startswith('|'):
            authors = re.findall(r'\[\[([^\]\|]+)(?:\|[^\]]+)?\]\]', line)
            if authors and current_year not in winners:
                winners[current_year] = {'authors': authors, 'raw': line.strip()}
    return winners

def main():
    text = load_wiki('Pulitzer_Prize_for_Fiction')
    if text:
        winners = extract_pulitzer(text)
        print(f'Found {len(winners)} winners')
        for y, w in sorted(winners.items())[:6]:
            print(f'{y}: {w["raw"]}')

if __name__ == '__main__':
    main()