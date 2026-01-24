<script setup>
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { namesToKeys, formatPhone, copyToClipboard } from '@/utilte/utilte'
import { contact } from '@/api/api'
import { onMounted, ref } from 'vue'

const isLoding = ref(true)
const contacts = ref([])

async function init() {
  isLoding.value = true
  const res = await contact.all({
    names: ['address', 'phone', 'whatsapp', 'odnoklassniki', 'vk'],
  })
  if (res.success) contacts.value = namesToKeys(res.data)
  isLoding.value = false
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <div v-if="!isLoding" class="address">
    <LayoutWrapper>
      <div class="box-x gap">
        <div
          @click="copyToClipboard(contacts['address'].description, $event)"
          :title="contacts['address'].description"
          class="box-x gap cursor-pointer select-none py-2"
        >
          <p class="sp">наш адрес:</p>
          <div class="box-x gap5">
            <a class="c-w" :href="contacts['address'].link">
              {{ contacts['address'].description }}
            </a>
            <img class="h-[1.5rem]" src="@/assets/icons/content_copy.svg" alt="content_copy" />
          </div>
        </div>

        <div class="box-x gap2">
          <div class="box-x gap">
            <div
              :title="contacts['whatsapp'].description"
              class="box-x gap5 cursor-pointer select-none py-2"
            >
              <a class="c-w" :href="`${contacts['whatsapp'].link}`">
                <img class="h-[22px]" src="@/assets/icons/whatsapp.svg" alt="content_copy" />
              </a>
            </div>

            <div
              :title="contacts['odnoklassniki'].description"
              class="box-x gap5 cursor-pointer select-none py-2"
            >
              <a class="c-w" :href="`${contacts['odnoklassniki'].link}`">
                <img class="h-[22px]" src="@/assets/icons/odnoklassniki.svg" alt="content_copy" />
              </a>
            </div>

            <div
              :title="contacts['vk'].description"
              class="box-x gap5 cursor-pointer select-none py-2"
            >
              <a class="c-w" :href="`${contacts['vk'].link}`">
                <img class="h-[22px]" src="@/assets/icons/vk.svg" alt="content_copy" />
              </a>
            </div>
          </div>

          <div
            @click="copyToClipboard(contacts['phone'].description, $event)"
            :title="contacts['phone'].description"
            class="box-x gap5 cursor-pointer select-none py-2"
          >
            <a class="c-w" :href="`tel:${contacts['phone'].link}`">
              {{ formatPhone(contacts['phone'].description) }}
            </a>
            <img class="h-[1.5rem]" src="@/assets/icons/content_copy.svg" alt="content_copy" />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style lang="sass" scoped>
.address
  background-color: $b
</style>
