<script setup lang="ts">
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { namesToKeys, formatPhone } from '@/utilte/utilte'
import { contact } from '@/api/api'
import { onMounted, ref } from 'vue'

const isLoading = ref(true)
const contacts = ref<Record<string, any>>({})

async function init() {
  isLoading.value = true
  const res = await contact.all({
    names: ['address', 'phone', 'whatsapp', 'odnoklassniki', 'vk'],
  })
  if (res.success) contacts.value = namesToKeys(res.data)
  isLoading.value = false
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <div v-if="!isLoading" class="address">
    <LayoutWrapper>
      <div class="box-x gap">
        <div :title="contacts['address'].description" class="box-x gap py-2">
          <p class="c-sub">
            наш адрес:
            <a class="c-w" :href="contacts['address'].link">
              {{ contacts['address'].description }}
            </a>
          </p>
        </div>

        <div class="box-x gap2">
          <div class="box-x gap">
            <div :title="contacts['whatsapp'].description" class="box-x gap5 py-2">
              <a class="c-w" :href="`${contacts['whatsapp'].link}`">
                <img class="icon" src="@/assets/icons/whatsapp.svg" alt="content_copy" />
              </a>
            </div>

            <div :title="contacts['odnoklassniki'].description" class="box-x gap5 py-2">
              <a class="c-w" :href="`${contacts['odnoklassniki'].link}`">
                <img class="icon" src="@/assets/icons/odnoklassniki.svg" alt="content_copy" />
              </a>
            </div>

            <div :title="contacts['vk'].description" class="box-x gap5 py-2">
              <a class="c-w" :href="`${contacts['vk'].link}`">
                <img class="icon" src="@/assets/icons/vk.svg" alt="content_copy" />
              </a>
            </div>
          </div>

          <p class="c-sub" :title="contacts['phone'].description">
            номер:
            <a class="c-w" :href="`tel:${contacts['phone'].link}`">
              {{ formatPhone(contacts['phone'].description) }}
            </a>
          </p>
        </div>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style lang="sass" scoped>
//
.address
  background-color: $b
</style>
