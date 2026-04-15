<script setup lang="ts">
import { cart } from '@/api/api'
import Product from '@/api/local_domains/catalog/product/product.model'
import CartItem from '@/components/domains/cart/CartItem.vue'
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

    <strong class="c-sub">товаров: {{ cart.products.length }}</strong>

    <div class="cart__product-list box-y gap-4">
      <div
        v-for="product in cart.products"
        :key="product.product.id"
        class="cart__product-item box-x"
      >
        <CartItem :product="new Product(product.product)" />
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped></style>
