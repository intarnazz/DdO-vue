export default class BaseModel {
  protected toNum = (v: any) => (v != null ? Number(v) : 0)
  protected toStr = (v: any) => (v != null ? String(v) : '')
}
