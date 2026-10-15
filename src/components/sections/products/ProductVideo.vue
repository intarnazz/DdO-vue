<script setup lang="ts">
const { video_url } = defineProps<{
  video_url: string
}>()
</script>

<template>
  <div v-if="video_url" class="video__wrapper">
    <!-- ? Видео обзор -->
    <h3>
      <strong class="c-sub"> Видео обзор </strong>
    </h3>

    <iframe
      width="100%"
      height="358"
      :src="video_url"
      :key="video_url"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
      class="video"
    >
    </iframe>
  </div>
</template>

<style lang="sass" scoped>
.video
  background-color: $main
  box-shadow: 5px 5px 0 0 $main
</style>
