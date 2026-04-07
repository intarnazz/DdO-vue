<script setup lang="ts">
import { brand } from '@/api/api'
import { Brand } from '@/api/api_domains/brand'
import { buildArray } from '@/api/builders/builders'
import { PagingInfo, pagingInfoBuilder } from '@/api/web_services/rest'
import RouterLinkBrand from '@/layout/router-links/RouterLinkBrand.vue'
import { toNum } from '@/utilte/utilte'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const brands = ref<Brand[]>([])
const pagingInfo = ref<PagingInfo>(pagingInfoBuilder())

const routeBrandId = computed(() => toNum(route.params.id))
const count = computed(() => pagingInfo.value.limit + pagingInfo.value.offset)

const init = async () => {
  const res = await brand.all({
    limit: 99,
    offset: count.value,
  })
  if (!res.success) return
  if (res.data) brands.value.push(...buildArray(Brand, res.data))
  pagingInfo.value = pagingInfoBuilder(res.pagingInfo)
}
onMounted(async () => {
  await init()
})
</script>

<template>
  <section class="brands select-menu box-y gap-4 br border as js">
    <h3 class="py-2 px-4">бренды</h3>
    <div class="box-x">
      <aside class="brands__list select-menu__list box-y">
        <RouterLinkBrand
          v-for="brand in brands"
          :key="brand.id"
          :brand="brand"
          :class="{
            'select-menu__item_active': routeBrandId === brand.id,
          }"
          class="brands__item select-menu__item py-2 px-4"
        >
          <p class="truncate w-63">{{ brand.name }}</p>
        </RouterLinkBrand>
        <div v-if="pagingInfo.totalCount > count" class="box-x c-mark">
          <button @click="init()" class="py-2 px-4 flex"><span>загрузить ещё</span></button>
        </div>
      </aside>
    </div>
  </section>
</template>

<style lang="sass" scoped></style>
