import { product } from '@/api/api'
import { computed, ref } from 'vue'

export const current_price_key = ref('price_discount')
export const set_current_price_key = (string: string) => (current_price_key.value = string)

export const price = computed(() => {
  if (current_price_key.value === 'price_discount') return product.product.price_discount
  if (current_price_key.value === 'total_price_discount')
    return product.product.total_price_discount

  return 0
})
