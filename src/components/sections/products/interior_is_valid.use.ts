import { product } from '@/api/api'
import { computed } from 'vue'

const interior_is_valid = computed(
  () =>
    product.product.type.slug === 'entrance-doors' ||
    product.product.type.slug === 'interior-doors',
)

export default interior_is_valid
