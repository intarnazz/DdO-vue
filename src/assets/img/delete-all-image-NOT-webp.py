import os

# Укажи путь к папке с изображениями
folder_path = "./"

# Расширения фото, которые нужно удалить
image_extensions = [".jpg", ".jpeg", ".png", ".bmp", ".gif", ".tiff", ".heic"]

# Проходимся по файлам в папке
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)
    # Проверяем, файл ли это
    if os.path.isfile(file_path):
        # Получаем расширение в нижнем регистре
        ext = os.path.splitext(filename)[1].lower()
        # Если это фото, но не .webp — удаляем
        if ext in image_extensions:
            os.remove(file_path)
            print(f"Удалён: {filename}")
