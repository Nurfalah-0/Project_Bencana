import os
import re

def check_files(directory):
    ref_pattern = re.compile(r'\bref\s*\(')
    import_pattern = re.compile(r'from\s+[\'"]vue[\'"]')
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.vue', '.js')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        has_ref = False
                        has_import = False
                        for i, line in enumerate(lines):
                            if ref_pattern.search(line):
                                has_ref = True
                                ref_line = i + 1
                            if import_pattern.search(line):
                                has_import = True
                        
                        if has_ref and not has_import:
                            print(f"MISSING IMPORT in {path} at line {ref_line}")
                except Exception as e:
                    pass

print("Searching for missing ref imports...")
check_files('src')
print("Search complete.")
