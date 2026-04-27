<script setup lang="ts">
import { contacts } from '@/api/api_domains/contact/contacts'
import SectionContact from '@/components/sections/SectionContact.vue'

const { mini = false } = defineProps<{
  mini?: boolean
}>()

// onMounted(() => contacts.load())
</script>

<template>
  <section v-if="contacts.items.length > 0" class="contact-us w">
    <div class="box-y p-8 shadow-xl relative js gap-8 flex-1">
      <h2>наши контакты</h2>
      <div class="box-y gap-4">
        <SectionContact v-for="contact in contacts.items" :key="contact.id" :contact="contact" />
      </div>
    </div>
    <iframe
      v-if="!mini"
      class="flex-3"
      src="https://yandex.com/map-widget/v1/?um=constructor%3A4dc299e9c2309db61cc7f96b82d68838a5389af72b51e96c37a27fb634898d66&amp;source=constructor"
      frameborder="0"
    ></iframe>
  </section>
</template>
