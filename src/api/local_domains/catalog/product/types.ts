/**
 * Структура изображения продукта.
 */
// prettier-ignore
export interface Image {
  /** Уникальный идентификатор изображения */
  id  : number
  /** Название изображения */
  name: string
  /** Путь к изображению */
  path: string
}

/**
 * Цвет продукта.
 */
// prettier-ignore
export interface Color {
  /** Уникальный идентификатор цвета */
  id        : number
  /** Идентификатор связанного фильтра */
  filter_id : number
  /** Идентификатор изображения цвета */
  image_id  : number
  /** Название цвета (HEX) */
  name      : string
  /** Описание цвета */
  description: string
  /** Флаг видимости цвета */
  is_visible: boolean
  /** Объект изображения цвета */
  image     : Image
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
  /** Список продуктов варианта */
  products   ?: VariantProduct[]
}

/**
 * Продукт внутри варианта (упрощённая версия без рекурсии variant.products).
 */
// prettier-ignore
export interface VariantProduct {
  /** Уникальный идентификатор продукта */
  id                 : number
  /** Идентификатор типа/категории продукта */
  type_id            : number
  /** Идентификатор тега продукта */
  tag_id             : number
  /** Идентификатор варианта продукта */
  variant_id         : number
  /** Идентификатор бренда продукта */
  brand_id           : number
  /** Идентификатор основного изображения продукта */
  image_primary_id   : number
  /** Идентификатор вторичного изображения продукта */
  image_secondary_id : number
  /** Название продукта */
  name               : string
  /** Описание продукта */
  description        : string
  /** Ссылка на видео продукта */
  video_url          : string
  /** Количество просмотров */
  views              : number
  /** Цена продукта */
  price              : number
  /** Скидка на продукт */
  discount           : number
  /** Артикул продукта */
  article            : string
  /** Наличие на складе */
  is_stock           : boolean
  /** Наличие в магазине */
  is_in_store        : boolean
  /** Основное изображение продукта */
  image_primary      : Image
  /** Вторичное изображение продукта */
  image_secondary    : Image
  /** Вариант продукта */
  variant            : Variant
  /** Список цветов продукта */
  color              : Color[]
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
 * Фильтр характеристики продукта.
 */
// prettier-ignore
export interface Filter {
  /** Уникальный идентификатор фильтра */
  id         : number
  /** Системное название фильтра */
  name       : string
  /** Описание фильтра */
  description: string
  /** Тип фильтра */
  type       : string
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
  /** Флаг видимости характеристики */
  is_visible : boolean
  /** Объект изображения характеристики */
  image      : Image
  /** Связанный фильтр */
  filter     : Filter
}

/**
 * Базовая структура данных продукта (без дополнительных вычисляемых полей).
 */
// prettier-ignore
export interface DefaultProductType {
  /** Уникальный идентификатор продукта */
  id                 : number
  /** Идентификатор типа/категории продукта */
  type_id            : number
  /** Идентификатор тега продукта */
  tag_id             : number
  /** Идентификатор варианта продукта */
  variant_id         : number
  /** Идентификатор бренда продукта */
  brand_id           : number
  /** Идентификатор основного изображения продукта */
  image_primary_id   : number
  /** Идентификатор вторичного изображения продукта */
  image_secondary_id : number
  /** Название продукта */
  name               : string
  /** Описание продукта */
  description        : string
  /** Ссылка на видео продукта */
  video_url          : string
  /** Количество просмотров */
  views              : number
  /** Цена продукта */
  price              : number
  /** Скидка на продукт */
  discount           : number
  /** Артикул продукта */
  article            : string
  /** Наличие на складе */
  is_stock           : boolean
  /** Наличие в магазине */
  is_in_store        : boolean
  /** Основное изображение продукта */
  image_primary      : Image
  /** Вторичное изображение продукта */
  image_secondary    : Image
  /** Вариант продукта */
  variant            : Variant
  /** Список цветов продукта */
  color              : Color[]
  /** Категория продукта */
  type               : ProductCategory
  /** Тег продукта */
  tag                : Tag
  /** Бренд продукта */
  brand              : Brand
  /** Список изображений продукта */
  images             : Image[]
  /** Список характеристик продукта */
  characteristics    : Characteristic[]
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
  object: ProductType

  is_favorite: boolean
  /** Метод загрузки данных продукта по идентификатору */
  init       : Init
}

/**
 * Информация о пагинации.
 */
// prettier-ignore
export interface PagingInfo {
  /** Максимальное количество элементов на странице */
  limit     : number
  /** Смещение от начала выборки */
  offset    : number
  /** Общее количество элементов */
  totalCount: number
}

/**
 * Диапазон цен продуктов в выборке.
 */
// prettier-ignore
export interface PriceMeta {
  /** Минимальная цена */
  min: number
  /** Максимальная цена */
  max: number
}

/**
 * Мета-данные выборки продуктов.
 */
// prettier-ignore
export interface ProductMeta {
  /** Диапазон цен */
  price: PriceMeta
}

/**
 * Структура реактивного состояния сервиса продуктов.
 */
// prettier-ignore
export interface ProductServiceType {
  /** Список продуктов текущей страницы */
  products  : ProductType[]
  /** Информация о пагинации */
  pagingInfo: PagingInfo
  /** Мета-данные выборки */
  meta      : ProductMeta
}
