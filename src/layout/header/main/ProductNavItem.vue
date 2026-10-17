<script setup lang="ts">
import { Type } from '@/api/api_domains/type/type'
// import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
// import { computed } from 'vue'

const { type } = defineProps<{
  type: Type
}>()

// const emit = defineEmits<{
//   open_sub_content: [value: boolean]
// }>()

// const have_sub_content = computed(() => type.tags.length > 0 || type.tags.length > 0)
</script>

<template>
  <!-- <button
    v-if="have_sub_content"
    @click="emit('open_sub_content', true)"
    class="product-nav-item box-x gap-2 group"
  >
    {{ type.name }}
    <IconKeyboardArrowDown
      fill="w"
      class="product-nav-item__icon -mb-1 group-hover:-mb-2 transition-[margin]"
    />
  </button>

  <RouterLinkCatalog
    v-else
    class="product-nav-item box-x gap-2"
    :type_id="type.id"
    :type_name="type.name"
  >
    {{ type.name }}
  </RouterLinkCatalog> -->
  <RouterLinkCatalog class="product-nav-item box-x gap-2" :type_id="type.id" :type_name="type.name">
    {{ type.name }}
  </RouterLinkCatalog>
</template>

<style lang="sass" scoped>
//
// .product-nav-item
//   &:hover
//     & .product-nav-item
//       &__icon
//         margin-bottom: -10px
</style>
