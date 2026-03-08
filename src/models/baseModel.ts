export default class BaseModel {
  protected toNum = (v: any, def: number = 0) => (v != null ? Number(v) : def)
  protected toStr = (v: any, def: string = '') => (v != null ? String(v) : def)
}
