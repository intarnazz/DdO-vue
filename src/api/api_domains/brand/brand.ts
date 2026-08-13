import { Type } from '@/api/api_domains/type/type'
import { toNum, toStr } from '@/utilte/utilte'
import { buildArray } from '@/api/builders/builders'

// prettier-ignore
class BrandImage {
  public id  : number
  public name: string
  public path: string

  constructor(image: Partial<BrandImage>) {
    this.id   = toNum(image.id)
    this.name = toStr(image.name)
    this.path = toStr(image.path)
  }
}

// prettier-ignore
class BrandText {
  public id        : number
  public text      : string
  public created_at: string
  public updated_at: string

  constructor(text: Partial<BrandText>) {
    this.id         = toNum(text.id)
    this.text       = toStr(text.text)
    this.created_at = toStr(text.created_at)
    this.updated_at = toStr(text.updated_at)
  }
}

// prettier-ignore
// class FilterType {
//   public id          : number
//   public self_id     : number | null
//   public name        : string
//   public visible_name: string
//   public description : string

//   constructor(type: Partial<FilterType>) {
//     this.id           = toNum(type.id)
//     this.self_id      = type.self_id ?? null
//     this.name         = toStr(type.name)
//     this.visible_name = toStr(type.visible_name)
//     this.description  = toStr(type.description)
//   }
// }

// prettier-ignore
// class BrandFilter {
//   public id         : number
//   public name       : string
//   public description: string
//   public type       : string
//   public types      : FilterType[]

//   constructor(filter: Partial<BrandFilter>) {
//     this.id          = toNum(filter.id)
//     this.name        = toStr(filter.name)
//     this.description = toStr(filter.description)
//     this.type        = toStr(filter.type)
//     this.types       = buildArray(FilterType, filter.types || [])
//   }
// }

// prettier-ignore
export class Brand {
  public id         : number
  public image_id   : number
  public text_id    : number
  public filter_id  : number
  public name       : string
  public description: string
  public image      : BrandImage
  public text       : BrandText
  // public filter     : BrandFilter
  public types    : Type[]

  constructor(brand: Partial<Brand>) {
    this.id          = toNum(brand.id)
    this.image_id    = toNum(brand.image_id)
    this.text_id     = toNum(brand.text_id)
    this.filter_id   = toNum(brand.filter_id)
    this.name        = toStr(brand.name)
    this.description = toStr(brand.description)
    this.image       = new BrandImage(brand.image || {})
    this.text        = new BrandText(brand.text || {})
    // this.filter      = new BrandFilter(brand.filter || {})
    this.types      = buildArray( Type, brand.types )
  }
}
