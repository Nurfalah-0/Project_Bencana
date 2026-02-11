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
                        content = f.read()
                        if ref_pattern.search(content) and not import_pattern.search(content):
                            # Check if it's inside <script setup> or similar
                            print(f"MISSING IMPORT in {path}")
                        
                        # Also check for 'computed', 'watch', etc.
                        for sym in ['computed', 'watch', 'onMounted', 'onUnmounted', 'reactive', 'nextTick', 'inject', 'provide']:
                            sym_pattern = re.compile(rf'\b{sym}\s*\(')
                            if sym_pattern.search(content) and not import_pattern.search(content):
                                print(f"MISSING {sym} IMPORT in {path}")
                except Exception as e:
                    pass

check_files('src')
