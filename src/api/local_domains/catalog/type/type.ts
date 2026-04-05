import { reactive, computed, ComputedRef, shallowRef, ShallowRef } from 'vue'
import Rest from '../../../web_services/rest'
import { product } from '@/api/api'
import { toNum, toStr } from '@/utilte/utilte'

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

type Init = (id: number) => Promise<void>

// prettier-ignore
export interface TypeInterface extends DefaultTypeInterface {
  init: Init
}

class Type {
  private data  : DefaultTypeInterface // prettier-ignore
  private data_c: ComputedRef<DefaultTypeInterface> // prettier-ignore
  private rest  : Rest // prettier-ignore

  constructor(type: Partial<DefaultTypeInterface> = {}) {
    this.rest = rest

    // prettier-ignore
    this.data = reactive({
      id          : toNum(type.id),
      self_id     : toNum(type.self_id),
      name        : toStr(type.name),
      visible_name: toStr(type.visible_name),
      description : toStr(type.description),
      tree        : type.tree ?? [],
      filters     : type.filters ?? [],
      tags        : type.tags ?? [],
    })
    this.data_c = computed(() => this.data)
  }

  public async init(id: number): Promise<void> {
    const res = await this.rest.get(id)

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

class TypeService {
  private _type: ShallowRef<TypeInterface>

  constructor() {
    this._type = shallowRef(new Type())
  }

  public get type(): TypeInterface {
    return this._type.value
  }

  public set type(type: Partial<DefaultTypeInterface>) {
    this._type.value = new Type(type)
  }
}

const type = new TypeService()
export default type
