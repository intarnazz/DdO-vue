import { toNum, toNumOrNull, toStr } from '@/utilte/utilte'

// prettier-ignore
export class Type {
  public id         : number
  public selfId     : number | null
  public name       : string
  public description: string
  public slug       : string | null

  constructor(type: Partial<Type>) {
    this.id          = toNum(type.id)
    this.selfId      = toNumOrNull(type.selfId)
    this.name        = toStr(type.name)
    this.description = toStr(type.description)
    this.slug        = toStr(type.slug)
  }
}
