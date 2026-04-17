<script setup lang="ts">
import { ProductType } from '@/api/local_domains/catalog/product'
import ComponentSelect from '@/components/ComponentSelect.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconIndeterminateQuestionBox from '@/components/icons/IconIndeterminateQuestionBox.vue'
import { computed } from 'vue'

const { product } = defineProps<{
  product: ProductType
}>()

const size_characteristics = computed(() =>
  //[ ]: component
  product.characteristics.filter((c) => c.filter.name === 'size'),
)
</script>

<template>
  <div v-if="size_characteristics.length" class="box-y gap-4">
    <div class="box-x js gap-8">
      <strong> размер блока </strong>
      <RouterLink
        class="a box-x gap-2 c-sub a_sub font-normal"
        :to="{
          name: 'contact', // [ ] - Страница документации //: ссылка на документацию
        }"
      >
        <IconIndeterminateQuestionBox />

        <span>как сделать замеры?</span>
      </RouterLink>
    </div>

    <div class="box-x js gap-8">
      <ComponentSelect :options="size_characteristics" />
      <div class="box-x">
        <RouterLink
          class="a box-x gap-2 c-sub a_sub font-normal"
          :to="{
            name: 'contact',
          }"
        >
          <IconHandshake />
          <span> вызвать замерщика </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped></style>
