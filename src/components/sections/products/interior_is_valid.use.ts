import { product } from '@/api/api'
import { computed } from 'vue'

const interior_is_valid = computed(
  () =>
    product.product.type.name === 'entrance-doors' ||
    product.product.type.name === 'interior-doors',
)

export default interior_is_valid
