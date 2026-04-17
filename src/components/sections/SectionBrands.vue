<script setup lang="ts">
import { brands } from '@/api/api_domains/brand/brands'
import RouterLinkBrand from '@/layout/router-links/RouterLinkBrand.vue'
import { toNum } from '@/utilte/utilte'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { brand_id, link = true } = defineProps<{
  brand_id?: number
  link?: boolean
}>()

const emit = defineEmits<{
  'set-brand-id': [number]
}>()

const route = useRoute()
const routeBrandId = computed(() => toNum(route.params.id))

onMounted(() => brands.load())
</script>

<template>
  <section v-if="brands.items.length > 0" class="brands select-menu box-y gap-4 br border as js">
    <h3 class="py-2 px-4">бренды</h3>
    <div class="box-x">
      <aside class="brands__list select-menu__list box-y">
        <template v-if="link">
          <RouterLinkBrand
            v-for="brand in brands.items"
            :key="brand.id"
            :brand="brand"
            :class="{ 'select-menu__item_active': routeBrandId === brand.id }"
            class="brands__item select-menu__item py-2 px-4"
          >
            <p class="truncate w-63">{{ brand.name }}</p>
          </RouterLinkBrand>
        </template>

        <template v-else>
          <button
            @click="emit('set-brand-id', brand.id)"
            v-for="brand in brands.items"
            :key="brand.id"
            :brand="brand"
            :class="{ 'select-menu__item_active': brand_id === brand.id }"
            class="brands__item select-menu__item py-2 px-4 text-start"
          >
            <p class="truncate w-63">{{ brand.name }}</p>
          </button>
        </template>

        <div v-if="brands.hasMore" class="box-x c-mark">
          <button @click="brands.load()" class="py-2 px-4 flex">
            <span>загрузить ещё</span>
          </button>
        </div>
      </aside>
    </div>
  </section>
</template>
