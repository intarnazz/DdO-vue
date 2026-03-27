// prettier-ignore
export type FiltersValue = string | number | undefined
export type Filters = Record<string, FiltersValue>
export type Mask = string[] | string

// prettier-ignore
export interface PaginData {
  limit  : number
  offset : number
}

// prettier-ignore
export interface OrderData {
  order : string
  desc  : string
}

// prettier-ignore
export interface SearchData {
  search : string
}

// prettier-ignore
export interface FiltersData {
  [key: string]: FiltersValue
}

export type QueryData = PaginData & OrderData & SearchData & FiltersData
