<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import IconChevronLeftCastom from '@/components/icons/IconChevronLeftCastom.vue'
import IconChevronRightCastom from '@/components/icons/IconChevronRightCastom.vue'

interface Banner {
  id: number
  tag?: string
  title: string
  subtitle?: string
  image: string
}

const props = withDefaults(
  defineProps<{
    banners: Banner[]
    autoplayDelay?: number
  }>(),
  {
    autoplayDelay: 4000,
  },
)

const current = ref(0)
const isPaused = ref(false)
const progress = ref(0)

let progressTimer: ReturnType<typeof setInterval> | null = null
let progressStart = 0

function goTo(index: number) {
  const total = props.banners.length
  current.value = ((index % total) + total) % total
  resetProgress()
}

function prev() {
  goTo(current.value - 1)
}
function next() {
  goTo(current.value + 1)
}

function resetProgress() {
  if (progressTimer) clearInterval(progressTimer)
  progress.value = 0
  progressStart = Date.now()

  progressTimer = setInterval(() => {
    if (isPaused.value) return
    const pct = Math.min(100, ((Date.now() - progressStart) / props.autoplayDelay) * 100)
    progress.value = pct
    if (pct >= 100) goTo(current.value + 1)
  }, 40)
}

// Touch support
let touchStartX = 0
function onTouchStart(e: TouchEvent) {
  if (!e.touches[0]) return
  touchStartX = e.touches[0].clientX
  isPaused.value = true
}
function onTouchEnd(e: TouchEvent) {
  if (!e.changedTouches[0]) return
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 40) goTo(current.value + (diff > 0 ? 1 : -1))
  isPaused.value = false
  progressStart = Date.now()
}

onMounted(() => resetProgress())
onUnmounted(() => {
  if (progressTimer) clearInterval(progressTimer)
})
</script>

<template>
  <section class="home">
    <div
      class="relative overflow-hidden select-none"
      @mouseenter="isPaused = true"
      @mouseleave="((isPaused = false), (progressStart = Date.now()))"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <!-- Slides -->
      <div
        class="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform"
        :style="{ transform: `translateX(-${current * 100}%)` }"
      >
        <div v-for="banner in banners" :key="banner.id" class="relative min-w-full">
          <!-- Background image -->
          <img
            :src="banner.image"
            :alt="banner.title"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <!-- Overlay -->
          <div
            class="absolute inset-0"
            style="background: linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, transparent 60%)"
          />

          <!-- Content -->
          <div
            class="relative flex flex-col items-start justify-end"
            style="padding: 2rem; min-height: 20rem"
          >
            <span
              v-if="banner.tag"
              style="
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 4px 12px;
                border-radius: 99px;
                margin-bottom: 10px;
                font-size: 12px;
              "
            >
              {{ banner.tag }}
            </span>
            <p class="h2" style="margin: 0 0 6px; color: #fff">{{ banner.title }}</p>
            <p v-if="banner.subtitle" style="margin: 0; color: rgba(255, 255, 255, 0.75)">
              {{ banner.subtitle }}
            </p>
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div
        class="absolute bottom-0 left-0 transition-[width] duration-100"
        style="height: 3px; background: rgba(255, 255, 255, 0.6); border-radius: 0 99px 99px 0"
        :style="{ width: progress + '%' }"
      />

      <!-- Navigation -->
      <button class="absolute left-3.5 top-1/2 -translate-y-1/2" aria-label="Назад" @click="prev">
        <IconChevronLeftCastom />
      </button>

      <button class="absolute right-3.5 top-1/2 -translate-y-1/2" aria-label="Вперёд" @click="next">
        <IconChevronRightCastom />
      </button>
    </div>

    <!-- Dots -->
    <div class="flex gap-1.5 justify-center mt-3.5">
      <button
        v-for="(_, i) in banners"
        :key="i"
        class="h-1.5 rounded-full transition-all duration-300 cursor-pointer border-none p-0"
        :class="
          i === current ? 'w-5 bg-gray-800 dark:bg-white' : 'w-1.5 bg-gray-300 dark:bg-gray-600'
        "
        :aria-label="`Слайд ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>
