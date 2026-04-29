<script setup lang="ts">
import { cart } from '@/api/api'
import { CartItem as CartItemType } from '@/api/local_domains/cart/cart'
import Product from '@/api/local_domains/catalog/product/product.model'
import CartItem from '@/components/domains/cart/CartItem.vue'
import ProductPrice from '@/components/sections/products/ProductPrice.vue'

const set_count = (product: CartItemType, number: number) => (product.count += number)
</script>

<template>
  <section class="cart box-y gap-8">
    <div class="cart__title box-y">
      <h2>ваша корзина</h2>
      <p class="c-sub">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci commodi voluptatem,
        laborum facilis doloribus voluptas dolorum maiores, debitis architecto consequuntur
        assumenda. Hic fugit earum ipsa voluptates aliquid soluta ipsum debitis!
      </p>
    </div>

    <div class="flex items-start max-sm:flex-col gap-8">
      <div class="box-y gap-4 flex">
        <strong class="c-sub">товаров: {{ cart.products.length }}</strong>
        <div class="cart__product-list box-y gap-4">
          <div
            v-for="product in cart.products"
            :key="product.product.id"
            class="cart__product-item box-x"
          >
            <CartItem
              @set_count="(number) => set_count(product, number)"
              :product="new Product(product.product)"
              :count="product.count"
              :price="product.price"
            />
          </div>
        </div>
      </div>

      <div class="box-y p-8 border">
        <h3 class="h2 c-sub">общая стоимость:</h3>
        <ProductPrice :price="cart.total_price" />
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped></style>
