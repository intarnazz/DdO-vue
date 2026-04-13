<script setup lang="ts">
import { contacts } from '@/api/api_domains/contact/contacts'
import SectionContact from '@/components/sections/SectionContact.vue'
import { onMounted } from 'vue'

onMounted(() => contacts.load())
</script>

<template>
  <section class="contact-us w">
    <div class="box-y p-8 shadow-xl relative js gap-8 flex-1">
      <h2>наши контакты</h2>
      <div class="box-y gap-4">
        <SectionContact v-for="contact in contacts.items" :key="contact.id" :contact="contact" />
      </div>
    </div>
    <!-- TODO: обновить карту -->
    <iframe
      class="flex-3"
      src="https://yandex.ru/map-widget/v1/?um=constructor%3A2ae3f67321f7550843ef568969a6ce60d52a488b98d9b237c5488d763513bfde&amp;source=constructor&z=17"
      frameborder="0"
    ></iframe>
  </section>
</template>
