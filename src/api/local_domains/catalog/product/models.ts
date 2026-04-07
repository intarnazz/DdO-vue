import { buildArray } from '@/api/builders/builders'
import { toNum, toNumOrNull, toStr } from '@/utilte/utilte'

// ─────────────────────────────────────────────
//  Вспомогательная фабрика для сборки массивов
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
//  Классы моделей
// ─────────────────────────────────────────────

export class ImageModel {
  public id  : number
  public name: string
  public path: string

  constructor(data: Partial<ImageModel> = {}) {
    this.id   = toNum(data.id)
    this.name = toStr(data.name)
    this.path = toStr(data.path)
  }
}

export class ColorModel {
  public id         : number
  public filter_id  : number
  public image_id   : number
  public name       : string
  public description: string
  public is_visible : boolean
  public image      : ImageModel

  constructor(data: Partial<ColorModel> = {}) {
    this.id          = toNum(data.id)
    this.filter_id   = toNum(data.filter_id)
    this.image_id    = toNum(data.image_id)
    this.name        = toStr(data.name)
    this.description = toStr(data.description)
    this.is_visible  = Boolean(data.is_visible)
    this.image       = new ImageModel(data.image ?? {})
  }
}

export class VariantModel {
  public id         : number
  public type_id    : number
  public name       : string
  public description: string
  public products?  : VariantProductModel[]

  constructor(data: Partial<VariantModel> = {}) {
    this.id          = toNum(data.id)
    this.type_id     = toNum(data.type_id)
    this.name        = toStr(data.name)
    this.description = toStr(data.description)
    this.products    = buildArray(VariantProductModel, data.products ?? [])
  }
}

export class VariantProductModel {
  public id                 : number
  public type_id            : number
  public tag_id             : number
  public variant_id         : number
  public brand_id           : number
  public image_primary_id   : number
  public image_secondary_id : number | null
  public name               : string
  public description        : string
  public video_url          : string
  public views              : number
  public price              : number
  public discount           : number
  public article            : string
  public is_stock           : boolean
  public is_in_store        : boolean
  public image_primary      : ImageModel
  public image_secondary    : ImageModel | null
  public variant            : VariantModel
  public colors             : ColorModel[]

  constructor(data: Partial<VariantProductModel> = {}) {
    this.id                  = toNum(data.id)
    this.type_id             = toNum(data.type_id)
    this.tag_id              = toNum(data.tag_id)
    this.variant_id          = toNum(data.variant_id)
    this.brand_id            = toNum(data.brand_id)
    this.image_primary_id    = toNum(data.image_primary_id)
    this.image_secondary_id  = toNumOrNull(data.image_secondary_id)
    this.name                = toStr(data.name)
    this.description         = toStr(data.description)
    this.video_url           = toStr(data.video_url)
    this.views               = toNum(data.views)
    this.price               = toNum(data.price)
    this.discount            = toNum(data.discount)
    this.article             = toStr(data.article)
    this.is_stock            = Boolean(data.is_stock)
    this.is_in_store         = Boolean(data.is_in_store)
    this.image_primary       = new ImageModel(data.image_primary   ?? {})
    this.image_secondary     = data.image_secondary === null ? null : new ImageModel(data.image_secondary)
    this.variant             = new VariantModel(data.variant)
    this.colors              = buildArray(ColorModel, data.colors ?? [])
  }
}

export class ProductCategoryModel {
  public id          : number
  public self_id     : number | null
  public name        : string
  public visible_name: string
  public description : string

  constructor(data: Partial<ProductCategoryModel> = {}) {
    this.id           = toNum(data.id)
    this.self_id      = data.self_id != null ? toNum(data.self_id) : null
    this.name         = toStr(data.name)
    this.visible_name = toStr(data.visible_name)
    this.description  = toStr(data.description)
  }
}

export class TagModel {
  public id         : number
  public type_id    : number
  public name       : string
  public description: string

  constructor(data: Partial<TagModel> = {}) {
    this.id          = toNum(data.id)
    this.type_id     = toNum(data.type_id)
    this.name        = toStr(data.name)
    this.description = toStr(data.description)
  }
}

export class BrandModel {
  public id         : number
  public image_id   : number
  public text_id    : number
  public name       : string
  public description: string
  public type       : string
  public image      : ImageModel

  constructor(data: Partial<BrandModel> = {}) {
    this.id          = toNum(data.id)
    this.image_id    = toNum(data.image_id)
    this.text_id     = toNum(data.text_id)
    this.name        = toStr(data.name)
    this.description = toStr(data.description)
    this.type        = toStr(data.type)
    this.image       = new ImageModel(data.image ?? {})
  }
}

export class FilterModel {
  public id         : number
  public name       : string
  public description: string
  public type       : string

  constructor(data: Partial<FilterModel> = {}) {
    this.id          = toNum(data.id)
    this.name        = toStr(data.name)
    this.description = toStr(data.description)
    this.type        = toStr(data.type)
  }
}

export class CharacteristicModel {
  public id         : number
  public filter_id  : number
  public image_id   : number
  public name       : string
  public description: string
  public is_visible : boolean
  public image      : ImageModel
  public filter     : FilterModel

  constructor(data: Partial<CharacteristicModel> = {}) {
    
    this.id          = toNum(data.id)
    this.filter_id   = toNum(data.filter_id)
    this.image_id    = toNum(data.image_id)
    this.is_visible  = Boolean(data.is_visible)
    this.name        = toStr(data.name)
    this.description = toStr(data.description)
    this.image       = new ImageModel(data.image   ?? {})
    this.filter      = new FilterModel(data.filter ?? {})
  }
}

export class OptionModel {
  public id           : number
  public product_id   : number
  public image_id     : number | null
  public name         : string
  public description  : string
  public price        : number
  public image        : ImageModel | null
  public count        : number
  public is_set       : boolean
  public default_count: number

  constructor(data: Partial<OptionModel> = {}) {
    this.id            = toNum(data.id)
    this.product_id    = toNum(data.product_id)
    this.count         = toNum(data.count, data.default_count)
    this.price         = toNum(data.price)
    this.default_count = toNum(data.default_count)
    this.image_id      = toNum(data.image_id)
    this.is_set        = Boolean(data.is_set)
    this.name          = toStr(data.name)
    this.description   = toStr(data.description)
    this.image         = new ImageModel(data.image ?? {})
  }
}
