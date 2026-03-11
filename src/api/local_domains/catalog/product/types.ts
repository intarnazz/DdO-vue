/**
 * Структура изображения продукта.
 */
// prettier-ignore
export interface Image {
  /** Уникальный идентификатор изображения */
  id         : number
  /** Название изображения */
  name       : string
  /** Основной путь к изображению */
  path       : string
  /** Дополнительный путь к изображению */
  second_path: string
}

/**
 * Вариант продукта (например, цвет, размер).
 */
// prettier-ignore
export interface Variant {
  /** Уникальный идентификатор варианта */
  id         : number
  /** Идентификатор типа варианта */
  type_id    : number
  /** Название варианта */
  name       : string
  /** Описание варианта */
  description: string
}

/**
 * Категория продукта.
 */
// prettier-ignore
export interface ProductCategory {
  /** Уникальный идентификатор категории */
  id          : number
  /** Идентификатор родительской категории (null, если корневая) */
  self_id     : number | null
  /** Системное название категории */
  name        : string
  /** Отображаемое название категории */
  visible_name: string
  /** Описание категории */
  description : string
}

/**
 * Тег продукта.
 */
// prettier-ignore
export interface Tag {
  /** Уникальный идентификатор тега */
  id         : number
  /** Идентификатор типа тега */
  type_id    : number
  /** Название тега */
  name       : string
  /** Описание тега */
  description: string
}

/**
 * Бренд продукта.
 */
// prettier-ignore
export interface Brand {
  /** Уникальный идентификатор бренда */
  id         : number
  /** Идентификатор изображения бренда */
  image_id   : number
  /** Идентификатор текстового описания бренда */
  text_id    : number
  /** Название бренда */
  name       : string
  /** Описание бренда */
  description: string
  /** Тип бренда */
  type       : string
  /** Объект изображения бренда */
  image      : Image
}

/**
 * Характеристика продукта.
 */
// prettier-ignore
export interface Characteristic {
  /** Уникальный идентификатор характеристики */
  id         : number
  /** Идентификатор связанного фильтра */
  filter_id  : number
  /** Идентификатор изображения характеристики */
  image_id   : number
  /** Название характеристики */
  name       : string
  /** Описание характеристики */
  description: string
  /** Флаг видимости характеристики (1 — видима, 0 — скрыта) */
  is_visible : number
  /** Объект изображения характеристики */
  image      : Image
}

/**
 * Базовая структура данных продукта (без дополнительных вычисляемых полей).
 */
// prettier-ignore
export interface DefaultProductType {
  /** Уникальный идентификатор продукта */
  id             : number
  /** Идентификатор типа/категории продукта */
  type_id        : number
  /** Идентификатор тега продукта */
  tag_id         : number
  /** Идентификатор варианта продукта */
  variant_id     : number
  /** Идентификатор бренда продукта */
  brand_id       : number
  /** Идентификатор основного изображения продукта */
  image_id       : number
  /** Название продукта */
  name           : string
  /** Описание продукта */
  description    : string
  /** Ссылка на видео продукта */
  video_url      : string
  /** Количество просмотров */
  views          : number
  /** Цена продукта */
  price          : number
  /** Скидка на продукт */
  discount       : number
  /** Артикул продукта */
  article        : string
  /** Наличие на складе (1 — в наличии, 0 — отсутствует) */
  is_stock       : number // FIXME: должен быть <boolean>
  /** Наличие в магазине (1 — есть, 0 — нет) */
  is_in_store    : number // FIXME: должен быть <boolean>
  /** Основное изображение продукта */
  image          : Image
  /** Вариант продукта */
  variant        : Variant
  /** Категория продукта */
  type           : ProductCategory
  /** Тег продукта */
  tag            : Tag
  /** Бренд продукта */
  brand          : Brand
  /** Список изображений продукта */
  images         : Image[]
  /** Список характеристик продукта */
  characteristics: Characteristic[]
}

/**
 * Сигнатура метода инициализации продукта по идентификатору.
 * @param id - Идентификатор продукта для загрузки данных с сервера
 * @returns Промис, разрешающийся после загрузки данных
 */
export type Init = (id: number) => Promise<void>

/**
 * Расширенный тип продукта, включающий поле избранного и метод инициализации.
 * Используется как публичный интерфейс модели {@link Product}.
 */
// prettier-ignore
export interface ProductType extends DefaultProductType {
  /** Флаг нахождения продукта в избранном текущего пользователя */
  is_favorite: boolean
  /** Метод загрузки данных продукта по идентификатору */
  init       : Init
}

/**
 * Структура реактивного состояния сервиса продуктов.
 */
// prettier-ignore
export interface ProductServiceType {
  /** Список продуктов текущей страницы */
  products  : ProductType[]
  /** Информация о пагинации (totalCount, offset и т.д.) */
  pagingInfo: Record<string, any>
  /** Мета-данные выборки (например, диапазон цен) */
  meta      : Record<string, any>
}
