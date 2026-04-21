import { toNum, toStr } from '@/utilte/utilte'

// prettier-ignore
export class Contact {
  public id         : number
  public name       : string
  public description: string
  public link       : string

  constructor(contact: Partial<Contact>) {
    this.id          = toNum(contact.id)
    this.name        = toStr(contact.name)
    this.description = toStr(contact.description)
    this.link        = toStr(contact.link)
  }
}
