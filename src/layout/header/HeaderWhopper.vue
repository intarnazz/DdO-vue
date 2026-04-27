<script setup lang="ts">
import { ref } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { RouterLink, useRouter } from 'vue-router'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'

const isOpen = ref(false)
const body = ref(document.body)
const isLocked = useScrollLock(body)

const router = useRouter()

function open() {
  isOpen.value = true
  isLocked.value = true
}

function close() {
  isOpen.value = false
  isLocked.value = false
}

function toggle() {
  isOpen.value ? close() : open()
}

// Закрывать при переходе по роуту
router.afterEach(() => close())
</script>

<template>
  <!-- Кнопка-бургер -->
  <button
    class="burger fixed z-1 border bg-white top-4 left-4"
    :class="{ 'burger--open': isOpen }"
    @click="toggle"
    aria-label="Меню"
  >
    <span class="burger__line" />
    <span class="burger__line" />
    <span class="burger__line" />
  </button>

  <!-- Оверлей -->
  <Transition name="overlay">
    <div v-if="isOpen" class="burger-overlay" @click="close" />
  </Transition>

  <!-- Drawer -->
  <Transition name="drawer">
    <div v-if="isOpen" class="burger-drawer">
      <div class="burger-drawer__header">
        <RouterLink :to="{ name: 'home' }" class="burger-drawer__logo">
          <img class="h-10" src="@/assets/icons/logo.svg" alt="logo" />
        </RouterLink>
        <button class="burger-drawer__close" @click="close" aria-label="Закрыть">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <line
              x1="1"
              y1="1"
              x2="17"
              y2="17"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <line
              x1="17"
              y1="1"
              x2="1"
              y2="17"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <nav class="burger-drawer__nav">
        <p class="burger-drawer__section-label">Навигация</p>
        <RouterLink :to="{ name: 'home' }" class="burger-drawer__link">Главная</RouterLink>
        <RouterLink :to="{ name: 'about-us' }" class="burger-drawer__link">О нас</RouterLink>
        <RouterLink :to="{ name: 'brands' }" class="burger-drawer__link">Бренды</RouterLink>
        <RouterLink
          :to="{ name: 'about-us', hash: '#payment-and-delivery' }"
          class="burger-drawer__link"
          >Оплата и доставка</RouterLink
        >
        <RouterLink :to="{ name: 'contact' }" class="burger-drawer__link">Контакты</RouterLink>

        <div class="burger-drawer__divider" />

        <p class="burger-drawer__section-label">Каталог</p>
        <RouterLinkCatalog :type_id="1" :type_name="`entrance-doors`" class="burger-drawer__link">
          Входные двери
        </RouterLinkCatalog>
        <RouterLinkCatalog :type_id="2" :type_name="`interior-doors`" class="burger-drawer__link">
          Межкомнатные двери
        </RouterLinkCatalog>
        <RouterLinkCatalog :type_id="3" :type_name="`kitchens`" class="burger-drawer__link">
          Кухни
        </RouterLinkCatalog>

        <div class="burger-drawer__divider" />

        <RouterLink :to="{ name: 'cart' }" class="burger-drawer__cart">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Корзина
        </RouterLink>
      </nav>
    </div>
  </Transition>
</template>

<style lang="sass" scoped>
// ── Burger button ──────────────────────────────────────────
.burger
  display: flex
  flex-direction: column
  justify-content: center
  gap: 5px
  width: 36px
  height: 36px
  cursor: pointer
  padding: 4px
  transition: background 0.15s ease


  &__line
    display: block
    height: 1.5px
    background: currentColor
    border-radius: 2px
    transform-origin: center
    transition: transform 0.25s ease, opacity 0.2s ease, width 0.25s ease
    width: 100%

  // Анимация в крест при открытии
  &--open
    .burger__line:nth-child(1)
      transform: translateY(6.5px) rotate(45deg)
    .burger__line:nth-child(2)
      opacity: 0
      transform: scaleX(0)
    .burger__line:nth-child(3)
      transform: translateY(-6.5px) rotate(-45deg)

// ── Overlay ────────────────────────────────────────────────
.burger-overlay
  position: fixed
  inset: 0
  background: rgba(0, 0, 0, 0.35)
  z-index: 90
  backdrop-filter: blur(2px)

// ── Drawer ─────────────────────────────────────────────────
.burger-drawer
  position: fixed
  top: 0
  right: 0
  bottom: 0
  width: min(360px, 100vw)
  background: #fff
  z-index: 91
  display: flex
  flex-direction: column
  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.08)

  &__header
    display: flex
    align-items: center
    justify-content: space-between
    padding: 1.25rem 1.5rem
    border-bottom: 1px solid #f0efec

  &__logo
    display: flex
    align-items: center

  &__close
    display: flex
    align-items: center
    justify-content: center
    width: 34px
    height: 34px
    border: none
    background: none
    cursor: pointer
    border-radius: 8px
    color: #666
    transition: background 0.15s, color 0.15s

    &:hover
      background: #f5f4f1
      color: #111

  &__nav
    flex: 1
    overflow-y: auto
    padding: 1.25rem 1.5rem
    display: flex
    flex-direction: column
    gap: 0.15rem

  &__section-label
    font-size: 0.65rem
    font-weight: 600
    letter-spacing: 0.12em
    text-transform: uppercase
    color: #aaa
    margin: 0.75rem 0 0.5rem
    padding: 0

    &:first-child
      margin-top: 0

  &__link
    display: block
    font-size: 1rem
    font-weight: 400
    color: #222
    text-decoration: none
    padding: 0.6rem 0.75rem
    border-radius: 8px
    transition: background 0.15s, color 0.15s

    &:hover
      background: #f5f4f1
      color: #111

    &.router-link-active
      color: $main
      font-weight: 500
      background: rgba(0,0,0,0.03)

  &__divider
    height: 1px
    background: #f0efec
    margin: 0.75rem 0

  &__cart
    display: flex
    align-items: center
    gap: 0.6rem
    font-size: 0.95rem
    color: #222
    text-decoration: none
    padding: 0.65rem 0.75rem
    border-radius: 8px
    transition: background 0.15s, color 0.15s

    &:hover
      background: #f5f4f1

// ── Transitions ────────────────────────────────────────────
.overlay-enter-active,
.overlay-leave-active
  transition: opacity 0.25s ease

.overlay-enter-from,
.overlay-leave-to
  opacity: 0

.drawer-enter-active,
.drawer-leave-active
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)

.drawer-enter-from,
.drawer-leave-to
  transform: translateX(100%)
</style>
