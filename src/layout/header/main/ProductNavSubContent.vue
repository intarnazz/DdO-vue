<script setup lang="ts">
import { Type } from '@/api/api_domains/type/type'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'

const { overlayIsOpen, type } = defineProps<{
  overlayIsOpen: boolean
  type: null | Type
}>()
</script>

<template>
  <div v-if="type && overlayIsOpen" class="sub-content absolute w py-8 bg-white">
    <LayoutWrapper>
      <div class="box-y gap-8">
        <RouterLinkCatalog
          class="product-nav-item box-x gap-2"
          :type_id="type.id"
          :type_name="type.name"
        >
          <h2 class="a c-sub">{{ type.name }}</h2>
        </RouterLinkCatalog>
        <div class="flex gap-8">
          <div class="box-y gap-8 bgc-sub br p-4 box">
            <ul class="box-y gap-4">
              <li v-for="tag in type.tags" :key="tag.id">
                <h3>
                  <b class="c-sub">
                    {{ tag.name }}
                  </b>
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style lang="sass" scoped>
//
</style>
