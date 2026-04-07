import { toNum, toStr } from '@/utilte/utilte'
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
export class Brand {
  public id         : number
  public image_id   : number
  public text_id    : number
  public name       : string
  public description: string
  public type       : string
  public image      : BrandImage
  public text       : BrandText

  constructor(brand: Partial<Brand>) {
    this.id          = toNum(brand.id)
    this.image_id    = toNum(brand.image_id)
    this.text_id     = toNum(brand.text_id)
    this.name        = toStr(brand.name)
    this.description = toStr(brand.description)
    this.type        = toStr(brand.type)
    this.image       = new BrandImage(brand.image || {})
    this.text        = new BrandText(brand.text || {})
  }
}
