import { reactive, computed, ComputedRef, shallowRef, ShallowRef, watch } from 'vue'
import Rest from '../../../web_services/rest'
import { product } from '@/api/api'
import { toNum, toStr } from '@/utilte/utilte'
import PromiseController from '@/api/web_services/promiseController'

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
export interface DefaultTypeInterface {
  id         : number
  self_id    : number | null
  name       : string
  description: string
  slug       : string | null
  tree       : TreeItem[]
  filters    : Filter[]
  tags       : Tag[]
}

type Init = (id: number) => Promise<void>

// prettier-ignore
export interface TypeInterface extends DefaultTypeInterface {
  is_loading: boolean
  init: Init
}
export const typeBuilder = (type: Partial<DefaultTypeInterface>) => {
  // prettier-ignore
  return {
    id         : toNum(type.id),
    self_id    : toNum(type.self_id),
    name       : toStr(type.name),
    slug       : toStr(type.slug),
    description: toStr(type.description),
    tree       : type.tree ?? [],
    filters    : type.filters ?? [],
    tags       : type.tags ?? [],
  }
}

class Type {
  private data             : DefaultTypeInterface // prettier-ignore
  private data_c           : ComputedRef<DefaultTypeInterface> // prettier-ignore
  private rest             : Rest // prettier-ignore
  private promiseController: PromiseController = new PromiseController() // prettier-ignore

  constructor(type: Partial<DefaultTypeInterface> = {}) {
    this.rest = rest

    // prettier-ignore
    this.data = reactive(typeBuilder(type))
    this.data_c = computed(() => this.data)

    watch(
      () => this.id,
      () => this.init(),
    )
  }

  public async init(): Promise<void> {
    product.all({ type: this.id })
    const res = await this.promiseController.await((signal) =>
      this.rest.get(this.id, {
        signal: signal,
      }),
    )

    if (!res) return
    if (!res.success) return

    Object.assign(this.data_c.value, res.data)
  }

  public get is_loading(): boolean {
    return this.promiseController.is_loading
  }

  public get id(): number {
    return this.data_c.value.id || 0
  }

  public set id(id: number) {
    this.data.id = id
  }

  public get self_id(): number {
    return this.data_c.value.self_id || 0
  }

  public get name(): string {
    return this.data_c.value.name || ''
  }

  public get slug(): string {
    return this.data_c.value.slug || ''
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
