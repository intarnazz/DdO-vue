<script setup lang="ts">
import Iconlogo from '@/components/icons/Iconlogo.vue'
import IconShopping from '@/components/icons/IconShopping.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
// import { auth } from '@/api/api'
// import { User } from '@/storage/user'

// const user = new User()
const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)
</script>

<template>
  <!-- Бургер и фон -->
  <div class="md:hidden">
    <!-- Кнопка -->
    <button @click="toggleMenu" class="fixed p-8 z-2">
      <div class="bg-black text-white p-2 rounded-lg shadow-md">
        <span class="block w-5 h-0.5 bg-white mb-1"></span>
        <span class="block w-5 h-0.5 bg-white mb-1"></span>
        <span class="block w-5 h-0.5 bg-white"></span>
      </div>
    </button>

    <!-- Затемнение -->
    <div
      v-if="isOpen"
      @click="toggleMenu"
      class="fixed z-2 inset-0 bg-black/50 backdrop-blur-sm"
      onwheel="event.preventDefault()"
      ontouchmove="event.preventDefault()"
    ></div>

    <!-- Меню -->
    <transition
      class="main"
      onwheel="event.preventDefault()"
      ontouchmove="event.preventDefault()"
      name="slide"
    >
      <div
        v-if="isOpen"
        class="c-sub fixed z-2 top-0 left-0 h-full bg-black/70 p-4 pt-16 flex flex-col gap"
      >
        <nav class="h-full flex flex-col">
          <!-- Заголовок -->

          <ul class="box-y gap-8">
            <li><RouterLink @click="toggleMenu" :to="{ name: 'home' }">Главная</RouterLink></li>
            <li><RouterLink @click="toggleMenu" :to="{ name: 'about-us' }">О нас</RouterLink></li>
            <li><RouterLink @click="toggleMenu" :to="{ name: 'brands' }">Бренды</RouterLink></li>
            <li>
              <RouterLink
                @click="toggleMenu"
                :to="{ name: 'about-us', hash: '#payment-and-delivery' }"
                >Оплата и доставка</RouterLink
              >
            </li>
            <li><RouterLink @click="toggleMenu" :to="{ name: 'contact' }">Контакты</RouterLink></li>

            <ul class="box-y gap-8">
              <li>
                <RouterLinkCatalog @click="toggleMenu" :type_id="1" :type_name="`entrance-doors`"
                  >Входные двери</RouterLinkCatalog
                >
              </li>
              <li>
                <RouterLinkCatalog @click="toggleMenu" :type_id="2" :type_name="`interior-doors`"
                  >Межкомнатные двери</RouterLinkCatalog
                >
              </li>
              <li>
                <RouterLinkCatalog @click="toggleMenu" :type_id="3" :type_name="`kitchens`"
                  >Кухни</RouterLinkCatalog
                >
              </li>
            </ul>

            <li>
              <RouterLink @click="toggleMenu" :to="{ name: 'cart' }">
                <IconShopping fill="fill_w" />
              </RouterLink>
            </li>
          </ul>
        </nav>

        <Iconlogo class="w-1/2" :fill="`#ffffff`" />
      </div>
    </transition>
  </div>
</template>

<style lang="sass" scoped>

ul
  li
    border-left: 1px solid $main
    padding-left: .4rem


.main
  font-size: 1.5rem

.slide-enter-active,
.slide-leave-active
  transition: transform 0.15s ease-in-out

.slide-enter-from
  transform: translateX(-100%)

.slide-enter-to
  transform: translateX(0%)

.slide-leave-from
  transform: translateX(0%)

.slide-leave-to
  transform: translateX(-100%)
</style>
