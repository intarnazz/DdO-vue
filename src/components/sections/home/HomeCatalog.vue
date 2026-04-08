<script setup lang="ts">
import CatalogItem from '@/components/domains/catalog/CatalogItem.vue'
import { onMounted, ref } from 'vue'
import Rest from '@/api/web_services/rest'
import { ProductType } from '@/api/local_domains/catalog/product'
import { buildArray } from '@/api/builders/builders'
import Product from '@/api/local_domains/catalog/product/product.model'
import { DefaultTypeInterface, typeBuilder } from '@/api/local_domains/catalog/type/type'

const products = ref<ProductType[]>([])
const type = ref()

const type_init = async () => {
  const res = await new Rest('type').get(1)
  type.value = typeBuilder(res.data as Partial<DefaultTypeInterface>)
}

const products_init = async () => {
  const res = await new Rest('product').all({ limit: 4, type: 1 })
  products.value = buildArray(Product, res.data)
  console.log(products.value);
  console.log(products.value[0]);
  console.log(products.value[0]?.id);
  console.log(products.value[0]?.price);
  console.log(products.value[0]?.price_string);
}

onMounted(() => {
  type_init()
  products_init()
})

// TODO: hover item
</script>

<template>
  <section v-if="type" class="catalog box-y gap-8">
    <div class="box-x as gap-8">
      <div class="w box-y gap-8 justify-start">
        <div class="catalog__grid">
          <CatalogItem
            v-for="product in products"
            :key="product.id"
            :product="product"
            :type="type"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
//
.catalog
  &__grid
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    gap: 2rem
</style>
