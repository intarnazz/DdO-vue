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
</script>

<template>
  <div class="box-x js gap-4">
    <IconPhoneEnabled v-if="name_is_phone" />
    <IconLocationOn v-else-if="name_is_address" />
    <IconVK v-else-if="name_is_vk" />
    <IconWhatsapp v-else-if="name_is_whatsapp" />
    <IconOdnoklassniki v-else-if="name_is_odnoklassniki" />
    <IconconnectWithoutContact v-else />
    <div v-if="name_is_phone" class="">
      <h3>телефон</h3>
      <p><ComponentRecolorText :text="contact.description" class="c-sub" />:</p>
      <p>
        <ComponentRecolorText :text="formatPhone(contact.link)" class="c-sub" />
      </p>
    </div>
    <RouterLink :to="{ name: 'contact' }" v-else-if="name_is_address" class="">
      <h3>адрес</h3>
      <p><ComponentRecolorText :text="contact.description" class="c-sub" />:</p>
      <p>
        <ComponentRecolorText :text="contact.link" class="c-sub" />
      </p>
    </RouterLink>
    <a v-else class="box-y flex-1" :href="contact.link" target="_blank">
      <h3>{{ contact.name }}</h3>
      <ComponentRecolorText :text="contact.description" class="c-sub" />
    </a>
  </div>
</template>
