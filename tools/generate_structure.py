import os

PROJECT_PATH = r"C:\Users\Public\cognigate"
OUTPUT_FILE = os.path.join(PROJECT_PATH, "structure.txt")

IGNORE_FOLDERS = {
    "__pycache__",
    "venv",
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
}

lines = []

for root, dirs, files in os.walk(PROJECT_PATH):

    dirs[:] = [d for d in dirs if d not in IGNORE_FOLDERS]

    level = root.replace(PROJECT_PATH, "").count(os.sep)

    indent = "│   " * level

    folder_name = os.path.basename(root)

    lines.append(f"{indent}📁 {folder_name}/")

    sub_indent = "│   " * (level + 1)

    for file in files:

        if file == "structure.txt":
            continue

        lines.append(f"{sub_indent}📄 {file}")

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print("✅ structure.txt generated successfully")
