<script setup lang="ts">
import { contacts } from '@/api/api_domains/contact/contacts'
import SectionContact from '@/components/sections/SectionContact.vue'
</script>

<template>
  <section v-if="contacts.items.length > 0" class="contact-us w">
    <div class="box-y p-8 relative js gap-8 flex-1">
      <h2>наши контакты</h2> <!-- TODO Ссылка на "наши контакты" --> 
      <ul class="gap-4 contact-us__list grid grid-cols-3">
        <li v-for="contact in contacts.items" :key="contact.id" class="contact-us__item">
          <SectionContact :contact="contact" />
        </li>
      </ul>
    </div>
  </section>
</template>
