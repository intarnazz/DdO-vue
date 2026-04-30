import { toNum, toNumOrNull, toStr } from '@/utilte/utilte'

// prettier-ignore
export class Category {
  public id         : number
  public selfId     : number | null
  public name       : string
  public description: string
  public slug       : string | null

  constructor(category: Partial<Category>) {
    this.id          = toNum(category.id)
    this.selfId      = toNumOrNull(category.selfId)
    this.name        = toStr(category.name)
    this.description = toStr(category.description)
    this.slug        = toStr(category.slug)
  }
}
