# change-format-of-src-to-webp.py
import os
import re

root_dir = "./"

patterns = [
    # src="@/assets/img/..." или src='@/assets/img/...'
    re.compile(
        r'(src\s*=\s*["\']@/assets/img/[^"\']+?)\.(jpg|jpeg|png|gif|bmp|tiff|svg)(["\'])',
        re.IGNORECASE,
    ),
    # import x from "@/assets/img/..." или import x from '@/assets/img/...'
    re.compile(
        r'(from\s*["\']@/assets/img/[^"\']+?)\.(jpg|jpeg|png|gif|bmp|tiff|svg)(["\'])',
        re.IGNORECASE,
    ),
    # require("@/assets/img/...") или require('@/assets/img/...')
    re.compile(
        r'(require\s*\(\s*["\']@/assets/img/[^"\']+?)\.(jpg|jpeg|png|gif|bmp|tiff|svg)(["\'])',
        re.IGNORECASE,
    ),
]


def replace_image_extensions(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    total_count = 0
    new_content = content
    for pattern in patterns:
        new_content, count = pattern.subn(r"\1.webp\3", new_content)
        total_count += count

    if total_count > 0:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(new_content)
        print(f"Обновлено {total_count} ссылок в: {file_path}")


def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith((".js", ".jsx", ".ts", ".tsx", ".vue", ".html")):
                replace_image_extensions(os.path.join(root, file))


if __name__ == "__main__":
    process_directory(root_dir)