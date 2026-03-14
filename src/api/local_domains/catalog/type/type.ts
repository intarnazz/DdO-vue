import { reactive, computed, ComputedRef } from 'vue'
import Rest from '../../../web_services/rest'
import BaseModel from '@/models/baseModel'
import { product } from '@/api/api'

const rest = new Rest('type')

// prettier-ignore
interface TreeItem {
  id          : number
  self_id     : number | null
  name        : string
  visible_name: string | null
  description : string
}

// prettier-ignore
interface Image {
  id         : number
  name       : string
  path       : string
  second_path: string
}

// prettier-ignore
interface ColorFilterContent {
  id         : number
  filter_id  : number
  image_id   : number
  name       : string
  description: string
  is_visible : number
  image      : Image
}

// prettier-ignore
interface BrandFilterContent {
  id         : number
  image_id   : number
  text_id    : number
  name       : string
  description: string
  type       : string
  image      : Image
}

// prettier-ignore
interface GenericFilterContent {
  id         : number
  filter_id  : number
  image_id   : number
  name       : string
  description: string
  is_visible : number
  image      : Image
}

// prettier-ignore
interface Filter {
  id         : number
  name       : string
  description: string
  type       : string
  content    : (ColorFilterContent | BrandFilterContent | GenericFilterContent)[]
}

// prettier-ignore
interface Tag {
  id         : number
  type_id    : number
  name       : string
  description: string
}

// prettier-ignore
interface DefaultTypeInterface {
  id          : number
  self_id     : number | null
  name        : string
  visible_name: string | null
  description : string
  tree        : TreeItem[]
  filters     : Filter[]
  tags        : Tag[]
}

type Init = (typeName: string) => Promise<void>

// prettier-ignore
export interface TypeInterface extends DefaultTypeInterface {
  init: Init
}

class Type extends BaseModel {
  private data  : DefaultTypeInterface // prettier-ignore
  private data_c: ComputedRef<DefaultTypeInterface> // prettier-ignore
  private rest  : Rest // prettier-ignore

  constructor(type: Record<string, any> = {}) {
    super()

    this.rest = rest

    // prettier-ignore
    this.data = reactive({
      id          : this.toNum(type.id),
      self_id     : this.toNum(type.self_id),
      name        : this.toStr(type.name),
      visible_name: this.toStr(type.visible_name),
      description : this.toStr(type.description),
      tree        : type.tree ?? [],
      filters     : type.filters ?? [],
      tags        : type.tags ?? [],
    })
    this.data_c = computed(() => this.data)
  }
  public init: Init = async (typeName) => {
    const res = await this.rest.all({ names: [typeName] })

    if (!res.success) return

    await this.fetchAndAssign(res.data[0])
  }

  protected async fetchAndAssign(type: Record<string, any>): Promise<void> {
    const res = await this.rest.get(type.id)

    if (!res.success) return

    Object.assign(this.data_c.value, res.data)
    await product.all()
  }

  public get id(): number {
    return this.data_c.value.id || 0
  }

  public get self_id(): number {
    return this.data_c.value.self_id || 0
  }

  public get name(): string {
    return this.data_c.value.name || ''
  }

  public get visible_name(): string {
    return this.data_c.value.visible_name || ''
  }

  public get description(): string {
    return this.data_c.value.description || ''
  }

  public get tree(): TreeItem[] {
    return this.data_c.value.tree || []
  }

  public get filters(): Filter[] {
    return this.data_c.value.filters || []
  }

  public get tags(): Tag[] {
    return this.data_c.value.tags || []
  }
}

interface Data {}

class TypeService {
  private data: Data
  private data_c: ComputedRef<Data>

  private _type: TypeInterface

  constructor() {
    this._type = new Type()

    this.data = reactive({})
    this.data_c = computed(() => this.data)
  }

  public get type() {
    return this._type
  }

  public set type(type) {
    this._type = new Type(type)
  }
}

const type = new TypeService()
export default type
