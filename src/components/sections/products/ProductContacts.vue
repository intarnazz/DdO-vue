<script setup lang="ts">
import { contacts } from '@/api/api_domains/contact/contacts'
import ComponentRecolorText from '@/components/ComponentRecolorText.vue'
import { formatPhone } from '@/utilte/utilte'
import { computed } from 'vue'

// onMounted(() => contacts.load())

const phone = computed(() =>
  formatPhone(contacts.items.find((i) => i.name === 'phone')?.description || ''),
)
</script>

<template>
  <div v-if="phone" class="box-y gap-4">
    <h3>номер</h3>
    <p class="product__contact h2">
      <ComponentRecolorText :text="phone" />
    </p>
  </div>
</template>

<style lang="sass" scoped></style>
