<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Iconlogo from '@/components/icons/Iconlogo.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { contacts } from '@/api/api_domains/contact/contacts'
import { types } from '@/api/api_domains/type/types'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'

onMounted(() => contacts.load())
</script>

<template>
  <footer class="footer px-4 py-16 pb-24">
    <LayoutWrapper>
      <div class="footer__inner">
        <!-- Логотип + копирайт -->
        <div class="footer__brand">
          <RouterLink :to="{ name: 'home' }" class="footer__link">
            <Iconlogo :fill="`#ffffff`" />
          </RouterLink>
          <p class="footer__copy">© {{ new Date().getFullYear() }} — Все права защищены</p>
        </div>

        <!-- Навигация -->
        <nav class="footer__nav">
          <div class="footer__col">
            <span class="footer__col-title">Навигация</span>
            <ul class="footer__list">
              <li>
                <RouterLink :to="{ name: 'home' }" class="footer__link">Главная</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'about-us' }" class="footer__link">О нас</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'brands' }" class="footer__link">Бренды</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'cart' }" class="footer__link">Корзина</RouterLink>
              </li>
            </ul>
          </div>

          <div class="footer__col">
            <span class="footer__col-title">Каталог</span>

            <ul class="footer__list">
              <!-- 
                RouterLinkCatalog требует type_id + type_name.
                Пример — подставь свои реальные категории:
              -->
              <li v-for="type in types.items" :key="type.id">
                <RouterLinkCatalog :type_id="type.id" :type_name="type.name" class="footer__link">
                  <span>{{ type.name }}</span>
                </RouterLinkCatalog>
              </li>
              <!-- <li>
                <RouterLinkCatalog
                  :type_id="2"
                  :type_name="'Межкомнатные Двери'"
                  class="footer__link"
                >
                  Межкомнатные Двери
                </RouterLinkCatalog>
              </li>
              <li>
                <RouterLinkCatalog :type_id="2" :type_name="'Кухни'" class="footer__link">
                  Кухни
                </RouterLinkCatalog>
              </li> -->
            </ul>
          </div>

          <!-- Контакты из модуля -->
          <div class="footer__col" v-if="contacts.items.length">
            <span class="footer__col-title">Контакты</span>
            <ul class="footer__list">
              <li v-for="contact in contacts.items" :key="contact.id">
                <RouterLink
                  v-if="contact.name === 'phone' || contact.name === 'address'"
                  :to="{ name: 'contact' }"
                  class="footer__link footer__link--contact"
                >
                  <span v-if="contact.name === 'phone'" class="footer__contact-name">
                    телефон
                  </span>
                  <span v-else-if="contact.name === 'address'" class="footer__contact-name">
                    адрес
                  </span>
                  <span v-if="contact.description" class="footer__contact-desc">
                    {{ contact.description }}: {{ contact.link }}
                  </span>
                </RouterLink>
                <a
                  v-else
                  :href="contact.link"
                  target="_blank"
                  class="footer__link footer__link--contact"
                >
                  <span v-if="contact.name === 'phone'" class="footer__contact-name">
                    телефон
                  </span>
                  <span v-else-if="contact.name === 'address'" class="footer__contact-name">
                    адрес
                  </span>
                  <span v-else class="footer__contact-name">{{ contact.name }}</span>
                  <span v-if="contact.description" class="footer__contact-desc">
                    {{ contact.description }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </LayoutWrapper>
  </footer>
</template>

<style lang="sass" scoped>
.footer
  background-color: $b
  &__inner
    display: grid
    grid-template-columns: 1fr 2fr
    gap: 3rem
    align-items: start

    @media (max-width: 768px)
      grid-template-columns: 1fr

  &__brand
    display: flex
    flex-direction: column
    gap: 1.25rem

  &__copy
    font-size: 0.75rem
    color: rgba(255, 255, 255, 0.35)
    letter-spacing: 0.04em

  &__nav
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))
    gap: 2rem

  &__col
    display: flex
    flex-direction: column
    gap: 0.75rem

  &__col-title
    font-size: 0.65rem
    font-weight: 600
    letter-spacing: 0.12em
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.4)
    padding-bottom: 0.5rem
    border-bottom: 1px solid rgba(255, 255, 255, 0.08)

  &__list
    display: flex
    flex-direction: column
    gap: 0.5rem
    list-style: none
    margin: 0
    padding: 0

  &__link
    display: inline-flex
    flex-direction: column
    gap: 0.15rem
    font-size: 0.875rem
    color: rgba(255, 255, 255, 0.65)
    text-decoration: none
    transition: color 0.2s ease

    &:hover
      color: rgba(255, 255, 255, 1)

    &.router-link-active
      color: rgba(255, 255, 255, 0.9)

    &--contact
      gap: 0.2rem

  &__contact-name
    font-size: 0.875rem

  &__contact-desc
    font-size: 0.7rem
    color: rgba(255, 255, 255, 0.35)

  &__bottom
    margin-top: 3rem
    display: flex
    align-items: center
    gap: 1.5rem

  &__bottom-line
    flex: 1
    height: 1px
    background: rgba(255, 255, 255, 0.08)

  &__bottom-text
    font-size: 0.7rem
    color: rgba(255, 255, 255, 0.25)
    white-space: nowrap
    cursor: pointer
    transition: color 0.2s ease

    &:hover
      color: rgba(255, 255, 255, 0.5)
</style>
