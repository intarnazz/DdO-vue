from PIL import Image
import os

# Путь к папке с изображениями
folder_path = "./"  # Замените на путь к вашей папке

# Проход по всем файлам в папке (включая вложенные)
for root, dirs, files in os.walk(folder_path):
    for file in files:
        if file.lower().endswith(".webp"):
            file_path = os.path.join(root, file)
            with Image.open(file_path) as img:
                width, height = img.size

                if width > height and width > 1920:
                    # Горизонтальное изображение
                    new_width = 1920
                    new_height = int((1920 / width) * height)
                    resized_img = img.resize((new_width, new_height), Image.LANCZOS)
                    resized_img.save(file_path)

                elif height > width and height > 1080:
                    # Вертикальное изображение
                    new_height = 1080
                    new_width = int((1080 / height) * width)
                    resized_img = img.resize((new_width, new_height), Image.LANCZOS)
                    resized_img.save(file_path)
