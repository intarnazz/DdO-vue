<script setup lang="ts">
import CatalogItem from '@/components/domains/catalog/CatalogItem.vue'
import { onMounted, ref, shallowRef } from 'vue'
import Rest from '@/api/web_services/rest'
import { buildArray } from '@/api/builders/builders'
import Product from '@/api/local_domains/catalog/product/product.model'
import { DefaultTypeInterface, typeBuilder } from '@/api/local_domains/catalog/type/type'
import CatalogTitle from '@/components/domains/catalog/CatalogTitle.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { homePageEssence } from '@/api/api'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import { PagingInfo, pagingInfoBuilder } from '@/api/web_services/rest-type'

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
const type = ref<DefaultTypeInterface>()

const type_init = async () => {
  const res = await new Rest('type').get(type_id)
  type.value = typeBuilder(res.data as Partial<DefaultTypeInterface>)

  if (!homePageEssence.value && !homePageEssence.value[String(type_id)]) return
  homePageEssence.value![String(type_id)]!.type = type.value
}

const products_init = async () => {
  const res = await new Rest('product').all({ limit: limit, type: type_id })
  products.value = buildArray(Product, res.data)
  pagingInfo.value = pagingInfoBuilder(res.pagingInfo)

  if (!homePageEssence.value && !homePageEssence.value[String(type_id)]) return
  homePageEssence.value![String(type_id)]!.products = products.value
  homePageEssence.value![String(type_id)]!.pagingInfo = pagingInfo.value
}

const init = () => {
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
        <RouterLinkCatalog :type_name="type.name" :type_id="type.id">
          <CatalogTitle
            v-if="pagingInfo && products && products[0]"
            :type="type"
            :pagingInfo="pagingInfo"
          />
        </RouterLinkCatalog>
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
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
.grid-5
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
</style>
