import json, os
winners = {
    " kafka\: {
 \2001\: {\authors\: [{\nameCn\: \菲利普·罗斯\, \nameOriginal\: \Philip Roth\, \country\: \美国\}], \note\: \首届卡夫卡奖颁给美国犹太裔小说大师罗斯。\},
 \2006\: {\authors\: [{\nameCn\: \村上春树\, \nameOriginal\: \Haruki Murakami\, \country\: \日本\}], \note\: \首位获卡夫卡奖的亚洲作家。\},
 \2014\: {\authors\: [{\nameCn\: \阎连科\, \nameOriginal\: \Yan Lianke\, \country\: \中国\}], \note\: \首位获卡夫卡奖的中国作家。\},
 \2020\: {\authors\: [{\nameCn\: \米兰·昆德拉\, \nameOriginal\: \Milan Kundera\, \country\: \捷克\}], \note\: \昆德拉获卡夫卡奖。\}
 },
 \bookstore\: {
 \2004\: {\works\: [{\nameCn\: \博士的爱情方程式\, \nameOriginal\: \Hakase no Aishita Sushiki\, \country\: \日本\}], \authors\: [{\nameCn\: \小川洋子\, \nameOriginal\: \Yoko Ogawa\, \country\: \日本\}], \note\: \首届本屋大赏，记忆只有80分钟的数学博士为主角。\},
 \2006\: {\works\: [{\nameCn\: \东京塔\, \nameOriginal\: \Tokyo Tower\, \country\: \日本\}], \authors\: [{\nameCn\: \Lily Franky\, \nameOriginal\: \Lily Franky\, \country\: \日本\}], \note\: \母子情感纽带，轰动日本。\},
 \2016\: {\works\: [{\nameCn\: \羊与钢的森林\, \nameOriginal\: \Hitsuji to Hagane no Mori\, \country\: \日本\}], \authors\: [{\nameCn\: \宫下奈都\, \nameOriginal\: \Natsu Miyashita\, \country\: \日本\}], \note\: \钢琴调音师的成长故事。\}
 }
}
with open(os.path.join(os.getcwd(), 'tmp', 'more_winners.json'), 'w', encoding='utf-8') as f:
 json.dump(winners, f, ensure_ascii=False)
print('Written')