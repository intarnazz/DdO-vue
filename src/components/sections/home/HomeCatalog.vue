<script setup lang="ts">
import CatalogItem from '@/components/domains/catalog/CatalogItem.vue'
import { onMounted, ref, shallowRef } from 'vue'
import Rest, { pagingInfoBuilder } from '@/api/web_services/rest'
import { buildArray } from '@/api/builders/builders'
import Product from '@/api/local_domains/catalog/product/product.model'
import { DefaultTypeInterface, typeBuilder } from '@/api/local_domains/catalog/type/type'
import CatalogTitle from '@/components/domains/catalog/CatalogTitle.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'

const {
  type_id,
  grid_template_columns = 4,
  limit = 4,
} = defineProps<{
  type_id: number
  grid_template_columns?: number
  limit?: number
}>()

const products = shallowRef<Product[]>([])
const pagingInfo = ref(pagingInfoBuilder())
const type = ref()

const type_init = async () => {
  const res = await new Rest('type').get(type_id)
  type.value = typeBuilder(res.data as Partial<DefaultTypeInterface>)
}

const products_init = async () => {
  const res = await new Rest('product').all({ limit: limit, type: type_id })
  products.value = buildArray(Product, res.data)
  pagingInfo.value = pagingInfoBuilder(res.pagingInfo)
}

onMounted(() => {
  type_init()
  products_init()
})

// TODO: hover item
</script>

<template>
  <section v-if="type" class="catalog box-y gap-5">
    <LayoutWrapper>
      <div class="box-x">
        <CatalogTitle v-if="products[0]" :type="type" :pagingInfo="pagingInfo" />
      </div>
      <div :class="`grid-cols-${grid_template_columns}`" class="catalog__grid gap-8 grid">
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

<style lang="sass" scoped></style>
