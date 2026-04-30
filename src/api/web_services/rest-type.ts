import { toNum } from '@/utilte/utilte'

/**
 * Информация о пагинации.
 */
// prettier-ignore
export interface PagingInfo {
  /** Максимальное количество элементов на странице */
  limit     : number
  /** Смещение от начала выборки */
  offset    : number
  /** Общее количество элементов */
  totalCount: number
}

export const pagingInfoBuilder = (pagingInfo: Partial<PagingInfo> = {}): PagingInfo => {
  return {
    limit: toNum(pagingInfo.limit),
    offset: toNum(pagingInfo.offset),
    totalCount: toNum(pagingInfo.totalCount),
  }
}
