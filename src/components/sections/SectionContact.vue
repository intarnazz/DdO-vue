<script setup lang="ts">
import { Contact } from '@/api/api_domains/contact/contact'
import ComponentRecolorText from '@/components/ComponentRecolorText.vue'
import IconconnectWithoutContact from '@/components/icons/IconConnectWithoutContact.vue'
import IconLocationOn from '@/components/icons/IconLocationOn.vue'
import IconOdnoklassniki from '@/components/icons/IconOdnoklassniki.vue'
import IconPhoneEnabled from '@/components/icons/IconPhoneEnabled.vue'
import IconVK from '@/components/icons/IconVK.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import { formatPhone } from '@/utilte/utilte'
import { computed } from 'vue'

const { contact } = defineProps<{
  contact: Contact
}>()

const name_is_phone         = computed<boolean>(() => contact.name === 'phone') // prettier-ignore
const name_is_address       = computed<boolean>(() => contact.name === 'address') // prettier-ignore
const name_is_vk            = computed<boolean>(() => contact.name === 'vk') // prettier-ignore
const name_is_whatsapp      = computed<boolean>(() => contact.name === 'whatsapp') // prettier-ignore
const name_is_odnoklassniki = computed<boolean>(() => contact.name === 'odnoklassniki') // prettier-ignore

const description = computed<string>(() => {
  if (name_is_phone.value) return formatPhone(contact.description)
  return contact.description
})
</script>

<template>
  <div class="box-x js gap-4">
    <IconPhoneEnabled v-if="name_is_phone" />
    <IconLocationOn v-else-if="name_is_address" />
    <IconVK v-else-if="name_is_vk" />
    <IconWhatsapp v-else-if="name_is_whatsapp" />
    <IconOdnoklassniki v-else-if="name_is_odnoklassniki" />
    <IconconnectWithoutContact v-else />
    <div v-if="name_is_phone || name_is_address" class="box-y flex">
      <strong v-if="name_is_phone">телефон</strong>
      <strong v-if="name_is_address">адрес</strong>
      <ComponentRecolorText :text="description" class="c-sub" />
    </div>
    <a v-else class="box-y flex" :href="contact.link" target="_blank">
      <strong>{{ contact.name }}</strong>
      <ComponentRecolorText :text="description" class="c-sub" />
    </a>
  </div>
</template>
