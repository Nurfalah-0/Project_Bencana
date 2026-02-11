import os

def check_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.vue', '.js')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if 'ref(' in content and 'from \'vue\'' not in content and 'from "vue"' not in content:
                            print(f"MISSING IMPORT in {path}")
                        if '<script setup>' in content and 'import' in content and 'ref(' in content and 'from \'vue\'' not in content and 'from "vue"' not in content:
                            print(f"STRICT MISSING IMPORT in {path}")
                except Exception as e:
                    print(f"Error reading {path}: {e}")

check_files('src')
