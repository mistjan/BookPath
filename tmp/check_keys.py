import ast, sys
with open(r"C:\Users\56265\Documents\BookPath\tmp\gen_editions.py", "r", encoding="utf-8") as f:
    code = f.read()
try:
    tree = ast.parse(code)
except SyntaxError as e:
    print(f"Syntax error: {e}")
    sys.exit(1)

# Find the EDITION_DATA dict
for node in ast.walk(tree):
    if isinstance(node, ast.Assign):
        for target in node.targets:
            if isinstance(target, ast.Name) and target.id == 'EDITION_DATA':
                if isinstance(node.value, ast.Dict):
                    keys = []
                    for k in node.value.keys:
                        if isinstance(k, ast.Constant):
                            keys.append(k.value)
                    print(f"Top-level keys ({len(keys)}):")
                    for k in keys:
                        print(f"  {k}")