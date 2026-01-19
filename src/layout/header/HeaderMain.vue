<script setup>
// import ComponentLogo from '@/components/ComponentLogo.vue'
import { RouterLink } from 'vue-router'
// import { auth } from '@/api/api'
import { User } from '@/storage/user'

const user = new User()
</script>

<template>
  <header>
    <div>
      <!-- Логотип -->
      <RouterLink :to="{ name: 'home' }">
        <!-- <ComponentLogo /> -->
        <h2>Logo</h2>
      </RouterLink>

      <div></div>

      <!-- Навигация: ТОЛЬКО about-us -->
      <nav>
        <RouterLink :to="{ name: 'about-us' }"> О нас </RouterLink>
      </nav>

      <!-- Правый блок: авторизация -->
      <!-- <div class="box-x gap">
        <RouterLink
          v-if="user.get.value"
          :to="{ name: 'profile' }"
          class="text-black hover:underline"
        >
          мой профиль
        </RouterLink>

        <RouterLink v-else :to="{ name: 'login' }" class="text-black hover:underline">
          Войти
        </RouterLink>

        <button
          v-if="user.get.value"
          @click="auth.logout"
          class="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
        >
          Выйти
        </button>

        <RouterLink
          v-else
          :to="{ name: 'reg' }"
          class="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
        >
          Регистрация
        </RouterLink>
      </div> -->
    </div>
  </header>
</template>

<style lang="sass" scoped></style>
