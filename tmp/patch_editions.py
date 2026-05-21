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
        cycle = ed["awardCycle"]
        if cycle in edition_map:
            info = edition_map[cycle]
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

# ==== NOBEL ====
nobel_data = {    "1901": { "winners": [{"nameCn": "苏利·普吕多姆", "nameOriginal": "Sully Prudhomme", "country": "法国"}], "evaluationNote": "首届诺贝尔文学奖颁给了法国诗人普吕多姆。这个选择在当年就引发了争议——很多人认为托尔斯泰更配。普吕多姆的诗在今天几乎无人阅读，但这一届确立了一个持续至今的模式：诺贝尔评委偏爱理想主义倾向的作品。" },
    "1902": { "winners": [{"nameCn": "特奥多尔·蒙森", "nameOriginal": "Theodor Mommsen", "country": "德国"}], "evaluationNote": "蒙森是历史学家而非纯文学作家，他的《罗马史》是史学经典。体现了诺贝尔早期对广义文学的理解。" },
    "1903": { "winners": [{"nameCn": "比昂斯滕·比昂松", "nameOriginal": "Bjornstjerne Bjornson", "country": "挪威"}], "evaluationNote": "比昂松是挪威国歌的词作者，和易卜生并称挪威文学双峰。作品充满理想主义，非常符合诺贝尔早期的审美偏好。" },
    "1904": { "winners": [{"nameCn": "弗雷德里克·米斯特拉尔", "nameOriginal": "Frederic Mistral", "country": "法国"}, {"nameCn": "何塞·埃切加赖", "nameOriginal": "Jose Echegaray", "country": "西班牙"}], "evaluationNote": "两位获奖者共享奖金。米斯特拉尔用普罗旺斯方言写作；埃切加赖是西班牙剧作家。两人在今天都已很少被阅读。" },
    "1905": { "winners": [{"nameCn": "亨利克·显克维支", "nameOriginal": "Henryk Sienkiewicz", "country": "波兰"}], "evaluationNote": "《你往何处去》是历史小说的经典，以古罗马为背景讲述早期基督徒的故事。显克维支是波兰第一位诺贝尔文学奖得主。" },
    "1906": { "winners": [{"nameCn": "乔祖埃·卡尔杜齐", "nameOriginal": "Giosue Carducci", "country": "意大利"}], "evaluationNote": "意大利著名诗人，被视为现代意大利诗歌的奠基人之一。" },
    "1907": { "winners": [{"nameCn": "鲁德亚德·吉卜林", "nameOriginal": "Rudyard Kipling", "country": "英国"}], "evaluationNote": "最年轻的诺贝尔文学奖得主（41岁），也是第一位英语获奖者。《丛林之书》至今仍是经典儿童文学。但他的帝国主义和殖民主义立场在今天受到严厉审视。" },
    "1908": { "winners": [{"nameCn": "鲁道尔夫·欧肯", "nameOriginal": "Rudolf Eucken", "country": "德国"}], "evaluationNote": "欧肯是哲学家而非文学家——再次说明早期诺贝尔对文学定义的宽泛理解。今天几乎没有人再读他的著作。" },
    "1909": { "winners": [{"nameCn": "塞尔玛·拉格洛夫", "nameOriginal": "Selma Lagerlof", "country": "瑞典"}], "evaluationNote": "第一位获得诺贝尔文学奖的女性。《尼尔斯骑鹅旅行记》至今仍是世界儿童文学经典。" },
    "1910": { "winners": [{"nameCn": "保尔·海泽", "nameOriginal": "Paul Heyse", "country": "德国"}], "evaluationNote": "以中短篇小说闻名，但在今天几乎已无人阅读。体现了诺贝尔评委保守趣味的局限。" },
    "1911": { "winners": [{"nameCn": "莫里斯·梅特林克", "nameOriginal": "Maurice Maeterlinck", "country": "比利时"}], "evaluationNote": "象征主义戏剧的代表人物，《青鸟》是他的代表作。以法语写作，是比利时文学的重要名片。" },
    "1912": { "winners": [{"nameCn": "盖哈特·霍普特曼", "nameOriginal": "Gerhart Hauptmann", "country": "德国"}], "evaluationNote": "德国自然主义戏剧大师，代表作《织工》以西里西亚织工起义为题材，具有强烈的社会批判性。" },
    "1913": { "winners": [{"nameCn": "罗宾德拉纳特·泰戈尔", "nameOriginal": "Rabindranath Tagore", "country": "印度"}], "evaluationNote": "第一位非欧洲获奖者，亚洲文学的里程碑。《吉檀迦利》由叶芝作序推荐，至今是诗歌经典。对中文读者来说，泰戈尔是亲切的——他的作品在中国影响了几代人。" },
    "1915": { "winners": [{"nameCn": "罗曼·罗兰", "nameOriginal": "Romain Rolland", "country": "法国"}], "evaluationNote": "《约翰·克利斯朵夫》是罗兰的代表作，充满理想主义和人道主义精神。傅雷的译本至今仍是中文经典。" },
    "1916": { "winners": [{"nameCn": "魏尔纳·海顿斯坦姆", "nameOriginal": "Verner von Heidenstam", "country": "瑞典"}], "evaluationNote": "瑞典作家获奖——早期诺贝尔中瑞典获奖者比例偏高，反映了评委的地域偏见。" },
    "1917": { "winners": [{"nameCn": "卡尔·吉勒鲁普", "nameOriginal": "Karl Gjellerup", "country": "丹麦"}, {"nameCn": "亨利克·彭托皮丹", "nameOriginal": "Henrik Pontoppidan", "country": "丹麦"}], "evaluationNote": "两位丹麦作家共享奖金。彭托皮丹的《幸运儿佩尔》是丹麦文学的丰碑。" },
    "1919": { "winners": [{"nameCn": "卡尔·斯皮特勒", "nameOriginal": "Carl Spitteler", "country": "瑞士"}], "evaluationNote": "以德语写作史诗，在今天几乎已无人问津。" },
    "1920": { "winners": [{"nameCn": "克努特·汉姆生", "nameOriginal": "Knut Hamsun", "country": "挪威"}], "evaluationNote": "《饥饿》是现代主义心理小说的先驱。但他在二战期间支持纳粹——一个伟大的作家，一个糟糕的人。" },
    "1921": { "winners": [{"nameCn": "阿纳托尔·法朗士", "nameOriginal": "Anatole France", "country": "法国"}], "evaluationNote": "法兰西学院院士，以讽刺小说闻名，在当时声名显赫，但今天阅读量大幅下降。" },
    "1922": { "winners": [{"nameCn": "哈辛托·贝纳文特", "nameOriginal": "Jacinto Benavente", "country": "西班牙"}], "evaluationNote": "西班牙剧作家，以社会讽刺喜剧闻名。" },