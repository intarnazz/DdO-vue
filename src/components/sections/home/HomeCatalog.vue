<script setup lang="ts">
import CatalogItem from '@/components/domains/catalog/CatalogItem.vue'
import { onMounted, ref, shallowRef } from 'vue'
import Rest, { PagingInfo, pagingInfoBuilder } from '@/api/web_services/rest'
import { buildArray } from '@/api/builders/builders'
import Product from '@/api/local_domains/catalog/product/product.model'
import { DefaultTypeInterface, typeBuilder } from '@/api/local_domains/catalog/type/type'
import CatalogTitle from '@/components/domains/catalog/CatalogTitle.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { homePageEssence } from '@/api/api'

const {
  type_id,
  grid_template_columns = 4,
  limit = 4,
} = defineProps<{
  type_id: number
  grid_template_columns?: number
  limit?: number
}>()

const products = shallowRef<Product[] | undefined>([])
const pagingInfo = ref<PagingInfo | undefined>(pagingInfoBuilder())
const type = ref()

const type_init = async () => {
  const res = new Rest('type').get(type_id)
  type.value = typeBuilder((await res).data as Partial<DefaultTypeInterface>)

  if (!homePageEssence.value && !homePageEssence.value[String(type_id)]) return
  homePageEssence.value![String(type_id)]!.type = type.value
}

const products_init = async () => {
  const res = new Rest('product').all({ limit: limit, type: type_id })
  products.value = buildArray(Product, (await res).data)
  pagingInfo.value = pagingInfoBuilder((await res).pagingInfo)

  if (!homePageEssence.value && !homePageEssence.value[String(type_id)]) return
  homePageEssence.value![String(type_id)]!.products = products.value
  homePageEssence.value![String(type_id)]!.pagingInfo = pagingInfo.value
}

const init = async () => {
  products.value = homePageEssence.value[String(type_id)]?.products
  pagingInfo.value = homePageEssence.value[String(type_id)]?.pagingInfo
  type.value = homePageEssence.value[String(type_id)]?.type

  if (products.value && pagingInfo.value && type.value) return

  homePageEssence.value[String(type_id)] = {}

  type_init()
  products_init()
}

onMounted(() => init())
</script>

<template>
  <section v-if="type" class="catalog box-y gap-5">
    <LayoutWrapper>
      <div class="box-x">
        <CatalogTitle
          v-if="pagingInfo && products && products[0]"
          :type="type"
          :pagingInfo="pagingInfo"
        />
      </div>
      <div :class="`grid-${grid_template_columns}`" class="catalog__grid grid-cols-4 gap-4 grid">
        <CatalogItem
          v-for="product in products"
          :key="product.id"
          :product="product"
          :type="type"
        />
      </div>
    </LayoutWrapper>
  </section>
</template>

<style lang="sass" scoped>
.grid-4
  grid-template-columns: 1fr 1fr 1fr 1fr
.grid-5
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr
</style>
