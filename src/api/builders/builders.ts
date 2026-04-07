// ─────────────────────────────────────────────
//  Вспомогательная фабрика для сборки массивов
// ─────────────────────────────────────────────

/**
 * Создаёт массив экземпляров модели из массива сырых объектов.
 *
 * @param Model  - Конструктор модели (класс)
 * @param items  - Массив исходных данных
 * @returns      Массив экземпляров Model
 *
 * @example
 * const images = buildArray(ImageModel, rawImages)  // ImageModel[]
 */
export function buildArray<T, D = Partial<T>>(
  Model: new (data: D) => T,
  items: D[] = [],
): T[] {
  return items.map((item) => new Model(item))
}
